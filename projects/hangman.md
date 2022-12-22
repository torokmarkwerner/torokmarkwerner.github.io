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
That is why it was hugely important to me to create an algorhythm that, without fail, helps me in that. Luckily enough, I came across <a href="https://github.com/samuraitruong/oxford-3000" target="_blank">a Github repository</a> containing every word from the Oxford 3000 list. <a href="https://www.oxfordlearnersdictionaries.com/wordlist/american_english/oxford3000" target="_blank">The Oxford 3000</a> consists of the core vocabulary of English, equivalent to the vocabulary of an A2 level ESL student.
Even with the introduction of slight changes (excluding abbreviations and capitalised words), there are 3804 words on the list the game is based on.

Compared to the word list, establishing a fair score system was way more challenging. 