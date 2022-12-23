---
layout: project
title: "Hangman"
permalink: /projects/hangman
complete: "100%"
progressColor: "orange"
progressTextColor: "black"
started: "February 2021"
scope: "ESL, Vocabulary, Oxford 3000"
---
With its variations played all around the world, hangman is a widely known letter-guessing game.
Teachers of ESL often apply it in their classroom to revise vocabulary and improve general spelling skills (eg. animals, professions etc.).

The game is very simple.
<ol>
<li>One of the players thinks of a word and draws as many dashes (–) on the board as many letters in the word (indicating word boundaries if necessary).</li>
<li>The other players take guesses on the letters. If they're right, the player reveals the position(s) of the given letter. If they're wrong, the player writes the letter separately from the word, and starts drawing a hanging tree by adding one additional element to it.</li>
<li>If the drawing is complete, the guessers lose.</li>
<li>The guesser may, at any point of the game, guess the word (without having to guess all the letters).</li>
</ol>

In most variations, the guessers have appr. 10-14 guesses, and the schematic drawing shows a hanging tree and ragdoll hanged on it. 
Violent as it may seem, students love the game without the slightest concern over the brutality of the image.

My motivation in creating an online hangman game was that I'm the worst player of the game. 
Although I'm as good at spelling as they come, I have troubles with counting the dashes, revealing *all* positions of the word; in a word, I'm incompatible with Hangman. 
That is why it was hugely important to me to create an algorhythm that, without fail, helps me in that. 

Luckily enough, I came across <a href="https://github.com/samuraitruong/oxford-3000" target="_blank">a Github repository</a> containing every word from the Oxford 3000 list. <a href="https://www.oxfordlearnersdictionaries.com/wordlist/american_english/oxford3000" target="_blank">The Oxford 3000</a> consists of the core vocabulary of English, equivalent to the vocabulary of an A2 level ESL student.
Even with the introduction of slight changes (excluding abbreviations and capitalised words), there are 3804 words on the list the game is based on.

Compared to the word list, establishing a fair score system was way more challenging.

<style>
body {
  font-family:"Calibri", "Arial", sans-serif;;
}
#hangman-container {
position:relative;
left:0;
top:0;
display: flex;
max-height:80vh;
width:100%;
flex-wrap: wrap;
}
</style>
<style>
#feedback {
  padding:0.5em;
}
#diagram-container {
  aspect-ratio: 1/1;
  width:50%;
}
#sprite {
  --row: 0;
  --column: 0;
  background: url("https://drive.google.com/uc?export=view&id=1gmp3grswXU-KFuIllq1yOBpCp2gO1r8s") no-repeat calc(20%*var(--column)) calc(100%*var(--row));
/* YOU HAVE TO CHANGE THESE VALUES A LINE ABOVE */
  background-size: 600%;
  height:100%;
  width:100%;
}
#dictionary-button, #toplist-button  {
  color:white;
  border:none;
  padding:1em;
  margin:0.5em;
  font-size:14pt;
  cursor:pointer;
  font-weight:bold;
}
#dictionary-button  {
  background-color:#3F48CC;
}
#toplist-button {
  background-color:#25a83d;
}
#dictionary-button:hover {
  background-color:#1A73E8;
}
#toplist-button:hover {
  background-color:#24bf41;
}
#keyboard div {
  width:50%;
  aspect-ratio: 1/1;
  vertical-align: middle;
}
#keyboard input, #keyboard #enterButton {
  color:white;
  background-color:black;
  margin-bottom: 0.5em;
  cursor: pointer;
  border:none;
  padding:0.5em;
  border-radius: 5px;
}
#keyboard input:hover, #keyboard #enterButton:hover {
  opacity: 0.9;
}
#keyboard #enterButton {
  text-align: center;
  display: inline-block;
  position: relative;
  border-radius: 5px;
  cursor: pointer;
}
</style>
<div id="hangman-container">

<button style="position:absolute;top:0" onlick="openFullscreen(this.parent)">
FS
</button>

<!-- TITLE, INSTRUCTION, NAME, SCORE, DASHES -->
<div style="text-align:center;font-variant-caps:all-petite-caps;background-color:;flex: 0 0 100%;max-height:50%">
<div style="padding:0.5em 0 0 0;font-size:300%;font-variant:normal;text-transform:">Hangman</div>

<div id="enterName">
<label for="hname">First, enter your name: </label><input type="text" id="hname"></div>

<div style="padding:0.5em;">Guess the word(s) to save the ragdoll.</div>
<table style="margin-left: auto;margin-right: auto;">
<td id="hangmanName">Name: -</td><td id="hangmanScore">Score: -</td>
</table>
<span style="font-size:" id="solution"></span>
<div id="guessed" style="padding-bottom:0.5em">&nbsp;</div>
<button id="dictionary-button" style="display:none;text-align:center">
LOOK IT UP
</button> <button id="toplist-button" style="display:none;text-align:center">
HANGMAN TOP 100
</button>
<div style="font-size:18pt;display:none" id="feedback">
</div>
</div>

<!-- DIAGRAM -->
<div id="diagram-container" style="background-color:;flex: 0 0 50%;">
  
<div id="sprite" style="--row:0;--column:0"></div>

  
</div>

<!-- KEYBOARD -->
<div style="text-align:center;display:flex;align-items:center;justify-content:center;background-color:;flex: 0 0 50%;">
  
  <div id="keyboard">
<input type="button" value="Q">
<input type="button" value="W">
<input type="button" value="E">
<input type="button" value="R">
<input type="button" value="T">
<input type="button" value="Y"><br>
<input type="button" value="U">
<input type="button" value="I">
<input type="button" value="O">
<input type="button" value="P">
<input type="button" value="A"><br>
<input type="button" value="S">
<input type="button" value="D">
<input type="button" value="F">
<input type="button" value="G">
<input type="button" value="H">
<input type="button" value="J"><br>
<input type="button" value="K">
<input type="button" value="L">
<input type="button" value="Z">
<input type="button" value="X">
<input type="button" value="C"><br>
<input type="button" value="V">
<input type="button" value="B">
<input type="button" value="N">
<input type="button" value="M">
<button id="enterButton">ENTER</button>
</div>
  
</div>

</div>

<script>

function openFullscreen(x) {
  if (x.requestFullscreen) {
    x.requestFullscreen();
  } else if (x.webkitRequestFullscreen) { /* Safari */
    x.webkitRequestFullscreen();
  } else if (x.msRequestFullscreen) { /* IE11 */
    x.msRequestFullscreen();
  }
}

//localStorage.removeItem("hangmanName")
//localStorage.removeItem("hangmanScore")
inputs = document.getElementById("keyboard").getElementsByTagName("input");
for (i=0; i<inputs.length; i++) {
inputs[i].addEventListener("click",
function() {
//alert(this.value);
event = new KeyboardEvent("keydown", {'key':this.value.toLowerCase()});
document.dispatchEvent(event);
});
}

document.getElementById("enterButton").addEventListener("click",function() {
event = new KeyboardEvent("keydown", {'keyCode':13});
document.dispatchEvent(event);
});

function validate(name) {
dataTable = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSv5ei2Z50PY8g6JHN-6El5tN3jFpCsSSkKp94U16-bdJChqelUd5XRYuiwuemU4nmvhCvSh-g0EaxQ/pub?gid=0&single=true&output=csv"
  xhr=new XMLHttpRequest();
  xhr.open("GET", dataTable, false);
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4)
        {
            if(xhr.status === 200 || xhr.status == 0)
            {
data = xhr.responseText.split(/\n/);

}
        }
    }
    xhr.send();

players = []
names = []
for (i=0;i<data.length;i++) {
person = {}
dname = data[i].split(",")[0];
if (!names.includes(dname)) {
names.push(dname);
dscore = data[i].split(",")[1];
person.name = dname;
person.score = dscore;
players.push(person)
}
}
  
  //alert(players[0].name)
  if(names.includes(document.getElementById("hname").value)) {
  alert("Name's taken. Choose something else.")
  document.getElementById("hname").value = ""
  } else {
  dead = false;
  localStorage.setItem("hangmanName",name);
   localStorage.setItem("hangmanScore",0);
  score = 0;
  document.getElementById("enterName").remove();
  document.getElementById("hangmanName").innerHTML = name;
document.getElementById("hangmanScore").innerHTML = score;
  }
  
  
  
}

function scoreBoard() {
dataTable = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSv5ei2Z50PY8g6JHN-6El5tN3jFpCsSSkKp94U16-bdJChqelUd5XRYuiwuemU4nmvhCvSh-g0EaxQ/pub?gid=0&single=true&output=csv"
  xhr=new XMLHttpRequest();
  xhr.open("GET", dataTable, false);
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4)
        {
            if(xhr.status === 200 || xhr.status == 0)
            {
data = xhr.responseText.split(/\n/);

}
        }
    }
    xhr.send();

players = []
names = []
for (i=data.length-1;i>1;i--) {
person = {}
dname = data[i].split(",")[0];
if (!names.includes(dname)) {
names.push(dname);
dscore = data[i].split(",")[1];
person.dname = dname;
person.score = dscore;
players.push(person)
}
}

name = localStorage.getItem("hangmanName");
score = localStorage.getItem("hangmanScore");

  
//alert(personalRecords[personalRecords.length-1].score)
if (localStorage.getItem("hangmanName") != null) {
player = players.filter(element => element.name === name);
document.getElementById("hangmanName").innerHTML = name;
document.getElementById("hangmanScore").innerHTML = Number(localStorage.getItem("hangmanScore")).toFixed(2);

}
}

if (localStorage.getItem("hangmanName") != null) {
scoreBoard();
}

url = "https://raw.githubusercontent.com/torokmarkwerner/wordle-unlimited/main/oxford_3000_updated_for_hangman.txt"
xhr = new XMLHttpRequest();
xhr.open("GET", url, false);
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4)
        {
            if(xhr.status === 200 || xhr.status == 0)
            {
words = xhr.responseText.split("\n");
}
        }
    }
    xhr.send();
    
solution = words[Math.floor(Math.random() * words.length+1)].trim()
//alert(solution)

abc = "qwertzuiopasdfghjklyxcvbnm"
//solution = "castle"
lettersInIt = [];
notInIt = []
dead = true;

//If localStorage contains a name, sets to false, otherwise you should give a name.

if (localStorage.getItem("hangmanName") != null) {
dead = false;
document.getElementById("enterName").remove()
} else {
document.getElementById("hname").addEventListener("keydown",
function(event) {
if(event.keyCode == 13) {
validate(document.getElementById("hname").value);
}
});
}

document.getElementById("solution").innerHTML = solution.replace(/ /g,'\xa0\xa0\xa0').replace(/[a-z]/g," _ ");


document.addEventListener("keydown",
function(event) {

if (abc.indexOf(event.key.toLowerCase()) > -1 && dead==false && !document.getElementById("enterName")) {
//alert(abc.indexOf(event.key.toLowerCase()) > -1);

if (solution.indexOf(event.key.toLowerCase()) > -1) {
//alert(solution.indexOf(event.key.toLowerCase()) > -1);
//alert(lettersInIt)
lettersInIt.push(event.key.toLowerCase());
wordSoFar = "";
for(i=0; i<solution.length; i++) {
if(lettersInIt.includes(solution[i])) {
wordSoFar += " <u>" + solution[i] + "</u> ";
} else if (solution[i] != " ") {
wordSoFar += " _ "
} else {
wordSoFar += '\xa0\xa0\xa0'
}

}
document.getElementById("solution").innerHTML = wordSoFar;
//alert(wordSoFar.replaceAll(/<.*?\>/g,"").replaceAll('\xa0\xa0\xa0',"*").replaceAll(" ","").replaceAll("*"," "))
if (wordSoFar.replaceAll(/<.*?\>/g,"").replaceAll('\xa0\xa0\xa0',"*").replaceAll(" ","").replaceAll("*"," ") == solution) {
lettersInIt = [];
document.getElementById("solution").innerHTML = wordSoFar
document.getElementById("feedback").innerHTML = "<div style='padding-bottom:0.5em;'>CONGRATS, YOU <u>W</u> <u>O</u> <u>N</u>.</div>PRESS ENTER TO PLAY AGAIN."
document.getElementById("feedback").style.display = "block";
dead = true;

xhr = new XMLHttpRequest();
dataTable = "https://script.google.com/macros/s/AKfycbyYc-8x4hLy4TM5ASnU2sw1OfkHGe4PnrlmkvOLBvEL9dEHomicOatwWiuxJXxUuY4/exec"
xhr.open('POST', dataTable, true);
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

bonuses = {1:1.7,2:1.6,3:1.5,4:1.4,5:1.3,6:1.2}

bonus = bonuses[solution.length];
if (bonus == undefined) {
bonus = 1;
}
//alert(bonus);


score = (Number(score)+(11-notInIt.length)*bonus).toFixed(2)
document.getElementById("hangmanScore").innerHTML = parseFloat(score);
xhr.send('name=' + localStorage.getItem("hangmanName") + '&score=' + score);
localStorage.setItem("hangmanScore",score);
notInIt = [];

document.getElementById("hangmanScore").innerHTML = score;


document.getElementById("dictionary-button").style.display = "inline-block";
document.getElementById("toplist-button").style.display = "inline-block";
}

} else if(!(notInIt.includes(event.key.toLowerCase()))) {
notInIt.push(event.key.toLowerCase())
document.getElementById("guessed").innerHTML = notInIt.join(", ");
x = +window.getComputedStyle(document.getElementById("sprite")).getPropertyValue("--column");
y = +window.getComputedStyle(document.getElementById("sprite")).getPropertyValue("--row");
//alert(y);
document.getElementById("sprite").style.setProperty("--column",x+1);
if (y==1 && x==4) {
lettersInIt = [];
notInIt = [];
sol = "";
for(i=0; i<solution.length; i++) {
if (solution[i] != " ") {
sol += " <u>" + solution[i] + "</u> ";
} else {
sol += '\xa0\xa0\xa0';
}
}
document.getElementById("solution").innerHTML = sol;
document.getElementById("feedback").innerHTML = "<div style='padding-bottom:0.5em;'>OOPS, IT'S <u>D</u> <u>E</u> <u>A</u> <u>D</u>.</div>PRESS ENTER TO TRY AGAIN."
document.getElementById("feedback").style.display = "block";
dead = true
document.getElementById("dictionary-button").style.display = "inline-block";
document.getElementById("toplist-button").style.display = "inline-block";
} else if (x==5) {
document.getElementById("sprite").style.setProperty("--column",0);
document.getElementById("sprite").style.setProperty("--row",1);
}

}


} else if (event.keyCode == 13 && dead==true && !document.getElementById("enterName")) {
dead = false;
solution = words[Math.floor(Math.random() * words.length+1)].trim();
document.getElementById("solution").innerHTML = solution.replace(/ /g,'\xa0\xa0\xa0').replace(/[a-z]/g," _ ");
document.getElementById("feedback").innerHTML = "";
document.getElementById("guessed").innerHTML = "&nbsp;";
document.getElementById("sprite").style.setProperty("--row",0);
document.getElementById("sprite").style.setProperty("--column",0);
document.getElementById("dictionary-button").style.display = "none";
document.getElementById("toplist-button").style.display = "none";
document.getElementById("feedback").style.display = "none";
//alert(solution)
}

});

document.getElementById("dictionary-button").addEventListener("click",function(){window.open("https://www.oxfordlearnersdictionaries.com/definition/english/" + solution.replaceAll(" ","-"),"","width=500,height=500")});
document.getElementById("toplist-button").addEventListener("click",function(){window.open("https://nemszamarsag.blogspot.com/p/hangman-top-100.html")});
</script>