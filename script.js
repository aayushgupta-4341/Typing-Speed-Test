const quotes = [
"practice makes a person perfect",
"javascript is fun to learn",
"consistency is the key to success",
"code everyday to improve skills"
];

let startTime;
let timer;
let time = 0;

const quoteText = document.getElementById("quote");
const input = document.getElementById("input");
const timeText = document.getElementById("time");
const wpmText = document.getElementById("wpm");
const accText = document.getElementById("accuracy");

document.getElementById("startBtn").onclick = startTest;

function startTest(){
clearInterval(timer);

input.disabled = false;
input.value = "";
input.focus();

time = 0;
timeText.innerText = 0;

let randomQuote = quotes[Math.floor(Math.random()*quotes.length)];

quoteText.innerHTML = randomQuote
.split("")
.map(char => `<span>${char}</span>`)
.join("");

startTime = new Date();

timer = setInterval(()=>{
time++;
timeText.innerText = time;
},1000);
}

input.addEventListener("input", () => {
let typed = input.value.split("");
let spanChars = quoteText.querySelectorAll("span");

let correct = true;

spanChars.forEach((span, index) => {
let char = typed[index];

if(char == null){
span.classList.remove("correct","wrong");
correct = false;
}
else if(char === span.innerText){
span.classList.add("correct");
span.classList.remove("wrong");
}
else{
span.classList.add("wrong");
span.classList.remove("correct");
correct = false;
}
});

if(correct && typed.length === spanChars.length){
endTest();
}
});

function endTest(){
clearInterval(timer);
input.disabled = true;

let totalTime = (new Date() - startTime) / 1000;

let words = quoteText.innerText.split(" ").length;
let wpm = Math.round((words / totalTime) * 60);
wpmText.innerText = wpm;

let typed = input.value;
let original = quoteText.innerText;

let correctChars = 0;
for(let i=0;i<typed.length;i++){
if(typed[i] === original[i]) correctChars++;
}

let accuracy = Math.round((correctChars / original.length) * 100);
accText.innerText = accuracy + "%";
}