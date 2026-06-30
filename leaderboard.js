/*=========================================
LEADERBOARD
=========================================*/

const leaderboardBody =
document.getElementById("leaderboardBody");

async function refreshLeaderboard(){

if(!leaderboardBody) return;

leaderboardBody.innerHTML="";

try{

const players = await loadLeaderboard();

players.forEach((player,index)=>{

const row = document.createElement("tr");

row.innerHTML=`

<td>${index+1}</td>

<td>${player.player}</td>

<td>${player.points}</td>

`;

leaderboardBody.appendChild(row);

});

}catch(error){

console.error(error);

}

}

/*=========================================*/

document

.getElementById("leaderboardBtn")

.addEventListener("click",()=>{

const panel =

document.getElementById("leaderboardPanel");

panel.classList.toggle("hidden");

refreshLeaderboard();

});
/*=========================================
POINTS
=========================================*/

function calculatePoints(){

let points = 0;

document.querySelectorAll(".team.selected")

.forEach(()=>{

points += 3;

});

return points;

}

/*=========================================
SAVE SCORE
=========================================*/

saveBtn.addEventListener("click", async ()=>{

const user = auth.currentUser;

if(!user){

alert("Please login first.");

return;

}

const score = calculatePoints();

try{

await saveLeaderboard(

user.email,

score

);

refreshLeaderboard();

}catch(error){

console.error(error);

}

});

/*=========================================
AUTO REFRESH
=========================================*/

auth.onAuthStateChanged(user=>{

if(user){

refreshLeaderboard();

}

});

/*=========================================
END OF FILE
=========================================*/
