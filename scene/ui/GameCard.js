// js/GameCard.js
class GameCard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || '游戏名称';
        const desc = this.getAttribute('desc') || '游戏简介';
        const link = this.getAttribute('link') || '#';
        const emoji = this.getAttribute('emoji') || '🎮';
        const version = this.getAttribute('version') || 'v1.0';

        this.innerHTML = `
            <div class="game-card">
                <div class="game-thumbnail">${emoji}</div>
                <div class="game-info">
                    <h2 class="game-title">${title}</h2>
                    <p class="game-desc">${desc}</p>
                    <a href="${link}" class="download-btn" role="button">📥 下载 ${version}</a>
                </div>
            </div>
        `;
    }
}

customElements.define('game-card', GameCard);