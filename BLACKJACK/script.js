const API_BASE = 'https://deckofcardsapi.com/api/deck';
const BACK_CARD = 'https://deckofcardsapi.com/static/img/back.png';

class BlackjackGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.gameState = {
      deckId: null,
      remaining: 0,
      playerCards: [],
      dealerCards: [],
      playerSum: 0,
      dealerSum: 0,
      playerAces: 0,
      dealerAces: 0,
      gameActive: false,
      gameOver: false,
      balance: 1000,
      currentBet: 0
    };
  }

  connectedCallback() {
    this.render();
    this.initEventListeners();
  }

  getStyles() {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :host {
        display: block;
        min-height: 100vh;
        background: transparent;
        font-family: 'Cormorant Garamond', Georgia, serif;
        padding: 20px;
      }

      .table {
        max-width: 900px;
        margin: 0 auto;
        min-height: calc(100vh - 40px);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        padding: 15px 25px;
        background: rgba(20, 35, 20, 0.75);
        border-radius: 8px;
        backdrop-filter: blur(4px);
        border: 1px solid rgba(212, 175, 55, 0.3);
      }

      h1 {
        color: #d4af37;
        font-size: 2.2em;
        font-weight: 700;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
        letter-spacing: 3px;
        text-transform: uppercase;
      }

      .balance-display {
        display: flex;
        gap: 30px;
        align-items: center;
      }

      .balance-item {
        color: #e8e4d9;
        font-size: 1.1em;
        font-weight: 600;
      }

      .balance-item span {
        color: #d4af37;
        font-size: 1.3em;
        margin-left: 5px;
      }

      .betting-area {
        background: rgba(20, 35, 20, 0.7);
        border-radius: 50%;
        width: 280px;
        height: 140px;
        margin: 0 auto 35px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(212, 175, 55, 0.4);
        backdrop-filter: blur(4px);
      }

      .bet-label {
        color: #a89f91;
        font-size: 0.9em;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 8px;
      }

      .bet-amount {
        color: #d4af37;
        font-size: 2em;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }

      .chip-rack {
        display: flex;
        gap: 12px;
        justify-content: center;
        margin-bottom: 15px;
        flex-wrap: wrap;
      }

      .chip {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 700;
        font-size: 0.85em;
        color: #1a1a1a;
        transition: all 0.2s ease;
        position: relative;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.2);
      }

      .chip::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.3);
      }

      .chip-5 {
        background: linear-gradient(135deg, #e8e4d9 0%, #c9c5bb 100%);
      }

      .chip-25 {
        background: linear-gradient(135deg, #4a90d9 0%, #2c5aa0 100%);
        color: #fff;
      }

      .chip-50 {
        background: linear-gradient(135deg, #d94a4a 0%, #a02c2c 100%);
        color: #fff;
      }

      .chip-100 {
        background: linear-gradient(135deg, #2d5016 0%, #1a300d 100%);
        color: #d4af37;
      }

      .chip:hover:not(:disabled) {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
      }

      .chip:active:not(:disabled) {
        transform: translateY(0) scale(0.98);
      }

      .chip:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .chip.clear-bet {
        background: transparent;
        border: 2px solid #8b7355;
        color: #8b7355;
        font-size: 0.7em;
        width: 50px;
        height: 50px;
      }

      .chip.clear-bet::before {
        border-color: rgba(139, 115, 85, 0.4);
      }

      .game-section {
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin-bottom: 35px;
      }

      .player-section {
        background: rgba(20, 35, 20, 0.6);
        padding: 25px 30px;
        border-radius: 12px;
        border: 1px solid rgba(212, 175, 55, 0.2);
        backdrop-filter: blur(3px);
      }

      .player-section h2 {
        color: #d4af37;
        margin-bottom: 18px;
        font-size: 1.4em;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(212, 175, 55, 0.3);
        padding-bottom: 10px;
        display: inline-block;
      }

      .cards-display {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        min-height: 130px;
        margin-bottom: 15px;
        align-content: flex-start;
      }

      .card {
        width: 85px;
        height: 119px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        object-fit: cover;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }

      .card:hover {
        transform: translateY(-8px) rotate(2deg);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
      }

      .card.hole {
        background-color: #1a2a1a;
        border: 3px solid #d4af37;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      }

      .sum-display {
        color: #c9c5bb;
        font-size: 1.15em;
        font-weight: 600;
      }

      .sum-display span {
        color: #d4af37;
        font-size: 1.3em;
      }

      .controls {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 25px;
      }

      .btn {
        padding: 14px 35px;
        font-size: 1.05em;
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        background: linear-gradient(180deg, #d4c4a8 0%, #b8a888 100%);
        color: #1a1a1a;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
      }

      .btn:hover:not(:disabled) {
        background: linear-gradient(180deg, #e0d4bc 0%, #c9b999 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
      }

      .btn:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }

      .btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        transform: none;
      }

      .btn.deal {
        background: linear-gradient(180deg, #d4af37 0%, #a68b2a 100%);
        font-size: 1.15em;
        padding: 16px 45px;
      }

      .btn.hit {
        background: linear-gradient(180deg, #4a7c2c 0%, #36591f 100%);
        color: #e8e4d9;
      }

      .btn.stand {
        background: linear-gradient(180deg, #8b4513 0%, #5c2e0d 100%);
        color: #e8e4d9;
      }

      .btn.buy-in {
        background: linear-gradient(180deg, #d4af37 0%, #a68b2a 100%);
        font-size: 1.2em;
        padding: 18px 50px;
      }

      .result {
        background: rgba(20, 35, 20, 0.8);
        color: #e8e4d9;
        padding: 22px 30px;
        border-radius: 10px;
        text-align: center;
        font-size: 1.35em;
        font-weight: 700;
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(212, 175, 55, 0.3);
        letter-spacing: 1px;
      }

      .result.win {
        background: rgba(46, 125, 50, 0.75);
        border-color: rgba(76, 175, 80, 0.5);
      }

      .result.lose {
        background: rgba(139, 27, 27, 0.75);
        border-color: rgba(244, 67, 54, 0.5);
      }

      .result.push {
        background: rgba(139, 90, 43, 0.75);
        border-color: rgba(255, 152, 0, 0.5);
      }

      .result.blackjack {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.85) 0%, rgba(166, 139, 42, 0.85) 100%);
        border-color: #d4af37;
        color: #1a1a1a;
      }

      .game-over-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(10, 15, 10, 0.92);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 100;
        backdrop-filter: blur(8px);
      }

      .game-over-title {
        color: #d4af37;
        font-size: 3.5em;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 8px;
        margin-bottom: 20px;
        text-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
      }

      .game-over-text {
        color: #a89f91;
        font-size: 1.4em;
        margin-bottom: 40px;
        letter-spacing: 2px;
      }

      .shoe-info {
        color: #a89f91;
        font-size: 0.95em;
        font-weight: 600;
      }

      .shoe-info span {
        color: #d4af37;
      }

      @media (max-width: 600px) {
        .header {
          flex-direction: column;
          gap: 15px;
          text-align: center;
        }

        h1 {
          font-size: 1.8em;
        }

        .betting-area {
          width: 240px;
          height: 120px;
        }

        .card {
          width: 65px;
          height: 91px;
        }

        .chip {
          width: 45px;
          height: 45px;
          font-size: 0.75em;
        }

        .btn {
          padding: 12px 25px;
        }

        .game-over-title {
          font-size: 2.2em;
          letter-spacing: 4px;
        }
      }
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="table">
        <div class="header">
          <h1>Blackjack</h1>
          <div class="balance-display">
            <div class="balance-item">Balance: <span id="balance">$${this.gameState.balance}</span></div>
            <div class="shoe-info">Cards: <span id="remaining">0</span></div>
          </div>
        </div>

        <div class="betting-area">
          <div class="chip-rack">
            <button class="chip chip-5" data-bet="5">$5</button>
            <button class="chip chip-25" data-bet="25">$25</button>
            <button class="chip chip-50" data-bet="50">$50</button>
            <button class="chip chip-100" data-bet="100">$100</button>
            <button class="chip clear-bet" id="clear-bet">CLEAR</button>
          </div>
          <div class="bet-label">Current Bet</div>
          <div class="bet-amount">$<span id="current-bet">0</span></div>
        </div>

        <div class="game-section">
          <div class="player-section">
            <h2>Dealer</h2>
            <div id="dealer-cards" class="cards-display"></div>
            <p class="sum-display">Sum: <span id="dealer-sum">0</span></p>
          </div>

          <div class="player-section">
            <h2>Player</h2>
            <div id="player-cards" class="cards-display"></div>
            <p class="sum-display">Sum: <span id="player-sum">0</span></p>
          </div>
        </div>

        <div class="controls">
          <button id="deal-btn" class="btn deal">Deal</button>
          <button id="hit-btn" class="btn hit" disabled>Hit</button>
          <button id="stand-btn" class="btn stand" disabled>Stand</button>
        </div>

        <div id="result" class="result"></div>
      </div>

      <div id="game-over" class="game-over-overlay" style="display: none;">
        <div class="game-over-title">Game Over</div>
        <div class="game-over-text">You've run out of chips</div>
        <button id="buy-in-btn" class="btn buy-in">Buy In - $1,000</button>
      </div>
    `;
  }

  initEventListeners() {
    this.dealBtn = this.shadowRoot.getElementById('deal-btn');
    this.hitBtn = this.shadowRoot.getElementById('hit-btn');
    this.standBtn = this.shadowRoot.getElementById('stand-btn');
    this.clearBetBtn = this.shadowRoot.getElementById('clear-bet');
    this.buyInBtn = this.shadowRoot.getElementById('buy-in-btn');
    this.gameOverEl = this.shadowRoot.getElementById('game-over');
    this.remainingEl = this.shadowRoot.getElementById('remaining');
    this.resultEl = this.shadowRoot.getElementById('result');
    this.balanceEl = this.shadowRoot.getElementById('balance');
    this.currentBetEl = this.shadowRoot.getElementById('current-bet');

    this.dealBtn.addEventListener('click', () => this.dealGame());
    this.hitBtn.addEventListener('click', () => this.hit());
    this.standBtn.addEventListener('click', () => this.stand());
    this.clearBetBtn.addEventListener('click', () => this.clearBet());
    this.buyInBtn.addEventListener('click', () => this.buyIn());

    this.shadowRoot.querySelectorAll('.chip[data-bet]').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const bet = parseInt(e.target.dataset.bet);
        this.placeBet(bet);
      });
    });
  }

  get elements() {
    return {
      dealerCards: this.shadowRoot.getElementById('dealer-cards'),
      playerCards: this.shadowRoot.getElementById('player-cards'),
      dealerSum: this.shadowRoot.getElementById('dealer-sum'),
      playerSum: this.shadowRoot.getElementById('player-sum'),
      remaining: this.shadowRoot.getElementById('remaining')
    };
  }

  placeBet(amount) {
    if (this.gameState.gameActive) return;
    if (this.gameState.balance < amount) return;

    this.gameState.balance -= amount;
    this.gameState.currentBet += amount;
    this.updateBetDisplay();
    this.updateBalanceDisplay();
    this.checkDealButton();
  }

  clearBet() {
    if (this.gameState.gameActive) return;
    if (this.gameState.currentBet === 0) return;

    this.gameState.balance += this.gameState.currentBet;
    this.gameState.currentBet = 0;
    this.updateBetDisplay();
    this.updateBalanceDisplay();
    this.checkDealButton();
  }

  updateBetDisplay() {
    this.currentBetEl.textContent = this.gameState.currentBet;
  }

  updateBalanceDisplay() {
    this.balanceEl.textContent = `$${this.gameState.balance}`;
  }

  checkDealButton() {
    this.dealBtn.disabled = this.gameState.currentBet === 0;
  }

  setBetControls(enabled) {
    this.shadowRoot.querySelectorAll('.chip[data-bet]').forEach(chip => {
      chip.disabled = !enabled;
    });
    this.clearBetBtn.disabled = !enabled;
  }

  async createDeck() {
    try {
      const response = await fetch(`${API_BASE}/new/shuffle/?deck_count=6`);
      if (!response.ok) throw new Error('Failed to create deck');
      const data = await response.json();
      this.gameState.remaining = data.remaining;
      return data.deck_id;
    } catch (error) {
      console.error('Error creating deck:', error);
      this.showResult('Error creating deck. Please try again.');
      return null;
    }
  }

  async drawCards(count) {
    if (!this.gameState.deckId) return [];
    
    try {
      const response = await fetch(`${API_BASE}/${this.gameState.deckId}/draw/?count=${count}`);
      if (!response.ok) throw new Error('Failed to draw cards');
      const data = await response.json();
      this.gameState.remaining = data.remaining;
      return data.cards;
    } catch (error) {
      console.error('Error drawing cards:', error);
      return [];
    }
  }

  cardValue(card) {
    const v = card.value;
    if (['KING', 'QUEEN', 'JACK'].includes(v)) return 10;
    if (v === 'ACE') return 11;
    return parseInt(v);
  }

  countAces(cards) {
    return cards.filter(card => card.value === 'ACE').length;
  }

  calculateSum(cards) {
    let sum = cards.reduce((total, card) => total + this.cardValue(card), 0);
    let aces = this.countAces(cards);

    while (sum > 21 && aces > 0) {
      sum -= 10;
      aces--;
    }

    return sum;
  }

  createCardElement(card, isHole = false) {
    const img = document.createElement('img');
    img.className = 'card' + (isHole ? ' hole' : '');
    img.src = isHole ? BACK_CARD : card.image;
    img.alt = isHole ? 'Hole card' : `${card.value} of ${card.suit}`;
    return img;
  }

  renderCards() {
    const { dealerCards, playerCards, dealerSum, playerSum, remaining } = this.elements;
    
    dealerCards.innerHTML = '';
    playerCards.innerHTML = '';

    this.gameState.dealerCards.forEach((card, index) => {
      const isHole = index === 0 && this.gameState.gameActive && !this.gameState.gameOver;
      dealerCards.appendChild(this.createCardElement(card, isHole));
    });

    this.gameState.playerCards.forEach(card => {
      playerCards.appendChild(this.createCardElement(card));
    });

    if (this.gameState.gameActive) {
      const visibleDealerCards = this.gameState.gameOver 
        ? this.gameState.dealerCards 
        : this.gameState.dealerCards.slice(1);
      dealerSum.textContent = this.calculateSum(visibleDealerCards);
    } else {
      dealerSum.textContent = this.gameState.dealerSum;
    }

    playerSum.textContent = this.gameState.playerSum;
    remaining.textContent = this.gameState.remaining;
  }

  setButtons(deal, hit, stand) {
    this.dealBtn.disabled = deal;
    this.hitBtn.disabled = hit;
    this.standBtn.disabled = stand;
  }

  showResult(message, type = '') {
    this.resultEl.textContent = message;
    this.resultEl.className = 'result ' + type;
  }

  async dealGame() {
    if (this.gameState.currentBet === 0) return;

    if (!this.gameState.deckId || this.gameState.remaining < 52) {
      this.gameState.deckId = await this.createDeck();
      if (!this.gameState.deckId) return;
    }

    this.gameState.playerCards = [];
    this.gameState.dealerCards = [];
    this.gameState.playerSum = 0;
    this.gameState.dealerSum = 0;
    this.gameState.playerAces = 0;
    this.gameState.dealerAces = 0;
    this.gameState.gameActive = true;
    this.gameState.gameOver = false;

    this.showResult('');
    this.setBetControls(false);
    this.setButtons(true, true, true);

    const playerDraw = await this.drawCards(2);
    const dealerDraw = await this.drawCards(2);

    if (playerDraw.length < 2 || dealerDraw.length < 2) {
      this.showResult('Failed to draw cards. Please try again.');
      this.setBetControls(true);
      return;
    }

    this.gameState.dealerCards = dealerDraw;
    this.gameState.playerCards = playerDraw;
    this.gameState.dealerAces = this.countAces(this.gameState.dealerCards);
    this.gameState.playerAces = this.countAces(this.gameState.playerCards);

    this.gameState.playerSum = this.calculateSum(this.gameState.playerCards);
    this.gameState.dealerSum = this.calculateSum(this.gameState.dealerCards);

    this.renderCards();

    if (this.gameState.playerSum === 21) {
      if (this.gameState.dealerSum === 21) {
        this.endGame("Push! Both have Blackjack!", 'push', true);
      } else {
        this.endGame('Blackjack! You win!', 'blackjack', true, true);
      }
      return;
    }

    this.setButtons(true, false, false);
  }

  async hit() {
    const newCard = await this.drawCards(1);
    if (newCard.length === 0) {
      this.showResult('Failed to draw card. Please try again.');
      return;
    }

    this.gameState.playerCards.push(newCard[0]);
    this.gameState.playerSum = this.calculateSum(this.gameState.playerCards);

    this.renderCards();

    if (this.gameState.playerSum > 21) {
      this.endGame('Bust! Dealer wins!', 'lose', true);
    } else if (this.gameState.playerSum === 21) {
      this.stand();
    }
  }

  async stand() {
    this.gameState.gameOver = true;
    this.gameState.gameActive = false;

    this.renderCards();

    while (this.gameState.dealerSum < 17) {
      const newCard = await this.drawCards(1);
      if (newCard.length === 0) break;

      this.gameState.dealerCards.push(newCard[0]);
      this.gameState.dealerSum = this.calculateSum(this.gameState.dealerCards);

      this.renderCards();
    }

    this.determineWinner();
  }

  determineWinner() {
    let result = '';
    let type = '';
    let isBlackjack = false;

    if (this.gameState.dealerSum > 21) {
      result = 'Dealer Bust! You win!';
      type = 'win';
    } else if (this.gameState.playerSum > this.gameState.dealerSum) {
      result = 'You win!';
      type = 'win';
    } else if (this.gameState.playerSum < this.gameState.dealerSum) {
      result = 'Dealer wins!';
      type = 'lose';
    } else {
      result = "It's a tie!";
      type = 'push';
    }

    this.endGame(result, type, true, isBlackjack);
  }

  endGame(message, type = '', applyPayout = false, isBlackjack = false) {
    this.gameState.gameActive = false;
    this.gameState.gameOver = true;
    this.showResult(message, type);
    this.setButtons(true, true, true);

    if (applyPayout) {
      if (type === 'win') {
        this.gameState.balance += this.gameState.currentBet * 2;
      } else if (type === 'blackjack') {
        this.gameState.balance += this.gameState.currentBet + Math.floor(this.gameState.currentBet * 1.5);
      } else if (type === 'push') {
        this.gameState.balance += this.gameState.currentBet;
      }
      this.updateBalanceDisplay();
    }

    this.gameState.currentBet = 0;
    this.updateBetDisplay();
    this.setBetControls(true);
    this.checkDealButton();
    this.renderCards();

    if (this.gameState.balance <= 0) {
      this.showGameOver();
    }
  }

  showGameOver() {
    this.gameOverEl.style.display = 'flex';
  }

  buyIn() {
    this.gameState.balance = 1000;
    this.gameState.currentBet = 0;
    this.updateBalanceDisplay();
    this.updateBetDisplay();
    this.gameOverEl.style.display = 'none';
    this.resetGameUI();
  }

  resetGameUI() {
    this.elements.dealerCards.innerHTML = '';
    this.elements.playerCards.innerHTML = '';
    this.elements.dealerSum.textContent = '0';
    this.elements.playerSum.textContent = '0';
    this.elements.remaining.textContent = '0';
    this.showResult('');
    this.setButtons(false, true, true);
    this.checkDealButton();
  }

  resetGame() {
    this.gameState = {
      deckId: null,
      remaining: 0,
      playerCards: [],
      dealerCards: [],
      playerSum: 0,
      dealerSum: 0,
      playerAces: 0,
      dealerAces: 0,
      gameActive: false,
      gameOver: false,
      balance: 1000,
      currentBet: 0
    };

    this.updateBalanceDisplay();
    this.updateBetDisplay();
    this.resetGameUI();
  }
}

customElements.define('blackjack-game', BlackjackGame);
