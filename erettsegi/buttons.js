function checkAnswers(tid) {
    task = jsonData.find(task => task.taskId == tid)

    type = task.type;
    solutions = JSON.parse(task.solutions);

    if (type == "reading-matching") {
        taskGaps = document.getElementById(tid).querySelectorAll(".task > div > .gap")
    } else if (type == "reading-true-or-false") {
        taskGaps = document.getElementById(tid).querySelectorAll(".radio-container:not(.default)")
    } else /*if (type == "uoe-word-transformation" || type == "uoe-closed-gap-filling" || type == "uoe-free-gap-filling" || type == "reading-dialogue" || type == "reading-text") */ {
        taskGaps = document.getElementById(tid).querySelectorAll(".task .gap")
    }

    /*taskGaps are: GAPS if it's a gap-filling task, RADIO-CONTAINERS if it's a true-or-false task, and GAPS inside a div tag if it's a matching task.*/

    for (i = 0; i < taskGaps.length; i++) {

        if (type == "uoe-word-transformation" || type == "uoe-free-gap-filling" || type == "reading-free-gap-filling") {
            taskGaps[i].classList.remove("incorrect");

            if (!(taskGaps[i].disabled) && taskGaps[i].value.toLowerCase() != "" && (taskGaps[i].value.toLowerCase() == solutions[i] || solutions[i].includes(taskGaps[i].value.toLowerCase()) == true)) {
                taskGaps[i].classList.add("correct", "gap-disabled")
                taskGaps[i].classList.remove("gap")
                taskGaps[i].disabled = true
                score[tid]["current"]++;
            } else if (!(taskGaps[i].disabled)) {
                taskGaps[i].classList.add("incorrect")
            }

        } else if (type == "uoe-closed-gap-filling" || type == "reading-dialogue" || type == "reading-headings" || type == "reading-text" || type == "reading-matching") {
            taskGaps[i].classList.remove("incorrect");
            if (!(taskGaps[i].classList.contains("correct")) && taskGaps[i].id.replace((tid + "-"), "") == solutions[i] && !(taskGaps[i].classList.contains("gap-disabled"))) {
                taskGaps[i].classList.add("gap-disabled", "correct");
                taskGaps[i].classList.remove("gap");
                taskGaps[i].replaceWith(taskGaps[i].cloneNode(true));
                score[tid]["current"]++;
            } else {
                taskGaps[i].classList.add("incorrect")
            }
        } else if (type == "uoe-multiple-choice") {
            if (taskGaps[i].value == solutions[i] && !taskGaps[i].classList.contains("gap-disabled")) {
                taskGaps[i].classList.remove("incorrect")
                taskGaps[i].classList.add("correct")
                if (taskGaps[i].disabled == false) {
                    score[tid]["current"]++
                }
                taskGaps[i].disabled = true;
            } else if (!taskGaps[i].classList.contains("gap-disabled")) {
                taskGaps[i].classList.add("incorrect")
            }
        } else {
            /*TRUE-OR-FALSE*/

            radio = taskGaps[i].querySelector(":checked");

            if (radio != null) {

                taskGaps[i].querySelectorAll('label > [type="radio"]').forEach((element) => { element.nextElementSibling.classList.remove("incorrect") })

                if (trueOrFalse[radio.nextElementSibling.innerHTML] == solutions[i] && !(radio.disabled)) {
                    taskGaps[i].querySelectorAll('label > [type="radio"]').forEach((element) => { element.disabled = true; });
                    radio.nextElementSibling.classList.add("correct");
                    radio.checked = false;
                    score[tid]["current"]++
                } else if (!(radio.disabled)) {
                    radio.nextElementSibling.classList.add("incorrect")
                    radio.checked = false
                }
            }

        }
    }
    document.querySelector("#score-modal").parentElement.style.display = "flex";

    /*SCORE TABLE*/

    div = "";
    maxPart = 0;
    currentPart = 0;
    for (b = 0; b < Object.keys(score).length; b++) {
        div += ("<p>Task " + (b + 1) + ": " + score[Object.keys(score)[b]]["current"] + "/" + score[Object.keys(score)[b]]["max"] + " (" + Math.round(score[Object.keys(score)[b]]["current"] / score[Object.keys(score)[b]]["max"] * 100) + "%" + ")</p>");
        currentPart += score[Object.keys(score)[b]]["current"]
        maxPart += score[Object.keys(score)[b]]["max"]
    }
    div += ("<p><b>" + currentPart + "/" + maxPart + " (" + Math.round(currentPart / maxPart * 100) + "%" + ")</b></p>")


    document.querySelector("#score-modal p").innerHTML = div
}

function showAnswers(tid) {

    task = jsonData.find(task => task.taskId == tid)

    type = task.type;
    solutions = JSON.parse(task.solutions);

    if (type == "reading-matching") {
        taskGaps = document.getElementById(tid).querySelectorAll(".task > div > .gap")
    } else if (type == "reading-true-or-false") {
        taskGaps = document.getElementById(tid).querySelectorAll(".radio-container:not(.default)")
    } else /*if (type == "uoe-word-transformation" || type == "uoe-closed-gap-filling" || type == "uoe-free-gap-filling" || type == "reading-dialogue" || type == "reading-text") */ {
        taskGaps = document.getElementById(tid).querySelectorAll(".task .gap")
    }

    wordListGaps = wordListGapsAll[tid]
    /*taskGaps are: GAPS if it's a gap-filling task, RADIO-CONTAINERS if it's a true-or-false task, and GAPS inside a div tag if it's a matching task.*/


    for (i = 0; i < taskGaps.length; i++) {
        if (type == "uoe-word-transformation" || type == "uoe-free-gap-filling" || type == "reading-free-gap-filling") {
            taskGaps[i].value = solutions[i].toString().replaceAll(",", " / ");
            taskGaps[i].disabled = true;
            taskGaps[i].classList.add("gap-disabled");
            taskGaps[i].classList.remove("gap", "incorrect");
            taskGaps[i].style.width = taskGaps[i].value.length + "ch";
            taskGaps[i].replaceWith(taskGaps[i].cloneNode(true));

        } else if (type == "uoe-closed-gap-filling" || type == "reading-dialogue" || type == "reading-headings" || type == "reading-text" || type == "reading-matching") {
            taskGaps[i].innerHTML = Array.from(wordListGaps).find(x => x.id == (tid + "-" + solutions[i])).innerHTML;
            taskGaps[i].classList.add("gap-disabled");
            taskGaps[i].classList.remove("gap", "incorrect");
            taskGaps[i].replaceWith(taskGaps[i].cloneNode(true));
        } else if (type == "uoe-multiple-choice") {
            taskGaps[i].value = solutions[i];
            taskGaps[i].classList.remove("incorrect", "correct")
            taskGaps[i].classList.add("gap-disabled")
            taskGaps[i].querySelectorAll(":not([value='" + solutions[i] + "'])").forEach(x => x.disabled = true)
        } else {
            /*TRUE-OR-FALSE*/
            for (k = 0; k < taskGaps[i].querySelectorAll('label > [type="radio"]').length; k++) {
                radio = taskGaps[i].querySelectorAll('label > [type="radio"]')[k];
                radio.nextElementSibling.classList.remove("incorrect", "correct");
                radio.disabled = true
                if (radio.nextElementSibling.innerHTML != Object.keys(trueOrFalse).find(key => trueOrFalse[key] === solutions[i])) {
                    radio.checked = false;
                } else {
                    radio.checked = true;
                }
            }

        }
    }
}