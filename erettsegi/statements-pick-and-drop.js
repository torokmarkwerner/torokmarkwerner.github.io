score = 0

trueOrFalse = {"true":"A","false":"B","doesn't say":"C"}

picked = ""
pickedId = ""
function pickAnswer(el) {
selection = document.querySelector("#word-list > .picked");
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
el.style.display = "inline"
}
el.innerHTML = picked
if (pickedId != "") {
el.id = pickedId
}
picked = ""
selection = document.querySelector("#word-list > .picked");
if(selection!=null) {
selection.outerHTML = ""
}
}

if (type == "reading-matching") {
taskGaps = document.querySelectorAll("#task > div > .gap")
} else if (type == "reading-true-or-false") {
taskGaps = document.querySelectorAll(".radio-container:not(.default)")
} else /*if (type == "uoe-word-transformation" || type == "uoe-closed-gap-filling" || type == "uoe-free-gap-filling" || type == "reading-dialogue" || type == "reading-text") */ {
taskGaps = document.querySelectorAll("#task .gap")
}

wordListGaps = document.querySelectorAll("#word-list .gap")

/*taskGaps are: GAPS if it's a gap-filling task, RADIO-CONTAINERS if it's a true-or-false task, and GAPS inside a div tag if it's a matching task.*/

if (document.getElementById("word-list")) {
for (i=0; i<taskGaps.length; i++) {
taskGaps[i].addEventListener("click",function(){if(this.innerText == ""){dropAnswer(this);}else{
wordList = document.getElementById("word-list"); gap = document.createElement("DIV"); gap.innerHTML = this.innerHTML; gap.classList.add("gap"); gap.addEventListener("click",function(){pickAnswer(this)}); wordList.appendChild(gap); this.innerHTML = ""; if (type == "reading-text") {this.style.display = "inline-block"}
}});
}
}

for (i=0; i<wordListGaps.length; i++) {
wordListGaps[i].addEventListener("click",function(){pickAnswer(this);});
}

/*If there are options (word-list), word-list gaps can be picked and dropped into task gaps. OR if a taskGap has already been filled in, the gap goes back to the word-list.*/

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

isVisibleThen()

if(document.getElementById("word-list")) {
document.getElementById("word-list").addEventListener("scroll",function(){isVisibleThen()
/*alert(wordListGaps[4].offsetTop + " " + " ")*/
})
}