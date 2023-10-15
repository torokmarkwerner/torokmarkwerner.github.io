jsonData = [];

score = {};

trueOrFalse = { "true": "A", "false": "B", "doesn't say": "C" };

picked = "";
pickedId = "";

wordListGapsAll = {};

function createTask(id) {
    fetch("/erettsegi/data.json").then((response, id) => {
        return response.json()
    }).then((data) => {
        jsonData = data;
        populateHTML(data.find(task => task.taskId == id))
    })
}

function populateHTML(x) {
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

    if (Object.keys(wordList).length > 0 && !["uoe-multiple-choice","reading-multiple-choice"].includes(type)) {
        wordListContainer = document.createElement("DIV");
        wordListContainer.classList.add("word-list")

        for (i = 0; i < Object.keys(wordList).length; i++) {
            div = document.createElement("DIV");
            div.innerHTML = "<span>" + Object.values(wordList)[i] + "</span>"
            div.id = taskId + "-" + Object.keys(wordList)[i]
            div.classList.add("gap")
            div.classList.add(taskId)
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
        task.innerHTML = text.replace(/\(\d+\)/, "<span class='default-gap " + taskId + "'>" + example + "</span>").replace(/\(\d+\)/g, "<span class='gap " + taskId + "'></span>")
    } else if (type == "uoe-word-transformation" || type == "uoe-jumbled-up-sentences" || type == "uoe-sentence-transformation" || type == "uoe-free-gap-filling" || type == "reading-summary") {
        task.innerHTML = text.replace(/\(\d+\)/, "<span class='default-gap'>" + example + "</span>").replace(/\(\d+\)/g, "<input class='gap'>")
    } else if (type == "reading-free-gap-filling" || type == "reading-short-answer") {
        task.innerHTML = text2.replace(/\(\d+\)/, "<span class='default-gap'>" + example + "</span>").replace(/\(\d+\)/g, "<input class='gap'>")
    } else if (type == "reading-dialogue" || type == "reading-headings" || type == "reading-paragraphs") {
        task.innerHTML = text.replace(/\(\d+\)/, "<div class='default-gap " + taskId + "'>" + example + "</div>").replace(/\(\d+\)/g, "<div class='gap " + taskId + "'></div>")
    } else if (type == "reading-half-sentences") {
        task.innerHTML = text2.replace("<div class='gap'></div>", "<div class='default-gap " + taskId + "'>" + example + "</div>").replace(/\<div class\=\'gap\'\>\<\/div\>/g, "<div class='gap " + taskId + "'></div>")
    } else if (type == "reading-matching") {
        task.innerHTML = text.replace(/\(\d+\)/, "<div>" + text2 + " <span class='default-gap " + taskId + "'>" + example + "</span>" + "</div>").replace(/\(\d+\)/g, "<div>" + text2 + " <span class='gap " + taskId + "'></span>" + "</div>")
    } else if (type == "uoe-multiple-choice") {
        task.innerHTML = text.replace(/\(\d+\)/, "<select class='default-gap'></select>").replace(/\(\d+\)/g, "<select class='gap'></select>")

        for (i = 0; i < task.querySelectorAll("select").length; i++) {
            select = task.querySelectorAll("select")[i]
            optionDefault = document.createElement("OPTION");
            optionDefault.style.display = "none"
            select.appendChild(optionDefault)
            for (z = 0; z < Object.keys(wordList[i]).length; z++) {
                option = document.createElement("OPTION");
                option.value = (Object.values(wordList[i]))[z]
                option.innerHTML = (Object.keys(wordList[i]))[z]
                if (i == 0 && option.innerHTML == example) {
                    option.selected = true
                } else if (i == 0) {
                    option.disabled = true
                }
                select.appendChild(option)
            }
        }

    } else if (type == "reading-multiple-choice") {
        task.innerHTML = text2.replace(/\(\d+\)/, "<select class='default-gap'></select>").replace(/\(\d+\)/g, "<select class='gap'></select>")

        for (i = 0; i < task.querySelectorAll("select").length; i++) {
            select = task.querySelectorAll("select")[i]
            optionDefault = document.createElement("OPTION");
            optionDefault.style.display = "none"
            select.appendChild(optionDefault)
            for (z = 0; z < Object.keys(wordList[i]).length; z++) {
                option = document.createElement("OPTION");
                option.value = (Object.values(wordList[i]))[z]
                option.innerHTML = (Object.keys(wordList[i]))[z]
                if (i == 0 && option.innerHTML == example) {
                    option.selected = true
                } else if (i == 0) {
                    option.disabled = true
                }
                select.appendChild(option)
            }
        }

    } else if (type == "reading-extended-matching") {

      task.innerHTML = text2.replace(/\(\d+\)/, "<select class='default-gap'></select>").replace(/\(\d+\)/g, "<select class='gap'></select>")

        for (i = 0; i < task.querySelectorAll("select").length; i++) {
            select = task.querySelectorAll("select")[i]
            optionDefault = document.createElement("OPTION");
            optionDefault.style.display = "none"
            select.appendChild(optionDefault)
            for (z = 0; z < Object.keys(wordList).length; z++) {
                option = document.createElement("OPTION");
                option.value = Object.keys(wordList)[z]
                option.innerHTML = Object.values(wordList)[z]
                if (i == 0 && option.innerHTML == example) {
                    option.selected = true
                } else if (i == 0) {
                    option.disabled = true
                }
                select.appendChild(option)
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

    if (["reading-multiple-choice", "reading-half-sentences", "reading-true-or-false", "reading-free-gap-filling", "reading-extended-matching", "reading-short-answer"].includes(type)) {

        taskBody.appendChild(h3)

        taskText = document.createElement("DIV");
        taskText.innerHTML = text;
        taskBody.appendChild(taskText);
    
            if (Object.keys(wordList).length > 0 && !["reading-extended-matching", "reading-multiple-choice"].includes(type)) {
            taskBody.appendChild(wordListContainer)
        }

        taskBody.appendChild(task)

    } else {
        if (Object.keys(wordList).length > 0 && !["uoe-multiple-choice"].includes(type)) {
            taskBody.appendChild(wordListContainer)
        }
        task.insertBefore(h3, task.firstChild)
        taskBody.appendChild(task)
    }


    /*    script = document.createElement("SCRIPT");
        script.src = "/erettsegi/statements-pick-and-drop.js"
        taskBody.appendChild(script)*/

buttonContainer = document.createElement("DIV");
buttonContainer.classList.add("button-container");

    checkButton = document.createElement("BUTTON");
    checkButton.className = "check-button";
    checkButton.innerText = "CHECK ANSWERS";

    showButton = document.createElement("BUTTON")
    showButton.className = "show-button";
    showButton.innerText = "SHOW ANSWERS";

    buttonContainer.appendChild(checkButton);
    buttonContainer.appendChild(showButton);

    taskBody.appendChild(buttonContainer);

    if (!document.getElementById("score-modal")) {
        modalClose = document.createElement("DIV");
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
    }

    document.getElementById("content-container").appendChild(taskBody);

    if (type == "reading-half-sentences") {
        taskGaps = document.getElementById(taskId).querySelectorAll(".task > div > .gap")
    } else if (type == "reading-true-or-false") {
        taskGaps = document.getElementById(taskId).querySelectorAll(".radio-container:not(.default)")
    } else /*if (type == "uoe-word-transformation" || type == "uoe-closed-gap-filling" || type == "uoe-free-gap-filling" || type == "reading-dialogue" || type == "reading-text") */ {
        taskGaps = document.getElementById(taskId).querySelectorAll(".task .gap")
    }

    score[taskId] = { "current": 0, "max": taskGaps.length };

    wordListGapsAll[taskId] = document.getElementById(taskId).querySelectorAll(".word-list .gap")

    /*taskGaps are: GAPS if it's a gap-filling task, RADIO-CONTAINERS if it's a true-or-false task, and GAPS inside a div tag if it's a matching task.*/

    if (document.getElementById(taskId).getElementsByClassName("word-list")[0]) {
        for (i = 0; i < taskGaps.length; i++) {
            taskGaps[i].addEventListener("click", function() {
                if (this.innerText == "") { dropAnswer(this, x.taskId); } else {
                    wordList = document.getElementById(taskId).getElementsByClassName("word-list")[0];
                    gap = document.createElement("DIV");
                    gap.innerHTML = this.innerHTML;
                    this.classList.forEach(x => gap.classList.add(x))
                    gap.id = this.id
                    gap.addEventListener("click", function() { pickAnswer(this, x.taskId) });
                    document.getElementById(x.taskId).getElementsByClassName("word-list")[0].appendChild(gap);
                    isVisibleThen(x.taskId);
                    this.innerHTML = "";
                    this.removeAttribute("id")
                    if (["reading-text","reading-matching"].includes(type)) {
                        this.style.display = "inline-block";
                        this.style.verticalAlign = "middle"
                    }
                }
            });
        }
    }

    for (i = 0; i < wordListGapsAll[taskId].length; i++) {
        wordListGapsAll[taskId][i].addEventListener("click", function() { pickAnswer(this, x.taskId); });
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