'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//starting Conditions
const init = function () {
  //when we need variables for global use , declare them outside functions and define them inside
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // to set the game condition , if the player wins it will be set to false so the first part of code won't be executed

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchplayer = function () {
  // switch to next player.
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // 4. to toggle the activePlayer .
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active'); // toggle methold is simply to check if the class is there or not , if its there it will remove it and if not it will add it
};

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // if we need a value to continue to exist then we need to set the variable outside this function

    // 1. Generating a random dice roll.
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    // 2. Display dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1 : if true, switch to next player.
    if (dice !== 1) {
      // add to the current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchplayer();
    }
  }
});

//implimenting the currentScore to the player score.
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score.
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
    } else {
      // switch to next player
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', init);
