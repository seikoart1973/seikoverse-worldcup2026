/*=========================================
SeikoVerse World Cup Predictor 2026
Version 2.0
=========================================*/

const matches = document.querySelectorAll(".match");

const champion = document.getElementById("Champion");

const resetBtn = document.getElementById("resetBtn");

const undoBtn = document.getElementById("undoBtn");

const saveBtn = document.getElementById("saveBtn");

let history = [];

const bracket = {

L16: [
document.getElementById("L16-1"),
document.getElementById("L16-2"),
document.getElementById("L16-3"),
document.getElementById("L16-4"),
document.getElementById("R16-5"),
document.getElementById("R16-6"),
document.getElementById("R16-7"),
document.getElementById("R16-8")
],

QF: [
document.getElementById("QF-1"),
document.getElementById("QF-2"),
document.getElementById("QF-3"),
document.getElementById("QF-4")
],

SF: [
document.getElementById("SF-1"),
document.getElementById("SF-2")
]

};

matches.forEach((match,index)=>{

const teams = match.querySelectorAll(".team");

teams.forEach(team=>{

team.addEventListener("click",()=>{

selectWinner(match,index,team);

});

});

});

function clearSelection(match){

match.querySelectorAll(".team").forEach(t=>{

t.classList.remove("selected");

});

}
function selectWinner(match,index,team){

clearSelection(match);

team.classList.add("selected");

history.push({

match:match,

index:index,

winner:team

});

const winnerName = team.querySelector("span").innerText;

advanceWinner(index,winnerName);

checkChampion();

}

/*========================================*/

function advanceWinner(index,name){

if(index<=3){

bracket.L16[index].innerHTML=name;

bracket.L16[index].classList.add("active");

return;

}

if(index<=7){

bracket.L16[index].innerHTML=name;

bracket.L16[index].classList.add("active");

return;

}

}

/*========================================*/

function moveToQuarter(){

if(

bracket.L16[0].innerText!=="" &&

bracket.L16[1].innerText!==""

){

bracket.QF[0].innerHTML=bracket.L16[0].innerText;

}

if(

bracket.L16[2].innerText!=="" &&

bracket.L16[3].innerText!==""

){

bracket.QF[1].innerHTML=bracket.L16[2].innerText;

}

if(

bracket.L16[4].innerText!=="" &&

bracket.L16[5].innerText!==""

){

bracket.QF[2].innerHTML=bracket.L16[4].innerText;

}

if(

bracket.L16[6].innerText!=="" &&

bracket.L16[7].innerText!==""

){

bracket.QF[3].innerHTML=bracket.L16[6].innerText;

}

}
/*========================================*/

function moveToSemi(){

if(

bracket.QF[0].innerText!=="" &&

bracket.QF[1].innerText!==""

){

bracket.SF[0].innerHTML=bracket.QF[0].innerText;

bracket.SF[0].classList.add("active");

}

if(

bracket.QF[2].innerText!=="" &&

bracket.QF[3].innerText!==""

){

bracket.SF[1].innerHTML=bracket.QF[2].innerText;

bracket.SF[1].classList.add("active");

}

}

/*========================================*/

function checkChampion(){

moveToQuarter();

moveToSemi();

if(

bracket.SF[0].innerText!=="" &&

bracket.SF[1].innerText!==""

){

champion.innerHTML=bracket.SF[0].innerText;

}

}

/*========================================*/

undoBtn.addEventListener("click",()=>{

if(history.length===0)return;

const last=history.pop();

last.winner.classList.remove("selected");

champion.innerHTML="Champion";

});

/*========================================*/

resetBtn.addEventListener("click",()=>{

matches.forEach(match=>{

match.querySelectorAll(".team").forEach(team=>{

team.classList.remove("selected");

});

});

history=[];

champion.innerHTML="Champion";

bracket.L16.forEach(slot=>{

slot.innerHTML="<span>Winner</span>";

slot.classList.remove("active");

});

bracket.QF.forEach(slot=>{

slot.innerHTML="<span>Quarter</span>";

slot.classList.remove("active");

});

bracket.SF.forEach(slot=>{

slot.innerHTML="<span>Semi Final</span>";

slot.classList.remove("active");

});

});
/*=========================================
SAVE PREDICTION
=========================================*/

saveBtn.addEventListener("click", async () => {

const prediction = {

champion: champion.innerText,

round16: bracket.L16.map(slot => slot.innerText),

quarterFinal: bracket.QF.map(slot => slot.innerText),

semiFinal: bracket.SF.map(slot => slot.innerText),

createdAt: new Date().toISOString()

};

try{

if(typeof savePrediction==="function"){

await savePrediction(prediction);

alert("Prediction Saved Successfully");

}else{

console.log(prediction);

alert("Prediction Ready");

}

}catch(error){

console.error(error);

alert("Save Failed");

}

});

/*=========================================
UTILITY
=========================================*/

function getSelectedTeams(){

const teams=[];

document.querySelectorAll(".team.selected").forEach(team=>{

teams.push(

team.querySelector("span").innerText

);

});

return teams;

}

/*=========================================
INITIALIZE
=========================================*/

window.addEventListener("load",()=>{

champion.innerHTML="Champion";

console.log("SeikoVerse Predictor Ready");

});

/*=========================================
END OF FILE
=========================================*/
