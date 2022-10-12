const board = document.querySelector("#board"); //Find the board

let hoverMode = false;  //Initialize booleans for hovering and random color modes
let randomMode = false;

let colorErased = "#fefefe";    //Initialize color for eraizer mode

let colorSelector = document.querySelector("#colorPicker"); //Find color picker
let colorSelected = colorSelector.value;

let sizeSlider = document.querySelector("#sizeSlider");     //Find size selector
let sizeIndicator = document.querySelector("#sizeIndicator");

const nodeList = fillBoard(16); //Fill the board with initial divs and collect them to Node List

colorSelector.addEventListener("change", () => colorSelected = colorSelector.value);    //On change modify the global color value
sizeSlider.addEventListener("mousemove", (e) => sizeIndicator.innerHTML = e.target.value + " x " + e.target.value); //Change dynamically the value of board size if slider is moved
sizeSlider.addEventListener("change", resizeBoard); //Change board size if size slider's value is changed

const buttons = document.querySelectorAll("button");  //Find all buttons and on click perform related activity
buttons.forEach(
    function(node) {
      node.addEventListener("click", function() {

        if (node.id === "rainbowMode") {
            randomMode = true;
        }

        if (node.id === "colorMode") {
            colorSelected = colorSelector.value;
            randomMode = false;
        }

        if (node.id === "eraiser") {
            colorSelected = colorErased;
            randomMode = false;
        }

        if (node.id === "clear") {
            nodeList.forEach(removeColor);
            return;
        }

        if (node.id === "mode") {
            const modeStatus = document.querySelector("#modeStatus");
            switch(true) {
                case (modeStatus.innerHTML=="Mode: draw by pressing mouse wheel"):
                    modeStatus.innerHTML="Mode: draw by hovering";
                    hoverMode = true;
                    break;
                case (modeStatus.innerHTML=="Mode: draw by hovering"):
                    modeStatus.innerHTML="Mode: draw by pressing mouse wheel"
                    hoverMode = false;
                    break;
            }
            return;
        }

        buttons.forEach(function(node) {    //Remove active style from previous button, unless the clicked is clear or mode
            node.classList.remove("active");
        })
            
        node.classList.toggle("active");
        return;
      })
    }
  );

function addColor(e) {  //Add color to div on the board in accordance with selected modes
    if(e.buttons === 4 || hoverMode){
        if (randomMode) 
            {this.style.backgroundColor = returnRandomColor();}
        else 
            {this.style.backgroundColor = colorSelected;}
     }
}

function removeColor(node) {    //Clears all divs on the board
    node.style.backgroundColor = "#fefefe";
}


function returnRandomColor() {  //Return random color
    let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

function fillBoard(sizeValue) { //Fill the board with divs according to the given size

    let newRow;
    let newSquare;
    const nodeList = [];

    for (let i = 0; i < sizeValue; i++) {

        newRow = document.createElement("div"); //Create a new row with applied style
        newRow.classList.add("flexRow");

        for (let n = 0; n < sizeValue; n++) {
            newSquare = document.createElement("div");  //Create new square of a given size
            newSquare.style.height = (500/sizeValue) + "px";
            newSquare.style.width = (500/sizeValue) + "px";
            nodeList.push(newSquare);                   //Add square to the global node list

            newSquare.addEventListener("mouseover", addColor, false);

            newRow.appendChild(newSquare); 
        }    
        
        board.appendChild(newRow);

    }
    return nodeList;
}

function resizeBoard(e) {   //Resize the board in accordance to defined parameter of size

    
    nodeList.splice(0, nodeList.length);    //Clear
    board.innerHTML = "";

    fillBoard(this.value).forEach(element => nodeList.push(element));   //Fill the board according to the new size and add elements to the node list

    return;
    
}