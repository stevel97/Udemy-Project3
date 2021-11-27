'use strict';

const playerScoreEl = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];

const diceEl = document.querySelector('.dice');

const currentScoreEl = [
  document.querySelector('#current--0'),
  document.querySelector('#current--1'),
];

const playerActiveEl = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let playerScore = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let diceValue;
let winner = false;

diceEl.classList.add('hidden');
playerScoreEl[0].textContent = 0;
playerScoreEl[1].textContent = 0;

function toggleActivePlayer() {
  playerActiveEl[activePlayer].classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerActiveEl[activePlayer].classList.toggle('player--active');
}

function checkWinner() {
  if (playerScore[activePlayer] >= 20) {
    winner = true;
    playerActiveEl[activePlayer].classList.remove('player--active');
    playerActiveEl[activePlayer].classList.add('player--winner');
    console.log('Winner!');
  }
}

btnRoll.addEventListener('click', function () {
  if (!winner) {
    diceValue = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceValue}.png`;
    if (diceValue !== 1) {
      currentScore += diceValue;
      currentScoreEl[activePlayer].textContent = currentScore;
    } else {
      currentScore = 0;
      currentScoreEl[activePlayer].textContent = 0;
      toggleActivePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (!winner) {
    playerScore[activePlayer] += currentScore;
    playerScoreEl[activePlayer].textContent = playerScore[activePlayer];
    checkWinner();
    if (!winner) {
      currentScore = 0;
      currentScoreEl[activePlayer].textContent = 0;
      toggleActivePlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  playerActiveEl[0].classList.add('player--active');
  playerActiveEl[1].classList.remove('player--active');
  playerActiveEl[activePlayer].classList.remove('player--winner');
  playerScore = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  winner = false;
  diceEl.classList.add('hidden');
  playerScoreEl[0].textContent = 0;
  playerScoreEl[1].textContent = 0;
  currentScoreEl[0].textContent = 0;
  currentScoreEl[1].textContent = 0;
});
