// js/GameCard.js
class GameCard extends HTMLElement {
    connectedCallback() {
        // 延迟执行，确保子元素已被解析
        setTimeout(() => {
            this.render();
        }, 0);
    }

    render() {
        const title = this.getAttribute('title') || '游戏名称';
        const desc = this.getAttribute('desc') || '游戏简介';
        const emoji = this.getAttribute('emoji') || '🎮';
        const releaseYear = this.getAttribute('year') || '2024';
        const gameVersion = this.getAttribute('game-version') || '1.0.0';
        const mode = this.getAttribute('mode') || 'download';

        let downloadsHTML = '';

        // 特殊处理：如果是网页模式，只显示“前往游玩”按钮
        if (mode === 'web') {
            const link = this.getAttribute('link') || '#';
            downloadsHTML = `<a href="${link}" target="_blank" class="download-btn" role="button">🔗 前往游玩</a>`;
        } else {
            // 下载模式：读取所有 <download> 子元素
            const downloadElements = this.querySelectorAll('download');
            if (downloadElements.length > 0) {
                downloadElements.forEach(el => {
                    const platform = el.getAttribute('platform') || '下载';
                    const url = el.getAttribute('url') || '#';
                    downloadsHTML += `<a href="${url}" class="download-btn" role="button">📥 ${platform}</a> `;
                });
            } else {
                // 兼容旧用法：没有子元素时使用 link 属性
                const fallbackLink = this.getAttribute('link') || '#';
                downloadsHTML = `<a href="${fallbackLink}" class="download-btn" role="button">📥 下载软件</a>`;
            }
        }

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
                    color: #1a1a2e;
                }
                .game-meta {
                    font-size: 0.85em;
                    color: #6c757d;
                    margin-bottom: 8px;
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .game-meta span {
                    background: #e9ecef;
                    padding: 2px 10px;
                    border-radius: 12px;
                }
                .game-desc {
                    margin-bottom: 12px;
                    color: #6c757d;
                }
                .download-btn {
                    display: inline-block;
                    margin-right: 8px;
                    margin-bottom: 4px;
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
                    <div class="game-meta">
                        <span>📅 ${releaseYear}</span>
                        <span>📌 v${gameVersion}</span>
                    </div>
                    <p class="game-desc">${desc}</p>
                    <div style="margin-top: 8px;">
                        ${downloadsHTML}
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('game-card', GameCard);