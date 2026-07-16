// js/GameCard.js
class GameCard extends HTMLElement {
    connectedCallback() {
        // 1. 读取属性
        const title = this.getAttribute('title') || '游戏名称';
        const desc = this.getAttribute('desc') || '游戏简介';
        const link = this.getAttribute('link') || '#';
        const emoji = this.getAttribute('emoji') || '🎮';
        const version = this.getAttribute('version') || 'v1.0';
    

        // 2. 生成 HTML（样式 + 结构在一起）
        this.innerHTML = `
            <style>
                .game-card {
                    display: flex;
                    gap: 20px;
                    align-items: flex-start;
                    margin-bottom: 30px;
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
                .game-thumbnail {
                    flex-shrink: 0;
                    width: 160px;
                    height: 120px;
                    background: #e9ecef;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    color: #6c757d;
                    overflow: hidden;
                }
                .game-info {
                    flex: 1;
                }
                .game-title {
                    margin-top: 0;
                    margin-bottom: 8px;
                }
                .game-desc {
                    margin-bottom: 12px;
                    color: #6c757d;
                }
                .download-btn {
                    display: inline-block;
                }
                @media (max-width: 600px) {
                    .game-card {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .game-thumbnail {
                        width: 100%;
                        height: 150px;
                    }
                }
            </style>
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

// 3. 注册组件
customElements.define('game-card', GameCard);