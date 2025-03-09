// 贪吃蛇游戏基本逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 游戏区域
    const gameArea = document.querySelector('.game-area');
    if (!gameArea) return; // 如果不在游戏页面，则退出
    
    // 控制按钮
    const upButton = document.querySelector('.up-button');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const downButton = document.querySelector('.down-button');
    const pauseButton = document.querySelector('.pause-button');
    
    // 游戏状态
    let direction = 'right';
    let isPaused = false;
    let score = 0;
    let snakeLength = 5;
    
    // 添加控制按钮事件
    if (upButton) {
        upButton.addEventListener('click', function() {
            if (direction !== 'down') direction = 'up';
        });
    }
    
    if (leftButton) {
        leftButton.addEventListener('click', function() {
            if (direction !== 'right') direction = 'left';
        });
    }
    
    if (rightButton) {
        rightButton.addEventListener('click', function() {
            if (direction !== 'left') direction = 'right';
        });
    }
    
    if (downButton) {
        downButton.addEventListener('click', function() {
            if (direction !== 'up') direction = 'down';
        });
    }
    
    if (pauseButton) {
        pauseButton.addEventListener('click', function() {
            isPaused = !isPaused;
            pauseButton.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
        });
    }
    
    // 键盘控制
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case ' ':
                isPaused = !isPaused;
                if (pauseButton) {
                    pauseButton.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
                }
                break;
        }
    });
    
    // 更新分数显示
    function updateScore(newScore) {
        score = newScore;
        const scoreElement = document.querySelector('.stat-value');
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    }
    
    // 游戏结束处理
    function gameOver() {
        // 显示游戏结束弹窗
        const gameOverModal = document.querySelector('.fixed');
        if (gameOverModal) {
            gameOverModal.classList.remove('hidden');
        }
        
        // 更新最终分数
        const finalScoreElement = document.querySelector('.text-green-600.font-bold');
        if (finalScoreElement) {
            finalScoreElement.textContent = score;
        }
    }
    
    // 模拟游戏演示（仅用于原型展示）
    let demoTimeout;
    function startDemo() {
        if (isPaused) return;
        
        // 增加分数
        updateScore(score + Math.floor(Math.random() * 10) + 1);
        
        // 随机更新蛇的长度
        if (Math.random() > 0.8) {
            snakeLength++;
            const lengthElement = document.querySelectorAll('.stat-value')[1];
            if (lengthElement) {
                lengthElement.textContent = snakeLength;
            }
        }
        
        demoTimeout = setTimeout(startDemo, 1000);
    }
    
    // 启动演示
    startDemo();
    
    // 清理函数
    window.addEventListener('beforeunload', function() {
        clearTimeout(demoTimeout);
    });
});