// ==========================================
// SeikoVerse World Cup Predictor 2026
// Firebase Configuration
// ==========================================

const firebaseConfig = {

apiKey: "AIzaSyB9F-e3z77_ld5GlqgEfnljWkKWMHbj0Jg",

authDomain: "seikoverse-worldcup.firebaseapp.com",

projectId: "seikoverse-worldcup",

storageBucket: "seikoverse-worldcup.firebasestorage.app",

messagingSenderId: "1090742050255",

appId: "1:1090742050255:web:e0382191bb8820f49ec6ba",

measurementId: "G-1NT6E48950"

};

// ==========================================

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

// ==========================================

async function savePrediction(prediction){

const user = auth.currentUser;

if(!user){

throw new Error("User not logged in");

}

await db.collection("predictions").doc(user.uid).set({

uid:user.uid,

email:user.email,

prediction:prediction,

updatedAt:firebase.firestore.FieldValue.serverTimestamp()

});

}

// ==========================================

async function loadPrediction(){

const user = auth.currentUser;

if(!user) return null;

const doc = await db.collection("predictions").doc(user.uid).get();

if(!doc.exists) return null;

return doc.data();

}

// ==========================================

async function saveLeaderboard(name,points){

await db.collection("leaderboard").add({

player:name,

points:points,

createdAt:firebase.firestore.FieldValue.serverTimestamp()

});

}

// ==========================================

async function loadLeaderboard(){

const snapshot = await db.collection("leaderboard")

.orderBy("points","desc")

.limit(100)

.get();

let data=[];

snapshot.forEach(doc=>{

data.push(doc.data());

});

return data;

}

// ==========================================

auth.onAuthStateChanged(user=>{

if(user){

console.log("Logged:",user.email);

}else{

console.log("Guest");

}

});
