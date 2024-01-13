---
layout: project
title: "Crossword Puzzle Generator"
permalink: /projects/crossword-puzzle-generator
collection: projects
complete: "100%"
started: "September 2023"
scope: "ESL, Vocabulary"
---
# Crafting *cryptogryphon*: The Tale of a Crossword Puzzle Generator

In the realm of web development, where creativity meets code, [*cryptogryphon*](/projects/cryptogryphon/create) was born. This crossword puzzle generator is not just a tool; it's a product of inspiration, motivation, and a deep dive into the intricacies of programming. Join me on this journey behind the scenes of *cryptogryphon*'s development.

![cyptogryphon logo](/projects/cryptogryphon/cryptogryphon-logo.svg "cryptogryphon")

## **Inspiration Strikes**

Every project has its spark, and *cryptogryphon* was ignited by a passion for crosswords. As a developer and crossword enthusiast, I envisioned a tool that seamlessly blends the joy of creating puzzles with the power of modern web technologies.

However, making it happen wasn't as easy as it seems now that cryptogryphon is up and running. For the longest time, I considered building a crossword in JavaScript as a mission impossible for a developer like myself, so it's pretty much like crossing out an item on my bucket list. Let me walk you through how this all came about!

## **Motivation to Create**

The motivation was twofold. First, to build a tool that simplifies crossword generation, putting the user in control. Second, to contribute something valuable to the community of crossword lovers, educators, and puzzle enthusiasts.

## **The Working Process**

### **1. Ideation**
The journey began with ideation – conceptualizing the features that would set *cryptogryphon* apart. The goal was to create a user-friendly interface that accommodates both beginners and seasoned crossword creators.

### **2. Designing the Interface**
Crafting an intuitive interface was crucial. From adding words to generating crosswords, every step needed to feel natural and seamless. The design focused on simplicity without compromising functionality.

### **3. Dynamic Crossword Generation**
One of the core features is dynamic crossword generation. Behind the scenes, the generator intelligently places words on the grid.

The generation process starts by sorting words based on length, from longer to shorter. Cryptogryphon's generator then attempts to place each word on the grid, one by one. It looks for the first valid position relative to the previous word. If a word can't fit, a backtracking mechanism comes into play. This ensures that every word finds its place on the grid. If a word doesn't fit, users are prompted to provide additional words.

### **4. Technical Implementation**
*cryptogryphon* is more than an interface; it's a robust web application. The technical implementation involved HTML, CSS, and JavaScript. The use of XMLHttpRequest and fetch facilitated communication with external resources, ensuring a dynamic and responsive user experience.

![cyptogryphon and Google](/projects/cryptogryphon/cryptogryphon-and-google.png "cryptogryphon and Google")

When the generation takes place, it directly sends data to a Google Form, fetching the form link as a formResponse. This data is subsequently transferred to a Google Spreadsheet. The generator creates a sharing link that the *getCrossword(id)* function parses.

Using an XMLHttpRequest from the Spreadsheet, the function locates the correct crossword when the crossword link is opened. Sharing the passcode isn't solely a privacy aspect; it's also an educational decision. While students revising known words may not need the passcode, sharing it becomes essential when new vocabulary items are introduced. This empowers students to independently check and learn new words in the crossword.

### **5. Import and Export Functionality**
To enhance usability, *cryptogryphon* supports importing word-clue pairs from CSV/TSV or JSON formats. This feature bridges the gap between *cryptogryphon* and other crossword platforms, drawing inspiration from the likes of Half-A-Crossword, Crossword Labs, and Puzzel.org.

### **6. Naming the Baby**
As soon as the crossword generator functions and the user interface were finished, there was nothing else to do than giving a proper name to my crossword generator (other than the working title "crossword-generator").

The name *cryptogryphon* aims to convey the cryptic and fantastic nature of puzzle-solving with the griffin (originally spelt as 'gryphon'), the legendary creature of the ancient Greek. Their treasure is only for the bravest to get, just as much as crosswords are only for the most enduring and the most creative to solve.

## **Conclusion: A Puzzle Unveiled**

*cryptogryphon* is more than a crossword generator; it's a testament to the marriage of creativity and technology. The journey from ideation to implementation reflects a commitment to providing users with an inspiring and empowering tool.

As *cryptogryphon* takes its place in the world of crossword enthusiasts, the story continues. Future updates, driven by user feedback, will enhance the experience and keep the puzzle-solving community engaged.

Ready to dive into the world of *cryptogryphon*? Explore <a href="/projects/cryptogryphon/create">the crossword generator</a> now!