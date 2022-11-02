var numSelected = null;
var tileSelected = null;
var mCounter = 0;


//static starting board 
var starting_board = [
    "---38--29",
    "9---427--",
    "2--719--8",
    "-79---8-2",
    "4---7-5-6",
    "5629-----",
    "8---97--5",
    "61----987",
    "3----62-4"
]


//starting board solution needs to be randmoized
var solution = [
    "746385129",
    "981642753",
    "253719648",
    "179564832",
    "438271596",
    "562938471",
    "824197365",
    "615423987",
    "397856214"
]

//loads the needed functions
window.onload = function() {
    setGame();
    stopWatch();

}

function setGame() {
    // loop to make a the numbers row isnted of manually make it tile by tile
    for (let i = 1; i <= 9; i++) {
        //making a div for each number and giving it an even listner
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // loop to make a board isnted of manually make it tile by tile
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (starting_board[r][c] != "-") {
                tile.innerText = starting_board[r][c];
                tile.classList.add("tile-start");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}



// seleting a number from the number row to use on the board
function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}


//// seleting a tile on the board to use the number you slected from the numbers row
function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // making coords X / Y style to checking the solution easier
        let coords = this.id.split("-");
        let y = parseInt(coords[0]);
        let x = parseInt(coords[1]);


        //checks the coord of the soluotin both c and r 
        //to make sure that the right soolution else increases the mCounter by 1
        if (solution[y][x] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            mCounter += 1;
            document.getElementById("mCounter").innerText = mCounter;
        }
    }
}

//timer that counts up
let minute = 00;
let second = 00;
let count = 00;
timer = true

function stopWatch() {
    if (timer) {
        count++;
  
        if (count == 100) {
            second++;
            count = 0;
        }
  
        if (second == 60) {
            minute++;
            second = 0;
        }
  
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }
  
        let minString = minute;
        let secString = second;
        let countString = count;
  
  
        if (minute < 10) {
            minString = "0" + minString;
        }
  
        if (second < 10) {
            secString = "0" + secString;
        }
  
        if (count < 10) {
            countString = "0" + countString;
        }
  
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
    }
}
