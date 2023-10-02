jsonData = []

score = 0;

trueOrFalse = { "true": "A", "false": "B", "doesn't say": "C" };

picked = "";
pickedId = "";

function createTask(id) {
    fetch("/erettsegi/data.json").then((response, id) => {
        return response.json()
    }).then((data) => {
        jsonData = data;
        populateHTML(data.find(task => task.taskId == id))
    })
}

function populateHTML(x) {
    console.log(x)
    taskId = x.taskId;
    type = x.type;
    solutions = JSON.parse(x.solutions);
    taskTitle = x.taskTitle;
    instructions = JSON.parse(x.instructions);
    wordList = JSON.parse(x.wordList);
    textTitle = x.textTitle;
    example = x.example;
    text = x.text;
    text2 = x.text2;

    taskBody = document.createElement("DIV");
    taskBody.className = type;
    taskBody.id = taskId;
    h2 = document.createElement("H2");
    h2.innerHTML = taskTitle;
    taskBody.appendChild(h2)

    ul = document.createElement("UL");

    for (i = 0; i < instructions.length; i++) {
        li = document.createElement("LI");
        li.innerHTML = instructions[i]
        ul.appendChild(li)
    }

    taskBody.appendChild(ul)

    if (wordList.length > 0 && type != "uoe-multiple-choice") {
        wordListContainer = document.createElement("DIV");
        wordListContainer.classList.add("word-list")

        for (i = 0; i < wordList.length; i++) {
            div = document.createElement("DIV");
            div.innerHTML = Object.keys(wordList[i])[0]
            div.id = taskId + "-" + Object.values(wordList[i])[0]
            div.classList.add("gap")
            wordListContainer.appendChild(div)
        }

        /* taskBody.appendChild(wordListContainer) */

    }

    task = document.createElement("DIV");
    task.classList.add("task");

    h3 = document.createElement("H3");
    h3.innerHTML = textTitle;

    /* task.appendChild(h3) */

    if (type == "uoe-closed-gap-filling" || type == "reading-text") {
        task.innerHTML = text.replace(/\(\d+\)/, "<span class='default-gap'>" + example + "</span> ").replace(/\(\d+\)/g, "<span class='gap'></span>").replace(/\(/g, "<b>(").replace(/\)/g, ")</b>")
    } else if (type == "uoe-word-transformation" || type == "uoe-free-gap-filling") {
        task.innerHTML = text.replace(/\(\d+\)/, "<span class='default-gap'>" + example + "</span> ").replace(/\(\d+\)/g, "<input class='gap'> ")
    } else if (type == "reading-dialogue") {
        task.innerHTML = text.replace(/\(\d+\)/, "<div class='default-gap'>" + example + "</div> ").replace(/\(\d+\)/g, "<div class='gap'></div>")
    } else if (type == "reading-matching") {
        task.innerHTML = text2.replace("<div class='gap'></div>", "<div class='default-gap'>" + example + "</div> ");
    } else if (type == "uoe-multiple-choice") {
        task.innerHTML = text.replace(/\(\d+\)/, "<select class='default-gap'></select>").replace(/\(\d+\)/g, "<select class='gap'></select>")

        for (i = 0; i < task.querySelectorAll("select").length; i++) {
            select = task.querySelectorAll("select")[i]
            optionDefault = document.createElement("OPTION");
            optionDefault.style.display = "none"
            select.appendChild(optionDefault)
            for (z = 0; z < Object.keys(wordList[i]).length; z++) {
                option = document.createElement("OPTION");
                option.value = (Object.keys(wordList[i]))[z]
                option.innerHTML = (Object.values(wordList[i]))[z]
                select.appendChild(option)
            }
            if (i == 0) {
                select.querySelector("[value='" + example + "']").selected = true
                select.querySelectorAll(":not([value='" + example + "'])").forEach(x => x.disabled = true)
            }
        }




    } else {
        /*type == "reading-true-or-false"*/
        task.innerHTML = text2;
        tfs = task.querySelectorAll(".radio-container")[0].querySelectorAll("label input");
        for (i = 0; i < tfs.length; i++) {
            tfs[i].disabled = true
            if (tfs[i].nextElementSibling.innerText == example) {
                tfs[i].checked = true
            }
        }
    }

    /* task.appendChild(div) */

    if (["reading-matching", "reading-true-or-false"].includes(type)) {

        taskBody.appendChild(h3)

        taskText = document.createElement("DIV");
        taskText.innerHTML = text;
        taskBody.appendChild(taskText);

        if (wordList.length > 0) {
            taskBody.appendChild(wordListContainer)
        }

        taskBody.appendChild(task)

    } else {
        if (wordList.length > 0 && type != "uoe-multiple-choice") {
            taskBody.appendChild(wordListContainer)
        }
        task.insertBefore(h3, task.firstChild)
        taskBody.appendChild(task)
    }


    /*    script = document.createElement("SCRIPT");
        script.src = "/erettsegi/statements-pick-and-drop.js"
        taskBody.appendChild(script)*/

    checkButton = document.createElement("BUTTON");
    checkButton.className = "check-button";
    checkButton.innerText = "CHECK ANSWERS";

    showButton = document.createElement("BUTTON")
    showButton.className = "show-button";
    showButton.innerText = "SHOW ANSWERS";

    taskBody.appendChild(checkButton);
    taskBody.appendChild(showButton);

    modalClose = document.createElement("SPAN");
    modalClose.className = "modal-close";
    modalClose.innerHTML = "&times;";
    modalClose.addEventListener("click", function() { this.parentElement.parentElement.style.display = "none" })

    modalP = document.createElement("P");

    modalBox = document.createElement("DIV");
    modalBox.id = "score-modal";
    modalBox.className = "modal-box";

    modalBox.appendChild(modalClose);
    modalBox.appendChild(modalP);

    modalBasis = document.createElement("DIV");
    modalBasis.className = "modal-basis";

    modalBasis.appendChild(modalBox);

    document.getElementById("content-container").appendChild(modalBasis);
    document.getElementById("content-container").appendChild(taskBody);

    if (type == "reading-matching") {
        taskGaps = document.getElementById(taskId).querySelectorAll(".task > div > .gap")
    } else if (type == "reading-true-or-false") {
        taskGaps = document.getElementById(taskId).querySelectorAll(".radio-container:not(.default)")
    } else /*if (type == "uoe-word-transformation" || type == "uoe-closed-gap-filling" || type == "uoe-free-gap-filling" || type == "reading-dialogue" || type == "reading-text") */ {
        taskGaps = document.getElementById(taskId).querySelectorAll(".task .gap")
    }

    wordListGaps = document.getElementById(taskId).querySelectorAll(".word-list .gap")

    /*taskGaps are: GAPS if it's a gap-filling task, RADIO-CONTAINERS if it's a true-or-false task, and GAPS inside a div tag if it's a matching task.*/

    if (document.getElementById(taskId).getElementsByClassName("word-list")[0]) {
        for (i = 0; i < taskGaps.length; i++) {
            taskGaps[i].addEventListener("click", function() {
                if (this.innerText == "") { dropAnswer(this, x.taskId); } else {
                    wordList = document.getElementById(taskId).getElementsByClassName("word-list")[0];
                    gap = document.createElement("DIV");
                    gap.innerHTML = this.innerHTML;
                    gap.classList.add("gap");
                    gap.addEventListener("click", function() { pickAnswer(this, x.taskId) });
                    wordList.appendChild(gap);
                    this.innerHTML = "";
                    if (type == "reading-text") {
                        this.style.display = "inline-block";
                        this.style.verticalAlign = "middle"
                    }
                }
            });
        }
    }

    for (i = 0; i < wordListGaps.length; i++) {
        wordListGaps[i].addEventListener("click", function() { pickAnswer(this, x.taskId); });
    }

    /*If there are options (word-list), word-list gaps can be picked and dropped into task gaps. OR if a taskGap has already been filled in, the gap goes back to the word-list.*/

    isVisibleThen(x.taskId)

    if (document.getElementById(taskId).getElementsByClassName("word-list")[0]) {
        document.getElementById(taskId).getElementsByClassName("word-list")[0].addEventListener("scroll", function() {
            isVisibleThen(x.taskId)
            /*alert(wordListGaps[4].offsetTop + " " + " ")*/
        })
    }

    document.getElementById(taskId).getElementsByClassName("show-button")[0].addEventListener("click", function() { showAnswers(x.taskId) })
    document.getElementById(taskId).getElementsByClassName("check-button")[0].addEventListener("click", function() { checkAnswers(x.taskId) })
}