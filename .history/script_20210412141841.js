'use strict'
const title = document.getElementById('title');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

// テキスト入力欄とカウンターはデフォルト非表示
wrap.style.display = "none";
count.style.display = "none";

// タイピングテキストと、説明を連想配列で管理
const textLists = {
  "渡された値をコンソールに表示します。": "console.log()",
  "id プロパティが指定された文字列に一致する要素を表す Element オブジェクトを返します。": "document.getElementById()",
  "現在日時でDateオブジェクトを生成しています": "let today = new Date()",
  "オプションの指定されたコンテンツと OK ボタンを持つ警告ダイアログを表示します。": "window.alert()",
  "メッセージと、OK, キャンセルの 2 つのボタンを持つモーダルダイアログを表示します。": "window.confirm()",
  "ユーザにテキストを入力することを促すメッセージを持つダイアログを表示します。": "window.prompt()",
  "ウィンドウの読み込みを停止します。": "window.stop()",
  "ブラウザーにセッション履歴内で1つ前のページに戻らせます。": "history.back()",
  "tagNameで指定された HTML 要素を生成します": "document.createElement()",
  "指定されたクラス名をすべて持つすべての子要素の配列風オブジェクトを返します。": "document.getElementsByClassName()",
  "テキストの文字列を開かれた文書ストリームに書き込みます。": "document.write()",
  "文書内で指定した name を持つ要素の NodeList コレクションを返します。": "document.getElementsByName()",
  "現在の文書の <head> 要素を返します。": "document.head;",
  "0以上num未満の乱数を生成します。": "Math.floor(Math.random() * num)",
  "連想配列のキーを取得します": "Object.keys()",
  "連想配列のキーの数ループを作成します。": "for (let i in Dictionary){}",
  "forループやwhileループの処理を途中でスキップします": "continue",
  "new Date()で現在の日時（Dateオブジェクト）を生成し、西暦の年4桁を取得します。": "getFullYear()",
  "new Date()で現在の日時（Dateオブジェクト）を生成し、時間を取得します。": "getMinutes()",
  "new Date()で現在の日時（Dateオブジェクト）を生成し、秒を取得します": "getSeconds()",
  "new Date()で現在の日時（Dateオブジェクト）を生成し、月を取得します": "getMonth()",
  "new Date()で現在の日時（Dateオブジェクト）を生成し、日を取得します": "getDate()",
  "new Date()で現在の日時（Dateオブジェクト）を生成し、曜日を取得します": "getDay()",
  "新しいウィンドウやタブで指定ページを開きます。": "window.open()",
  "水平方向のスクロール量を取得します。": "window.scrollX",
  "垂直方向のスクロール量を取得します。": "window.scrollY",
  "指定した座標までウィンドウをスクロールさせます。": "window.scrollTo(X, Y)",
  "ブラウザのビューポートの横幅を取得します。": "window.innerWidth",
  "ブラウザのビューポートの高さを取得します。": "window.innerHeight",
};


let checkTexts = [];

const createText = () => {
  const p = document.getElementById('text');
  p.textContent = '';

  const d = document.getElementById('description');
  d.textContent = '';

  // ハッシュの取り出し処理
  let length = 0;
  let text = [];
  let description = [];
  for (let i in textLists) {
    length++;
    description.push(i);
    text.push(textLists[i]);
  }

  // ハッシュのキー未満の乱数を生成
  const rand = Math.floor(Math.random() * Object.keys(textLists).length);

  // split&mapで一文字ずつspanタグで括り、htmlに渡す
  checkTexts = text[rand].split(('')).map(value => {
    const span = document.createElement('span');
    span.textContent = value;
    p.appendChild(span);
    return span;
  })

  // 設問文の配列インデックスを乱数で指定し、htmlに渡す
  for (let item of description) {
    d.textContent = description[rand];
  }

};

let score = 0;
const keyDown = e => {

  wrap.style.backgroundColor = 'white';
  if (e.key === checkTexts[0].textContent) {
    // キー入力と文字が一致していたら、add-colorで背景色と同化
    checkTexts[0].className = 'add-color';
    // 最初の要素取り除き
    checkTexts.shift();
    score++;

    if (!checkTexts.length) createText();
  } else if (e.key === 'Shift') {
    // シフトキーは無視する
    wrap.style.backgroundColor = 'white';
  } else {
    // 音声と背景を赤に
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
  return `${score}文字打てました！\nあなたのランクは${text}`;
};
const gameOver = id => {
  clearInterval(id);

  window.alert(rankCheck(score));
  window.location.reload();
};

const timer = () => {
  let time = 15;
  const id = setInterval(() => {
    if (time <= 5) {
      count.style.color = 'red';
    }
    if (time === 0) gameOver(id);
    count.textContent = time--;
  }, 1000);
};

// スタートボタン押した後の処理
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