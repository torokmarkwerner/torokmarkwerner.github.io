function pickAnswer(el, id) {
    selection = document.getElementById(id).querySelector(".word-list > .picked");
    if (selection != null) {
        selection.classList.toggle("picked")
    }
    picked = el
    if (el.id) {
        pickedId = el.id
    }
    el.classList.toggle("picked")
}

function dropAnswer(el, id) {
type = jsonData.find(task => task.taskId == id).type
   
if (picked > "" && picked.classList.contains(id)) {
    isVisibleThen(id)
    if (["reading-text","reading-matching"].includes(type)) {
        el.style.display = "inline";
        el.style.verticalAlign = "baseline";
    }

    el.innerHTML = picked.innerHTML;

    if (pickedId != "") {
        el.id = pickedId;
    }
    picked = "";
    selection = document.getElementById(id).querySelector(".word-list > .picked");
    if (selection != null) {
        selection.outerHTML = "";
    }
}
}

function isVisibleThen(id) {

wordListGaps = document.getElementById(id).querySelectorAll(".word-list .gap")

    for (i = 0; i < wordListGaps.length; i++) {
        if (wordListGaps[i].parentElement && (((wordListGaps[i].offsetTop + wordListGaps[i].offsetHeight) > (wordListGaps[i].parentElement.scrollTop + wordListGaps[i].parentElement.offsetHeight)) || wordListGaps[i].offsetTop < wordListGaps[i].parentElement.scrollTop)) {
            wordListGaps[i].style.opacity = "0"
            wordListGaps[i].style.visibility = "hidden"
        } else {
            wordListGaps[i].style.visibility = "visible"
            wordListGaps[i].style.opacity = "1"
        }
    }
}