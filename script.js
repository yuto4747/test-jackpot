let cards = [
    {id: 1, value: '☆'},
    {id: 2, value: 'J'},
    {id: 3, value: 'A'},
    {id: 4, value: 'C'},
    {id: 5, value: 'K'},
    {id: 6, value: 'P'},
    {id: 7, value: 'O'},
    {id: 8, value: 'T'},
    {id: 9, value: '☆'}
];

let flippedCards = [];
let isGameOver = false;
let gameStarted = false;
let turnCount = 0; // ターン数を管理

// サイコロを振る関数
function rollDice() {
    if (isGameOver) return;

    // ターン数を増やす
    turnCount++;
    document.getElementById('turn-count').innerText = `ターン数: ${turnCount}`;

    // 前回のメッセージをリセット
    document.getElementById('status').innerText = "";
    document.getElementById('dice-result').innerText = "";

    const isChonboEnabled = document.getElementById('chonbo-enabled').checked;
    const chonboRate = parseInt(document.getElementById('chonbo-rate').value) || 0;

    if (isChonboEnabled && Math.random() * 100 < chonboRate) {
        document.getElementById('status').innerText = "ちょんぼ発生！ミスです！";
        return;
    }

    gameStarted = true;
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').innerText = `サイコロの目: ${dice1} と ${dice2}`;

    if (dice1 === dice2) {
        revertOrFlipCard(dice1);
    } else {
        handleFlip(dice1, dice2);
    }
}

// ゾロ目の場合に対応するカードを元に戻すか、文字に変える
function revertOrFlipCard(dice) {
    const card = document.getElementById(`card-${dice}`);
    if (flippedCards.includes(dice)) {
        card.classList.remove('flipped');
        card.innerText = dice;
        flippedCards = flippedCards.filter(id => id !== dice);
    } else {
        const cardData = cards.find(c => c.id === dice);
        card.innerText = cardData.value;
        card.classList.add('flipped');
        flippedCards.push(dice);
    }
}

// サイコロの目に基づいてカードをひっくり返す
function handleFlip(dice1, dice2) {
    const positions = [dice1, dice2, dice1 + dice2];
    let flipOccurred = false;

    positions.forEach(position => {
        if (position >= 1 && position <= 9 && !flippedCards.includes(position)) {
            const card = document.getElementById(`card-${position}`);
            const cardData = cards.find(c => c.id === position);
            card.innerText = cardData.value;
            card.classList.add('flipped');
            flippedCards.push(position);
            flipOccurred = true;
        }
    });

    checkGameOver(flipOccurred);
}

// ゲーム終了判定
function checkGameOver(flipOccurred) {
    if (flippedCards.length === 9) {
        document.getElementById('status').innerText = "ジャックポットを揃えました！";
        isGameOver = true;
        document.getElementById('roll-button').classList.add('hidden'); // サイコロボタンを非表示
    } else if (!flipOccurred) {
        document.getElementById('status').innerText = "カードをひっくり返せませんでした。あなたの負けです！";
        isGameOver = true;
        document.getElementById('roll-button').classList.add('hidden'); // サイコロボタンを非表示
    }
}

// ゲームのリセット関数
function resetGame() {
    flippedCards = [];
    isGameOver = false;
    gameStarted = false;
    turnCount = 0; // ターン数をリセット

    // UIのリセット
    document.getElementById('turn-count').innerText = `ターン数: ${turnCount}`;
    document.getElementById('status').innerText = "ゲームが始まりました！";
    document.getElementById('dice-result').innerText = "";
    document.querySelectorAll('.card').forEach((card, index) => {
        card.classList.remove('flipped');
        card.innerText = index + 1;
    });

    // ボタンの表示リセット
    document.getElementById('roll-button').classList.remove('hidden');
}
