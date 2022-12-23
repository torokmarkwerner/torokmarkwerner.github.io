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
  aspect-ratio: 1 / 1;
  width:50%;
}
#sprite {
  --row: 0;
  --column: 3;
  background: url("https://drive.google.com/uc?export=view&id=1gmp3grswXU-KFuIllq1yOBpCp2gO1r8s") no-repeat calc(20%*var(--column)) calc(100%*var(--row));
/* YOU HAVE TO CHANGE THESE VALUES A LINE ABOVE */
  background-size: 600%;
  height:100%;
  width:100%;
}
#dictionary-button {
  background-color:#3F48CC;
  color:white;
  border:none;
  padding:1em;
  margin:0.5em;
  font-size:14pt;
  cursor:pointer;
  font-family: Georgia, Helvetica, sans-serif;
  font-weight:bold;
}
#dictionary-button:hover {
  background-color:#1A73E8;
}
#toplist-button {
  background-color:#25a83d;
  color:white;
  border:none;
  padding:1em;
  margin:0.5em;
  font-size:14pt;
  cursor:pointer;
  font-family: Georgia, Helvetica, sans-serif;
  font-weight:bold;
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
  font-size:;
  color:white;
  background-color:black;
  width: 2vw;
  height: 2vw;
  margin-bottom: 0.5em;
  cursor: pointer;
  border:none;
  border-radius: 5px;
  font-size:1vw;
}
#keyboard input:hover, #keyboard #enterButton:hover {
  opacity: 0.9;
}
#keyboard #enterButton {
  width: 5em;
  text-align: center;
  display: inline-block;
  position: relative;
  border-radius: 5px;
  cursor: pointer;
}
</style>
<div id="hangman-container">

<!-- TITLE, INSTRUCTION, NAME, SCORE, DASHES -->
<div style="text-align:center;font-variant-caps:all-petite-caps;background-color:;flex: 0 0 100%;max-height:50%">
<div style="padding:0.5em 0 0 0;font-size:300%;font-variant:normal;text-transform:">Hangman</div>
<div style="padding:0.5em;">Guess the word(s) to save the ragdoll.</div>
<table style="margin-left: auto;margin-right: auto;">
<td id="hangmanName">Name: -</td><td id="hangmanScore">Score: -</td>
</table>
<span style="font-size:" id="solution">_ _ _ _   _ _</span>
<div id="guessed" style="padding-bottom:0.5em">&nbsp;</div>
</div>

<!-- DIAGRAM -->
<div id="diagram-container" style="background-color:;flex: 0 0 50%;">
  
<div id="sprite"></div>

  
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