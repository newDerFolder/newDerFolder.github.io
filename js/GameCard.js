// js/GameCard.js
class GameCard extends HTMLElement {
    connectedCallback() {
        setTimeout(() => {
            this.render();
        }, 0);
    }

    render() {
        const title = this.getAttribute('title') || '游戏名称';
        const desc = this.getAttribute('desc') || '游戏简介';
        const emoji = this.getAttribute('emoji') || '🎮';
        // 新增：读取 image 属性
        const image = this.getAttribute('image') || null; 
        const releaseYear = this.getAttribute('year') || '2024';
        const gameVersion = this.getAttribute('game-version') || '1.0.0';
        const mode = this.getAttribute('mode') || 'download';

        let downloadsHTML = '';
        if (mode === 'web') {
            const link = this.getAttribute('link') || '#';
            downloadsHTML = `<a href="${link}" target="_blank" class="download-btn" role="button">🔗 前往游玩</a>`;
        } else {
            const downloadElements = this.querySelectorAll('download');
            if (downloadElements.length > 0) {
                downloadElements.forEach(el => {
                    const platform = el.getAttribute('platform') || '下载';
                    const url = el.getAttribute('url') || '#';
                    downloadsHTML += `<a href="${url}" class="download-btn" role="button">📥 ${platform}</a> `;
                });
            } else {
                const fallbackLink = this.getAttribute('link') || '#';
                downloadsHTML = `<a href="${fallbackLink}" class="download-btn" role="button">📥 下载软件</a>`;
            }
        }

        // 生成缩略图内容的逻辑
        let thumbnailContent = '';
        if (image) {
            // 如果有图片，生成 img 标签
            thumbnailContent = `<img src="${image}" alt="${title} 截图" style="width:100%; height:100%; object-fit:cover;">`;
        } else {
            // 否则显示 Emoji
            thumbnailContent = emoji;
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
                /* 新增：让图片在容器里完美显示 */
                .game-thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
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
                <div class="game-thumbnail">
                    ${thumbnailContent}
                </div>
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