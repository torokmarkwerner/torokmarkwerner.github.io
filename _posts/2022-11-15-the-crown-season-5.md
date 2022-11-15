---
layout: post
title: The Way Forward... Ahead
published: true
tags: the-crown movies
image: the-crown.jpg
---
There is nothing new in the palpable tension between the portrayal of Englishmen in coursebooks (such as the English File and Solutions) and the reality of Britain. The tea-sipping, ever so polite Englishmen are what's left from the long-forgotten (?) Empire, and such colonial discourses are still all around us teachers and students of ESL.

Nevertheless, the demise of Elisabeth II placed ESL teachers on the horns of a dilemma. <span class="highlighted-text">May we address the controversies surrounding the Royals, or go on teaching what we were taught to?</span>

The way I see it, <i>The Crown</i> is not only an one-of-a-kind historical drama series with elaborate stage design, but also, a product of imaginative speculation, sheding light on stories that have been either kept secret, or blurred by the nonstop media attention that the royal family suffered since the past century.

<p><img src="/assets/the-crown.jpg"></p>

<p><i>A crown. Not St Edward's, but a regular old crown.</i></p>

<hr>

The reason I am discussing all this is that there is a scene in the new season of <i>The Crown</i> that I was unable to wrap my head around. The scene revolves around a meeting in Edinburgh, involving the senior members of the royal family and a bunch of lords. The meeting was initiated by the Lord Chamberlain that time, David Ogilvy, and was opened by the late Prince Philip, His Royal Highness.

<div style="margin-left:2em">

<p><b>LORD CHAMBERLAIN</b>: And so, in consultation with Her Majesty the Queen and His Royal Highness the Duke of Edinburgh, we've decided to set up an informal council of war. A task force to safeguard the monarchy's survival in a rapidly changing world. And, since the idea is to find new directions for a way forward...</p>

<p><b>HIS ROYAL HIGHNESS</b>: Ahead.</p>

<p><b>LORD CHAMBERLAIN</b>: Sir?</p>

<p><b>HIS ROYAL HIGHNESS</b>: Ahead, David.</p>

<p><b>LORD CHAMBERLAIN</b>: Way ahead... we would call it the Way Ahead Group.</p>

</div>

<span class="highlighted-text">Why does Prince Philip correct the Lord Chamberlain there?</span>

## 1. Semantics: little difference
Let's just first address the white elephant in here: just another metaphor, <span style="font-variant-caps: all-petite-caps;">progress is forward motion along a path</span>.

According to Cambridge  Dictionary, <a href="https://dictionary.cambridge.org/dictionary/english/forward" target="_blank"><i>forward</i></a> and <a href="https://dictionary.cambridge.org/dictionary/english/ahead" target="_blank"><i>ahead</i></a> both mean in or into the future, and, by extension, are used in expressions related to progress, development, or achievement (cf. *a step forward*, *get ahead*, [way] *ahead of sy/sg*).

The use of the expressions <i>the way ahead</i> and <i>the way ahead</i>, on the other hand, is a whole different issue. Clearly, Prince Philip is strongly opposed to <i>forward</i> here, and truly, he is not <i>forward</i>-thinking at all. Yes, pun intended. 

Here, <i>ahead</i> draws the focus onto the way <i>so far</i>, in contrast to <i>forward</i> focusing on the way <i>still to go</i>. After all, His Royal Highness might just want to express his dissatisfaction with the way the Royals are treated those days, in spite of their achievements so far.

<p style="font-size:80%">No spoiler: they were treated badly. No spoiler: they deserved most of it.</p>

## 2. Pragmatics: he an old grammar nazi
Given that His Royal Highness in Season 5 tends to remind the viewers of a doddery old man, it wouldn't surprise us to see him interrupting, correcting people all the time, telling them how to behave, speak, and so on. Were that the case, his interrupting would be, after all, just another symptome of the problem being discussed in the meeting.

Eventually, it mirrors the purist attitude that has appeared in then Prince Charles's speech about the English language devolving in a worrying degree. Make no mistake: purist is just a fancy word for what we call a grammar nazi in everyday contexts. And may I go out on a limb to say <span class="highlighted-text">a grammar nazi is to language as a royalist is to society?</span>

<p><img src="/assets/charles-meme.jpg"></p>

<p>The <i>Queen Victoria Syndrome.</i></p>

<hr>

What do you make of it? Vote below.

<style>
#vote-box div {
  width:100%;
  border: 1pt black solid;
  margin: 0.5em;
  padding: 0.5em
}
</style>

<div id="vote-box">
<div>he is old and senile</div>
<div>he is a grammar nazi</div>
<div>he implies that they're already on the way forward</div>
</div>

<script>
voteBox = document.getElementById("vote-box");

votesSoFar = 0;

dataTable = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmAenGaAXRN67aTVPZ_0M9jJ-diAkpyZMWVvHfKGHMz3sGFnf4sFBphOhLH4BBhn-UX_Q0R99Wtz2k/pub?gid=0&single=true&output=csv"
  xhr=new XMLHttpRequest();
  xhr.open("GET", dataTable, false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            if(xhr.status === 200 || xhr.status == 0) {
               	data = xhr.responseText.split(/\n/);
						}
        }
    }
    xhr.send();

for (i=1;i<data.length;i++) {
option = data[i].split(",")[0];
voteNum = Number(data[i].split(",")[1]);
votesSoFar += voteNum
Array.from(voteBox.children).find(element => element.innerHTML === option).vote = voteNum
}


function sendPlusOne() {
      xhr = new XMLHttpRequest();
      dataTable = "https://script.google.com/macros/s/AKfycbxnnDxKx2AWA9lnK4paphOPhBeSQMI_9w48ZpfuSBrvgU6C5e_Jdffk99-PE92bOwRGyQ/exec"
      xhr.open('POST', dataTable, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send('name=' + encodeURI(this.innerHTML) + '&path=' + location.pathname);
       // alert('name=' + encodeURI(this.innerHTML) + '&path=' + location.pathname);

      this.removeEventListener("click",sendPlusOne)
       // alert(this.vote)
      this.style.background = "linear-gradient(to right, red 0%, red " + (this.vote/votesSoFar*100) + "%, transparent " + (this.vote/votesSoFar*100) + "%, transparent 100%)"
      }

for (u=0; u<voteBox.children.length; u++) {
voteBox.children[u].addEventListener("click",sendPlusOne)
}
</script>