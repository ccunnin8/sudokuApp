# Author: Corey Cunningham
# Project: CS 325 Portfolio Project: Sudoku 
# Description: Implementation of Sudoku game


# ABOUT THIS PROJECT 

This is an implementation of the game sudoku, a puzzle game played on a 9x9 board
Where a board is solved if:
1. all columns have unique numbers 1-9
2. all rows have unique numbers 1-9
3. all 3x3 square have unique numbers 1-9 

This game was created using node v15.10.0
The command line version of the game can be played by navigating to the root of this folder and running:

<strong>must install dependencies first<strong>

``
$: npm install
$: node sudokuCommandLine.js 
``


# GUI (MacOS)
Additionally, a GUI has been created using react and electron to create a macOS app
The app is located in the root folder, titled sudoku 

### NOTE:

I should've obviously created a clear button, because hitting solve if you've already entered incorrect input will replace blank spaces with solved input but not replaced your incorrectly inputed values. You must manually erase them and then hit solve 


# GUI (Other)
I am included built versions of the react app, but to build the app one would run 

```
$: npm install 
$: npm run react-scripts build 
```

If you woud like to play the GUI version and are on another platform (Windows 10 or Linux) the game can be played in the browser. To do so, navigate to the build folder and open index.html 


