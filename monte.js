const canvas = document.getElementById('Monte');
const Result = document.getElementById('Result');
// const Total = document.getElementById('Total');
// const Circle = document.getElementById('Circle');
let loop;
var r =
  (Math.round(Math.min(window.innerHeight, window.innerWidth) / 10) - 10) *
  10 /
  2;
canvas.style.width = r * 2 + 'px';
Result.style.width = r * 2 + 'px';
canvas.width = r * 2;
canvas.style.height = r * 2 + 'px';
canvas.height = r * 2;
const ctx = canvas.getContext('2d');
let total = 0;
let circle = 0;
draw();

function draw() {
  ctx.beginPath();
  ctx.lineWidth = 0.5;

  ctx.rect(0, 0, 2 * r, 2 * r);
  ctx.stroke();

  ctx.translate(r, r);
  ctx.beginPath();
  ctx.lineWidth = 0.5;

  ctx.ellipse(0, 0, r, r, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function start() {
  console.log('start');

  samples = parseInt(document.getElementById('Samples').value);
  loop = setInterval(() => {
    total += samples;
    let x = 0;
    for (x; x < samples; x++)
      if (point()) circle++;

    // Total.innerText = 'total:' + total;
    // Circle.innerText = 'in circle:' + circle;
    Result.innerText = 'Pi:' + 4 * (circle / total);
  }, 100);
}

function stop() {
  console.log('stop');

  ctx.translate(-r, -r);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  total = 0;
  circle = 0;
  draw();
  //   Total.innerText = 'total:' + total;
  //   Circle.innerText = 'in circle:' + circle;
  Result.innerText = '';
  clearInterval(loop);
}

function point() {
  let x = RandomRange(-r, r);
  let y = RandomRange(-r, r);
  ctx.save();
  if (inCircle(x, y)) {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
    ctx.fillRect(x, y, 0.5, 0.5);
    ctx.restore();
    return true;
  } else {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    ctx.fillRect(x, y, 0.5, 0.5);
    ctx.restore();
    return false;
  }
}

function inCircle(x, y) {
  let d = x * x + y * y;
  if (d < r * r) {
    return true;
  } else {
    return false;
  }
}

function RandomRange(Min, Max) {
  return Math.random() * (Max - Min) + Min;
}