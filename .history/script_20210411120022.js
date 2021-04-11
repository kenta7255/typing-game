'use strict'
const title = document.getElementById('title');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

wrap.style.display = "none";
count.style.display = "none";

const textLists = [
  "console.log()",
  "document.getElementById()",
  "let today = new Date()",
  "window.alert()",
  "window.confirm()",
  "window.prompt()",
  "window.stop()",
  "window.history.back()"
];


let checkTexts = [];

const createText = () => {
  const p = document.getElementById('text');
  const rand = Math.floor(Math.random() * textLists.length);

  p.textContent = '';

  checkTexts = textLists[rand].split(('')).map(value => {
    const span = document.createElement('span');
    span.textContent = value;
    p.appendChild(span);
    return span;
  })

};

let score = 0;
const keyDown = e => {

  wrap.style.backgroundColor = 'white';
  if (e.key === checkTexts[0].textContent) {
    checkTexts[0].className = 'add-color';

    checkTexts.shift();
    score++;

    if (!checkTexts.length) createText();
  } else if (e.key === 'Shift') {
    wrap.style.backgroundColor = 'white';
  } else {
    wrap.style.backgroundColor = 'red';
  }
};

let text = ''
const rankCheck = score => {
  if (score < 100) {
    text = `あなたのランクはCです。`
  } else if (score < 200) {
    text = `あなたのランクはBです。`
  } else if (score < 300) {
    text = `あなたのランクはAです。`
  } else if (score >= 300) {
    text = 'あなたのランクはSです。'
  }
  return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
};
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));
  if (result) window.location.reload();
};
const timer = () => {
  let time = 60;

  const id = setInterval(() => {
    if (time <= 5) {
      count.style.color = 'red';
    }
    if (time <= 0) gameOver(id);
    count.textContent = time--;
  }, 1000);
};

const sound = new Audio('press_button.mp3');
start.addEventListener('click', () => {
  sound.play();
  wrap.style.display = "block";
  count.style.display = "block";
  timer();
  createText();
  title.style.display = 'none';
  document.addEventListener('keydown', keyDown);
});