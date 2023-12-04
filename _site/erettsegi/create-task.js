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
    link = x.link;
    images = JSON.parse(x.images);

    taskBody = document.createElement("DIV");
    taskBody.className = type;
    taskBody.id = taskId;
    h2 = document.createElement("H2");
    h2.innerHTML = taskTitle;
    h2.className = "task-title"

    a = document.createElement("A");
    a.classList.add("erettsegi-link");
    a.innerHTML = "SRC"
    a.href = link;
    a.target = "_blank"

    h2.appendChild(a)

    a2 = document.createElement("A");
    a2.classList.add("erettsegi-link");
    a2.innerHTML = "KEY"
    a2.href = link.replace(/_fl/g,"_ut");
    a2.target = "_blank"

    h2.appendChild(a2)

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

    img = document.createElement("IMG");
    img.className = "erettsegi-image"

    attribution = document.createElement("DIV");
    attribution.className = "erettsegi-image-attribution"

    if (images.length == 3) {
    img.src = images[2];
    img.alt = images[0];

    if (images[1].split("|").length > 1) {
    attribution.innerHTML = images[0] + ". Source: " + images[1].split("|")[0] + "<span style='font-style:normal'> | </span>" + images[1].split("|")[1] + "."
} else {
    attribution.innerText = images[0] + ". Source: " + images[1] + "."
}
}

    /* task.appendChild(h3) */

if (type == "uoe-error-correction") {
task.innerHTML = text.split("<i")[0].replace(/([$£]?\d?[.,]?\d+[.,]\d+.?|\d+\:\d+|[ap]\.m\.|B\.C\.|[A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí%'$£\-']+(?=[.?!]?[^\n]?)|[^\n]\d+[^)])/g,"<span class='text-unit'>$1</span>").replace(/(0\)\s+)(.*)/,"<span class='default-gap'>$2 <button class='tick'>&#10003;</button></span>").replace(/(0\)\s+)(.*)/,"<span class='default-gap'>$2 <button class='tick'>&#10003;</button></span>").replace(/(\d{1,2}\)\s+)(.*)/g,"<span class='uoe-error-correction-line'>$2 <button class='tick'>&#10003;</button></span>") + "<p><i" + text.split("<i")[1] + "</p>"
} else if (type == "uoe-closed-gap-filling" || type == "reading-text") {
        task.innerHTML = text.replace(/\(\d{1,2}\)/, "<span class='default-gap " + taskId + "'>" + example + "</span>").replace(/\(\d{1,2}\)/g, "<span class='gap " + taskId + "'></span>")
    } else if (type == "uoe-word-transformation" || type == "uoe-jumbled-up-sentences" || type == "uoe-sentence-transformation" || type == "uoe-free-gap-filling" || type == "reading-summary") {
        task.innerHTML = text.replace(/\(\d{1,2}\)/, "<span class='default-gap'>" + example + "</span>").replace(/\(\d{1,2}\)/g, "<input class='gap'>")
    } else if (type == "reading-free-gap-filling" || type == "reading-short-answer") {
        task.innerHTML = text2.replace(/\(\d{1,2}\)/, "<span class='default-gap'>" + example + "</span>").replace(/\(\d{1,2}\)/g, "<input class='gap'>")
    } else if (type == "reading-dialogue" || type == "reading-headings" || type == "reading-paragraphs") {
        task.innerHTML = text.replace(/\(\d{1,2}\)/, "<div class='default-gap " + taskId + "'>" + example + "</div>").replace(/\(\d{1,2}\)/g, "<div class='gap " + taskId + "'></div>")
    } else if (type == "reading-half-sentences") {
        task.innerHTML = text2.replace("<div class='gap'></div>", "<div class='default-gap " + taskId + "'>" + example + "</div>").replace(/\<div class\=\'gap\'\>\<\/div\>/g, "<div class='gap " + taskId + "'></div>")
    } else if (type == "reading-matching") {
        task.innerHTML = text.replace(/\(\d{1,2}\)/, "<div>" + text2 + " <span class='default-gap " + taskId + "'>" + example + "</span>" + "</div>").replace(/\(\d{1,2}\)/g, "<div>" + text2 + " <span class='gap " + taskId + "'></span>" + "</div>")
    } else if (type == "uoe-multiple-choice") {
        task.innerHTML = text.replace(/\(\d{1,2}\)/, "<select class='default-gap'></select>").replace(/\(\d{1,2}\)/g, "<select class='gap'></select>")

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
        task.innerHTML = text2.replace(/\(\d{1,2}\)/, "<select class='default-gap'></select>").replace(/\(\d{1,2}\)/g, "<select class='gap'></select>")

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

      task.innerHTML = text2.replace(/\(\d{1,2}\)/, "<select class='default-gap'></select>").replace(/\(\d{1,2}\)/g, "<select class='gap'></select>")

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
        taskBody.appendChild(img)
        taskBody.appendChild(attribution)

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
        task.insertBefore(attribution, task.firstChild)
        task.insertBefore(img, task.firstChild)
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
    checkButton.innerText = "Check answers";

    showButton = document.createElement("BUTTON");
    showButton.className = "show-button";
    showButton.innerText = "Show answers";

    reportButton = document.createElement("BUTTON");
    reportButton.className = "report-button"
    reportButton.innerText = "Report problem";


    buttonContainer.appendChild(checkButton);
    buttonContainer.appendChild(showButton);
    buttonContainer.appendChild(reportButton);

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

 if (type == "uoe-error-correction") {
taskGaps = document.getElementById(taskId).querySelectorAll(".task .uoe-error-correction-line")
textUnits = document.getElementById(taskId).querySelectorAll(".task .uoe-error-correction-line .text-unit")
ticks = document.getElementById(taskId).querySelectorAll(".task .uoe-error-correction-line .tick")

defaults = document.getElementById(taskId).querySelectorAll(".task .default-gap");

for (k=0; k<defaults.length; k++)
Array.from(defaults[k].querySelectorAll(".text-unit")).forEach(x => {
    if (x.innerText == example.split(",")[k]) {
        x.classList.add("strikethrough")
    } else if (example.split(",")[k] == "") {
        defaults[k].querySelector(".tick").classList.add("ticked")
    }
})

 } else if (type == "reading-half-sentences") {
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

    if (type == "uoe-error-correction") {
        Array.from(textUnits).forEach(x => x.addEventListener("click", function() { markTextUnit(x,x.parentElement)}))
        Array.from(ticks).forEach(x => x.addEventListener("click", function() { unMarkAll(x,x.parentElement)}))
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
    document.getElementById(taskId).getElementsByClassName("report-button")[0].addEventListener("click", function() { showReportModal(x.taskId) })
}

function submitReport() {
    form = document.getElementById("feedback-form");

task = document.getElementById("form-task").innerHTML;

problem = document.getElementById("form-problem").value;

suggestions = document.getElementById("form-suggestions").value;

if (task != "" && problem != "" && suggestions != "") {

    document.getElementById("form-error").style.display = "none";

fetch("https://docs.google.com/forms/d/e/1FAIpQLSc1czG7t66kGNB1I_Q3RWhN1aGq6YeuWUtxhVabWqkrE3dFvQ/formResponse?usp=pp_url&entry.874135683=" + encodeURIComponent(task) + "&entry.1089027598=" + encodeURIComponent(problem) + "&entry.271003357=" + encodeURIComponent(suggestions))

document.getElementById("form-button").disabled = true;
document.getElementById("form-button").innerHTML = "Elküldve";

} else {
    document.getElementById("form-error").style.display = "block";
}
}

    function showReportModal(taskId) {
reportFormData = [["form-task","Melyik feladatot érinti a hiba?"],["form-problem","Mi a probléma?"],["form-suggestions","Milyen javaslataid vannak még?"]]

        form = document.createElement("FORM");
        form.id = "feedback-form";
        h2 = document.createElement("H2");
        h2.innerHTML = "Visszajelzési űrlap*";
        form.appendChild(h2)

error = document.createElement("P");
error.id = "form-error"
error.innerHTML = "Töltse ki az összes mezőt!";
error.style.display = "none";
error.style.color = "red";

form.appendChild(error)
for (i=0;i<reportFormData.length;i++) {
label = document.createElement("LABEL");
label.for = reportFormData[i][0];
label.innerHTML = reportFormData[i][1];
form.appendChild(label)
if (i==0) {
div = document.createElement("DIV");
div.innerHTML = taskId;
div.id = "form-task";
form.appendChild(div)
} else {
    input = document.createElement("INPUT");
    input.type = "text";
    input.id = reportFormData[i][0];
    form.appendChild(input)
}
        }

p = document.createElement("P");
p.innerHTML = '*A jelen űrlap anonim, személyes adatokat nem kell megadnia.<br> Az űrlap a <a href="https://policies.google.com/" target="_blank">Google Űrlapok adatvédelmi irányelvei</a> szerint működik.';
p.style.fontSize = "x-small";

form.appendChild(p)

button = document.createElement("BUTTON");
button.id = "form-button";
button.innerHTML = "Küldés";

button.addEventListener("click",submitReport)

document.querySelector("#score-modal p").innerHTML = ""
document.querySelector("#score-modal p").appendChild(form)
document.querySelector("#score-modal p").appendChild(button)

document.querySelector("#score-modal").parentElement.style.display = "flex";

    }


function unMarkAll(tick,line) {
    textUnits = line.getElementsByClassName("text-unit")
 /* cross = line.getElementsByClassName("cross")[0] */

if (!tick.classList.contains("ticked")) {
    Array.from(textUnits).forEach(x => {
        x.classList.remove("strikethrough");
        x.classList.add("unmarked")
    })

    tick.classList.add("ticked")
    /* cross.classList.remove("crossed") */
} else {
    tick.classList.remove("ticked")
}
}
    function markTextUnit(textUnit,line) {

    textUnits = line.getElementsByClassName("text-unit")
 /* cross = line.getElementsByClassName("cross")[0] */
    tick = line.getElementsByClassName("tick")[0]

if (textUnit.classList.contains("strikethrough")) {
    textUnit.classList.remove("strikethrough")
 /* cross.classList.remove("crossed") */
    tick.classList.add("ticked")
} else {
    textUnit.classList.add("strikethrough")
 /* cross.classList.add("crossed") */
    tick.classList.remove("ticked")
}

Array.from(textUnits).forEach(x => { 
    x.classList.remove("unmarked")
    if (x != textUnit) { 
        x.classList.remove("strikethrough")
    }
})

    }