const board = document.getElementById("board");
const timerText = document.getElementById("timer");
const restartBtn = document.getElementById("restart");

let cards = ["🍎","🍎","🍌","🍌","🍇","🍇","🍓","🍓"];
let flipped = [];
let matched = 0;
let timeLeft = 60;
let timer;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  board.innerHTML = "";
  flipped = [];
  matched = 0;
  timeLeft = 60;
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

function flipCard(card) {
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
  timeLeft--;
  timerText.textContent = "Time: " + timeLeft;
  if (timeLeft <= 0) {
    alert("時間到！");
    clearInterval(timer);
  }
}

restartBtn.addEventListener("click", startGame);

startGame();
