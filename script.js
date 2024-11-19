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

// サイコロを振る関数
function rollDice() {
    if (isGameOver) return;

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

// カードの操作ロジックはそのまま
function revertOrFlipCard(dice) { /* ... */ }
function handleFlip(dice1, dice2) { /* ... */ }
function checkGameOver(flipOccurred) { /* ... */ }

// ゲームのリセット関数
function resetGame() {
    flippedCards = [];
    isGameOver = false;
    gameStarted = false;
    document.getElementById('status').innerText = "ゲームが始まりました！";
    document.getElementById('dice-result').innerText = "";
    document.querySelectorAll('.card').forEach((card, index) => {
        card.classList.remove('flipped');
        card.innerText = index + 1;
    });
}
