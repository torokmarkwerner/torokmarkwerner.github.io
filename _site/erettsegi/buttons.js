function checkAnswers(tid) {
    task = jsonData.find(task => task.taskId == tid)

    type = task.type;
    solutions = JSON.parse(task.solutions);

    if (type == "uoe-error-correction") {
        taskGaps = document.getElementById(tid).querySelectorAll(".task > .uoe-error-correction-line")
    } else if (type == "reading-half-sentences") {
        taskGaps = document.getElementById(tid).querySelectorAll(".task > div > .gap")
    } else if (type == "reading-true-or-false") {
        taskGaps = document.getElementById(tid).querySelectorAll(".radio-container:not(.default)")
    } else /*if (type == "uoe-word-transformation" || type == "uoe-closed-gap-filling" || type == "uoe-free-gap-filling" || type == "reading-dialogue" || type == "reading-text") */ {
        taskGaps = document.getElementById(tid).querySelectorAll(".task .gap")
    }

    /*taskGaps are: GAPS if it's a gap-filling task, RADIO-CONTAINERS if it's a true-or-false task, and GAPS inside a div tag if it's a matching task.*/

    for (i = 0; i < taskGaps.length; i++) {

        if (type == "uoe-error-correction") {
            taskGaps[i].classList.remove("incorrect");
            if (!taskGaps[i].classList.contains("correct") && !taskGaps[i].classList.contains("gap-disabled") && taskGaps[i].querySelector(".strikethrough") && taskGaps[i].querySelector(".strikethrough").innerText == solutions[i]) {
                taskGaps[i].classList.add("correct")
                taskGaps[i].classList.add("gap-disabled")
                Array.from(taskGaps[i].querySelectorAll(".text-unit")).forEach(x => {
                    if (!x.classList.contains("strikethrough")) {
                        x.classList.add("unmarked")
                    }
                    x.replaceWith(x.cloneNode(true));
                })
                taskGaps[i].replaceWith(taskGaps[i].cloneNode(true))
                score[tid]["current"]++
            } else if (!taskGaps[i].classList.contains("correct") && !taskGaps[i].classList.contains("gap-disabled") && taskGaps[i].querySelector(".ticked") && solutions[i] == "") {
                taskGaps[i].classList.add("correct")
                taskGaps[i].classList.add("gap-disabled")
                Array.from(taskGaps[i].querySelectorAll(".text-unit")).forEach(x => {
                    if (!x.classList.contains("strikethrough")) {
                        x.classList.add("unmarked")
                    }
                    x.replaceWith(x.cloneNode(true));
                })
                taskGaps[i].replaceWith(taskGaps[i].cloneNode(true))
                score[tid]["current"]++
            } else if (!taskGaps[i].classList.contains("gap-disabled")) {
                taskGaps[i].classList.add("incorrect")
            }

        } else if (["uoe-word-transformation", "uoe-free-gap-filling", "reading-free-gap-filling", "reading-summary", "uoe-jumbled-up-sentences", "uoe-sentence-transformation"].includes(type)) {
            taskGaps[i].classList.remove("incorrect");

            if (!(taskGaps[i].disabled) && taskGaps[i].value.toLowerCase() != "" && taskGaps[i].value.toLowerCase() == solutions[i] || solutions[i].includes(taskGaps[i].value.toLowerCase())) {
                taskGaps[i].classList.add("correct", "gap-disabled")
                taskGaps[i].disabled = true
                score[tid]["current"]++;
            } else if (!(taskGaps[i].disabled)) {
                taskGaps[i].classList.add("incorrect")
            }

        } else if (["reading-short-answer"].includes(type)) {

            taskGaps[i].classList.remove("incorrect");

            if (!(taskGaps[i].disabled) && taskGaps[i].value.toLowerCase() != "" && solutions[i].includes(taskGaps[i].value.charAt(0).toUpperCase() + taskGaps[i].value.substring(1).replace(/\.$/g, ""))) {
                span = document.createElement("SPAN");
                span.innerHTML = taskGaps[i].value.charAt(0).toUpperCase() + taskGaps[i].value.substring(1).replace(/\.$/g, "") + ".";
                span.classList.add("gap-disabled", "correct");
                taskGaps[i].replaceWith(span);
                score[tid]["current"]++;
            } else if (!(taskGaps[i].disabled)) {
                taskGaps[i].classList.add("incorrect")
            }

        } else if (["uoe-closed-gap-filling", "reading-dialogue", "reading-paragraphs", "reading-headings", "reading-text", "reading-half-sentences"].includes(type)) {
            taskGaps[i].classList.remove("incorrect");
            if (!(taskGaps[i].classList.contains("correct")) && taskGaps[i].id.replace((tid + "-"), "") == solutions[i] && !(taskGaps[i].classList.contains("gap-disabled"))) {
                taskGaps[i].classList.add("gap-disabled", "correct");
                taskGaps[i].replaceWith(taskGaps[i].cloneNode(true));
                score[tid]["current"]++;
            } else {
                taskGaps[i].classList.add("incorrect")
            }
        } else if (["uoe-multiple-choice", "reading-extended-matching", "reading-multiple-choice"].includes(type)) {
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

    if (type == "uoe-error-correction") {
        taskGaps = document.getElementById(tid).querySelectorAll(".task > .uoe-error-correction-line")
    } else if (type == "reading-half-sentences") {
        taskGaps = document.getElementById(tid).querySelectorAll(".task > div > .gap")
    } else if (type == "reading-true-or-false") {
        taskGaps = document.getElementById(tid).querySelectorAll(".radio-container:not(.default)")
    } else /*if (type == "uoe-word-transformation" || type == "uoe-closed-gap-filling" || type == "uoe-free-gap-filling" || type == "reading-dialogue" || type == "reading-text") */ {
        taskGaps = document.getElementById(tid).querySelectorAll(".task .gap")
    }

    wordListGaps = wordListGapsAll[tid]
    /*taskGaps are: GAPS if it's a gap-filling task, RADIO-CONTAINERS if it's a true-or-false task, and GAPS inside a div tag if it's a matching task.*/


    for (i = 0; i < taskGaps.length; i++) {
        if (type == "uoe-error-correction") {
            taskGaps[i].classList.remove("incorrect");
            taskGaps[i].classList.add("gap-disabled");
            taskGaps[i].querySelector(".tick").replaceWith(taskGaps[i].querySelector(".tick").cloneNode(true));
            Array.from(taskGaps[i].querySelectorAll(".text-unit")).forEach(x => {
                x.classList.add("unmarked")
                x.replaceWith(x.cloneNode(true));
            })

            if (solutions[i] == "" && taskGaps[i].querySelector(".ticked") == null) {
                taskGaps[i].querySelector(".tick").classList.add("ticked");
            } else if (solutions[i] != "") {
                taskGaps[i].querySelector(".tick").classList.remove("ticked");
                Array.from(taskGaps[i].querySelectorAll(".text-unit")).forEach(x => {
                    if (x.innerText == solutions[i]) {
                        x.classList.remove("unmarked")
                        x.classList.add("strikethrough")
                        /*  taskGaps[i].querySelector(".cross").classList.add("crossed");*/
                    }
                })
            }

        } else if (["uoe-word-transformation", "uoe-free-gap-filling", "reading-free-gap-filling", "uoe-jumbled-up-sentences"].includes(type)) {
            taskGaps[i].value = solutions[i].toString().replaceAll(",", " / ");
            taskGaps[i].disabled = true;
            taskGaps[i].classList.add("gap-disabled");
            taskGaps[i].classList.remove("gap", "incorrect");
            taskGaps[i].style.width = taskGaps[i].value.length + "ch";
            taskGaps[i].replaceWith(taskGaps[i].cloneNode(true));

        } else if (["uoe-sentence-transformation", "reading-summary"].includes(type)) {
            span = document.createElement("SPAN");
            span.innerHTML = solutions[i].toString().replaceAll(",", " / ");
            span.classList.add("gap-disabled");
            taskGaps[i].replaceWith(span);

        } else if (["reading-short-answer"].includes(type)) {
            span = document.createElement("SPAN");
            span.innerHTML = solutions[i].toString().replaceAll(",", ". / ") + ".";
            span.classList.add("gap-disabled");
            taskGaps[i].replaceWith(span);

        } else if (["uoe-closed-gap-filling", "reading-dialogue", "reading-paragraphs", "reading-headings", "reading-text", "reading-half-sentences"].includes(type)) {
            for (w = 0; w < solutions[i].toString().split(",").length; w++) {

                //WHEN THERE'S MULTIPLE SOLUTIONS

                if (w > 0) {
                    taskGaps[i].innerHTML += " / "
                }

                taskGaps[i].innerHTML += Array.from(wordListGaps).find(x => x.id == (tid + "-" + solutions[i].toString().split(",")[w])).innerHTML;
            }
            taskGaps[i].classList.add("gap-disabled");
            taskGaps[i].classList.remove("gap", "incorrect");
            taskGaps[i].replaceWith(taskGaps[i].cloneNode(true));
        } else if (["uoe-multiple-choice", "reading-extended-matching", "reading-multiple-choice"].includes(type)) {
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