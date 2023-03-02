'use strict';
const inputNum = document.getElementById('guess');
const checkBtn = document.querySelector('.btn.check');
const msg = document.querySelector('.message');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const numBrand = document.querySelector('.number');
const againBtn = document.querySelector('.btn.again');

function getRandom(min, max) {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min
  );
}

let target = getRandom(0, 100);

checkBtn.addEventListener('click', e => {
  let guessNum = inputNum.value;
  if (guessNum < target) {
    msg.innerText = 'Too Low...';
    score.innerText--;
  } else if (guessNum > target) {
    msg.innerText = 'Too High...';
    score.innerText--;
  } else {
    document.body.style.backgroundColor = '#60b347';
    numBrand.innerText = target;
    msg.innerText = 'Correct Numbers!!!';
    highScore.innerText = score.innerText;
  }
});

againBtn.addEventListener('click', e => {
  msg.innerText = 'Start Guessing...';
  inputNum.value = '';
  numBrand.textContent = '?';
  score.innerText = 20;
  target = getRandom(0, 100);
});
