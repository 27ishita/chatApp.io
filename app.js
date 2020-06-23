var firebaseConfig = {
  apiKey: "AIzaSyDGE0d_5xDJicXKaiJgwxhLYwxgCWk3kAU",
  authDomain: "fir-basics-12747.firebaseapp.com",
  databaseURL: "https://fir-basics-12747.firebaseio.com",
  projectId: "fir-basics-12747",
  storageBucket: "fir-basics-12747.appspot.com",
  messagingSenderId: "869788468858",
  appId: "1:869788468858:web:0c68e0236c7509e1a3ddc3",
  measurementId: "G-0Z00W6HSCV",
};

firebase.initializeApp(firebaseConfig);

const messageScreen = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");
const db = firebase.database();
const msgRef = db.ref("/msg");
const id = uuid();

let name = "";
function init() {
  name = prompt("Please enter your name");
  msgRef.on("child_added", updateMsg);
}
document.addEventListener("DOMContentLoaded", init);

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = msgInput.value;

  if (!text.trim()) return;

  const msg = {
    id,
    name,
    text,
  };
  msgRef.push(msg);
  msgInput.value = "";

  return false;
});

const updateMsg = (data) => {
  const { id: userId, name, text } = data.val();
  const message = `<li class="msg ${id == userId && "my"}">
  <span> <i class="name">${name}: </i>${text} </span>
</li>`;
  messageScreen.innerHTML += message;
};

//msgRef.on("child_added", updateMsg);
