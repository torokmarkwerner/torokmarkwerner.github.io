function checkAnswers() {
    for (i=0; i<taskGaps.length; i++) {
    
    if (type == "uoe-word-transformation" || type == "uoe-free-gap-filling") {
    taskGaps[i].classList.remove("incorrect");
    
    if (!(taskGaps[i].disabled) && taskGaps[i].value.toLowerCase() != "" && (taskGaps[i].value.toLowerCase() == solutions[i] || solutions[i].includes(taskGaps[i].value.toLowerCase()) == true)) {
    taskGaps[i].classList.add("correct","gap-disabled")
    taskGaps[i].classList.remove("gap")
    taskGaps[i].disabled = true
    score++;
    } else if (!(taskGaps[i].disabled)) {
    taskGaps[i].classList.add("incorrect")
    }
    
    } else if (type == "uoe-closed-gap-filling" || type == "reading-dialogue" || type == "reading-text" || type == "reading-matching") {
    taskGaps[i].classList.remove("incorrect");
    if (!(taskGaps[i].classList.contains("correct")) && taskGaps[i].id.replace((taskId + "-"),"") == solutions[i] && !(taskGaps[i].classList.contains("gap-disabled"))) {
    taskGaps[i].classList.add("gap-disabled","correct");
    taskGaps[i].classList.remove("gap");
    taskGaps[i].replaceWith(taskGaps[i].cloneNode(true));
    score++;
    } else {
    taskGaps[i].classList.add("incorrect")
    }
    
    } else {
    /*TRUE-OR-FALSE*/
    taskGaps[i].querySelectorAll('label > [type="radio"]').forEach((element) => {element.nextElementSibling.classList.remove("incorrect")})
    
    radio = taskGaps[i].querySelector(":checked");
    
    if (radio != null) {
    if (trueOrFalse[radio.nextElementSibling.innerHTML] == solutions[i] && !(radio.disabled)) {
    taskGaps[i].querySelectorAll('label > [type="radio"]').forEach((element) => {element.disabled = true;});
    radio.nextElementSibling.classList.add("correct");
    radio.checked = false;
    score++
    } else if (!(radio.disabled)) {
    radio.nextElementSibling.classList.add("incorrect")
    radio.checked = false
    }
    }
    
    }
    }
    document.querySelector("#score-modal").parentElement.style.display = "flex";
    document.querySelector("#score-modal p").innerHTML = score + "/" + taskGaps.length;
    }
    
    function showAnswers(){
    for (i=0; i<taskGaps.length; i++) {
    if (type == "uoe-word-transformation" || type == "uoe-free-gap-filling") {
    taskGaps[i].value = solutions[i].toString().replaceAll(","," / ");
    taskGaps[i].disabled = true;
    taskGaps[i].classList.add("gap-disabled");
    taskGaps[i].classList.remove("gap","incorrect");
    taskGaps[i].style.width = taskGaps[i].value.length + "ch";
    taskGaps[i].replaceWith(taskGaps[i].cloneNode(true));
    
    } else if (type == "uoe-closed-gap-filling" || type == "reading-dialogue" || type == "reading-text" || type == "reading-matching") {
    taskGaps[i].innerHTML = Array.from(wordListGaps).find(x => x.id == (taskId + "-" + solutions[i])).innerHTML;
    taskGaps[i].classList.add("gap-disabled");
    taskGaps[i].classList.remove("gap","incorrect");
    taskGaps[i].replaceWith(taskGaps[i].cloneNode(true));
    
    } else {
    /*TRUE-OR-FALSE*/
    for (k=0; k<taskGaps[i].querySelectorAll('label > [type="radio"]').length; k++) {
    radio = taskGaps[i].querySelectorAll('label > [type="radio"]')[k];
    radio.nextElementSibling.classList.remove("incorrect","correct");
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
    