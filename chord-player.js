chords = {
"C":["C","E","G"],
"C#":["C#","E#","G#"],
"D":["D","F#","A"],
"Eb":["Eb","G","Bb"],
"E":["E","G#","B"],
"F":["F","A","C"],
"F#":["F#","A#","C#"],
"G":["G","B","D"],
"Ab":["Ab","C","Eb"],
"A":["A","C#","E"],
"Bb":["Bb","D","F"],
"B":["B","D#","F#"],
"Cm":["C","Eb","G"],
"C#m":["C#","E","G#"],
"Dm":["D","F","A"],
"Ebm":["Eb","Gb","Bb"],
"Em":["E","G","B"],
"Fm":["F","Ab","C"],
"F#m":["F#","A","C#"],
"Gm":["G","Bb","D"],
"Abm":["Ab","Cb","Eb"],
"Am":["A","C","E"],
"Bbm":["Bb","Db","F"],
"Bm":["B","D","F#"],
"Cdim":["C","Eb","Gb"],
"C#dim":["C#","E","G"],
"Ddim":["D","F","Ab"],
"Ebdim":["Eb","Gb","A"],
"Edim":["E","G","Bb"],
"Fdim":["F","Ab","Cb"],
"F#dim":["F#","A","C"],
"Gdim":["G","Bb","Db"],
"Abdim":["Ab","Cb","D"],
"Adim":["A","C","Eb"],
"Bbdim":["Bb","Db","Fb"],
"Bdim":["B","D","F"],
"C7":["C","E","G","Bb"],
"C#7":["C#","E#","G#","B"],
"D7":["D","F#","A","C"],
"Eb7":["Eb","G","Bb","Db"],
"E7":["E","G#","B","D"],
"F7":["F","A","C","Eb"],
"F#7":["F#","A#","C#","E"],
"G7":["G","B","D","F"],
"Ab7":["Ab","C","Eb","Gb"],
"A7":["A","C#","E","G"],
"Bb7":["Bb","D","F","Ab"],
"B7":["B","D#","F#","A"],
}

notes = {
"E3":164.81,
"F3":174.61,
"F#3":185.00,
"Gb3":185.00,
"G3":196.00,
"G#3":207.65,
"Ab3":207.65,
"A3":220.00,
"A#3":233.08,
"Bb3":233.08,
"B3":246.94,
"C4":261.63,
"C#4":277.18,
"Db4":277.18,	
"D4":293.66,
"D#4":311.13,
"Eb4":311.13,
"E4":329.63,
"F4":349.23,
"F#4":369.99,
"Gb4":369.99,
"G4":392.00,
"G#4":415.30,
"Ab4":415.30,
"A4":440.00,
"A#4":466.16,
"Bb4":466.16,
"B4":493.88,
"C5":523.25,
"C#5":554.37,
"Db5":554.37,
"D5":587.33,
"D#5":622.25,
"Eb5":622.25,
"E5":659.25,
"F5":698.46,
"F#5":739.99,
"Gb5":739.99,
"G5":783.99,
"G#5":830.61,
"Ab5":830.61,
"A5":880.00,
"A#5":932.33,
"Bb5":932.33,
"B5":987.77
}

volume = 0.09;

oscillatorType = "sine"

rhythm = 1

function playChord(el) {
el.disabled = true
var audioContext = new (window.AudioContext || window.webkitAudioContext);
var gainNode = audioContext.createGain();
var chord = el.innerText
for(i=0;i<chords[chord].length;i++) {
  console.log(notes[chords[chord][i]+4])
  oscillator = audioContext.createOscillator();
  oscillator.frequency.value = notes[chords[chord][i]+4];
  oscillator.connect(gainNode);
  oscillator.type = oscillatorType
 	oscillator.start()
  el.style.backgroundColor = "lightskyblue";
  
  setTimeout(function() {
    el.style.backgroundColor = "";
    el.disabled = false
  }, 500);
  
  oscillator.stop(1/rhythm)
}
 gainNode.gain.exponentialRampToValueAtTime(volume/chords[chord].length,  audioContext.currentTime);
 gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1/rhythm);
gainNode.connect(audioContext.destination);
}

function playProgression(el) {
el.disabled = true
var audioContext = new (window.AudioContext || window.webkitAudioContext);

progression = []
startTime = 1;

for (u=1;u<el.parentElement.children.length;u++) {
el.parentElement.children[u].disabled = true
chord = {}
chord.chord = el.parentElement.children[u].innerText;
chord.startTime = startTime;
startTime++
chord.endTime = chord.startTime+1;
progression.push(chord)
}

console.log(progression)


for (i=0;i<progression.length;i++) {
  
console.log(chords[progression[i].chord])
  
  for (z=0;z<chords[progression[i].chord].length;z++) {
  gainNode = audioContext.createGain();
 	oscillator = audioContext.createOscillator();
  oscillator.frequency.value = notes[chords[progression[i].chord][z]+4]
  oscillator.connect(gainNode);
  gainNode.gain.exponentialRampToValueAtTime(volume/chords[progression[i].chord].length,  audioContext.currentTime + progression[i].startTime/rhythm);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + progression[i].endTime/rhythm);
  gainNode.connect(audioContext.destination)
  oscillator.type = oscillatorType
  
  for (k=1; k<el.parentElement.children.length; k++) {
  setTimeout(function(k) {
    el.parentElement.children[k].style.backgroundColor = "lightskyblue";
  }, k * 950/rhythm, k);
   setTimeout(function(k) {
    el.parentElement.children[k].style.backgroundColor = "";
  }, k * 1050/rhythm, k);
}
  
 	oscillator.start(progression[i].startTime/rhythm)
  oscillator.stop(progression[i].endTime/rhythm)
  }
  
  }
  
  setTimeout(function() {el.disabled = false
  for (u=1;u<el.parentElement.children.length;u++) {
el.parentElement.children[u].disabled = false}}, progression[progression.length-1].endTime/rhythm * 1000)

}

function playNotes(el, pitches) {
el.style.backgroundColor = "lightskyblue";
el.disabled = true
var audioContext = new (window.AudioContext || window.webkitAudioContext);

progression = []
startTime = 1;

for (u=1;u<pitches.length;u++) {
el.disabled = true
note = {}
note.name = pitches[u]
note.freq = notes[pitches[u]];
note.startTime = startTime;
startTime++
note.endTime = note.startTime+1;
progression.push(note)
}

console.log(progression)


for (i=0;i<progression.length;i++) {
  
  gainNode = audioContext.createGain();
 	oscillator = audioContext.createOscillator();
  oscillator.frequency.value = progression[i].freq
  oscillator.connect(gainNode);
  gainNode.gain.exponentialRampToValueAtTime(0.09,  audioContext.currentTime + progression[i].startTime/rhythm);
  
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + progression[i].endTime/rhythm);
 
  gainNode.connect(audioContext.destination)
  oscillator.type = oscillatorType
  
  oscillator.start(progression[i].startTime/rhythm)
  oscillator.stop(progression[i].endTime/rhythm)
  }
  
  setTimeout(function() {el.disabled = false; el.style.backgroundColor = ""},
  progression[progression.length-1].endTime/rhythm * 1000)

}