
var mode = 1;    // This variable is used to determine the mode of the game, Game mode 1 is Player VS Player, Game mode 2 is Player VS Random CPU, Game mode 3 is Player VS MiniMax AI.
var turn = 1;    // This variable is used to determine whose player is turn now , 1 is X turn and 0 is O turn.
var gameEnd = 0; // This variable is used to determine whether the game ended or not, 1 means game ended, 0 means game NOT ended yet.

var board = new Array(10).fill(0);  // This Array is the Game Board, from 1-9 (1-indexed) and its filled with zeros, which mean its currently empty, 1 means its played on, 0 means its empty, and so on.
var xBoard = new Array(10).fill(0); // This Array is the X board, from 1-9 (1-indexed) and its filled with zeros, which means its currently empty, this array gives you X player positions.
var oBoard = new Array(10).fill(0); // This Array is the O board, from 1-9 (1-indexed) and its filled with zeros, which means its currently empty, this array gives you O player positions.

// Squares intlization
var square1 = document.getElementById('square1');
var square2 = document.getElementById('square2');
var square3 = document.getElementById('square3');
var square4 = document.getElementById('square4');
var square5 = document.getElementById('square5');
var square6 = document.getElementById('square6');
var square7 = document.getElementById('square7');
var square8 = document.getElementById('square8');
var square9 = document.getElementById('square9');

function Start() {
    // This Function Start the Game, Start with the Pop Up Window to choose the game mode, and give you the abiliity to choose between squares and hover.

    Pop_Up_Window();
    Squares_Options();
    Squares_Hover();
}

function Pop_Up_Window() {
    // This function display the popup window which let you choose the game mode , and after you choose it popout.

    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    document.getElementById('mode1').addEventListener('click', function () { // Mode 1 is Player Vs Player
        mode = 1;
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    document.getElementById('mode2').addEventListener('click', function () { // Mode 2 is Player Vs Random CPU
        mode = 2;
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    document.getElementById('mode3').addEventListener('click', function () { // Mode 3 is Player Vs MiniMax AI
        mode = 3;
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });
}

function Squares_Options() {
    // This function gives you the ability to choose which square you will put your letter in.

    square1.onclick = function () { Play_Turn(1) };
    square2.onclick = function () { Play_Turn(2) };
    square3.onclick = function () { Play_Turn(3) };
    square4.onclick = function () { Play_Turn(4) };
    square5.onclick = function () { Play_Turn(5) };
    square6.onclick = function () { Play_Turn(6) };
    square7.onclick = function () { Play_Turn(7) };
    square8.onclick = function () { Play_Turn(8) };
    square9.onclick = function () { Play_Turn(9) };
}

function Squares_Hover() {
    // This function is for squares hovering , when you hover unplayed square , a grey letter is displayed to show you whose turn is and which square is the mouse pointing.

    square1.onmouseover = function () { if (!board[1] && !gameEnd) Grey_Letter(square1); };
    square2.onmouseover = function () { if (!board[2] && !gameEnd) Grey_Letter(square2); };
    square3.onmouseover = function () { if (!board[3] && !gameEnd) Grey_Letter(square3); };
    square4.onmouseover = function () { if (!board[4] && !gameEnd) Grey_Letter(square4); };
    square5.onmouseover = function () { if (!board[5] && !gameEnd) Grey_Letter(square5); };
    square6.onmouseover = function () { if (!board[6] && !gameEnd) Grey_Letter(square6); };
    square7.onmouseover = function () { if (!board[7] && !gameEnd) Grey_Letter(square7); };
    square8.onmouseover = function () { if (!board[8] && !gameEnd) Grey_Letter(square8); };
    square9.onmouseover = function () { if (!board[9] && !gameEnd) Grey_Letter(square9); };

    square1.onmouseleave = function () { if (!board[1] && !gameEnd) square1.innerHTML = '&nbsp;'; };
    square2.onmouseleave = function () { if (!board[2] && !gameEnd) square2.innerHTML = '&nbsp;'; };
    square3.onmouseleave = function () { if (!board[3] && !gameEnd) square3.innerHTML = '&nbsp;'; };
    square4.onmouseleave = function () { if (!board[4] && !gameEnd) square4.innerHTML = '&nbsp;'; };
    square5.onmouseleave = function () { if (!board[5] && !gameEnd) square5.innerHTML = '&nbsp;'; };
    square6.onmouseleave = function () { if (!board[6] && !gameEnd) square6.innerHTML = '&nbsp;'; };
    square7.onmouseleave = function () { if (!board[7] && !gameEnd) square7.innerHTML = '&nbsp;'; };
    square8.onmouseleave = function () { if (!board[8] && !gameEnd) square8.innerHTML = '&nbsp;'; };
    square9.onmouseleave = function () { if (!board[9] && !gameEnd) square9.innerHTML = '&nbsp;'; };
}

function Grey_Letter(square) {
    // This function place a grey letter in the chosen square, this function is used for the hover effect
    if (turn) {
        square.innerHTML = 'X';
        square.style.color = 'grey';
    }
    else {
        square.innerHTML = 'O';
        square.style.color = 'grey';
    }
}

function Play_Turn(numberOfSquare) {
    // This function place your letter on the square you chose before , and if its mode 2 or 3 , the CPU will play its turn too.

    if (!board[numberOfSquare] && !gameEnd) {
        Place_Letter(numberOfSquare);
        if (mode == 2) {
            Random_Player();
        }
        if (mode == 3) {
            Mini_Max_Player(board, xBoard, oBoard, false, true);
        }
    }
}

function Place_Letter(numberOfSquare) {
    // This function place the letter on the chosen square and changes the turn so the oppisite player can play its turn.

    let square = document.getElementById('square' + numberOfSquare);
    board[numberOfSquare] = 1;
    if (turn) {
        square.innerHTML = 'X';
        xBoard[numberOfSquare] = 1;
        square.style.color = 'black';
        Draw_Line_If_Win(xBoard);
    }
    else {
        square.innerHTML = 'O';
        oBoard[numberOfSquare] = 1;
        square.style.color = 'black';
        Draw_Line_If_Win(oBoard);
    }
    Change_Turn();


}

function Change_Turn() {
    // This function changes the Turn, it its X turn it makes it O turn and Vice Versa.

    turn = !turn;
}

function Number_Of_Empty_Squares() {
    // This function will give you the number of empty squares, mainly used to check for draw situation.

    let c = 0;
    for (let i = 1; i < 10; i++) {
        if (board[i] == 0)
            c++;
    }
    return c;
}

function Draw_Line_If_Win(board) {
    // This function draws a red winning line through winning squares.

    if (board[1] && board[2] && board[3]) {
        Game_Over("win");
        Horizental_Winning_Line(square2);
    }

    else if (board[4] && board[5] && board[6]) {
        Game_Over("win");
        Horizental_Winning_Line(square5);
    }

    else if (board[7] && board[8] && board[9]) {
        Game_Over("win");
        Horizental_Winning_Line(square8);
    }

    else if (board[1] && board[4] && board[7]) {
        Game_Over("win");
        Vertical_Winning_Line(square4);
    }

    else if (board[2] && board[5] && board[8]) {
        Game_Over("win");
        Vertical_Winning_Line(square5);
    }

    else if (board[3] && board[6] && board[9]) {
        Game_Over("win");
        Vertical_Winning_Line(square6);
    }

    else if (board[1] && board[5] && board[9]) {
        Game_Over("win");
        Diagonal_Winning_Line(square5, -45);
    }

    else if (board[3] && board[5] && board[7]) {
        Game_Over("win");
        Diagonal_Winning_Line(square5, 45);
    }

    else {
        if (Number_Of_Empty_Squares() == 0) // draw
            Game_Over("draw");
    }
}

function Horizental_Winning_Line(square) {
    // This function draws a Red Winning Line horizontally, We use it in case of Row-Winning Game, The line is based on the middle square between winning squares.

    const lineSpan = document.createElement('span');
    lineSpan.style.display = 'block';
    lineSpan.style.position = 'absolute';
    lineSpan.style.width = '5px';
    lineSpan.style.height = '380px';
    lineSpan.style.backgroundColor = 'darkred';
    lineSpan.style.transform = 'rotate(90deg)';

    square.appendChild(lineSpan);
}

function Vertical_Winning_Line(square) {
    // This function draws a Red Winning Line Vertically, We use it in case of Column-Winning Game, The line is based on the middle square between winning squares.

    const lineSpan = document.createElement('span');
    lineSpan.style.display = 'block';
    lineSpan.style.position = 'absolute';
    lineSpan.style.width = '5px';
    lineSpan.style.height = '380px';
    lineSpan.style.backgroundColor = 'darkred';

    square.appendChild(lineSpan);
}

function Diagonal_Winning_Line(square, degree) {
    // This function draws a Red Winning line diagonally, We Use it in case of Diagonal-Winning Game, The line is based on the middle square between winning squares.

    const lineSpan = document.createElement('span');
    lineSpan.style.display = 'block';
    lineSpan.style.position = 'absolute';
    lineSpan.style.width = '5px';
    lineSpan.style.height = '450px';
    lineSpan.style.backgroundColor = 'darkred';
    lineSpan.style.transform = 'rotate(' + degree + 'deg)';

    square.appendChild(lineSpan);
}

function Random_Player() {
    // This function is for Game Mode 2, where the player play vs Random CPU, it place the letter on random empty square as a play move.

    if (!gameEnd) {
        var position = Get_Random_Empty_Position();
        Place_Letter(position);
    }
}

function Get_Random_Empty_Position() {
    // This function return random position for empty square.

    let emptySquares = [];
    for (let i = 1; i < 10; i++) {
        if (board[i] == 0)
            emptySquares.push(i);
    }

    const randomKey = emptySquares[Math.floor(Math.random() * emptySquares.length)];

    return randomKey;
}

function Mini_Max_Player(board, xBoard, oBoard, isMaximize, firstTime) {
    // This function uses the MiniMax Algorithm to get the BEST possible move for opponent and play it aswell.

    if (Check_Win(xBoard)) // If you win
        return 1;
    else if (Check_Win(oBoard)) // If you lose
        return -1;
    else if (Number_Of_Empty_Squares() == 0) // Draw
        return 0;

    if (isMaximize) { // Maximise
        let finalscore = -10;
        let bestMove = 0;
        for (let i = 1; i < 10; i++) { // Check for empty squares
            if (board[i] == 0) {

                board[i] = 1; xBoard[i] = 1; // Play (DO)

                let score = Mini_Max_Player(board, xBoard, oBoard, false, false); // Check every possible move (Recursivly)

                board[i] = 0; xBoard[i] = 0;  // Remove The letter to check another path (UnDO)

                if (score > finalscore) { // To get the maximum score possible.
                    finalscore = score;
                    bestMove = i;
                }
            }
        }
        if (firstTime) { // After we found the best possible move, we play it here.
            Place_Letter(bestMove);
        }
        return finalscore;
    }
    else { // Minimise , same as Maximise but we try to minimize the score.
        let finalscore = 10;
        let bestMove = 0;
        for (let i = 1; i < 10; i++) {
            if (board[i] == 0) {
                board[i] = 1;
                oBoard[i] = 1;
                let score = Mini_Max_Player(board, xBoard, oBoard, true, false);
                board[i] = 0;
                oBoard[i] = 0;
                if (score < finalscore) { // To get the minimum score possible.
                    finalscore = score;
                    bestMove = i;
                }
            }
        }
        if (firstTime) {
            Place_Letter(bestMove);
        }
        return finalscore;
    }
}

function Check_Win(board) {
    // This function checks if the chosen board(player) has Won in every case possible.

    if (board[1] && board[2] && board[3]) {
        return true;
    }

    else if (board[4] && board[5] && board[6]) {
        return true;
    }

    else if (board[7] && board[8] && board[9]) {
        return true;
    }

    else if (board[1] && board[4] && board[7]) {
        return true;
    }

    else if (board[2] && board[5] && board[8]) {
        return true;
    }

    else if (board[3] && board[6] && board[9]) {
        return true;
    }

    else if (board[1] && board[5] && board[9]) {
        return true;
    }

    else if (board[3] && board[5] && board[7]) {
        return true;
    }
}

function Reset_Game() {
    // This function is used to reset the game whenever the players please.

    turn = 1;
    gameEnd = 0;

    board.fill(0);
    xBoard.fill(0);
    oBoard.fill(0);

    square1.innerHTML = "&nbsp;";
    square2.innerHTML = "&nbsp;";
    square3.innerHTML = "&nbsp;";
    square4.innerHTML = "&nbsp;";
    square5.innerHTML = "&nbsp;";
    square6.innerHTML = "&nbsp;";
    square7.innerHTML = "&nbsp;";
    square8.innerHTML = "&nbsp;";
    square9.innerHTML = "&nbsp;";
    msg.innerHTML = "&nbsp;";

    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function Game_Over(result) {
    // This function is used to officially End the game and display the result as a message.

    if (result == "win") {
        if (turn)
            win = "X";
        else
            win = "O"

        msg.innerHTML = 'Game Over, Winner is ' + win;
    }
    else
        msg.innerHTML = 'Draw!';

    gameEnd = 1;
}

window.addEventListener("load", Start, false); // START HERE