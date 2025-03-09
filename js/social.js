// 社交功能
document.addEventListener('DOMContentLoaded', function () {
  // 挑战按钮功能
  const challengeButtons = document.querySelectorAll('button:has(.fa-gamepad), button:contains("挑战")');
  challengeButtons.forEach(button => {
    button.addEventListener('click', function () {
      // 获取被挑战的好友名称
      let friendName = "好友";
      const friendNameElement = this.closest('.friend-item, .rank-item, .activity-card')?.querySelector('h3');
      if (friendNameElement) {
        friendName = friendNameElement.textContent;
      }

      // 创建挑战弹窗
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = `
                <div class="bg-white rounded-2xl p-6 w-4/5 text-center">
                    <h2 class="text-xl font-bold mb-4">挑战 ${friendName}</h2>
                    
                    <p class="mb-6">选择游戏模式发起挑战</p>
                    
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="p-3 bg-gray-100 rounded-xl text-center">
                            <i class="fas fa-gamepad text-2xl mb-2 text-green-500"></i>
                            <p>经典模式</p>
                        </div>
                        <div class="p-3 bg-gray-100 rounded-xl text-center">
                            <i class="fas fa-bolt text-2xl mb-2 text-purple-500"></i>
                            <p>闪电模式</p>
                        </div>
                    </div>
                    
                    <div class="flex space-x-4">
                        <button class="flex-1 bg-gray-200 py-3 rounded-xl font-semibold cancel-challenge">
                            取消
                        </button>
                        <button class="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold send-challenge">
                            发送挑战
                        </button>
                    </div>
                </div>
            `;

      document.body.appendChild(modal);

      // 取消挑战
      modal.querySelector('.cancel-challenge').addEventListener('click', function () {
        document.body.removeChild(modal);
      });

      // 发送挑战
      modal.querySelector('.send-challenge').addEventListener('click', function () {
        document.body.removeChild(modal);

        // 显示挑战已发送提示
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg';
        toast.textContent = `已向 ${friendName} 发送挑战邀请`;
        document.body.appendChild(toast);

        // 3秒后移除提示
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 3000);
      });
    });
  });

  // 好友请求处理
  const friendRequestsElement = document.querySelector('.bg-blue-50');
  if (friendRequestsElement) {
    friendRequestsElement.addEventListener('click', function () {
      // 创建好友请求弹窗
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = `
                <div class="bg-white rounded-2xl p-6 w-4/5">
                    <h2 class="text-xl font-bold mb-4">好友请求</h2>
                    
                    <div class="mb-4">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-3">
                            <div class="flex items-center">
                                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="用户头像" class="avatar-sm mr-3">
                                <div>
                                    <h3 class="font-semibold">张三</h3>
                                    <p class="text-xs text-gray-500">2小时前</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="bg-gray-200 px-3 py-1 rounded-full text-sm">拒绝</button>
                                <button class="bg-green-500 text-white px-3 py-1 rounded-full text-sm">接受</button>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-3">
                            <div class="flex items-center">
                                <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="用户头像" class="avatar-sm mr-3">
                                <div>
                                    <h3 class="font-semibold">李四</h3>
                                    <p class="text-xs text-gray-500">昨天</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="bg-gray-200 px-3 py-1 rounded-full text-sm">拒绝</button>
                                <button class="bg-green-500 text-white px-3 py-1 rounded-full text-sm">接受</button>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div class="flex items-center">
                                <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="用户头像" class="avatar-sm mr-3">
                                <div>
                                    <h3 class="font-semibold">王五</h3>
                                    <p class="text-xs text-gray-500">2天前</p>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="bg-gray-200 px-3 py-1 rounded-full text-sm">拒绝</button>
                                <button class="bg-green-500 text-white px-3 py-1 rounded-full text-sm">接受</button>
                            </div>
                        </div>
                    </div>
                    <button class="w-full bg-gray-200 py-3 rounded-xl font-semibold close-modal">
                        关闭
                    </button>
                </div>
            `;

      document.body.appendChild(modal);

      // 关闭弹窗
      modal.querySelector('.close-modal').addEventListener('click', function () {
        document.body.removeChild(modal);
      });

      // 处理接受和拒绝按钮
      const acceptButtons = modal.querySelectorAll('button.bg-green-500');
      const rejectButtons = modal.querySelectorAll('button.bg-gray-200:not(.close-modal)');

      acceptButtons.forEach(button => {
        button.addEventListener('click', function () {
          const requestItem = this.closest('.flex.items-center.justify-between');
          const friendName = requestItem.querySelector('h3').textContent;

          // 显示接受提示
          const toast = document.createElement('div');
          toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg';
          toast.textContent = `已添加 ${friendName} 为好友`;
          document.body.appendChild(toast);

          // 移除请求项
          requestItem.style.opacity = '0.5';
          requestItem.style.pointerEvents = 'none';

          // 3秒后移除提示
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 3000);
        });
      });

      rejectButtons.forEach(button => {
        button.addEventListener('click', function () {
          const requestItem = this.closest('.flex.items-center.justify-between');

          // 移除请求项
          requestItem.style.opacity = '0.5';
          requestItem.style.pointerEvents = 'none';
        });
      });
    });
  }

  // 添加好友按钮功能
  const addFriendButton = document.querySelector('.fixed.bottom-24.right-6 button');
  if (addFriendButton) {
    addFriendButton.addEventListener('click', function () {
      // 创建添加好友弹窗
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = `
                <div class="bg-white rounded-2xl p-6 w-4/5">
                    <h2 class="text-xl font-bold mb-4">添加好友</h2>
                    
                    <div class="mb-6">
                        <div class="search-bar mb-4">
                            <i class="fas fa-search text-gray-400"></i>
                            <input type="text" placeholder="输入ID或用户名搜索">
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-xl mb-4">
                            <h3 class="font-semibold mb-2">扫码添加</h3>
                            <div class="bg-white p-4 rounded-lg flex justify-center">
                                <div class="w-40 h-40 bg-gray-200 flex items-center justify-center">
                                    <i class="fas fa-qrcode text-4xl text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-xl">
                            <h3 class="font-semibold mb-2">附近的玩家</h3>
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg mb-2">
                                <div class="flex items-center">
                                    <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="用户头像" class="avatar-sm mr-3">
                                    <div>
                                        <h3 class="font-semibold">赵六</h3>
                                        <p class="text-xs text-gray-500">500米内</p>
                                    </div>
                                </div>
                                <button class="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                    添加
                                </button>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                                <div class="flex items-center">
                                    <img src="https://randomuser.me/api/portraits/women/55.jpg" alt="用户头像" class="avatar-sm mr-3">
                                    <div>
                                        <h3 class="font-semibold">钱七</h3>
                                        <p class="text-xs text-gray-500">1公里内</p>
                                    </div>
                                </div>
                                <button class="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                    添加
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <button class="w-full bg-gray-200 py-3 rounded-xl font-semibold close-modal">
                        关闭
                    </button>
                </div>
            `;

      document.body.appendChild(modal);

      // 关闭弹窗
      modal.querySelector('.close-modal').addEventListener('click', function () {
        document.body.removeChild(modal);
      });

      // 添加好友按钮功能
      const addButtons = modal.querySelectorAll('button.bg-green-500');
      addButtons.forEach(button => {
        button.addEventListener('click', function () {
          const friendName = this.closest('.flex.items-center.justify-between').querySelector('h3').textContent;

          // 更改按钮状态
          this.textContent = '已发送';
          this.classList.remove('bg-green-500');
          this.classList.add('bg-gray-300');
          this.disabled = true;

          // 显示发送请求提示
          const toast = document.createElement('div');
          toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg';
          toast.textContent = `已向 ${friendName} 发送好友请求`;
          document.body.appendChild(toast);

          // 3秒后移除提示
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 3000);
        });
      });
    });
  }
});