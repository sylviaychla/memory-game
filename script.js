const board = document.getElementById("board");
const timerText = document.getElementById("timer");
const restartBtn = document.getElementById("restart");

let cards = ["🍎","🍎","🍌","🍌","🍇","🍇","🍓","🍓"];
let flipped = [];
let matched = 0;
let timeLeft = 60;
let timer = null;
let isPaused = false; // 新增：暫停狀態

function shuffle(array) {
return array.sort(() => Math.random() - 0.5);
}

function startGame() {
board.innerHTML = "";
flipped = [];
matched = 0;
timeLeft = 60;
isPaused = false;
timerText.textContent = "Time: 60";

shuffle(cards).forEach(symbol => {
const card = document.createElement("div");
card.className = "card";
card.dataset.symbol = symbol;
card.addEventListener("click", () => flipCard(card));
board.appendChild(card);
});

clearInterval(timer);
timer = setInterval(countDown, 1000);
}

// 按 Esc 切換暫停/恢復
function togglePause() {
if (isPaused) {
// 恢復
isPaused = false;
// 若遊戲已結束（timeLeft <=0 或已全配對）則不重啟計時器
if (timeLeft > 0 && matched < cards.length) {
clearInterval(timer);
timer = setInterval(countDown, 1000);
}
updateTimerText();
} else {
// 暫停
isPaused = true;
clearInterval(timer);
updateTimerText(true);
}
}

function updateTimerText(paused = false) {
if (paused) {
timerText.textContent = "Paused";
} else {
timerText.textContent = "Time: " + timeLeft;
}
}

function flipCard(card) {
if (isPaused) return; // 若暫停中，禁止翻牌
if (flipped.length === 2 || card.classList.contains("flipped")) return;

card.textContent = card.dataset.symbol;
card.classList.add("flipped");
flipped.push(card);

if (flipped.length === 2) {
checkMatch();
}
}

function checkMatch() {
const [a, b] = flipped;
if (a.dataset.symbol === b.dataset.symbol) {
matched += 2;
flipped = [];
if (matched === cards.length) {
alert("你贏了！");
clearInterval(timer);
}
} else {
setTimeout(() => {
a.textContent = "";
b.textContent = "";
a.classList.remove("flipped");
b.classList.remove("flipped");
flipped = [];
}, 800);
}
}

function countDown() {
if (isPaused) return;
timeLeft--;
updateTimerText();
if (timeLeft <= 0) {
alert("時間到！");
clearInterval(timer);
}
}

// 監聽 Esc 鍵（也支援按下 Esc 時輸入框沒有焦點）
document.addEventListener("keydown", (e) => {
if (e.key === "Escape") {
togglePause();
}
});

restartBtn.addEventListener("click", startGame);

startGame();