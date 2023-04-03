'use strict';

// Selecting elements
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1'); // вместо querySelector - getElementByID;
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let player0 = document.querySelector(`.player--0`);
let player1 = document.querySelector(`.player--1`);

let scores, playingState, activePlayer, currentScore;

// Functions in use
let switchPlFun = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  } else {
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
};

function startingCond() {
  currentScore = 0; // пришлось выносить let за функцию, чтобы заработало
  activePlayer = 0;
  scores = [0, 0];
  playingState = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden'); // если класс уже применен, то повторно он не будет применен, это плюс JS
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
}
// Starting Conditions
startingCond();

// Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  if (playingState) {
    // 1. Generating random Dice roll
    let dice = Math.round(Math.random() * 5 + 1);
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // атрибут src замена через JS
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to the currentScore
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlFun();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingState) {
    // 1. Add current score to global score of active player
    scores[activePlayer] += currentScore;
    if (activePlayer === 0) {
      score0El.textContent = scores[activePlayer];
    } else {
      score1El.textContent = scores[activePlayer];
    }
    // 2. if global score >= 100 - finish the game
    if (scores[activePlayer] >= 100) {
      playingState = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
    // if not - switch the player
    else {
      switchPlFun();
    }
  }
});

// To start new game
btnNew.addEventListener('click', startingCond);
