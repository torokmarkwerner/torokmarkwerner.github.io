score = 0;

trueOrFalse = {"true":"A","false":"B","doesn't say":"C"};

picked = "";
pickedId = "";
function pickAnswer(el) {
    console.log(taskId + " ... " + document.getElementById(taskId).innerHTML)
selection = document.getElementById(taskId).querySelector(".word-list > .picked");
if(selection!=null) {
selection.classList.toggle("picked")
}
picked = el.innerHTML
if (el.id) {
pickedId = el.id
}
el.classList.toggle("picked")
}

function dropAnswer(el) {
isVisibleThen()
if (type == "reading-text") {
el.style.display = "inline";
el.style.verticalAlign = "baseline";
}
el.innerHTML = picked;
if (pickedId != "") {
el.id = pickedId;
}
picked = "";
selection = document.getElementById(taskId).querySelector(".word-list > .picked");
if(selection!=null) {
selection.outerHTML = "";
}
}

function isVisibleThen(){
for (i=0; i<wordListGaps.length; i++) {
    if (wordListGaps[i].parentElement && (((wordListGaps[i].offsetTop + wordListGaps[i].offsetHeight) > (wordListGaps[i].parentElement.scrollTop + wordListGaps[i].parentElement.offsetHeight)) || wordListGaps[i].offsetTop < wordListGaps[i].parentElement.scrollTop)) {
    wordListGaps[i].style.opacity = "0"
    wordListGaps[i].style.visibility = "hidden"
    } else {
    wordListGaps[i].style.visibility = "visible"
    wordListGaps[i].style.opacity = "1"
    }
}
}