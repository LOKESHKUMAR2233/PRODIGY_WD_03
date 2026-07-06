const cells=document.querySelectorAll(".cell");

const status=document.getElementById("status");

const restartBtn=document.getElementById("restartBtn");

const modeBtn=document.getElementById("modeBtn");

const themeBtn=document.getElementById("themeBtn");

let board=["","","","","","","","",""];

let currentPlayer="X";

let running=true;

let vsComputer=false;

let xScore=localStorage.getItem("x")||0;
let oScore=localStorage.getItem("o")||0;
let drawScore=localStorage.getItem("d")||0;

document.getElementById("xScore").textContent=xScore;
document.getElementById("oScore").textContent=oScore;
document.getElementById("drawScore").textContent=drawScore;

const wins=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

cells.forEach((cell,index)=>{

cell.addEventListener("click",()=>cellClick(index));

});

function cellClick(index){

if(board[index]!=""||!running) return;

board[index]=currentPlayer;

cells[index].textContent=currentPlayer;

checkWinner();

if(vsComputer&&running&&currentPlayer=="O"){

setTimeout(aiMove,500);

}

}

function changePlayer(){

currentPlayer=currentPlayer=="X"?"O":"X";

status.textContent="Player "+currentPlayer+" Turn";

}

function checkWinner(){

let won=false;

wins.forEach(pattern=>{

const[a,b,c]=pattern;

if(board[a]&&board[a]==board[b]&&board[b]==board[c]){

won=true;

cells[a].classList.add("win");

cells[b].classList.add("win");

cells[c].classList.add("win");

}

});

if(won){

status.textContent=currentPlayer+" Wins!";

running=false;

updateScore(currentPlayer);

return;

}

if(!board.includes("")){

status.textContent="Draw!";

running=false;

drawScore++;

localStorage.setItem("d",drawScore);

document.getElementById("drawScore").textContent=drawScore;

return;

}

changePlayer();

}

function aiMove(){

let empty=[];

board.forEach((v,i)=>{

if(v=="") empty.push(i);

});

if(empty.length==0) return;

let random=empty[Math.floor(Math.random()*empty.length)];

cellClick(random);

}

function updateScore(player){

if(player=="X"){

xScore++;

localStorage.setItem("x",xScore);

document.getElementById("xScore").textContent=xScore;

}else{

oScore++;

localStorage.setItem("o",oScore);

document.getElementById("oScore").textContent=oScore;

}

}

restartBtn.onclick=()=>{

board=["","","","","","","","",""];

running=true;

currentPlayer="X";

status.textContent="Player X Turn";

cells.forEach(c=>{

c.textContent="";

c.classList.remove("win");

});

}

modeBtn.onclick=()=>{

vsComputer=!vsComputer;

modeBtn.textContent=vsComputer?

"Two Player Mode":

"Play Vs Computer";

restartBtn.click();

}

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

themeBtn.textContent=document.body.classList.contains("dark")

?"☀️ Light Mode"

:"🌙 Dark Mode";

}