// 导航功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有底部导航项
    const tabItems = document.querySelectorAll('.tab-item');
    
    // 为每个导航项添加点击事件
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有导航项的active类
            tabItems.forEach(tab => tab.classList.remove('active'));
            
            // 为当前点击的导航项添加active类
            this.classList.add('active');
            
            // 获取当前点击的导航项对应的页面
            const pageName = this.querySelector('span').textContent.toLowerCase();
            
            // 根据不同的导航项跳转到不同的页面
            switch(pageName) {
                case '首页':
                    window.location.href = 'home.html';
                    break;
                case '排行榜':
                    window.location.href = 'leaderboard.html';
                    break;
                case '商店':
                    window.location.href = 'store.html';
                    break;
                case '好友':
                    window.location.href = 'friends.html';
                    break;
                case '我的':
                    window.location.href = 'profile.html';
                    break;
            }
        });
    });
});