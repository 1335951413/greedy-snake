// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在设置页面
    const themeSettingItem = document.querySelector('.settings-item:has(.fa-palette)');
    if (!themeSettingItem) return;
    
    // 主题选项
    const themes = [
        { name: '默认绿', primary: '#4CAF50', secondary: '#2E7D32' },
        { name: '深蓝', primary: '#1976D2', secondary: '#0D47A1' },
        { name: '紫色', primary: '#9C27B0', secondary: '#6A1B9A' },
        { name: '橙色', primary: '#FF9800', secondary: '#E65100' },
        { name: '粉色', primary: '#E91E63', secondary: '#AD1457' }
    ];
    
    // 当用户点击主题设置时
    themeSettingItem.addEventListener('click', function() {
        // 创建主题选择弹窗
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        let themeOptionsHTML = `
            <div class="bg-white rounded-2xl p-6 w-4/5">
                <h2 class="text-xl font-bold mb-4">选择主题</h2>
                <div class="grid grid-cols-2 gap-4 mb-4">
        `;
        
        // 添加主题选项
        themes.forEach(theme => {
            themeOptionsHTML += `
                <div class="theme-option p-3 rounded-xl flex flex-col items-center" 
                     data-primary="${theme.primary}" 
                     data-secondary="${theme.secondary}">
                    <div class="w-12 h-12 rounded-full mb-2" 
                         style="background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary})"></div>
                    <span>${theme.name}</span>
                </div>
            `;
        });
        
        themeOptionsHTML += `
                </div>
                <button class="w-full bg-gray-200 py-3 rounded-xl font-semibold close-modal">
                    取消
                </button>
            </div>
        `;
        
        modal.innerHTML = themeOptionsHTML;
        document.body.appendChild(modal);
        
        // 添加关闭弹窗事件
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // 添加主题选择事件
        const themeOptions = modal.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const primary = this.dataset.primary;
                const secondary = this.dataset.secondary;
                
                // 保存主题设置到本地存储
                localStorage.setItem('snakeTheme', JSON.stringify({
                    primary: primary,
                    secondary: secondary
                }));
                
                // 应用主题
                applyTheme(primary, secondary);
                
                // 关闭弹窗
                document.body.removeChild(modal);
            });
        });
    });
    
    // 应用主题函数
    function applyTheme(primary, secondary) {
        // 在实际应用中，这里会更新CSS变量或直接修改样式
        console.log(`应用主题: 主色 ${primary}, 辅色 ${secondary}`);
        
        // 这里只是一个演示，实际实现需要更新CSS
        const root = document.documentElement;
        root.style.setProperty('--primary-color', primary);
        root.style.setProperty('--secondary-color', secondary);
        
        // 更新UI元素
        const profileHeader = document.querySelector('.profile-header');
        if (profileHeader) {
            profileHeader.style.background = `linear-gradient(135deg, ${primary}, ${secondary})`;
        }
        
        // 更新按钮颜色
        const buttons = document.querySelectorAll('.ios-button, .bg-green-500');
        buttons.forEach(button => {
            button.style.backgroundColor = primary;
        });
    }
    
    // 检查并应用保存的主题
    const savedTheme = localStorage.getItem('snakeTheme');
    if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        applyTheme(theme.primary, theme.secondary);
    }
});