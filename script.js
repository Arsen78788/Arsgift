
let tg = window.Telegram.WebApp;
tg.expand();

const prizes = [
  { name: "Ничего", image: "nothing.png" },
  { name: "Анимированный подарок", image: "animated.png" },
  { name: "Стикерпак Telegram", image: "stickers.png" },
  { name: "Telegram Premium", image: "premium.png" },
  { name: "Редкая тема Telegram", image: "theme.png" }
];

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");

let position = 0;
let speed = 0;
let isSpinning = false;

function preloadImages(callback) {
  let loaded = 0;
  prizes.forEach(prize => {
    const img = new Image();
    img.src = prize.image;
    img.onload = () => {
      prize.img = img;
      loaded++;
      if (loaded === prizes.length) callback();
    };
  });
}

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let x = -position % (prizes.length * 120);
  for (let i = 0; i < prizes.length * 3; i++) {
    let prize = prizes[i % prizes.length];
    ctx.fillStyle = "#eee";
    ctx.fillRect(x + i * 120, 20, 100, 100);
    ctx.drawImage(prize.img, x + i * 120 + 10, 30, 80, 80);
  }

  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 10, 10);
  ctx.lineTo(canvas.width / 2 + 10, 10);
  ctx.lineTo(canvas.width / 2, 30);
  ctx.fill();
}

function animate() {
  if (!isSpinning) return;
  position += speed;
  speed *= 0.97;

  drawWheel();

  if (speed < 0.5) {
    isSpinning = false;
    showResult();
    return;
  }

  requestAnimationFrame(animate);
}

function showResult() {
  let index = Math.floor(((position + canvas.width / 2 - 60) / 120)) % prizes.length;
  const prize = prizes[index];
  resultDiv.innerText = `Ты выиграл: ${prize.name}`;
}

spinBtn.addEventListener("click", () => {
  if (isSpinning) return;
  resultDiv.innerText = "";
  speed = Math.random() * 30 + 30;
  isSpinning = true;
  animate();
});

preloadImages(() => {
  drawWheel();
});
    