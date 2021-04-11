'use strict'
const title = document.getElementById('title');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

wrap.style.display = "none";
count.style.display = "none";

const textLists = {
  "渡された値をコンソールに表示します。" : "console.log()",
  " id プロパティが指定された文字列に一致する要素を表す Element オブジェクトを返します。" : "document.getElementById()",
  "現在日時でDateオブジェクトを生成しています" : "let today = new Date()",
  "オプションの指定されたコンテンツと OK ボタンを持つ警告ダイアログを表示します。" : "window.alert()",
  "メッセージと、OK, キャンセルの 2 つのボタンを持つモーダルダイアログを表示します。" : "window.confirm()",
  "ユーザにテキストを入力することを促すメッセージを持つダイアログを表示します。" : "window.prompt()",
  "ウィンドウの読み込みを停止します。" : "window.stop()",
  "ブラウザーにセッション履歴内で1つ前のページに戻らせます。" : "history.back()"
};


let checkTexts = [];

const createText = () => {
  const p = document.getElementById('text');
  p.textContent = '';

  const d = document.getElementById('description');
  d.textContent = '';

  let length = 0;
  let text = [];
  let description = [];
  for (let i in textLists){
    length++;
    description.push(i);
    text.push(textLists[i]);
  }
  const rand = Math.floor(Math.random() * Object.keys(textLists).length);
  
  checkTexts = text[rand].split(('')).map(value => {
    const span = document.createElement('span');
    span.textContent = value;
    p.appendChild(span);
    return span;
  })

  for (let item of description){

  }

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
    const miss = new Audio('miss.mp3');
    miss.play();
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
    if (time === 0) gameOver(id);
    count.textContent = time--;
  }, 1000);
};


start.addEventListener('click', () => {
  const decide = new Audio('deside.mp3');
  decide.play();
  wrap.style.display = "block";
  count.style.display = "block";
  timer();
  createText();
  title.style.display = 'none';
  document.addEventListener('keydown', keyDown);
});