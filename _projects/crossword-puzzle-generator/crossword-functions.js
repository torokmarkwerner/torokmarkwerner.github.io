    crossword = document.getElementById("crossword")
    gameOver = false
    letterMobile = ""
    backspace = false

    passcodeIsOK = false

    id = ""
    title = ""
    passcode = ""

    generalData = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJibIoRZf5C8V-TMyprDDJDcL2zK5OVp-_9GOFxdOJoYOdzUcuqf3MRqe3Ofk-wlukOnuGFn2pB1NA/pub?gid=607892118&single=true&output=csv"

    passcodeScript = "https://script.google.com/macros/s/AKfycbzT_6w7RuWhbweD6qY8jsDgcyijmQBfA2WP78SQA_9JjuMzEechFx4bat3l05_aXrtZ/exec"

    function showImportInModal() {

        document.querySelector("#score-modal").parentElement.style.display = "flex";
        document.querySelector("#score-modal p").style.display = "block";

        document.querySelector("#score-modal p").innerHTML = ""

        if (document.querySelector("#score-modal").querySelector("#import")) {
            document.querySelector("#score-modal").querySelector("#import").remove()
        }

        if (document.querySelector("#score-modal").querySelector("#crossword-passcode-submission")) {
            document.querySelector("#score-modal").querySelector("#crossword-passcode-submission").remove()
        }

        importDiv = document.createElement("DIV")
        importDiv.id = "import"
        importDiv.style.paddingBottom = "0.5em"

        importH2 = document.createElement("H2")
        importH2.innerHTML = "Import CSV/TSV or JSON"

        importP = document.createElement("P")
        importP.innerHTML = "Import your words and clues by using a CSV/TSV string or a JSON object. In case you are using a CSV/TSV, use a comma between the word and the clue in each line."

        importTextarea = document.createElement("TEXTAREA")
        importTextarea.placeholder = "cross,a mark, object, or figure formed by two short intersecting lines or pieces (+ or ×)"

        importButton = document.createElement("BUTTON")
        importButton.innerText = "Import data"
        importButton.addEventListener("click", function() {

            crosswordWordlist = document.getElementById("crossword-wordlist")

            data = document.querySelector("#import textarea").value

            format = document.querySelector("input[name='import-format']:checked").id

            if (format == "JSON") {

                wordsAndClues = JSON.parse(data)

                words = Object.keys(wordsAndClues)
                clues = Object.values(wordsAndClues)

                for (z = 0; z < Object.keys(wordsAndClues).length; z++) {

                    word = words[z]
                    clue = clues[z]

                    newWordAndClue = document.createElement("DIV");
                    newWordAndClue.className = "word-clue";

                    newWord = document.createElement("DIV");
                    //////////////////////////////////////
                    newWord.innerText = word
                    //////////////////////////////////////
                    newWord.className = "word";
                    newWord.contentEditable = true;

                    newWord.addEventListener("focus", function() {
                        this.parentElement.querySelector(".save-button").classList.remove("saved")
                    })

                    newWord.addEventListener("blur", function() { save() })

                    newClue = document.createElement("DIV");
                    //////////////////////////////////////
                    newClue.innerText = clue
                    //////////////////////////////////////
                    newClue.className = "clue";
                    newClue.contentEditable = true;

                    newClue.addEventListener("focus", function() {
                        this.parentElement.querySelector(".save-button").classList.remove("saved")
                    })

                    newClue.addEventListener("blur", function() { save() })

                    newCloseButton = document.createElement("DIV")
                    newCloseButton.innerText = "×"
                    newCloseButton.className = "crossword-word-clue-close"
                    newCloseButton.addEventListener("click", function() {
                        this.parentElement.remove()
                        save()
                    })

                    newSaveButton = document.createElement("BUTTON")
                    newSaveButton.className = "save-button";
                    newSaveButton.addEventListener("click", function() { save(this) })

                    newWordAndClue.appendChild(newWord)
                    newWordAndClue.appendChild(newClue)
                    newWordAndClue.appendChild(newSaveButton)
                    newWordAndClue.appendChild(newCloseButton)

                    crosswordWordlist.appendChild(newWordAndClue)

                }

            } else {

                for (z = 0; z < data.split(/\n/).length; z++) {
                    word = data.split(/\n/)[z].split(/[\t,]/)[0]
                    clue = data.split(/\n/)[z].replace(word, "")

                    newWordAndClue = document.createElement("DIV");
                    newWordAndClue.className = "word-clue";

                    newWord = document.createElement("DIV");
                    //////////////////////////////////////
                    newWord.innerText = word
                    //////////////////////////////////////
                    newWord.className = "word";
                    newWord.contentEditable = true;

                    newWord.addEventListener("focus", function() {
                        this.parentElement.querySelector(".save-button").classList.remove("saved")
                    })

                    newWord.addEventListener("blur", function() { save() })

                    newClue = document.createElement("DIV");
                    //////////////////////////////////////
                    newClue.innerText = clue
                    //////////////////////////////////////
                    newClue.className = "clue";
                    newClue.contentEditable = true;

                    newClue.addEventListener("focus", function() {
                        this.parentElement.querySelector(".save-button").classList.remove("saved")
                    })

                    newClue.addEventListener("blur", function() { save() })

                    newCloseButton = document.createElement("DIV")
                    newCloseButton.innerText = "×"
                    newCloseButton.className = "crossword-word-clue-close"
                    newCloseButton.addEventListener("click", function() {
                        this.parentElement.remove()
                        save()
                    })

                    newSaveButton = document.createElement("BUTTON")
                    newSaveButton.className = "save-button";
                    newSaveButton.addEventListener("click", function() { save(this) })

                    newWordAndClue.appendChild(newWord)
                    newWordAndClue.appendChild(newClue)
                    newWordAndClue.appendChild(newSaveButton)
                    newWordAndClue.appendChild(newCloseButton)

                }

            }

            saveButtons = Array.from(document.getElementsByClassName("save-button"))
            saveButtons.forEach(x => x.classList.add("saved"))

            save()

            document.querySelector("#score-modal").parentElement.style.display = "none";
            document.querySelector("#score-modal p").style.display = "none";

        })

        jsonCheckboxLabel = document.createElement("LABEL")
        jsonCheckboxLabel.innerText = "JSON"

        jsonCheckbox = document.createElement("INPUT")
        jsonCheckbox.type = "radio"
        jsonCheckbox.name = "import-format"
        jsonCheckbox.id = "JSON"

        csvCheckboxLabel = document.createElement("LABEL")
        csvCheckboxLabel.innerText = "CSV/TSV"

        csvCheckbox = document.createElement("INPUT")
        csvCheckbox.type = "radio"
        csvCheckbox.name = "import-format"
        csvCheckbox.id = "CSV-TSV"
        csvCheckbox.checked = true

        importDiv.appendChild(importH2)

        importDiv.appendChild(importP)

        importDiv.appendChild(importTextarea)

        importDiv.appendChild(csvCheckboxLabel)
        importDiv.appendChild(csvCheckbox)
        importDiv.appendChild(jsonCheckboxLabel)
        importDiv.appendChild(jsonCheckbox)

        importDiv.appendChild(importButton)

        document.querySelector("#score-modal").appendChild(importDiv)
        document.querySelector("#score-modal textarea").focus()
        document.querySelector("#score-modal textarea").click()

    }

    function submitPasscode(id, title, passcode) {

        url = passcodeScript + "?id=" + encodeURIComponent(id) + "&title=" + encodeURIComponent(title) + "&passcode=" + encodeURIComponent(passcode)

        xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status == 0) {
                    response = xhr.responseText
                }
            }
        }
        xhr.send();

        if (response == "true") {
            console.log("Good passcode.")
            passcodeIsOK = true
            document.querySelector("#crossword-show-button").classList.toggle("hide")
            if (document.querySelector("#crossword-show-button").classList.contains("hide")) {
                show()
                showButton.querySelector(".button-icon i").className = "fa fa-eye-slash"
            } else {
                hide()
                showButton.querySelector(".button-icon i").className = "fa fa-eye"
            }

        } else {
            console.log("Wrong passcode.")
            document.querySelector("#score-modal").parentElement.style.display = "flex";
            document.querySelector("#score-modal p").style.display = "block";

            if(document.querySelector("#crossword-passcode-submission")) {
            document.querySelector("#crossword-passcode-submission").remove()
            }
            document.querySelector("#score-modal p").innerHTML = "Invalid passcode."
        }

    }

    function getCrossword(id) {

        xhr = new XMLHttpRequest();
        xhr.open("GET", generalData, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status == 0) {
                    data = xhr.responseText.split(/\n/);
                }
            }
        }
        xhr.send();

        crosswordsData = {}

        for (i = data.length - 1; i > 0; i--) {

            csvParsed = data[i].replace(/"?(.*?)"?,"?(.*?)"?,"?(.*?)"?,"?(.*)/g, '"$1","$2","$3","$4').split(/,(?="(?!")|""")/)

            titleData = csvParsed[1].trim().replace(/"/g, "");
            idData = csvParsed[2].trim().slice(1, -1);
            inputData = csvParsed[3].trim().replace(/"""/g, '"').replace(/"+/g, '"').slice(1, -1);

            crosswordData = {}
            crosswordData.title = titleData
            crosswordData.input = JSON.parse(inputData)

            crosswordsData[idData] = crosswordData
        }

        console.log(crosswordsData[id])

        if (crosswordsData[id]) {
            generate(crosswordsData[id].title, crosswordsData[id].passcode, crosswordsData[id].input, false)
        } else {
            document.querySelector("#score-modal").parentElement.style.display = "flex";
            document.querySelector("#score-modal p").style.display = "block";
            document.querySelector("#score-modal p").innerHTML = "Crossword not found. Check the URL you are trying to access."
        }

    }

    function hide() {

        grid = crossword.querySelector("#crossword-grid")

        letters = grid.querySelectorAll(".letter");
        letters.forEach(x => {
            x.classList.remove("show")
            input = document.createElement("INPUT")
            input.classList.add("crossword-input")
            input.autocapitalize = "characters"
            input.minLength = 1
            input.maxLength = 1
            x.innerHTML = x.innerHTML.match(/<.*>/)
            x.appendChild(input);
        })

        inputs = document.getElementsByClassName("crossword-input");

        Array.from(inputs).forEach(x => x.addEventListener("keydown", function(event) {
            letterMobile = this.value
        }))

        Array.from(inputs).forEach(x => x.addEventListener("keyup", function() { enter(event, this) }))

        Array.from(inputs).forEach(x => x.addEventListener("click", function() {
            //document.body.scrollTop = 0
            focus(this)
        }))

        horizontal = true

        modalClose = document.createElement("DIV");
        modalClose.className = "modal-close";
        modalClose.innerHTML = "&times;";
        modalClose.addEventListener("click", function() { this.parentElement.parentElement.style.display = "none" })

        modalP = document.createElement("P");

        modalBox = document.createElement("DIV");
        modalBox.id = "score-modal";
        modalBox.className = "modal-box";

        modalBox.appendChild(modalClose);
        modalBox.appendChild(modalP);

        modalBasis = document.createElement("DIV");
        modalBasis.className = "modal-basis";

        modalBasis.appendChild(modalBox);

        document.body.appendChild(modalBasis);

        tbody.children[gridMap[0].row].children[gridMap[0].column].querySelector(".crossword-input").click()
        tbody.children[gridMap[0].row].children[gridMap[0].column].querySelector(".crossword-input").focus()

    }

    function generate(title, passcode, input, generate) {

        xhr = new XMLHttpRequest();
        xhr.open("GET", generalData, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status == 0) {
                    data = xhr.responseText.split(/\n/);
                }
            }
        }
        xhr.send();

        crosswordsData = {}

        for (i = data.length - 1; i > 2; i--) {

            csvParsed = data[i].replace(/"?(.*?)"?,"?(.*?)"?,"?(.*?)"?,"?(.*)/g, '"$1","$2","$3","$4').split(/,(?="(?!")|""")/)

            titleData = csvParsed[1].trim().replace(/"/g, "");
            idData = csvParsed[2].trim().slice(1, -1);
            inputData = csvParsed[3].trim().replace(/"""/g, '"').replace(/"+/g, '"').slice(1, -1);

            crosswordData = {}
            crosswordData.title = titleData
            crosswordData.input = JSON.parse(inputData)

            crosswordsData[idData] = crosswordData
        }

        if (generate == true) {

            if (id != "") {
                n = id.split("-").length > 1 ? Number(id.split("-")[id.split("-").length - 1]) + 1 : 0
                id = title + "-" + n
            } else {
                id = Object.values(crosswordsData).filter(x => x.title == title).length == 0 ? title : title + "-" + Object.values(crosswordsData).filter(x => x.title == title).length
            }

            //console.log(id)

            fetch("https://docs.google.com/forms/d/e/1FAIpQLSfKVn-NOL3qygq9YrAMk4e63aD6sTzLr8zbrp2MFXFr6jKzEg/formResponse?usp=pp_url&entry.268076818=" + encodeURIComponent(title) + "&entry.902339844=" + encodeURIComponent(id) + "&entry.1393085979=" + encodeURIComponent(JSON.stringify(input)))

            fetch("https://docs.google.com/forms/d/e/1FAIpQLSdqJpZIDLAv4ZOUgBZgACcpGRjeh-LuLVeSxBEqs1iSzOKqGQ/formResponse?usp=pp_url&entry.268076818=" + encodeURIComponent(title) + "&entry.1237155194=" + encodeURIComponent(id) + "&entry.1277179224=" + encodeURIComponent(passcode))

            /////////////////////////////////////////////////////////
        }

        crossword.innerHTML = ""

        crosswordTitle = document.createElement("h1");
        crosswordTitle.id = "crossword-title-header"
        crosswordTitle.style.textAlign = "center"
        crosswordTitle.innerHTML = title;

        if (generate == true) {
            links = document.createElement("div")
            links.className = "crossword-links"

            flexRow = document.createElement("div")
            flexRow.className = "flex-row"

            key = document.createElement("div")
            key.className = "crossword-link-no-key"

            link1 = document.createElement("div");
            link1.className = "crossword-link"

            link1.innerHTML = "<a target='_blank' href='https://torokmarkwerner.github.io/projects/cryptogryphon/crossword-puzzle?id=" + encodeURIComponent(id) + "'>https://torokmarkwerner.github.io/projects/cryptogryphon/crossword-puzzle?id=" + encodeURIComponent(id) + "</a>"

            copyButton = document.createElement("button")
            copyButton.className = "crossword-link-copy"
            copyButton.innerHTML = '<i class="material-icons">&#xe14d;</i>'
            copyButton.addEventListener("click", function() {
                Array.from(document.querySelectorAll(".crossword-link-copy")).forEach(x => x.classList.remove("copied"));
                this.classList.add("copied")
                navigator.clipboard.writeText(this.previousElementSibling.innerText);
            })

            links.appendChild(key)
            flexRow.appendChild(link1)
            flexRow.appendChild(copyButton)

            links.appendChild(flexRow)

            link2 = document.createElement("div");
            link2.className = "crossword-link"

            link2.innerHTML = "<a target='_blank' href='https://torokmarkwerner.github.io/projects/cryptogryphon/crossword-puzzle?id=" + encodeURIComponent(id) + "&passcode=" + encodeURIComponent(passcode) + "'>https://torokmarkwerner.github.io/projects/cryptogryphon/crossword-puzzle?id=" + encodeURIComponent(title) + "&passcode=" + encodeURIComponent(passcode) + "</a>"

            nokey = document.createElement("div")
            nokey.className = "crossword-link-key"

            flexRow = document.createElement("div")
            flexRow.className = "flex-row"

            copyButton = document.createElement("button")
            copyButton.className = "crossword-link-copy"
            copyButton.innerHTML = '<i class="material-icons">&#xe14d;</i>'
            copyButton.addEventListener("click", function() {
                Array.from(document.querySelectorAll(".crossword-link-copy")).forEach(x => x.classList.remove("copied"));
                this.classList.add("copied")
                navigator.clipboard.writeText(this.previousElementSibling.innerText);
            })

            links.appendChild(nokey)
            flexRow.appendChild(link2)
            flexRow.appendChild(copyButton)

            links.appendChild(flexRow)

        }

        crosswordGrid = document.createElement("div");
        crosswordGrid.id = "crossword-grid";

        crosswordButtons = document.createElement("div");
        crosswordButtons.id = "crossword-buttons";

        showButton = document.createElement("button");
        showButton.id = "crossword-show-button";

        showButtonIcon = document.createElement("div");
        showButtonIcon.className = "button-icon";
        showIcon = document.createElement("i");
        showIcon.className = "fa fa-eye";
        showButtonIcon.appendChild(showIcon);

        showButtonCaption = document.createElement("div");
        showButtonCaption.className = "button-caption";

        showButton.appendChild(showButtonIcon);
        showButton.appendChild(showButtonCaption);

        showButton.addEventListener("click", function() {
if (passcodeInLink) { 
    submitPasscode(id, title, passcodeInLink)
} else if (!passcode && !passcodeIsOK) {
    document.querySelector("#score-modal").parentElement.style.display = "flex";
    document.querySelector("#score-modal p").style.display = "none";
if(document.querySelector("#crossword-passcode-submission")) {
    document.querySelector("#crossword-passcode-submission").remove()
}

            passcodeSubmissionDiv = document.createElement("DIV")
            passcodeSubmissionDiv.id = "crossword-passcode-submission"

            passcodeLabel = document.createElement("LABEL")
            passcodeLabel.innerHTML = "Passcode:"

            submitInput = document.createElement("INPUT")

            submitButton = document.createElement("BUTTON")
            submitButton.innerText = "Submit"
            submitButton.className = "submit-button"
            submitButton.addEventListener("click", function() {

                document.querySelector("#score-modal").parentElement.style.display = "none";
                document.querySelector("#score-modal p").style.display = "none";
                submitPasscode(id, title, this.previousElementSibling.value)

            })

            passcodeSubmissionDiv.appendChild(passcodeLabel)
            passcodeSubmissionDiv.appendChild(submitInput)
            passcodeSubmissionDiv.appendChild(submitButton)

            document.querySelector("#score-modal").appendChild(passcodeSubmissionDiv)
} else {
            document.querySelector("#crossword-show-button").classList.toggle("hide")
            if (document.querySelector("#crossword-show-button").classList.contains("hide")) {
                show()
                showButton.querySelector(".button-icon i").className = "fa fa-eye-slash"
            } else {
                hide()
                showButton.querySelector(".button-icon i").className = "fa fa-eye"
            }
}
        })

        printButton = document.createElement("button");
        printButton.id = "crossword-print-button";

        printButtonIcon = document.createElement("div");
        printButtonIcon.className = "button-icon";
        printIcon = document.createElement("i");
        printIcon.className = "fa fa-print";
        printButtonIcon.appendChild(printIcon);

        printButtonCaption = document.createElement("div");
        printButtonCaption.className = "button-caption";
        printButtonCaption.textContent = "Print";

        printButton.appendChild(printButtonIcon);
        printButton.appendChild(printButtonCaption);

        printButton.addEventListener("click", function() {
            window.print()
        })

        crosswordButtons.appendChild(showButton);
        crosswordButtons.appendChild(printButton);

        crossword.appendChild(crosswordTitle)
        if (generate == true) {
            crossword.appendChild(links)
        }
        crossword.appendChild(crosswordGrid);
        crossword.appendChild(crosswordButtons);

        grid = crossword.querySelector("#crossword-grid")

        clueBox = document.createElement("DIV");
        clueBox.id = "clue-box"
        table = document.createElement("TABLE")
        tbody = document.createElement("TBODY")

        table.appendChild(tbody)

        div = document.createElement("DIV")
        div.style.display = "flex"
        lists = ["across", "down"]

        for (i = 0; i < lists.length; i++) {
            container = document.createElement("DIV")
            container.style.flex = 1
            titleH3 = document.createElement("H3")
            titleH3.innerHTML = lists[i][0].toUpperCase() + lists[i].substr(1)
            ol = document.createElement("OL")
            ol.id = lists[i]
            container.appendChild(titleH3)
            container.appendChild(ol)
            div.appendChild(container)
        }

        grid.parentElement.insertBefore(clueBox, grid)
        grid.appendChild(table)
        grid.parentElement.insertBefore(div, document.getElementById("crossword-buttons"))

        /*
                title = "Christmas"

                passcode = "Christmas123"

                input = {
                    "eliminate": "destroy something completely",
                    "fine": "good, pleasant",
                    "love": "romantic feelings",
                    "marry": "wed",
                    "fuck": "copulate",
                    "super": "...hero",
                    "star": "eg. the Sun",
                    "broom": "household tool to sweep up the floor",
                    "whose": "which person's",
                    "blouse": "type of female top",
                    "ginger": "red-haired",
                    "joker": "poker card",
                    "busted": "caught in the act",
                    "former": "not the latter",
                    "superb": "quite alright",
                    "fantastic": "awesome"
                }
        */
        /*input = document.getElementById("crossword-textarea").innerHTML.split(/\:\s*|\s*\n/).filter((x,index) => x != "");

        clues = {}

        for (i=0; i<input.length; i+=2) {
        clues[input[i]] = input[i+1]
        }

        console.log(clues)

        words = Object.keys(clues)

        */

        words = Object.keys(input)

        possibles = Object.fromEntries(words.map(k => [k, {}]))

        for (d = 0; d < words.length; d++) {
            array = words.filter(x => x != words[d])
            intersections = {}
            for (i = 0; i < words[d].length; i++) {
                intersectionsOfWord = {};
                array.filter(item => item.indexOf(words[d][i]) > -1).forEach(x => intersectionsOfWord[x] = x.indexOf(words[d][i]))
                possibles[words[d]][i] = intersectionsOfWord
            }
        }

        tbody = document.getElementsByTagName("tbody")[0];

        onTheGrid = []
        horizontal = true

        gridMap = []

        words.sort((a, b) => {
            difference = b.length - a.length
            if (difference == 0) {
                return (Object.values(possibles[b]).reduce((sum, x) => sum + Object.keys(x).length, 0)) - (Object.values(possibles[a]).reduce((sum, x) => sum + Object.keys(x).length, 0))
            }
            return difference
        })

        console.log(words)

        add(words[0], 0, 0, horizontal)
        onTheGrid.push(words[0])

        horizontal = false
        backtracking = false
        w = 0

        //console.log(possibles["star"])

        for (i = 0; i < words.length; i++) {

            startIndex = backtracking ? start + 1 : 0

            //console.log(words[i],i,"hey!",startIndex);

            for (s = 0; s < gridMap.length; s++) {

                earliest = Object.keys(possibles[gridMap[s].word]).reduce((object, key) => {
                    if (Object.keys(possibles[gridMap[s].word][key]).includes(words[i])) {
                        object[key] = possibles[gridMap[s].word][key];
                    }
                    return object;
                }, {});

                earliest = Object.entries(earliest).sort((a, b) => a[0][words[i]] - b[0][words[i]])

                //console.log(words[i],"in",gridMap[s].word,earliest.length)

                if (Object.keys(earliest).length > 0) {
                    across = gridMap[s].across ? false : true

                    for (j = startIndex; j < earliest.length; j++) {

                        nthLetterOfParent = Number(earliest[j][0])
                        nthLetterOfChild = earliest[j][1][words[i]]

                        c = across ? gridMap[s].column - nthLetterOfChild : gridMap[s].column + nthLetterOfParent
                        r = across ? gridMap[s].row + nthLetterOfParent : gridMap[s].row - nthLetterOfChild

                        //console.log(words[i],gridMap[s].word,c,r,("horizontal: " + across),("valid: " + isValid(words[i],c,r,across)))

                        if (isValid(words[i], c, r, across) && !onTheGrid.includes(words[i])) {
                            add(words[i], c, r, across, gridMap[s].word, j)
                            onTheGrid.push(words[i])
                            break
                        }

                    }
                }
                if (onTheGrid.includes(words[i])) {
                    backtracking = false
                    break
                }
            }
            if (!onTheGrid.includes(words[i])) {
                if (gridMap.find(x => x.word == words[i - 1])) {
                    start = gridMap.find(x => x.word == words[i - 1]).index
                    remove(words[i - 1])
                }
                //console.log(start)
                i -= 2
                backtracking = true
                //console.log("not found",i)
                if (i < 0) {
                    crossword.innerHTML = ""
                    document.querySelector("#score-modal").parentElement.style.display = "flex";
                    document.querySelector("#score-modal p").style.display = "block";
                    document.querySelector("#score-modal p").innerHTML = "Provide more words."
                    //console.log("problem")
                    break
                }

            }
        }

        //console.log(words.filter(x => !onTheGrid.includes(x)))
        //Just to make sure that every word is on the grid.

        gridMap.sort((a, b) => {
            if (a.row === b.row) {
                return a.column - b.column;
            }
            return a.row - b.row;
        });

        for (j = 0; j < gridMap.length; j++) {
            c = gridMap[j].column
            r = gridMap[j].row
            across = gridMap[j].across
            word = gridMap[j].word

            td = grid.getElementsByTagName("tr")[r].getElementsByTagName("td")[c]

            if (!td.getElementsByClassName("number")[0]) {
                number = document.createElement("DIV");
                n = gridMap.filter(x => x.across == across).findIndex(y => y.word == word) + 1
                if (gridMap.filter(x => x.across == across && x.n == n).length == 0) {
                    number.innerHTML = n
                    gridMap[j].n = n
                } else {
                    number.innerHTML = n + 1
                    gridMap[j].n = n + 1
                }
                number.classList.add("number")
                td.appendChild(number)
            } else {
                gridMap[j].n = Number(td.getElementsByClassName("number")[0].innerHTML)
            }
        }

        console.log(gridMap)

        gridMap.filter(x => x.across == true).sort((a, b) => a.n - b.n).forEach(x => {
            ol = document.getElementById("across")
            li = document.createElement("LI");
            li.value = x.n
            lettersInWords = []
            x.word.split(" ").forEach(k => {lettersInWords.push(k.length)})
            li.innerHTML = input[x.word] + " (" + lettersInWords.join(",") + ")"
            ol.appendChild(li)
        })

        gridMap.filter(x => x.across == false).sort((a, b) => a.n - b.n).forEach(x => {
            ol = document.getElementById("down")
            li = document.createElement("LI");
            li.value = x.n            
            lettersInWords = []
            x.word.split(" ").forEach(k => {lettersInWords.push(k.length)})
            li.innerHTML = input[x.word] + " (" + lettersInWords.join(",") + ")"
            ol.appendChild(li)
        })

        //Delete empty rows and columns.
        minRows = gridMap.filter(word => word.across == false).sort((a, b) => a.row - b.row)[0].row

        downWords = gridMap.filter(word => word.across == false).sort((a, b) => (a.row + a.word.length) - (b.row + b.word.length))

        maxRows = downWords[downWords.length - 1].row + downWords[downWords.length - 1].word.length

        minColumns = gridMap.filter(word => word.across == true).sort((a, b) => a.column - b.column)[0].column

        acrossWords = gridMap.filter(word => word.across == true).sort((a, b) => (a.column + a.word.length) - (b.column + b.word.length))

        maxColumns = acrossWords[acrossWords.length - 1].column + acrossWords[acrossWords.length - 1].word.length

        emptyRowsOnTheTop = 0

        rowElements = Array.from(grid.querySelectorAll("tbody tr"))
        rowElements.forEach((row, index) => {
            if (index < minRows) {
                grid.querySelector("tbody").removeChild(row);
                emptyRowsOnTheTop++;
            } else if (index > maxRows) {
                grid.querySelector("tbody").removeChild(row);
            }
        });

        console.log(emptyRowsOnTheTop)

        emptyColumnsOnTheLeft = 0

        rowElements = Array.from(grid.querySelectorAll("tbody tr"))

        for (i = 0; i < rowElements.length; i++) {
            cellElements = Array.from(rowElements[i].children)
            cellElements.forEach((td, index) => {
                if (index < minColumns) {
                    rowElements[i].removeChild(td)
                    emptyColumnsOnTheLeft++;
                } else if (index > maxColumns) {
                    rowElements[i].removeChild(td)
                }
            })
        }

        console.log(emptyColumnsOnTheLeft)

        gridMap.forEach(x => {
            x.row = x.row - emptyRowsOnTheTop
            x.column = x.column - emptyColumnsOnTheLeft
        })

        console.log(gridMap)

        ////////////////////////////////

        Array.from(grid.querySelectorAll(".letter")).forEach(x => {

            svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            svg.style.overflow = "visible";
            svg.style.width = "100%"
            svg.style.height = "100%";
            svg.style.position = "absolute";
            svg.style.top = 0;
            svg.style.left = 0;

            rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.style.fill = "transparent"
            rect.style.stroke = "black"
            rect.style.strokeWidth = "1pt"
            rect.style.height = "2em"
            rect.style.width = "100%"

            svg.appendChild(rect)

            x.appendChild(svg)

        })

    }

    function remove(word) {
        c = gridMap.find(x => x.word == word).column
        r = gridMap.find(x => x.word == word).row
        across = gridMap.find(x => x.word == word).across

        console.log("remove:", word, c, r, across)

        for (h = 0; h < word.length; h++) {
            if (across) {
                tr = grid.getElementsByTagName("tr")[r];
                td = tr.getElementsByTagName("td")[c + h];
                up = grid.getElementsByTagName("tr")[r - 1] && grid.getElementsByTagName("tr")[r - 1].getElementsByTagName("td")[c + h] ? grid.getElementsByTagName("tr")[r - 1].getElementsByTagName("td")[c + h].innerHTML : "";
                down = grid.getElementsByTagName("tr")[r + 1] && grid.getElementsByTagName("tr")[r + 1].getElementsByTagName("td")[c + h] ? grid.getElementsByTagName("tr")[r + 1].getElementsByTagName("td")[c + h].innerHTML : "";

                if (down == "" && up == "") {
                    td.classList.toggle("letter")
                    td.innerHTML = ""
                    td.style.border = "0pt solid black"
                    td.removeAttribute("id")
                }

            } else {
                tr = grid.getElementsByTagName("tr")[r + h];
                td = tr.getElementsByTagName("td")[c];
                left = tr.getElementsByTagName("td")[c - 1] ? tr.getElementsByTagName("td")[c - 1].innerHTML : "";
                right = tr.getElementsByTagName("td")[c + 1] ? tr.getElementsByTagName("td")[c + 1].innerHTML : "";

                if (left == "" && right == "") {
                    td.classList.toggle("letter")
                    td.innerHTML = ""
                    td.style.border = "0pt solid black"
                    td.removeAttribute("id")
                }

            }
        }

        gridMap = gridMap.filter(x => x.word != word);
        onTheGrid = onTheGrid.filter(x => x != word);
    }

    function add(letters, column, row, across, jointo, index) {
        //console.log(letters,column,row,across,jointo,index)
        updateGridMap(letters, column, row, across, jointo, index)

        for (m = 0; m < letters.length; m++) {
            trs = document.getElementsByTagName("TR");

            while (row < 0) {
                r = document.createElement("TR");
                tbody.insertBefore(r, trs[0])
                row++
                gridMap.forEach(f => f.row++)
            }

            while (column < 0) {
                rows = grid.querySelectorAll("tbody tr");
                rows.forEach(row => {
                    d = document.createElement("TD");
                    row.insertBefore(d, row.firstElementChild);
                });
                column++
                gridMap.forEach(f => f.column++)
            }

            while (trs.length - 1 < row) {
                r = document.createElement("TR");
                tbody.appendChild(r);
            }

            tr = trs[row]
            tds = tr.getElementsByTagName("TD")

            while (tds.length - 1 < column) {
                c = document.createElement("TD");
                tr.appendChild(c);
            }
            td = tds[column]
            if (td.innerHTML == "") {
                td.classList.toggle("letter")
                td.innerHTML = letters[m].toUpperCase()
            }

            if (!td) {
                tr.appendChild(td)
            } else {

            }
            if (across == true) {
                column++
            } else {
                row++
            }
        }
    }

    function isValid(word, column, row, across) {

        //console.log(word,column,row,across)
        for (q = 0; q < word.length; q++) {
            if (across) {

                tr = grid.getElementsByTagName("tr")[row]

                //console.log(word,q,word[q],column,row,across)

                if (tr) {
                    td = (tr.getElementsByTagName("td")[column + q]) ? tr.getElementsByTagName("td")[column + q].innerHTML : ""
                    left = (tr.getElementsByTagName("td")[column + q - 1]) ? tr.getElementsByTagName("td")[column + q - 1].innerHTML : ""
                    right = (tr.getElementsByTagName("td")[column + q + 1]) ? tr.getElementsByTagName("td")[column + q + 1].innerHTML : ""
                    up = (grid.getElementsByTagName("tr")[row - 1] && grid.getElementsByTagName("tr")[row - 1].getElementsByTagName("td")[column + q]) ? grid.getElementsByTagName("tr")[row - 1].getElementsByTagName("td")[column + q].innerHTML : ""
                    down = (grid.getElementsByTagName("tr")[row + 1] && grid.getElementsByTagName("tr")[row + 1].getElementsByTagName("td")[column + q]) ? grid.getElementsByTagName("tr")[row + 1].getElementsByTagName("td")[column + q].innerHTML : ""

                    //console.log(["letter:",word[q].toUpperCase(),"cell:",td,"left:",left,"right:",right,"up:",up,", down:",down].join(" "))

                    if (q == 0 && left != "") {
                        return false
                    } else if ((up != "" || down != "") && td != word[q].toUpperCase()) {
                        return false
                    } else if (right != "" && q == word.length - 1 || right != "" && right != word[q + 1].toUpperCase()) {
                        return false
                    }

                }

            } else {

                tr = grid.getElementsByTagName("tr")[row + q]

                if (tr) {
                    td = (tr.getElementsByTagName("td")[column]) ? tr.getElementsByTagName("td")[column].innerHTML : ""

                    left = (tr.getElementsByTagName("td")[column - 1]) ? tr.getElementsByTagName("td")[column - 1].innerHTML : ""
                    right = (tr.getElementsByTagName("td")[column + 1]) ? tr.getElementsByTagName("td")[column + 1].innerHTML : ""

                    up = (grid.getElementsByTagName("tr")[row + q - 1] && grid.getElementsByTagName("tr")[row + q - 1].getElementsByTagName("td")[column]) ? grid.getElementsByTagName("tr")[row + q - 1].getElementsByTagName("td")[column].innerHTML : ""

                    down = (grid.getElementsByTagName("tr")[row + q + 1] && grid.getElementsByTagName("tr")[row + q + 1].getElementsByTagName("td")[column]) ? grid.getElementsByTagName("tr")[row + q + 1].getElementsByTagName("td")[column].innerHTML : ""

                    //console.log(["letter:",word[q].toUpperCase(),"cell:",td,"left:",left,"right:",right,"up:",up,", down:",down].join(" "))

                    if (q == 0 && up != "") {
                        return false
                    } else if ((left != "" || right != "") && td != word[q].toUpperCase()) {
                        return false
                    } else if (down != "" && q == word.length - 1 || down != "" && down != word[q + 1].toUpperCase()) {
                        return false
                    }

                }
            }
        }
        return true
    }

    function updateGridMap(word, column, row, across, join, index) {
        wordObject = { word: word, across: across, column: column, row: row, join: join, index: index }
        gridMap.push(wordObject)
    }

    function enter(event, element) {

        event.preventDefault()

        tr = element.parentElement.parentElement;
        c = Array.from(tr.children).indexOf(element.parentElement)
        r = Array.from(tr.parentElement.children).indexOf(tr)

        up = tr.parentElement.children[r - 1] && tr.parentElement.children[r - 1].children[c] && tr.parentElement.children[r - 1].children[c].querySelector(".crossword-input") != null ? tr.parentElement.children[r - 1].children[c].querySelector(".crossword-input") : ""
        down = tr.parentElement.children[r + 1] && tr.parentElement.children[r + 1].children[c] && tr.parentElement.children[r + 1].children[c].querySelector(".crossword-input") != null ? tr.parentElement.children[r + 1].children[c].querySelector(".crossword-input") : ""
        left = tr.children[c - 1] && tr.children[c - 1].querySelector(".crossword-input") != null ? tr.children[c - 1].querySelector(".crossword-input") : ""
        right = tr.children[c + 1] && tr.children[c + 1].querySelector(".crossword-input") != null ? tr.children[c + 1].querySelector(".crossword-input") : ""

        console.log(event.keyCode, horizontal, c, r, up.value, down.value, left.value, right.value)

        valid = false

        if (letterMobile != "" && element.value == "") {
            keyCode = 8
            element.value = letterMobile
        } else if (event.keyCode == 0 || event.keyCode == 229) {
            keyCode = element.value.charCodeAt(0)
        } else {
            keyCode = event.keyCode
        }

        letter = String.fromCharCode(keyCode).toUpperCase()

        next = horizontal ? right : down
        prev = horizontal ? left : up

        if (keyCode == 39 && right) {
            //RIGHT ARROW
            next = right
            valid = true
        } else if (keyCode == 37 && left) {
            //LEFT ARROW
            next = left
            valid = true
        } else if (keyCode == 40 && down) {
            //DOWN ARROW
            next = down
            valid = true
        } else if (keyCode == 38 && up) {
            //UP ARROW
            next = up
            valid = true
        } else if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122 || keyCode == 32)) {
            //ALPHABET
            valid = true
            if (!element.parentElement.classList.contains("correct")) {
                element.value = letter
            }
        } else if (keyCode == 13) {
            //ENTER
            valid = true
        }

        if ((next && valid && keyCode != 9) || (element.readOnly && next && keyCode != 9)) {
            next.click()
            next.focus()
        } else if (valid && keyCode != 9 && !element.readOnly) {

            //CHECK WORD HERE, ADD '.CORRECT' TO CLASSLIST AND READONLY=TRUE
        }

        if (!element.parentElement.classList.contains("correct") && keyCode == 8 && element.value != "") {
            element.value = ""
        } else if (!element.parentElement.classList.contains("correct") && keyCode == 8 && prev && element.value == "" || element.parentElement.classList.contains("correct") && keyCode == 8 && prev) {

            if (element.parentElement.classList.contains("correct") && keyCode == 8) {
                element.value = letterMobile
            }

            prev.click()
            prev.focus()
        }

        console.log(number, horizontal)
        word = gridMap.find(x => x.n == number && x.across == horizontal)
        check(word)

    }

    function focus(element) {

        tr = element.parentElement.parentElement;
        c = Array.from(tr.children).indexOf(element.parentElement)
        r = Array.from(tr.parentElement.children).indexOf(tr)

        up = (tr.parentElement.children[r - 1] && tr.parentElement.children[r - 1].children[c]) ? tr.parentElement.children[r - 1].children[c] : ""
        down = (tr.parentElement.children[r + 1] && tr.parentElement.children[r + 1].children[c]) ? tr.parentElement.children[r + 1].children[c] : ""
        left = tr.children[c - 1] ? tr.children[c - 1] : ""
        right = tr.children[c + 1] ? tr.children[c + 1] : ""

        nextCells = [up, left, down, right]

        across1 = false
        down1 = false
        across2 = false
        down2 = false
        across3 = false
        down3 = false

        for (i = 0; i < nextCells.length; i++) {

            if (nextCells[i] && nextCells[i].classList.contains("letter") && i % 2 == 1) {
                across1 = true
            } else if (nextCells[i] && nextCells[i].classList.contains("letter")) {
                down1 = true
            }

            if (nextCells[i] && nextCells[i].classList.contains("active") && i % 2 == 1) {
                across2 = true
            } else if (nextCells[i] && nextCells[i].classList.contains("active")) {
                down2 = true
            }

            if (nextCells[i] && nextCells[i].classList.contains("correct") && i % 2 == 1) {
                across3 = true
            } else if (nextCells[i] && nextCells[i].classList.contains("correct")) {
                down3 = true
            }

            if (element.parentElement.classList.contains("correct") && across3) {
                horizontal = false
                console.log("Down.")
            } else if (element.parentElement.classList.contains("correct") && down3) {
                horizontal = true
                console.log("Across.")
            } else if (element.parentElement.classList.contains("current-cell") && i == nextCells.length - 1 && down1 && across1) {
                horizontal = horizontal ? false : true
                console.log("Both ways.")
            } else if (i == nextCells.length - 1 && (down1 || down2) && (!across1 || !across2)) {
                horizontal = false
                console.log("Down.")
            } else if (i == nextCells.length - 1 && (across1 || across2) && (!down1 || !down2)) {
                horizontal = true
                console.log("Across.")
            }

        }

        /*
                if (element.parentElement.classList.contains("current-cell") && ((up && up.classList.contains("letter") && left && left.classList.contains("letter")) || (down && down.classList.contains("letter") && right && right.classList.contains("letter")) || (up && up.classList.contains("letter") && right && right.classList.contains("letter")) || (down && down.classList.contains("letter") && left && left.classList.contains("letter")))) {
                    horizontal = horizontal ? false : true
                } else if ((up && up.classList.contains("letter") && up.classList.contains("active")) || (down && down.classList.contains("letter")) && down.classList.contains("active")) {
                    horizontal = false
                } else if ((left && left.classList.contains("letter") && left.classList.contains("active")) || (right && right.classList.contains("letter") && right.classList.contains("active"))) {
                    horizontal = true
                } else if (element.parentElement.classList.contains("letter") && ((up && up.classList.contains("letter")) || (down && down.classList.contains("letter")))) {
                    horizontal = false
                } else if (element.parentElement.classList.contains("letter") && ((left && left.classList.contains("letter")) || (right && right.classList.contains("letter")))) {
                    horizontal = true
                }
        */

        Array.from(inputs).forEach(x => {
            x.parentElement.classList.remove("active", "current-cell")
            x.tabIndex = 0
        })
        element.parentElement.classList.add("active", "current-cell")
        element.tabIndex = 1


        if (horizontal && (left && left.classList.contains("letter") || right && right.classList.contains("letter"))) {
            for (i = c; i < tr.children.length; i++) {
                td = tr.children[i];
                if (td && td.classList.contains("letter")) {
                    td.classList.remove("incorrect")
                    td.classList.add("active")
                    td.querySelector(".crossword-input").tabIndex = 1
                } else {
                    break
                }
            }

            for (i = c; i < tr.children.length; i--) {
                td = tr.children[i];
                if (td && td.classList.contains("letter")) {
                    td.classList.remove("incorrect")
                    td.classList.add("active")
                    td.querySelector(".crossword-input").tabIndex = 1
                    number = td.querySelector(".number") != null ? td.querySelector(".number").innerHTML : ""
                } else {
                    break
                }
            }

        } else if (horizontal == false && (up && up.classList.contains("letter")) || (down && down.classList.contains("letter"))) {
            //If it's down
            for (i = r; i < tr.parentElement.children.length; i++) {
                td = tr.parentElement.children[i].children[c];
                if (td && td.classList.contains("letter")) {
                    td.classList.remove("incorrect")
                    td.classList.add("active")
                    td.querySelector(".crossword-input").tabIndex = 1
                } else {
                    break
                }
            }

            for (i = r; i < tr.parentElement.children.length; i--) {
                td = (tr.parentElement.children[i] && tr.parentElement.children[i].children[c]) ? tr.parentElement.children[i].children[c] : ""
                if (td && td.classList.contains("letter")) {
                    td.classList.remove("incorrect")
                    td.classList.add("active")
                    td.querySelector(".crossword-input").tabIndex = 1
                    number = td.querySelector(".number") != null ? td.querySelector(".number").innerHTML : ""
                } else {
                    break
                }
            }

        }
        h = horizontal ? "across" : "down"
        console.log(h, number)
        document.getElementById("clue-box").innerHTML = Array.from(document.getElementById(h).children).find(x => x.value == number).innerHTML
    }

    function check(word) {
        across = word.across
        c = word.column
        r = word.row
        w = word.word
        correct = true
        end = false

        if (across) {
            tr = grid.getElementsByTagName("tr")[r]

            for (i = 0; i < w.length; i++) {

                if (tr.children[i + c].querySelector(".crossword-input").value == "") {
                    break
                }

                if (end == false && tr.children[i + c].querySelector(".crossword-input").value != w[i].toUpperCase()) {
                    correct = false
                }

                if (end == false && i == w.length - 1) {
                    end = true
                    i = 0
                }

                if (end && correct) {
                    tr.children[i + c].classList.remove("incorrect")
                    tr.children[i + c].classList.add("correct")
                    word.correct = true
                    //tr.children[i+c].querySelector(".crossword-input").readOnly = true
                } else if (end && correct == false) {
                    tr.children[i + c].classList.remove("correct")
                    tr.children[i + c].classList.add("incorrect")
                    word.correct = false
                }

                console.log(end, correct, i)
                if (end && correct && i == w.length - 1) {
                    nextWord = gridMap.find(x => x.join == w && x.correct != true)
                    console.log(nextWord)
                    if (nextWord != undefined) {
                        td = grid.getElementsByTagName("tr")[nextWord.row].children[nextWord.column].querySelector(".crossword-input")
                        console.log(td.innerHTML, td.parentElement.classList.contains("correct"), horizontal)
                        td.parentElement.classList.add("current-cell")
                        td.focus()
                        td.click()
                        break
                    } else if (gridMap.find(x => x.correct != true) != undefined) {
                        nextWord = gridMap.find(x => x.correct != true)
                        td = grid.getElementsByTagName("tr")[nextWord.row].children[nextWord.column].querySelector(".crossword-input")
                        td.parentElement.classList.add("current-cell")
                        td.focus()
                        td.click()
                        break
                    }
                }

            }


        } else {

            for (i = 0; i < w.length; i++) {
                td = grid.getElementsByTagName("tr")[r + i].children[c]

                if (td.querySelector(".crossword-input").value == "") {
                    break
                }

                if (end == false && td.querySelector(".crossword-input").value != w[i].toUpperCase()) {
                    correct = false
                }

                if (end == false && i == w.length - 1) {
                    end = true
                    i = -1
                }

                if (end && correct) {
                    td.classList.remove("incorrect")
                    td.classList.add("correct")
                    word.correct = true
                    //td.querySelector(".crossword-input").readOnly = true
                } else if (end && correct == false) {
                    td.classList.remove("correct")
                    td.classList.add("incorrect")
                    word.correct = false
                }

                if (end && correct && i == w.length - 1) {
                    nextWord = gridMap.find(x => x.join == w && x.correct != true)
                    console.log(nextWord)
                    if (nextWord != undefined) {
                        td = grid.getElementsByTagName("tr")[nextWord.row].children[nextWord.column].querySelector(".crossword-input")
                        console.log(td.innerHTML, td.parentElement.classList.contains("correct"), horizontal)
                        td.parentElement.classList.add("current-cell")
                        td.focus()
                        td.click()
                        break
                    } else if (gridMap.find(x => x.correct != true)) {
                        nextWord = gridMap.find(x => x.correct != true)
                        td = grid.getElementsByTagName("tr")[nextWord.row].children[nextWord.column].querySelector(".crossword-input")
                        td.parentElement.classList.add("current-cell")
                        td.focus()
                        td.click()
                        break
                    }
                }

            }





        }
        console.log(word.correct)
        if (gridMap.filter(x => x.correct == true).length == gridMap.length && gameOver == false) {

        if (document.querySelector("#score-modal").querySelector("#import")) {
            document.querySelector("#score-modal").querySelector("#import").remove()
        }

        if (document.querySelector("#score-modal").querySelector("#crossword-passcode-submission")) {
            document.querySelector("#score-modal").querySelector("#crossword-passcode-submission").remove()
        }

            document.querySelector("#score-modal").parentElement.style.display = "flex";
            document.querySelector("#score-modal p").style.display = "block";
            document.querySelector("#score-modal p").innerHTML = "Well done!"
            gameOver = true
        }

    }

    /* generate();
     hide();
     document.getElementsByTagName("textarea")[0].style.display = "none"
     document.getElementsByTagName("button")[0].style.display = "none"
     document.getElementsByTagName("button")[1].style.display = "none"
     */

    function show() {
        Array.from(inputs).forEach(x => x.parentElement.classList.remove("active", "current-cell"))

        gridMap.forEach(word => {
            across = word.across
            c = word.column
            r = word.row
            w = word.word
            for (i = 0; i < w.length; i++) {
                if (across) {
                    td = grid.getElementsByTagName("tr")[r].children[i + c].querySelector(".crossword-input")
                    if (td.value != w[i]) {
                        td.value = w[i]
                        td.readOnly = true
                        td.parentElement.classList.add("show")
                    }
                } else {
                    td = grid.getElementsByTagName("tr")[i + r].children[c].querySelector(".crossword-input")
                    if (td.value != w[i]) {
                        td.value = w[i]
                        td.readOnly = true
                        td.parentElement.classList.add("show")
                    }
                }
            }
        })
    }