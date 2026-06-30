/*=========================================
ADMIN PANEL
=========================================*/

const ADMIN_EMAIL = "YOUR_ADMIN_EMAIL@gmail.com";

let isAdmin = false;

/*=========================================*/

auth.onAuthStateChanged(user=>{

if(!user){

isAdmin=false;

return;

}

isAdmin = (user.email === ADMIN_EMAIL);

if(isAdmin){

console.log("Admin Mode");

createAdminPanel();

}

});

/*=========================================*/

function createAdminPanel(){

if(document.getElementById("adminPanel")) return;

const panel = document.createElement("div");

panel.id="adminPanel";

panel.innerHTML=`

<h2>Admin Panel</h2>

<button id="loadPredictions">

Load Predictions

</button>

<button id="exportCSV">

Export CSV

</button>

<table>

<thead>

<tr>

<th>User</th>

<th>Champion</th>

</tr>

</thead>

<tbody id="predictionTable">

</tbody>

</table>

`;

document.body.appendChild(panel);

document

.getElementById("loadPredictions")

.addEventListener(

"click",

loadPredictions

);

document

.getElementById("exportCSV")

.addEventListener(

"click",

exportCSV

);

}

/*=========================================*/

async function loadPredictions(){

const body =

document.getElementById("predictionTable");

body.innerHTML="";

const snapshot =

await db.collection("predictions").get();

snapshot.forEach(doc=>{

const data = doc.data();

const row = document.createElement("tr");

row.innerHTML=`

<td>${data.email}</td>

<td>${data.prediction.champion}</td>

`;

body.appendChild(row);

});

}
/*=========================================
EXPORT CSV
=========================================*/

async function exportCSV(){

const snapshot = await db.collection("predictions").get();

let csv = "Email,Champion,Updated\n";

snapshot.forEach(doc=>{

const data = doc.data();

csv += `"${data.email}","${data.prediction.champion}","${data.updatedAt ? data.updatedAt.toDate() : ""}"\n`;

});

const blob = new Blob([csv],{

type:"text/csv;charset=utf-8;"

});

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;

link.download = "SeikoVerse_Predictions.csv";

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(url);

}

/*=========================================
DELETE PREDICTION
=========================================*/

async function deletePrediction(uid){

if(!isAdmin) return;

await db.collection("predictions").doc(uid).delete();

loadPredictions();

}

/*=========================================
RESET LEADERBOARD
=========================================*/

async function resetLeaderboard(){

if(!isAdmin) return;

const snapshot = await db.collection("leaderboard").get();

const batch = db.batch();

snapshot.forEach(doc=>{

batch.delete(doc.ref);

});

await batch.commit();

alert("Leaderboard Reset");

}

/*=========================================
END OF FILE
=========================================*/
