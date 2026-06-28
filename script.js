document.addEventListener("DOMContentLoaded", () => {

if (window.lucide) {
    lucide.createIcons();
}
let heart = 72;
let hydration = 80;
let energy = 95;
let hunger = 75;

const heartRate = document.getElementById("heartRate");
const hydrationText = document.getElementById("hydration");
const energyText = document.getElementById("energy");
const hungerText = document.getElementById("hunger");

function updateDashboard(){

heart = 70 + Math.floor(Math.random()*10);

hydration = Math.max(0, hydration-1);

energy = Math.max(0, energy-1);

hunger = Math.max(0, hunger-1);

heartRate.textContent = heart+" BPM";

hydrationText.textContent = hydration+"%";

energyText.textContent = energy+"%";

hungerText.textContent = hunger+"%";

}

setInterval(updateDashboard,3000);

const live = document.getElementById("liveStatus");

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click",()=>{

live.innerHTML="🟢 Simulation Started.<br>Select a food item.";

});

document.getElementById("waterBtn").addEventListener("click",()=>{

hydration=Math.min(100,hydration+20);

hydrationText.textContent=hydration+"%";

live.innerHTML=`
<h3>💧 WATER</h3>

✔ Mouth → Swallowed

✔ Stomach → Passes quickly

✔ Small Intestine → Water absorbed

✔ Blood → Hydration increases

⏱ Digestion : 5-20 Minutes
`;

});

document.getElementById("fruitBtn").addEventListener("click",()=>{

energy=Math.min(100,energy+10);

energyText.textContent=energy+"%";

live.innerHTML=`
<h3>🍎 FRUIT</h3>

✔ Rich in Vitamins

✔ Fiber improves digestion

✔ Nutrients absorbed

⏱ Digestion : 30-60 Minutes
`;

});

document.getElementById("burgerBtn").addEventListener("click",()=>{

energy=Math.min(100,energy+5);

energyText.textContent=energy+"%";

live.innerHTML=`
<h3>🍔 BURGER</h3>

✔ High Fat Food

✔ Stomach secretes acid

✔ Protein digestion starts

✔ Small intestine digests fats

⏱ Digestion : 4-6 Hours
`;

});

document.getElementById("alcoholBtn").addEventListener("click",()=>{

heart+=5;

heartRate.textContent=heart+" BPM";

live.innerHTML=`
<h3>🍺 ALCOHOL</h3>

⚠ Rapid absorption

⚠ Liver breaks alcohol

⚠ Excess alcohol damages liver

⚠ Heart rate increases
`;

});

// ---------------- Live Step-by-Step Simulation ----------------

let simulationTimer = null;

const simulationData = {
water: {
title: "WATER",
steps: [
{ text: "Mouth: water is swallowed.", organ: null },
{ text: "Esophagus: water moves down by peristalsis.", organ: "esophagus" },
{ text: "Stomach: water passes through quickly.", organ: "stomach" },
{ text: "Small intestine: water is absorbed into the blood.", organ: "small" },
{ text: "Hydration increases in the body.", organ: null }
],
finish: "Digestion time: 5-20 minutes"
},
fruit: {
title: "FRUIT",
steps: [
{ text: "Mouth: chewing breaks fruit into small pieces.", organ: null },
{ text: "Stomach: acids soften the fruit.", organ: "stomach" },
{ text: "Small intestine: vitamins and sugar are absorbed.", organ: "small" },
{ text: "Large intestine: fiber supports healthy movement.", organ: "large" },
{ text: "Energy rises gently.", organ: null }
],
finish: "Digestion time: 30-60 minutes"
},
burger: {
title: "BURGER",
steps: [
{ text: "Mouth: chewing starts the process.", organ: null },
{ text: "Stomach: acid and pepsin begin protein digestion.", organ: "stomach" },
{ text: "Liver: bile helps break down fats.", organ: "liver" },
{ text: "Pancreas: enzymes help digest fats and proteins.", organ: "pancreas" },
{ text: "Small intestine: nutrients are absorbed slowly.", organ: "small" }
],
finish: "Digestion time: 4-6 hours"
},
alcohol: {
title: "ALCOHOL",
steps: [
{ text: "Stomach: alcohol begins rapid absorption.", organ: "stomach" },
{ text: "Small intestine: more alcohol enters the blood.", organ: "small" },
{ text: "Liver: alcohol is broken down.", organ: "liver" },
{ text: "Heart rate may increase.", organ: null },
{ text: "Too much alcohol can damage the liver.", organ: "liver" }
],
finish: "Liver processing depends on amount consumed"
}
};

function clearOrganHighlight(){
["esophagus","stomach","liver","pancreas","small","large"].forEach(id=>{
const organ=document.getElementById(id);
if(organ){
organ.classList.remove("active-organ");
}
});
}

function renderSimulation(title,steps,activeIndex,finish){
live.innerHTML=`
<h3>${title}</h3>
<div class="simulation-progress">
${steps.map((step,index)=>{
const state=index<activeIndex?"done":index===activeIndex?"active":"";
return `<div class="simulation-step ${state}">${index+1}. ${step.text}</div>`;
}).join("")}
</div>
<p class="simulation-time">${activeIndex>=steps.length?finish:"Live simulation running..."}</p>
`;
}

function runLiveSimulation(type){
const simulation=simulationData[type];
let index=0;

if(simulationTimer){
clearInterval(simulationTimer);
}

clearOrganHighlight();
renderSimulation(simulation.title,simulation.steps,index,simulation.finish);

simulationTimer=setInterval(()=>{
clearOrganHighlight();

if(index<simulation.steps.length){
const organId=simulation.steps[index].organ;
if(organId){
const organ=document.getElementById(organId);
if(organ){
organ.classList.add("active-organ");
}
}

renderSimulation(simulation.title,simulation.steps,index,simulation.finish);
index++;
return;
}

clearInterval(simulationTimer);
simulationTimer=null;
clearOrganHighlight();
renderSimulation(simulation.title,simulation.steps,simulation.steps.length,simulation.finish);
},1200);
}

startBtn.addEventListener("click",()=>{
document.getElementById("simulation").scrollIntoView({behavior:"smooth"});
runLiveSimulation("water");
});

document.getElementById("waterBtn").addEventListener("click",()=>{
runLiveSimulation("water");
});

document.getElementById("fruitBtn").addEventListener("click",()=>{
runLiveSimulation("fruit");
});

document.getElementById("burgerBtn").addEventListener("click",()=>{
runLiveSimulation("burger");
});

document.getElementById("alcoholBtn").addEventListener("click",()=>{
runLiveSimulation("alcohol");
});

// ---------------- Organ Information ----------------

const organDescription=document.getElementById("organDescription");

const organData={

mouthInfo:"<h3>👄 Mouth</h3>Digestion begins here. Saliva contains amylase which starts carbohydrate digestion.",

esophagusInfo:"<h3>Esophagus</h3>Moves food into the stomach using peristalsis.",

stomachInfo:"<h3>Stomach</h3>Hydrochloric acid and pepsin digest proteins.",

liverInfo:"<h3>Liver</h3>Produces bile to digest fats.",

pancreasInfo:"<h3>Pancreas</h3>Produces digestive enzymes and insulin.",

smallInfo:"<h3>Small Intestine</h3>Most nutrients are absorbed here.",

largeInfo:"<h3>Large Intestine</h3>Absorbs water and forms feces."

};

Object.keys(organData).forEach(id=>{

const btn=document.getElementById(id);

if(btn){

btn.addEventListener("click",()=>{

organDescription.innerHTML=organData[id];

});

}

});

// SVG Organ Click

const map={

esophagus:"esophagusInfo",

stomach:"stomachInfo",

liver:"liverInfo",

pancreas:"pancreasInfo",

small:"smallInfo",

large:"largeInfo"

};

Object.keys(map).forEach(id=>{

const organ=document.getElementById(id);

if(organ){

organ.addEventListener("click",()=>{

document.getElementById(map[id]).click();

});

}

});
// ---------------- Quiz ----------------

const quiz = [

{
question:"Where does digestion begin?",
options:["Mouth","Stomach","Liver","Small Intestine"],
answer:"Mouth"
},

{
question:"Which organ produces bile?",
options:["Liver","Kidney","Heart","Lungs"],
answer:"Liver"
},

{
question:"Which organ stores bile?",
options:["Gallbladder","Pancreas","Stomach","Colon"],
answer:"Gallbladder"
},

{
question:"Where are most nutrients absorbed?",
options:["Small Intestine","Large Intestine","Esophagus","Mouth"],
answer:"Small Intestine"
},

{
question:"Which acid is found in the stomach?",
options:["Hydrochloric Acid","Nitric Acid","Sulfuric Acid","Acetic Acid"],
answer:"Hydrochloric Acid"
},

{
question:"Which organ absorbs water?",
options:["Large Intestine","Liver","Pancreas","Stomach"],
answer:"Large Intestine"
},

{
question:"Which enzyme digests proteins?",
options:["Pepsin","Amylase","Lipase","Trypsin"],
answer:"Pepsin"
},

{
question:"Which organ secretes insulin?",
options:["Pancreas","Liver","Kidney","Heart"],
answer:"Pancreas"
},

{
question:"What is the function of saliva?",
options:[
"Starts carbohydrate digestion",
"Digests fats",
"Stores bile",
"Absorbs water"
],
answer:"Starts carbohydrate digestion"
},

{
question:"How many major organs are shown in this simulator?",
options:["6","7","8","9"],
answer:"6"
}

];

let currentQuestion = 0;
let score = 0;

const question = document.getElementById("question");
const options = document.getElementById("options");
const scoreText = document.getElementById("score");

function loadQuestion(){

if(currentQuestion>=quiz.length){

question.innerHTML="🎉 Quiz Completed";

options.innerHTML=`
<h2>Your Score : ${score}/${quiz.length}</h2>
`;

document.getElementById("nextQuestion").style.display="none";

return;

}

question.innerHTML=quiz[currentQuestion].question;

options.innerHTML="";

quiz[currentQuestion].options.forEach(option=>{

const btn=document.createElement("button");

btn.className="optionBtn";

btn.innerHTML=option;

btn.onclick=function(){

if(option===quiz[currentQuestion].answer){

btn.style.background="green";

score++;

scoreText.innerHTML=score;

}else{

btn.style.background="red";

}

Array.from(options.children).forEach(b=>{

b.disabled=true;

});

};

options.appendChild(btn);

});

}

loadQuestion();

document.getElementById("nextQuestion").addEventListener("click",()=>{

currentQuestion++;

loadQuestion();

});

document.getElementById("restartQuiz").addEventListener("click",()=>{

currentQuestion=0;

score=0;

scoreText.innerHTML=0;

document.getElementById("nextQuestion").style.display="inline-block";

loadQuestion();

});

}); // DOMContentLoaded Ends
