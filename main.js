const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];
let fallingStars = [];
const numFallingStars = 10;
const numStars = 150;
let toggleFlag = true;

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const setup = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      radius: random(0.5, 1.5),
      alpha: random(0.3, 1),
      alphaChange: random(0.005, 0.015),
      speedX: random(-0.05, 0.05),
      speedY: random(0.02, 0.1),
    });
  }

  fallingStars = [];

  for (let i = 0; i < numFallingStars; i++) {
    fallingStars.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      radius: random(0.8, 2.0),
      speed: random(0.5, 1),
    });
  }
};

let fallingStarsActive = false;
let animationFrameId = null;

function animateFallingStars() {
  if (!fallingStarsActive) return;

  fallingStars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    star.x += -star.speed;
    star.y += star.speed;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = random(0, canvas.width);
      star.radius = random(0.8, 2.0);
      star.speed = random(1, 3);
    }
  });
  animationFrameId = requestAnimationFrame(animateFallingStars);
}

const MagicTimeFall = (hours, minutes, seconds) => {
  if (hours === minutes && seconds < 10) {
    fallingStarsActive = true;
    animateFallingStars();
  } else {
    fallingStarsActive = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.alpha += star.alphaChange;
    if (star.alpha <= 0.3 || star.alpha >= 1)
      star.alphaChange = -star.alphaChange;
    star.x += star.speedX;
    star.y += star.speedY;
    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y > canvas.height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", setup);

setup();
animate();

// Clouds setup
const cloudCanvas = document.getElementById("cloudfield");
const cloudCtx = cloudCanvas.getContext("2d");

let clouds = [];
const numClouds = 10;

const setupClouds = () => {
  cloudCanvas.width = window.innerWidth;
  cloudCanvas.height = window.innerHeight;
  clouds = [];
  for (let i = 0; i < numClouds; i++) {
    clouds.push({
      x: random(0, cloudCanvas.width),
      y: random(0, (cloudCanvas.height / 3) * 2),
      size: random(70, 200),
      speed: random(0.05, 0.2),
    });
  }
};

const drawCloud = (x, y, size) => {
  cloudCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
  cloudCtx.beginPath();
  cloudCtx.arc(x, y, size * 0.3, Math.PI * 0.5, Math.PI * 1.5);
  cloudCtx.arc(
    x + size * 0.5,
    y - size * 0.3,
    size * 0.4,
    Math.PI * 1,
    Math.PI * 1.85
  );
  cloudCtx.arc(x + size, y, size * 0.3, Math.PI * 1.37, Math.PI * 0.37, true);
  cloudCtx.closePath();
  cloudCtx.fill();
};

const animateClouds = () => {
  cloudCtx.clearRect(0, 0, cloudCanvas.width, cloudCanvas.height);
  clouds.forEach((cloud) => {
    cloud.x += cloud.speed;
    if (cloud.x - cloud.size > cloudCanvas.width) {
      cloud.x = -cloud.size;
      cloud.y = random(0, cloudCanvas.height / 2);
      cloud.size = random(50, 120);
      cloud.speed = random(0.05, 0.2);
    }
    drawCloud(cloud.x, cloud.y, cloud.size);
  });
  requestAnimationFrame(animateClouds);
};

setupClouds();
animateClouds();
// animateFallingStars();

const secondHand = document.querySelector(".second-hand");
const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".min-hand");
const dataDisplay = document.querySelector(".display-text");
const HandSelector = document.querySelector(".hand ");
const clock = document.querySelector(".clock");
const button = document.getElementById("btn");
//clock setup

const changeBG = (hour) => {
  if (!toggleFlag) {
    canvas.style.display = "block";
    clock.classList.add("alt");
    return;
  }

  if (hour >= 18 || hour <= 7) {
    canvas.style.display = "block";
    clock.classList.add("alt");

    return;
  } else {
    canvas.style.display = "none";
    clock.classList.remove("alt");
  }
};

button.addEventListener("click", () => {
  toggleFlag = !toggleFlag;

  if (toggleFlag) {
    canvas.style.display = "block";
  } else {
    canvas.style.display = "none";
  }
  changeBG(new Date().getHours());
});

const setRotation = (hand, degree) => {
  if (degree === 90) {
    hand.style.transition = "none";
    hand.style.transform = `rotate(${degree}deg)`;

    hand.offsetHeight;

    hand.style.transition = "all 0.05s ease-in-out";
  } else {
    hand.style.transform = `rotate(${degree}deg)`;
  }
};

const setDate = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  // console.log(seconds);
  const secondsDegree = (seconds / 60) * 360 + 90;

  const hoursDegree = ((hours % 12) + minutes / 60) * 30 + 90;

  const minutesDegree = (minutes / 60) * 360 + 90;

  setRotation(minuteHand, minutesDegree);
  setRotation(secondHand, secondsDegree);
  setRotation(hourHand, hoursDegree);

  dataDisplay.textContent = `${hours.toString().padStart(2, "0")} : ${minutes
    .toString()
    .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;

  changeBG(hours);
  MagicTimeFall(hours, minutes, seconds);
};
setInterval(setDate, 1000);

setDate();
