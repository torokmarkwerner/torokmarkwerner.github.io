fetch("/erettsegi/data.json").then((response) => {
  return response.json()
}).then((data) => {
  populateHTML(data)
})


function populateHTML(x) {
  taskJSON = x.find(y => y.taskId == taskId);
  type = taskJSON.type;
  solutions = JSON.parse(taskJSON.solutions);
  taskTitle = taskJSON.taskTitle;
  instructions = JSON.parse(taskJSON.instructions);
  wordList = JSON.parse(taskJSON.wordList);
  textTitle = taskJSON.textTitle;
  example = taskJSON.example;
  text = taskJSON.text;
  text2 = taskJSON.text2;

  taskBody = document.createElement("DIV");
  taskBody.className = type;
  h2 = document.createElement("H2");
  h2.innerHTML = taskTitle;
  taskBody.appendChild(h2)

  ul = document.createElement("UL");

  for (i = 0; i < instructions.length; i++) {
    li = document.createElement("LI");
    li.innerHTML = instructions[i]
    ul.appendChild(li)
  }

  taskBody.appendChild(ul)

  if (wordList.length > 0) {
    wordListContainer = document.createElement("DIV");
    wordListContainer.id = "word-list"

    for (i = 0; i < wordList.length; i++) {
      div = document.createElement("DIV");
      div.innerHTML = Object.keys(wordList[i])[0]
      div.id = taskId + "-" + Object.values(wordList[i])[0]
      div.classList.add("gap")
      wordListContainer.appendChild(div)
    }

    /* taskBody.appendChild(wordListContainer) */

  }

  task = document.createElement("DIV");
  task.id = "task";

  h3 = document.createElement("H3");
  h3.innerHTML = textTitle;

  /* task.appendChild(h3) */

  if (type == "uoe-closed-gap-filling" || type == "reading-text") {
    task.innerHTML = text.replace(/\(\d+\)/, "<span class='default-gap'>" + example + "</span> ").replace(/\(\d+\)/g, "<span class='gap'></span>").replace(/\(/g, "<b>(").replace(/\)/g, ")</b>")
  } else if (type == "uoe-word-transformation" || type == "uoe-free-gap-filling") {
    task.innerHTML = text.replace(/\(\d+\)/, "<span class='default-gap'>" + example + "</span> ").replace(/\(\d+\)/g, "<input class='gap'> ")
  } else if (type == "reading-dialogue") {
    task.innerHTML = text.replace(/\(\d+\)/, "<div class='default-gap'>" + example + "</div> ").replace(/\(\d+\)/g, "<div class='gap'></div>")
  } else if (type == "reading-matching") {
    task.innerHTML = text2.replace("<div class='gap'></div>", "<div class='default-gap'>" + example + "</div> ");
  } else {
    /*type == "reading-true-or-false"*/
    task.innerHTML = text2;
    tfs = task.querySelectorAll(".radio-container")[0].querySelectorAll("label input");
    for (i = 0; i < tfs.length; i++) {
      tfs[i].disabled = true
      if (tfs[i].nextElementSibling.innerText == example) {
        tfs[i].checked = true
      }
    }
  }

  /* task.appendChild(div) */

  if (["reading-matching", "reading-true-or-false"].includes(type)) {

    taskBody.appendChild(h3)

    taskText = document.createElement("DIV");
    taskText.innerHTML = text;
    taskBody.appendChild(taskText);

    if (wordList.length > 0) {
      taskBody.appendChild(wordListContainer)
    }

    taskBody.appendChild(task)

  } else {
    if (wordList.length > 0) {
      taskBody.appendChild(wordListContainer)
    }
    task.insertBefore(h3, task.firstChild)
    taskBody.appendChild(task)
  }


  script = document.createElement("SCRIPT");
  script.src = "https://torokmarkwerner.github.io/erettsegi/statements-pick-and-drop.js"
  taskBody.appendChild(script)

  checkButton = document.createElement("BUTTON");
  checkButton.className = "check-button";
  checkButton.innerText = "CHECK ANSWERS";
  checkButton.addEventListener("click", checkAnswers)

  showButton = document.createElement("BUTTON")
  showButton.className = "show-button";
  showButton.innerText = "SHOW ANSWERS";
  showButton.addEventListener("click", showAnswers)

  taskBody.appendChild(checkButton);
  taskBody.appendChild(showButton);

modalClose = document.createElement("SPAN");
modalClose.className = "modal-close";
modalClose.innerHTML = "&times;";
modalClose.addEventListener("click",function() {this.parentElement.parentElement.style.display = "none"})

modalP = document.createElement("P");

modalBox = document.createElement("DIV");
modalBox.id = "score-modal";
modalBox.className = "modal-box";

modalBox.appendChild(modalClose);
modalBox.appendChild(modalP);

modalBasis = document.createElement("DIV");
modalBasis.className = "modal-basis";

modalBasis.appendChild(modalBox);

document.getElementById("content-container").appendChild(modalBasis);
  document.getElementById("content-container").appendChild(taskBody);
}