// 页面管理 - 多页面版本，直接跳转
function showPage(pageId) {
  // 映射pageId到对应的HTML文件
  const pageMap = {
    'productShowcasePage': 'index.html',
    'loginPage': 'login.html',
    'onboardingPage': 'onboarding.html',
    'workspacePage': 'workspace.html',
    'profilePage': 'profile.html'
  };
  const url = pageMap[pageId];
  if (url) {
    location.href = url;
  }
}

// 获取当前登录用户的专属key
function getUserKey(baseKey) {
  const user = localStorage.getItem('currentUser') || 'guest';
  return baseKey + '_' + user;
}

// 显示工作台区域 - 跳转到对应页面
function showSection(sectionId) {
  const sectionMap = {
    'homeSection': 'workspace.html',
    'storySection': 'story.html',
    'pictureBookSection': 'picturebook.html',
    'characterSection': 'character.html',
    'competitionSection': 'competition.html',
    'activitySection': 'activity.html',
    'growthReportSection': 'growth.html'
  };
  const url = sectionMap[sectionId];
  if (url) {
    location.href = url;
  }
}

// 成长报告标签切换
function switchGrowthTab(tab) {
  const tabs = document.querySelectorAll('.growth-tab');
  const contents = document.querySelectorAll('.growth-content');
  
  if (tabs.length === 0 || contents.length === 0) return;
  
  tabs.forEach(t => t.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));

  if (tab === 'works') {
    const firstTab = document.querySelector('.growth-tab:first-child');
    const worksContent = document.getElementById('worksContent');
    if (firstTab) firstTab.classList.add('active');
    if (worksContent) worksContent.classList.add('active');
  } else {
    const lastTab = document.querySelector('.growth-tab:last-child');
    const reportContent = document.getElementById('reportContent');
    if (lastTab) lastTab.classList.add('active');
    if (reportContent) reportContent.classList.add('active');
  }
}

// Toast 提示
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return; // 如果页面没有toast元素，直接返回
  
  toast.textContent = message;
  toast.className = 'toast ' + type;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// 显示个人中心页面
function showProfilePage() {
  location.href = 'profile.html';
}

// 切换个人中心标签页
function showProfileSection(section) {
  const navItems = document.querySelectorAll('.profile-nav-item');
  const sections = document.querySelectorAll('.profile-section');

  if (navItems.length === 0 || sections.length === 0) return;

  navItems.forEach(item => item.classList.remove('active'));
  sections.forEach(s => s.classList.remove('active'));

  const navMap = {
    'basic': '个人资料',
    'subscription': '管理订阅',
    'parent': '家长模式',
    'feedback': '意见反馈'
  };

  const targetNav = Array.from(navItems).find(item => item.textContent.includes(navMap[section]));
  if (targetNav) targetNav.classList.add('active');

  const targetSection = document.getElementById(section + 'Section');
  if (targetSection) targetSection.classList.add('active');
}

// 显示支付模态框
function showPaymentModal(type) {
  const modal = document.getElementById('paymentModal');
  if (!modal) return;
  modal.style.display = 'flex';

  // 根据类型显示对应的支付标签页
  if (type === 'wechat') {
    switchPaymentTab('wechat');
  } else if (type === 'alipay') {
    switchPaymentTab('alipay');
  }
}

// 关闭支付模态框
function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// 切换支付标签页
function switchPaymentTab(type) {
  const tabs = document.querySelectorAll('.payment-tab');
  if (tabs.length === 0) return;
  
  tabs.forEach(tab => {
    tab.classList.remove('active');
    if ((type === 'wechat' && tab.textContent.includes('微信')) || 
        (type === 'alipay' && tab.textContent.includes('支付宝'))) {
      tab.classList.add('active');
    }
  });
  
  const wechatQR = document.getElementById('wechatQR');
  const alipayQR = document.getElementById('alipayQR');
  if (wechatQR) wechatQR.classList.toggle('hidden', type !== 'wechat');
  if (alipayQR) alipayQR.classList.toggle('hidden', type !== 'alipay');
}

// 切换作品标签
function switchWorksTab(tabName) {
  // 更新标签按钮状态
  const tabs = document.querySelectorAll('.works-tab');
  if (tabs.length === 0) return; // 如果页面没有作品标签，直接返回
  
  tabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    }
  });

  // 切换内容显示
  const contents = document.querySelectorAll('.works-content');
  contents.forEach(content => {
    content.classList.remove('active');
  });
  
  const targetContent = document.getElementById(tabName + 'Works');
  if (targetContent) {
    targetContent.classList.add('active');
  }
}

// ========== 登录注册处理函数 ==========

// 登录标签切换 - 只在登录页面执行
if (document.querySelector('.login-tab')) {
  document.querySelectorAll('.login-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const tabName = this.dataset.tab;
      // 隐藏所有表单
      document.getElementById('passwordLogin').classList.add('hidden');
      document.getElementById('registerForm').classList.add('hidden');

      if (tabName === 'password') {
        document.getElementById('passwordLogin').classList.remove('hidden');
      } else if (tabName === 'register') {
        document.getElementById('registerForm').classList.remove('hidden');
      }
    });
  });

  // 注册账号链接
  const switchToRegister = document.getElementById('switchToRegister');
  if (switchToRegister) {
    switchToRegister.addEventListener('click', function(e) {
      e.preventDefault();
      // 切换到注册tab
      document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
      document.querySelector('.login-tab[data-tab="register"]').classList.add('active');
      document.getElementById('passwordLogin').classList.add('hidden');
      document.getElementById('registerForm').classList.remove('hidden');
    });
  }
}

// 账号密码登录（老用户直接进入工作台）
function handleLogin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username) {
    showToast('请输入用户名', 'error');
    return;
  }
  if (!password) {
    showToast('请输入密码', 'error');
    return;
  }

  // 保存当前登录用户
  localStorage.setItem('currentUser', username);

  // 模拟登录验证（老用户直接进入工作台）
  showToast('登录成功！', 'success');
  setTimeout(() => {
    location.href = 'workspace.html';
  }, 800);
}

// 用户注册（新用户注册后进入新手引导）
function handleRegister() {
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;
  const passwordConfirm = document.getElementById('regPasswordConfirm').value;

  // 验证输入
  if (!username) {
    showToast('请输入用户名', 'error');
    return;
  }
  if (username.length < 2 || username.length > 10) {
    showToast('用户名长度为2-10个字符', 'error');
    return;
  }
  if (!password) {
    showToast('请设置密码', 'error');
    return;
  }
  if (password.length < 6 || password.length > 20) {
    showToast('密码长度为6-20个字符', 'error');
    return;
  }
  if (password !== passwordConfirm) {
    showToast('两次输入的密码不一致', 'error');
    return;
  }

  // 保存当前登录用户
  localStorage.setItem('currentUser', username);

  // 模拟注册成功（新用户进入新手引导）
  showToast('注册成功！欢迎加入AI创想家～', 'success');
  setTimeout(() => {
    location.href = 'onboarding.html';
  }, 800);
}

// 侧边栏折叠
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('collapsed');
}

// ========== 新手引导功能 ==========

// 随机生成名字
const randomNames = ['小米', '星宝', '阳阳', '朵朵', '乐乐', '豆豆', '糖糖', '小七', '小月', '晨晨'];
function generateRandomName() {
  const name = randomNames[Math.floor(Math.random() * randomNames.length)];
  document.getElementById('userNameInput').value = name;
  document.getElementById('userNameInput').style.animation = 'none';
  setTimeout(() => {
    document.getElementById('userNameInput').style.animation = 'bounce 0.5s';
  }, 10);
}

// 引导步骤完成
function completeStep1() {
  const name = document.getElementById('userNameInput').value || '小朋友';
  showToast(`欢迎 ${name}！`, 'success');
  document.getElementById('huihuiBubble').textContent = `哇，${name}这个名字超好听！我们马上开始创作吧～`;
  updateProgress(33, 2);
  showStep(2);
}

function selectFeature(el) {
  el.classList.toggle('selected');
}

function completeStep2() {
  updateProgress(50, 3);
  document.getElementById('huihuiBubble').textContent = '太棒了！现在我们来选一个故事主题吧！';
  showStep(3);
}

function selectTheme(el) {
  document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function completeStep3() {
  updateProgress(67, 4);
  document.getElementById('huihuiBubble').textContent = '现在我们来给故事主角设计形象吧！';
  showStep(4);
}

function changeCharacter(char, el) {
  document.getElementById('previewCharacter').textContent = char;
  document.querySelectorAll('.role-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

function completeStep4() {
  updateProgress(83, 5);
  document.getElementById('huihuiBubble').textContent = '点击「生成故事」按钮，AI会施展魔法哦！';
  showStep(5);
}

// 生成故事动画
function generateStory() {
  const progress = document.getElementById('generateProgress');
  const fill = document.getElementById('generateFill');
  const text = document.getElementById('generateText');
  
  progress.style.display = 'block';
  
  let percent = 10;
  const interval = setInterval(() => {
    percent += Math.random() * 15;
    if (percent >= 100) {
      percent = 100;
      clearInterval(interval);
      setTimeout(() => {
        updateProgress(100, 6);
        document.getElementById('huihuiBubble').textContent = '太棒啦！故事生成成功！快保存起来吧～';
        createConfetti();
        showStep(6);
      }, 500);
    }
    fill.style.width = percent + '%';
    text.textContent = `正在魔法生成中... ${Math.round(percent)}%`;
  }, 200);
}

// 彩纸爆炸效果
function createConfetti() {
  const container = document.getElementById('confetti');
  container.innerHTML = '';
  const colors = ['#FF6B8B', '#FFD166', '#06D6A0', '#4A90E2', '#9B5DE5'];
  
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    container.appendChild(piece);
  }
}

// 完成引导
function finishOnboarding() {
  showToast('🎉 恭喜获得「创作小能手」徽章！', 'success');
  setTimeout(() => location.href = 'workspace.html', 500);
}

// 跳过引导
function skipOnboarding() {
  location.href = 'workspace.html';
}

// 显示引导步骤
function showStep(stepNum) {
  const steps = document.querySelectorAll('.onboarding-step');
  if (steps.length === 0) return;
  
  steps.forEach(s => s.classList.remove('active'));
  const targetStep = document.getElementById('step' + stepNum);
  if (targetStep) {
    targetStep.classList.add('active');
  }
  
  // 添加卡片入场动画
  const card = document.querySelector('.onboarding-card');
  if (card) {
    card.style.animation = 'none';
    setTimeout(() => card.style.animation = 'card-enter 0.6s ease-out', 10);
  }
}

// 更新进度
function updateProgress(percent, starNum) {
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.width = percent + '%';
  }
  if (starNum <= 5) {
    const star = document.getElementById('star' + starNum);
    if (star) star.classList.add('active');
  }
}

// 上一步
function prevStep(currentStep) {
  showStep(currentStep - 1);
  const progressMap = {2: 17, 3: 33, 4: 50, 5: 67, 6: 83, 7: 100};
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.width = progressMap[currentStep] + '%';
  }
  // 移除后续星星的高亮
  for (let i = currentStep; i <= 5; i++) {
    const star = document.getElementById('star' + i);
    if (star) star.classList.remove('active');
  }
}

// ========== 故事创作器 ==========
let creatorStep = 1;

function selectOption(el) {
  el.closest('.options-grid').querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function creatorNextStep() {
  creatorStep++;
  updateCreatorStep();
}

function creatorPrevStep() {
  creatorStep--;
  updateCreatorStep();
}

function updateCreatorStep() {
  const steps = document.querySelectorAll('.creator-step');
  if (steps.length === 0) return;
  
  steps.forEach(s => s.classList.remove('active'));
  if (creatorStep - 1 < steps.length) {
    steps[creatorStep - 1].classList.add('active');
  }

  // 更新步骤指示器
  const dots = document.querySelectorAll('.step-dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i + 1 === creatorStep) dot.classList.add('active');
    if (i + 1 < creatorStep) dot.classList.add('completed');
  });
}

// 生成故事（旧版本，已替换）
// function creatorGenerate() {
//   showToast('✨ 故事生成中，请稍候...', 'success');
//   setTimeout(() => {
//     showToast('🎉 故事生成成功！', 'success');
//     creatorStep = 1;
//     updateCreatorStep();
//   }, 2000);
// }

// 显示伙伴表单
function showCompanionForm(type) {
  const form = document.getElementById('companionForm');
  if (type === 'none') {
    form.classList.add('hidden');
  } else {
    form.classList.remove('hidden');
    form.querySelector('label').textContent = type === 'friend' ? '伙伴姓名' : '对手姓名';
  }
}

// 多选切换
function toggleMultiSelect(el) {
  el.classList.toggle('selected');
}

// 画风选择
function selectStyleOption(el) {
  el.closest('.style-options').querySelectorAll('.style-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

// 标签切换
function toggleTag(el) {
  el.classList.toggle('selected');
}

// 显示/隐藏角色选择
function toggleCharacterSelection() {
  const checkbox = document.getElementById('importCharacters');
  const characterSelection = document.getElementById('characterSelection');
  if (checkbox && characterSelection) {
    characterSelection.classList.toggle('hidden', !checkbox.checked);
  }
}

// ========== 角色工坊功能 ==========
let currentCharacter = { type: '🧒', gender: '👦', age: '🧒', hair: '💇', eyeColor: '#4A90E2', skinColor: '#FFDAB9', body: '🧍', clothes: '🎒', accessory: '👓', shoes: '👟', prop: '🪄' };

function switchConfigTab(index) {
  // 更新标签选中状态
  const tabs = document.querySelectorAll('.config-tab');
  if (tabs.length === 0) return;
  
  tabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });
  
  // 更新内容显示
  const contents = document.querySelectorAll('.config-content');
  contents.forEach((content, i) => {
    content.classList.toggle('active', content.dataset.tab == index);
  });
}

function selectConfigOption(el, value) {
  // 移除同一组内的选中状态
  el.closest('.config-options').querySelectorAll('.config-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');

  // 更新 currentCharacter 对象
  const groupLabel = el.closest('.config-group').querySelector('.config-label').textContent;
  switch(groupLabel) {
    case '性别':
      currentCharacter.gender = value;
      currentCharacter.type = value; // 同时更新类型
      break;
    case '年龄':
      currentCharacter.age = value;
      break;
    case '发型':
      currentCharacter.hair = value;
      break;
    case '服装':
      currentCharacter.clothes = value;
      break;
    case '配饰':
      currentCharacter.accessory = value;
      break;
    case '鞋子':
      currentCharacter.shoes = value;
      break;
  }

  // 更新角色显示（基于配置类型）
  updateCharacterFromConfig();
}

function selectColor(color, el) {
  currentCharacter.eyeColor = color;
  el.closest('.color-picker').querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

function selectSkinColor(color, el) {
  currentCharacter.skinColor = color;
  el.closest('.color-picker').querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

function showCustomInput(label, el) {
  const value = prompt('请输入自定义' + label + '：');
  if (value && value.trim()) {
    // 找到自定义按钮所在位置，插入新的选项
    const optionsContainer = el.closest('.config-options');
    
    // 创建新的选项元素
    const newOption = document.createElement('div');
    newOption.className = 'config-option selected';
    newOption.textContent = '✨ ' + value.trim();
    newOption.onclick = function() { selectConfigOption(this, '✨ ' + value.trim()); };
    
    // 移除其他选中状态
    optionsContainer.querySelectorAll('.config-option').forEach(o => o.classList.remove('selected'));
    
    // 将新选项插入到自定义按钮之前
    optionsContainer.insertBefore(newOption, el);
    
    // 更新角色显示
    updateCharacterFromConfig();
    
    showToast('已添加自定义' + label + '：' + value, 'success');
  }
}

function showCustomColor(el) {
  const color = prompt('请输入十六进制颜色代码（如：#FF5733）：');
  if (color && /^#[0-9A-Fa-f]{6}$/.test(color)) {
    // 创建新的颜色选项
    const newSwatch = document.createElement('div');
    newSwatch.className = 'color-swatch selected';
    newSwatch.style.background = color;
    newSwatch.onclick = function() { selectColor(color, this); };
    
    // 移除其他选中状态
    el.closest('.color-picker').querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
    
    // 将新选项插入到自定义按钮之前
    el.parentNode.insertBefore(newSwatch, el);
    
    currentCharacter.eyeColor = color;
    showToast('已添加自定义颜色', 'success');
  } else if (color) {
    showToast('请输入有效的颜色代码', 'error');
  }
}

function updateCharacterFromConfig() {
  // 根据配置更新角色显示
  const chars = document.querySelectorAll('#characterSection .config-options');
  let displayText = '';
  
  chars.forEach(group => {
    const selected = group.querySelector('.config-option.selected');
    if (selected) {
      displayText += selected.textContent.split(' ')[0];
    }
  });

  // 如果有生成的图片则不更新
  const studioChar = document.getElementById('studioCharacter');
  if (studioChar) {
    if (!studioChar.querySelector('img')) {
      studioChar.textContent = displayText || '🧒';
    }
  }
}

function generateCharacterArt() {
  showToast('🎨 正在生成立绘，请稍候...', 'success');
  setTimeout(() => {
    const studioChar = document.getElementById('studioCharacter');
    if (studioChar) {
      studioChar.innerHTML = '<img src="' + characterArtBase64 + '" style="width: 100%; height: 100%; object-fit: contain; border-radius: var(--radius-lg);">';
    }
    showToast('✅ 立绘生成成功！', 'success');
  }, 1500);
}

function saveCharacter() {
  // 检查是否生成了立绘（必须先生成立绘才能保存）
  const studioChar = document.getElementById('studioCharacter');
  const hasImage = studioChar && studioChar.querySelector('img') !== null;

  if (!hasImage) {
    showToast('❌ 请先生成角色立绘！', 'error');
    return;
  }

  showToast('⏳ 正在保存角色...', 'success');

  // 使用异步函数处理压缩和保存
  (async function() {
    try {
      // 收集完整的角色配置
      const configData = collectCharacterConfig();

      // 压缩立绘图片（减少体积）
      let compressedImageData = characterArtBase64;
      try {
        compressedImageData = await compressImage(characterArtBase64, 200, 0.7);
        console.log('图片压缩成功，原始大小:', Math.round(characterArtBase64.length / 1024), 'KB, 压缩后:', Math.round(compressedImageData.length / 1024), 'KB');
      } catch (e) {
        console.warn('图片压缩失败，使用原图:', e);
        // 压缩失败不影响保存，使用原图
      }

      // 自动生成角色名称（基于当前时间和配置）
      const gender = configData.gender || '角色';
      const age = configData.age || '';
      const timestamp = Date.now().toString().slice(-4); // 取时间戳后4位
      const name = `${gender}${age}${timestamp}`;

      // 保存角色数据
      let chars = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');

      const newChar = {
        id: Date.now(),
        name: name,
        data: {
          ...configData,
          hasImage: true,
          imageData: compressedImageData // 使用压缩后的图片数据
        },
        date: new Date().toLocaleDateString('zh-CN'),
        tags: ['角色']
      };

      chars.unshift(newChar);
      localStorage.setItem(getUserKey('myCharacters'), JSON.stringify(chars));

      // 如果在作品页面，立即更新显示
      addCharacterToWorksPage(newChar);

      showToast(`✅ 角色「${name}」已保存`, 'success');

      // 延迟跳转到作品与成长页面
      setTimeout(() => {
        location.href = 'growth.html';
      }, 1000);
    } catch (error) {
      console.error('保存角色失败:', error);
      if (error.name === 'QuotaExceededError' || error.message.includes('quota') || error.message.includes('storage')) {
        showToast('❌ 存储空间不足！建议：删除一些旧角色后再保存', 'error');
      } else {
        showToast('❌ 保存失败：' + error.message, 'error');
      }
    }
  })();
}

// 压缩图片为DataURL（返回Promise）
function compressImage(base64, maxWidth = 200, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round(height * (maxWidth / width));
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      try {
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = function() {
      reject(new Error('图片加载失败'));
    };
    img.src = base64;
  });
}

// 收集角色配置（直接从currentCharacter对象读取）
function collectCharacterConfig() {
  return {
    type: currentCharacter.type || '🧒',
    gender: currentCharacter.gender || '👦',
    age: currentCharacter.age || '🧒',
    hair: currentCharacter.hair || '💇',
    eyeColor: currentCharacter.eyeColor || '#4A90E2',
    skinColor: currentCharacter.skinColor || '#FFDAB9',
    clothes: currentCharacter.clothes || '🎒',
    accessory: currentCharacter.accessory || '👓',
    shoes: currentCharacter.shoes || '👟',
    prop: currentCharacter.prop || '🪄'
  };
}

// ========== 家长模式 ==========
function verifyParent() {
  const inputs = document.querySelectorAll('#parentVerify input[type="password"]');
  let password = '';
  inputs.forEach(input => password += input.value);

  if (password === '1234') {
    const parentVerify = document.getElementById('parentVerify');
    const parentControls = document.getElementById('parentControls');
    if (parentVerify) parentVerify.classList.add('hidden');
    if (parentControls) parentControls.classList.remove('hidden');
    showToast('✅ 家长身份验证成功', 'success');
  } else {
    showToast('❌ 密码错误，请重试', 'error');
    inputs.forEach(input => input.value = '');
  }
}

// ========== 支付功能 ==========
function showPaymentModal() {
  // 创建支付模态框
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
    <div class="modal-content" style="max-width: 500px;">
      <div class="modal-header">
        <h3>选择支付方式</h3>
        <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
      <div class="modal-body" style="text-align: center; padding: 2rem;">
        <div style="margin-bottom: 1.5rem; cursor: pointer;" onclick="processPayment('wechat')">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect fill='%2309BB07' width='80' height='80' rx='8'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='40'%3E💬%3C/text%3E%3C/svg%3E" alt="微信支付" style="width: 80px; height: 80px; margin-bottom: 0.5rem;">
          <p style="font-weight: 600; margin-top: 0.5rem;">微信支付</p>
        </div>
        <div style="margin-bottom: 1.5rem; cursor: pointer;" onclick="processPayment('alipay')">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect fill='%231672EE' width='80' height='80' rx='8'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='30'%3E💰%3C/text%3E%3C/svg%3E" alt="支付宝" style="width: 80px; height: 80px; margin-bottom: 0.5rem;">
          <p style="font-weight: 600; margin-top: 0.5rem;">支付宝</p>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">支付成功后即可解锁全部功能</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function processPayment(method) {
  showToast(`正在跳转${method === 'wechat' ? '微信' : '支付宝'}支付...`, 'success');
  setTimeout(() => {
    showToast('🎉 支付成功！您已成为会员！', 'success');
    document.querySelectorAll('.modal').forEach(m => m.remove());
    // 更新用户状态
    document.querySelector('.profile-stat-number').textContent = '会员';
  }, 1500);
}

// ========== 反馈功能 ==========
let currentRating = 0;

// ========== 最终生成故事 ==========
function creatorGenerateFinal() {
  // 在步骤7直接生成,不检查当前步骤(因为步骤7没有选项卡片)
  // 或者可以检查所有步骤1-6是否���已选择(可选)

  // 获取自定义标题
  const customTitleInput = document.getElementById('customStoryTitle');
  const customTitle = customTitleInput ? customTitleInput.value.trim() : '';

  // 显示生成动画和结果页
  showToast('✨ 故事生成中，请稍候...', 'success');
  setTimeout(() => {
    showStoryResult(customTitle);
    showToast('🎉 故事生成成功！已保存到我的作品', 'success');
  }, 2000);
}

// 显示故事结果页
function showStoryResult(customTitle) {
  const defaultTitle = '小声音，大勇气';
  const storyTitle = customTitle ? customTitle : defaultTitle;
  const storyContent = `小声音，大勇气

小暖是个有着一头蓬松卷曲的暖棕色头发、脸蛋总泛着粉扑扑红晕的小姑娘，圆圆的眼睛像浸了晨露的黑葡萄，笑起来会露出两个浅浅的梨涡。她总爱穿那件印着嫩黄圆点的绿裙子，搭配白袜子和棕褐色小皮鞋，像一株在阳光下安静舒展的小薄荷，软萌又腼腆。

小暖有一个只属于自己的秘密朋友 —— 一朵像云朵一样软软的、泛着淡蓝光泽的透明小泡泡。这朵小泡泡是小暖的 "勇气保护伞"：每当人多喧闹、让她觉得紧张不安时，小泡泡就会悄悄变大，像一层温柔的结界，把外面的热闹都轻轻隔开，让害羞的小暖能安安稳稳待在自己的小世界里，不用勉强自己融入陌生的环境。

幼儿园的沙池边，总是最热闹的地方。小朋友们笑着闹着，你追我赶，一起堆起高高的沙堡，笑声像风铃一样清脆。小暖攥着那把彩虹色的小铲子，站在泡泡里远远望着，手指不自觉地抠着铲子的手柄，心里像揣了一只乱撞的小兔子："其实，我也好想和大家一起堆城堡，一起玩…… 可是，我不敢开口。" 她的声音小得像蚊子叫，连自己都快听不清，只能眼睁睁看着小伙伴们的身影，心里满是羡慕。

妈妈总对小暖说："宝贝，勇气不是不害怕，而是虽然害怕，也想试着迈出第一步。" 这句话像一颗温暖的小种子，在小暖心里慢慢发了芽。终于有一天，小暖深吸一口气，攥紧了手里的小铲子，把脸憋得红红的，鼓起全身的力气，对着沙池里的小朋友们，用细若蚊蚋的声音问："我…… 可以和你们一起玩吗？"

她以为没人会听见，可没想到，穿红衣服的小男孩听见了！他笑着跑过来，把手里的红色玩具卡车递到小暖面前，眼睛亮晶晶的："好啊！我们正缺一个会堆漂亮城堡的小伙伴呢！" 那一刻，包裹着小暖的小泡泡轻轻裂开，变成了漫天闪着金光的小星子，温柔地落在她的肩头。原来，小小的声音，也能被温柔听见；小小的勇气，也能开出大大的花。

那天，小暖第一次和小伙伴们一起，堆出了一座金灿灿的、插着小旗子的沙堡。她和小男孩一起挖沙子、堆城墙，笑声第一次像其他小朋友一样，清脆地回荡在沙池边。夕阳西下时，小暖抱着自己的小泡泡，坐在软软的云朵沙发上，心里满是温暖。她终于明白：害羞从来不是缺点，只是勇气在慢慢长大。而那些藏在害羞里的温柔与勇敢，终会带着我们，遇见属于自己的阳光与朋友。`;

  // 填充内容
  const titleEl = document.getElementById('storyResultTitle');
  const bodyEl = document.getElementById('storyResultBody');
  const modalEl = document.getElementById('storyResultModal');

  if (titleEl) titleEl.textContent = storyTitle;
  if (bodyEl) bodyEl.innerHTML = storyContent.replace(/\n/g, '<br><br>');
  if (modalEl) modalEl.style.display = 'flex';

  // 保存故事到本地存储和作品页面
  saveStoryToWorks(storyTitle, storyContent);
}

function closeStoryModal() {
  const modal = document.getElementById('storyResultModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// 保存故事到我的作品（同时更新页面）
function saveStoryToWorks(title, content) {
  let stories = JSON.parse(localStorage.getItem(getUserKey('myStories')) || '[]');

  const newStory = {
    id: Date.now(),
    title: title,
    content: content,
    date: new Date().toLocaleDateString('zh-CN'),
    tags: ['勇气', '成长']
  };

  stories.unshift(newStory);
  localStorage.setItem(getUserKey('myStories'), JSON.stringify(stories));
  
  // 实时添加到作品页面（如果页面打开着）
  addStoryToWorksPage(newStory);
  
  showToast('✅ 故事已保存到我的作品', 'success');
}

// 动态添加故事到作品页面
function addStoryToWorksPage(story) {
  const storiesList = document.getElementById('storiesList');
  if (!storiesList) return;

  // 创建故事卡片
  const card = document.createElement('div');
  card.className = 'work-card';
  card.onclick = () => viewStory(story.title);

  // 根据标题生成随机渐变色和图标
  const colors = [
    'linear-gradient(135deg, #FFE5E5 0%, #FFC9C9 100%)',
    'linear-gradient(135deg, #E5F3FF 0%, #C9E5FF 100%)',
    'linear-gradient(135deg, #E5FFE5 0%, #C9FFC9 100%)',
    'linear-gradient(135deg, #FFF5E5 0%, #FFE5C9 100%)',
    'linear-gradient(135deg, #F3E5FF 0%, #E5C9FF 100%)'
  ];
  const icons = ['📝', '📖', '✨', '🌟', '💫'];
  const randomIndex = story.id % colors.length;

  card.innerHTML = `
    <div class="work-cover" style="background: ${colors[randomIndex]};">
      <span style="font-size: 3rem;">${icons[randomIndex]}</span>
    </div>
    <div class="work-info">
      <h4>${story.title}</h4>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${story.tags ? story.tags.join(' · ') : '我的故事'}</p>
      <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem;">${story.date}</p>
    </div>
  `;

  // 插入到列表开头
  storiesList.insertBefore(card, storiesList.firstChild);
}

// 查看故事详情
function viewStory(title) {
  // 从localStorage获取故事
  const stories = JSON.parse(localStorage.getItem(getUserKey('myStories')) || '[]');
  const story = stories.find(s => s.title === title);

  if (story) {
    // 显示故事内容
    const titleEl = document.getElementById('storyResultTitle');
    const bodyEl = document.getElementById('storyResultBody');
    const modalEl = document.getElementById('storyResultModal');
    
    if (titleEl) titleEl.textContent = story.title;
    if (bodyEl) bodyEl.innerHTML = story.content.replace(/\n/g, '<br><br>');
    if (modalEl) modalEl.style.display = 'flex';
  } else {
    showToast('故事不存在', 'error');
  }
}

// 导出故事为Word文档
function exportStory() {
  const storyTitle = '小声音，大勇气';
  const storyContent = '小暖是个有着一头蓬松卷曲的暖棕色头发、脸蛋总泛着粉扑扑红晕的小姑娘，圆圆的眼睛像浸了晨露的黑葡萄，笑起来会露出两个浅浅的梨涡。她总爱穿那件印着嫩黄圆点的绿裙子，搭配白袜子和棕褐色小皮鞋，像一株在阳光下安静舒展的小薄荷，软萌又腼腆。\n\n小暖有一个只属于自己的秘密朋友——一朵像云朵一样软软的、泛着淡蓝光泽的透明小泡泡。这朵小泡泡是小暖的勇气保护伞，每当人多喧闹、让她觉得紧张不安时，小泡泡就会悄悄变大，像一层温柔的结界，把外面的热闹都轻轻隔开。\n\n幼儿园的沙池边，总是最热闹的地方。小朋友们笑着闹着，一起堆起高高的沙堡。小暖攥着那把彩虹色的小铲子，站在泡泡里远远望着，心里满是羡慕。\n\n妈妈总对小暖说：勇气不是不害怕，而是虽然害怕，也想试着迈出第一步。终于有一天，小暖深吸一口气，鼓起全身的力气，对着沙池里的小朋友们问：我可以和你们一起玩吗？\n\n那一刻，包裹着小暖的小泡泡轻轻裂开，变成了漫天闪着金光的小星子。原来，小���的声音，也能被温柔听见；小小的勇气，也能开出大大的花。\n\n那天，小暖第一次和小伙伴们一起，堆出了一座金灿灿的沙堡。她终于明白：害羞从来不是缺点，只是勇气在慢慢长大。';

  // 创建Word文档内容
  const htmlContent = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + storyTitle + '</title><style>body { font-family: Microsoft YaHei, sans-serif; padding: 40px; line-height: 1.8; } h1 { text-align: center; color: #333; margin-bottom: 30px; } p { text-indent: 2em; margin-bottom: 15px; }</style></head><body><h1>' + storyTitle + '</h1>' + storyContent.split('\n').map(function(p) { return '<p>' + p + '</p>'; }).join('') + '</body></html>';

  // 创建Blob并下载
  const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = storyTitle.replace(/[《》]/g, '') + '.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast('故事已导出为Word文档', 'success');
}

// ========== 个人中心 ==========
function showProfileSection(section) {
  const sections = document.querySelectorAll('.profile-section');
  const navItems = document.querySelectorAll('.profile-nav-item');
  
  if (sections.length === 0 || navItems.length === 0) return;
  
  sections.forEach(s => s.classList.remove('active'));
  navItems.forEach(b => b.classList.remove('active'));

  const contentMap = {
    'works': 'worksContent',
    'growth': 'growthContent',
    'achievements': 'achievementsContent',
    'subscription': 'subscriptionContent',
    'parent': 'parentContent',
    'feedback': 'feedbackContent',
    'settings': 'settingsContent'
  };

  const sectionNames = {
    'works': '我的作品',
    'growth': '我的成长',
    'achievements': '成就徽章',
    'subscription': '会员订阅',
    'parent': '家长模式',
    'settings': '账号设置'
  };

  const targetContent = document.getElementById(contentMap[section]);
  if (targetContent) {
    targetContent.classList.add('active');
  }
  
  // 高亮对应的导航项
  const targetNav = Array.from(navItems).find(item => item.textContent.includes(sectionNames[section]));
  if (targetNav) {
    targetNav.classList.add('active');
  }
}

// 显示导入模态框
function showImportModal(type) {
  const modal = document.getElementById('importModal');
  const storyList = document.getElementById('storyList');
  if (!modal || !storyList) return;

  // 重置选中的ID
  selectedStoryId = null;
  selectedCharacterId = null;

  // 默认显示故事tab
  switchImportTab('story');

  modal.classList.remove('hidden');
}

// 外部导入
function showExternalImport() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.txt,.doc,.docx';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const content = event.target.result;
        localStorage.setItem('currentPictureBookStory', JSON.stringify({
          title: file.name.replace(/\.[^/.]+$/, ''),
          content: content
        }));
        closeImportModal();
        document.getElementById('importSelection').style.display = 'none';
        document.getElementById('styleSelection').style.display = 'block';
        showToast('已导入文件：' + file.name + '，请选择画风', 'success');
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

// 关闭导入模态框
function closeImportModal() {
  document.getElementById('importModal').classList.add('hidden');
}

// 切换导入Tab
function switchImportTab(tab) {
  const storyTab = document.getElementById('storyTab');
  const characterTab = document.getElementById('characterTab');
  const storyContainer = document.getElementById('storyListContainer');
  const characterContainer = document.getElementById('characterListContainer');

  if (tab === 'story') {
    // 切换到故事tab
    storyTab.classList.add('active');
    storyTab.style.color = 'var(--primary)';
    storyTab.style.borderBottom = '2px solid var(--primary)';
    characterTab.classList.remove('active');
    characterTab.style.color = 'var(--text-secondary)';
    characterTab.style.borderBottom = '2px solid transparent';

    storyContainer.classList.remove('hidden');
    characterContainer.classList.add('hidden');

    // 加载故事列表
    loadStoryList();
  } else if (tab === 'character') {
    // 切换到角色tab
    characterTab.classList.add('active');
    characterTab.style.color = 'var(--primary)';
    characterTab.style.borderBottom = '2px solid var(--primary)';
    storyTab.classList.remove('active');
    storyTab.style.color = 'var(--text-secondary)';
    storyTab.style.borderBottom = '2px solid transparent';

    characterContainer.classList.remove('hidden');
    storyContainer.classList.add('hidden');

    // 加载角色列表
    loadCharacterList();
  }
}

// 加载故事列表
function loadStoryList() {
  const storyList = document.getElementById('storyList');
  if (!storyList) return;

  let stories = JSON.parse(localStorage.getItem(getUserKey('myStories')) || '[]');

  // 初始化示例故事（如果localStorage中没有故事）
  if (stories.length === 0) {
    const sampleStories = [
      {
        id: '1',
        title: '小兔子的冒险',
        content: '从前有一只小兔子，它住在一片美丽的森林里。有一天，小兔子决定去探索森林深处的秘密...',
        date: '2024-10-15',
        tags: ['动物', '冒险']
      },
      {
        id: '2',
        title: '太空探险记',
        content: '小明是一个勇敢的宇航员，他驾驶着宇宙飞船飞向遥远的星系，寻找新的家园...',
        date: '2024-10-10',
        tags: ['科幻', '探险']
      },
      {
        id: '3',
        title: '森林运动会',
        content: '森林里的小动物们要举办一场特别的运动会，每个动物都展示了自己的特长...',
        date: '2024-10-05',
        tags: ['动物', '运动']
      }
    ];
    localStorage.setItem(getUserKey('myStories'), JSON.stringify(sampleStories));
    stories = sampleStories;
  }

  if (stories.length === 0) {
    storyList.innerHTML = '<div style="padding: 40px 20px; text-align: center; color: var(--text-light);">' +
      '<div style="font-size: 48px; margin-bottom: 15px;">📚</div>' +
      '<p style="font-size: 15px;">暂无已保存的故事</p>' +
      '<p style="font-size: 13px; margin-top: 10px;">请先在故事创作中生成故事</p>' +
      '<button class="btn btn-primary" style="margin-top: 20px;" onclick="closeImportModal()">关闭</button>' +
    '</div>';
  } else {
    let html = '';
    stories.forEach(function(story) {
      const preview = story.content ? story.content.substring(0, 60) + '...' : '';
      html += '<div class="story-item" onclick="selectStoryForImport(this, \'' + story.id + '\')" data-story-id="' + story.id + '">' +
        '<div style="font-size: 2rem;">📖</div>' +
        '<div style="flex: 1; margin-left: 1rem;">' +
          '<div style="font-weight: 600;">' + story.title + '</div>' +
          '<div style="font-size: 0.85rem; color: var(--text-light);">' + (story.date || '') + '</div>' +
          '<div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + preview + '</div>' +
        '</div>' +
        '<div class="story-checkmark" style="width: 24px; height: 24px; border: 2px solid var(--border); border-radius: 6px; display: flex; align-items: center; justify-content: center;"></div>' +
      '</div>';
    });
    storyList.innerHTML = html;
  }
}

// 加载角色列表
function loadCharacterList() {
  // 兼容 picturebook.html 的 characterList 和其他页面的 charactersList
  const characterList = document.getElementById('characterList') || document.getElementById('charactersList');
  if (!characterList) return;

  let characters = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');

  if (characters.length === 0) {
    characterList.innerHTML = '<div style="grid-column: 1/-1; padding: 40px 20px; text-align: center; color: var(--text-light);">' +
      '<div style="font-size: 48px; margin-bottom: 15px;">🎭</div>' +
      '<p style="font-size: 15px;">暂无已保存的角色</p>' +
      '<p style="font-size: 13px; margin-top: 10px;">请先在角色工坊中设计角色</p>' +
      '<button class="btn btn-primary" style="margin-top: 20px;" onclick="closeImportModal()">关闭</button>' +
    '</div>';
  } else {
    let html = '';
    characters.forEach(function(char) {
      const charName = char.name || '未命名角色';
      const charDate = char.date || '';
      const charType = char.data?.type || '角色';
      const hasImage = char.data?.hasImage && char.data?.imageData;
      const imagePreview = hasImage ?
        '<div style="width: 100%; height: 140px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; background: linear-gradient(135deg, var(--primary-soft) 0%, var(--secondary-light) 100%); border-radius: var(--radius-md); overflow: hidden;">' +
        '<img src="' + char.data.imageData + '" style="width: 100%; height: 100%; object-fit: contain; border-radius: var(--radius-md);">' +
        '</div>' :
        '<div style="width: 100%; height: 140px; display: flex; align-items: center; justify-content: center; font-size: 4rem; margin-bottom: 0.75rem; background: var(--primary-soft); border-radius: var(--radius-md);">🎭</div>';

      html += '<div class="character-item" onclick="selectCharacterForImport(this, \'' + char.id + '\')" data-character-id="' + char.id + '" style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 1rem; border: 2px solid transparent; transition: all 0.3s; cursor: pointer; box-shadow: var(--shadow);">' +
        imagePreview +
        '<div style="font-weight: 600; margin-bottom: 0.25rem; font-size: 1rem;">' + charName + '</div>' +
        '<div style="font-size: 0.85rem; color: var(--text-light);">' + charDate + '</div>' +
        '<div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">' + charType + '</div>' +
        '<div class="character-checkmark" style="width: 24px; height: 24px; border: 2px solid var(--border); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin: 0.75rem auto 0;"></div>' +
        '</div>';
    });
    characterList.innerHTML = html;
  }
}

// 选择故事（用于导入模态框）
let selectedStoryId = null;
let selectedCharacterId = null;

function selectStoryForImport(el, storyId) {
  // 移除故事项的选中状态
  document.querySelectorAll('.story-item').forEach(item => {
    item.classList.remove('selected');
    const checkmark = item.querySelector('.story-checkmark');
    if (checkmark) {
      checkmark.innerHTML = '';
      checkmark.style.borderColor = 'var(--border)';
      checkmark.style.background = 'transparent';
      checkmark.style.color = 'transparent';
    }
  });

  // 移除角色项的选中状态（如果从角色tab切换过来）
  document.querySelectorAll('.character-item').forEach(item => {
    item.classList.remove('selected');
    const checkmark = item.querySelector('.character-checkmark');
    if (checkmark) {
      checkmark.innerHTML = '';
      checkmark.style.borderColor = 'var(--border)';
      checkmark.style.background = 'transparent';
      checkmark.style.color = 'transparent';
    }
  });

  // 添加选中状态到当前故事
  el.classList.add('selected');
  const storyCheckmark = el.querySelector('.story-checkmark');
  if (storyCheckmark) {
    storyCheckmark.innerHTML = '✓';
    storyCheckmark.style.borderColor = 'var(--primary)';
    storyCheckmark.style.background = 'var(--primary)';
    storyCheckmark.style.color = 'white';
  }

  selectedStoryId = storyId;
  selectedCharacterId = null;
}

// 选择角色（用于导入模态框）
function selectCharacterForImport(el, characterId) {
  // 移除角色项的选中状态
  document.querySelectorAll('.character-item').forEach(item => {
    item.classList.remove('selected');
    const checkmark = item.querySelector('.character-checkmark');
    if (checkmark) {
      checkmark.innerHTML = '';
      checkmark.style.borderColor = 'var(--border)';
      checkmark.style.background = 'transparent';
      checkmark.style.color = 'transparent';
    }
  });

  // 移除故事项的选中状态（如果从故事tab切换过来）
  document.querySelectorAll('.story-item').forEach(item => {
    item.classList.remove('selected');
    const checkmark = item.querySelector('.story-checkmark');
    if (checkmark) {
      checkmark.innerHTML = '';
      checkmark.style.borderColor = 'var(--border)';
      checkmark.style.background = 'transparent';
      checkmark.style.color = 'transparent';
    }
  });

  // 添加选中状态到当前角色
  el.classList.add('selected');
  const charCheckmark = el.querySelector('.character-checkmark');
  if (charCheckmark) {
    charCheckmark.innerHTML = '✓';
    charCheckmark.style.borderColor = 'var(--primary)';
    charCheckmark.style.background = 'var(--primary)';
    charCheckmark.style.color = 'white';
  }

  selectedCharacterId = characterId;
  selectedStoryId = null;
}

// 确认导入
function confirmImport() {
  // 判断当前激活的tab
  const storyTab = document.getElementById('storyTab');
  const isStoryTabActive = storyTab.classList.contains('active');

  if (isStoryTabActive) {
    // === 导入故事逻辑 ===
    if (!selectedStoryId) {
      showToast('请选择一个故事，或点击"跳过"直接进入', 'error');
      return;
    }

    const stories = JSON.parse(localStorage.getItem(getUserKey('myStories')) || '[]');
    const story = stories.find(s => s.id == selectedStoryId);

    if (story) {
      localStorage.setItem('currentPictureBookStory', JSON.stringify(story));
      closeImportModal();
      document.getElementById('importSelection').classList.add('hidden');
      document.getElementById('styleSelection').classList.remove('hidden');
      showToast('已导入故事《' + story.title + '》，请选择画风', 'success');
    } else {
      showToast('未找到选中的故事', 'error');
    }
  } else {
    // === 导入角色逻辑 ===
    if (!selectedCharacterId) {
      showToast('请选择一个角色，或点击"跳过"直接进入', 'error');
      return;
    }

    const characters = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');
    const character = characters.find(c => c.id == selectedCharacterId);

    if (character) {
      // 存储当前要导入的角色
      localStorage.setItem('currentPictureBookCharacter', JSON.stringify(character));

      closeImportModal();
      document.getElementById('importSelection').classList.add('hidden');
      document.getElementById('styleSelection').classList.remove('hidden');

      showToast('已导入角色「' + character.name + '」，请选择画风', 'success');
    } else {
      showToast('未找到选中的角色', 'error');
    }
  }
}

// 跳过导入，直接进入画风选择
function skipImport() {
  closeImportModal();
  document.getElementById('importSelection').classList.add('hidden');
  document.getElementById('styleSelection').classList.remove('hidden');
  showToast('已跳过导入，请选择画风', 'success');
}

// 选择绘本画风
let selectedPictureBookStyle = null;
function selectPictureBookStyle(el, style) {
  // 移除其他选中状态
  document.querySelectorAll('.style-card').forEach(card => {
    card.style.border = '2px solid transparent';
    card.style.boxShadow = 'var(--shadow)';
  });
  
  // 添加选中状态
  el.style.border = '2px solid var(--primary)';
  el.style.background = 'var(--primary-soft)';
  
  selectedPictureBookStyle = style;
  
  // 显示生成绘本按钮
  document.getElementById('generateBtn').style.display = 'inline-block';
}

// 生成绘本
function generatePictureBook() {
  showToast('✨ 正在生成绘本...', 'success');
  setTimeout(function() {
    // 获取当前导入的故事或角色信息
    const currentStory = JSON.parse(localStorage.getItem('currentPictureBookStory') || '{}');
    const currentCharacter = JSON.parse(localStorage.getItem('currentPictureBookCharacter') || '{}');

    // 判断导入类型
    const hasStory = currentStory && currentStory.content;
    const hasCharacter = currentCharacter && currentCharacter.name;

    // 保存绘本元数据到作品集
    let title = '我的绘本';
    let description = '生成于AI创想家的绘本作品，包含8张精美插图';

    if (hasStory) {
      title = currentStory.title || '我的绘本';
      description = currentStory.content || description;
    } else if (hasCharacter) {
      title = currentCharacter.name + '的绘本';
      description = '以角色「' + currentCharacter.name + '」为主角生成的绘本';
    }

    savePictureBookToWorks(title, description, null);

    // 清理导入数据
    localStorage.removeItem('currentPictureBookStory');
    localStorage.removeItem('currentPictureBookCharacter');

    // 显示绘本模态框
    showPictureBookModal();
  }, 1000);
}

// 预加载角色立绘图片
function preloadCharacterImages() {
  const characters = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');

  // 检查是否需要更新
  const needsUpdate = characters.some(char => {
    const charData = char.data || {};
    return charData.hasImage && (!charData.imageData || charData.imageData === '' || !charData.imageData.startsWith('data:image'));
  });

  if (!needsUpdate) {
    console.log('✅ 所有角色立绘已就绪，无需更新');
    return;
  }

  // 读取立绘图片
  fetch('images/6c7463ec783e59d8a70482395d8f6bba.jpg')
    .then(response => {
      if (!response.ok) throw new Error('图片加载失败: ' + response.status);
      return response.blob();
    })
    .then(blob => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    })
    .then(base64Data => {
      console.log('✅ 立绘图片加载成功，Base64长度:', base64Data.length);

      // 更新所有需要更新立绘的角色
      let updatedCount = 0;
      const chars = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');

      chars.forEach((char, index) => {
        const charData = char.data || {};
        if (charData.hasImage) {
          chars[index].data = {
            ...charData,
            imageData: base64Data
          };
          updatedCount++;
          console.log(`✓ 已更新角色立绘: ${char.name || '未命名角色'}`);
        }
      });

      localStorage.setItem(getUserKey('myCharacters'), JSON.stringify(chars));
      console.log(`✅ 成功更新 ${updatedCount} 个角色的立绘`);
    })
    .catch(error => {
      console.error('❌ 预加载角色立绘失败:', error);
    });
}

// 显示绘本展示模态框（翻页轮播版）
let currentPage = 1;
const totalPages = 8;
let currentPictureBook = null;

function showPictureBookModal() {
  const titleEl = document.getElementById('pictureBookTitle');
  const contentEl = document.getElementById('pictureBookContent');
  const modalEl = document.getElementById('pictureBookModal');

  if (!titleEl || !contentEl || !modalEl) return;

  // 重置到第一页
  currentPage = 1;

  // 尝试从sessionStorage获取当前查看的绘本（从growth.html点击）
  let book = null;
  const sessionBook = sessionStorage.getItem('currentViewPictureBook');
  if (sessionBook) {
    book = JSON.parse(sessionBook);
    // 清理sessionStorage
    sessionStorage.removeItem('currentViewPictureBook');
  }

  // 如果没有，则使用当前导入的绘本信息（从picturebook.html生成）
  if (!book) {
    const currentStory = JSON.parse(localStorage.getItem('currentPictureBookStory') || '{}');
    if (currentStory && currentStory.content) {
      book = {
        title: currentStory.title || '我的绘本',
        description: currentStory.content
      };
    }
  }

  // 设置标题
  if (book && book.title) {
    titleEl.textContent = '📚 ' + book.title;
  } else {
    titleEl.textContent = '📚 我的绘本';
  }

  currentPictureBook = book;

  // 创建翻页轮播HTML
  let html = `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; min-height: 500px;">

      <!-- 上一页按钮 -->
      <button onclick="previousPage()" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); background: white; border: none; width: 50px; height: 50px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.15); transition: all 0.3s; z-index: 10;"
              onmouseover="this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.transform='translateY(-50%) scale(1)'">
        ‹
      </button>

      <!-- 当前页面图片 -->
      <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.15); max-width: 600px; width: 100%;">
        <img id="pictureBookImage" src="" style="width: 100%; height: 450px; object-fit: contain; display: block;" />
        <div style="padding: 1.5rem; text-align: center; color: var(--text-secondary); font-size: 1rem; border-top: 1px solid var(--border);">
          第 <span id="pageNumber">1</span> / 8 页
        </div>
      </div>

      <!-- 下一页按钮 -->
      <button onclick="nextPage()" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); background: white; border: none; width: 50px; height: 50px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.15); transition: all 0.3s; z-index: 10;"
              onmouseover="this.style.transform='translateY(-50%) scale(1.1)'" onmouseout="this.style.transform='translateY(-50%) scale(1)'">
        ›
      </button>

    </div>
  `;

  contentEl.innerHTML = html;

  // 加载第一张图片
  updatePictureBookPage();

  modalEl.classList.remove('hidden');
}

// 上一页
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePictureBookPage();
  }
}

// 下一页
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePictureBookPage();
  }
}

// 更新当前页面图片
function updatePictureBookPage() {
  const imgEl = document.getElementById('pictureBookImage');
  const pageNumEl = document.getElementById('pageNumber');

  if (imgEl && pageNumEl) {
    var imgNum = String(currentPage).padStart(2, '0');
    // picturebook.html在AI创想家_拆分版/目录中，使用相对路径
    var imgPath = './images/' + imgNum + '.jpg';
    console.log('Loading image:', imgPath, 'for page:', currentPage);
    imgEl.src = imgPath;
    pageNumEl.textContent = currentPage;

    // 添加错误处理
    imgEl.onerror = function() {
      console.error('Failed to load image:', imgPath);
      // 尝试备用路径
      var fallbackPath = 'images/' + imgNum + '.jpg';
      console.log('Trying fallback path:', fallbackPath);
      imgEl.src = fallbackPath;
    };

    imgEl.onload = function() {
      console.log('Image loaded successfully:', imgPath);
    };
  }
}

// 关闭绘本展示模态框
function closePictureBookModal() {
  document.getElementById('pictureBookModal').classList.add('hidden');
}

// 导出绘本PDF
async function exportPictureBookPDF() {
  showToast('正在生成PDF，请稍候...', 'success');
  
  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // 先预加载所有图片，等待每张图片加载完成
    for (let i = 1; i <= 8; i++) {
      const imgNum = String(i).padStart(2, '0');
      const imgPath = './images/' + imgNum + '.jpg';
      
      try {
        // 使用fetch获取图片的blob，然后转为base64
        const response = await fetch(imgPath);
        const blob = await response.blob();
        const base64 = await blobToBase64(blob);
        
        // 创建图片获取实际尺寸
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = 'data:image/jpeg;base64,' + base64;
        });
        
        // 计算图片在A4纸上的尺寸（保持宽高比）
        let imgWidth = pageWidth - 20;
        let imgHeight = (img.height / img.width) * imgWidth;
        
        // 如果图片太高，缩放到页面高度
        if (imgHeight > pageHeight - 30) {
          imgHeight = pageHeight - 30;
          imgWidth = (img.width / img.height) * imgHeight;
        }
        
        // 添加图片到PDF
        const x = (pageWidth - imgWidth) / 2;
        const y = 10;
        
        pdf.addImage('data:image/jpeg;base64,' + base64, 'JPEG', x, y, imgWidth, imgHeight);
        
        // 如果不是最后一页，添加新页面
        if (i < 8) {
          pdf.addPage();
        }
      } catch (e) {
        console.log('处理图片 ' + i + ' 失败: ' + e);
      }
    }
    
    // 获取故事标题作为文件名
    const story = JSON.parse(localStorage.getItem('currentPictureBookStory') || '{}');
    const fileName = story.title ? story.title + '.pdf' : '我的绘本.pdf';
    
    pdf.save(fileName);
    showToast('✅ PDF导出成功！', 'success');
  } catch (err) {
    console.error('PDF导出失败:', err);
    showToast('PDF导出失败，请重试', 'error');
  }
}

// blob转base64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// 外部导入
function showExternalImport() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.txt,.doc,.docx';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const content = event.target.result;
        localStorage.setItem('currentPictureBookStory', JSON.stringify({
          title: file.name.replace(/\.[^/.]+$/, ''),
          content: content
        }));
        showToast('已导入文件：' + file.name, 'success');
        document.getElementById('importSelection').classList.add('hidden');
        document.getElementById('styleSelection').classList.remove('hidden');
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

// 切换角色选择区域
function toggleCharacterSelection() {
  const checkbox = document.getElementById('importCharacters');
  const characterSelection = document.getElementById('characterSelection');
  if (checkbox && characterSelection) {
    characterSelection.classList.toggle('hidden', !checkbox.checked);
  }
}

// 切换标签选中状态
function toggleTag(el) {
  el.classList.toggle('selected');
}

// ========== 角色配置 ==========
function selectConfigOption(el, char) {
  el.closest('.config-options').querySelectorAll('.config-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  const studioChar = document.getElementById('studioCharacter');
  if (studioChar) {
    studioChar.textContent = char;
  }
}

// ========== 倒计时 ==========
function updateCountdown() {
  // 只在有秒数和分钟元素的页面上执行
  const secondsEl = document.getElementById('seconds');
  const minutesEl = document.getElementById('minutes');
  
  if (!secondsEl || !minutesEl) return; // 如果元素不存在，直接返回
  
  let sec = parseInt(secondsEl.textContent);
  let min = parseInt(minutesEl.textContent);
  
  sec--;
  if (sec < 0) {
    sec = 59;
    min--;
    if (min < 0) min = 59;
  }
  
  secondsEl.textContent = sec.toString().padStart(2, '0');
  minutesEl.textContent = min.toString().padStart(2, '0');
}

// 只在competition.html页面启动倒计时
if (document.getElementById('seconds') && document.getElementById('minutes')) {
  setInterval(updateCountdown, 1000);
}

// ========== 页面加载完成后隐藏加载动画 ==========
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }, 500);
});

// ========== 滚动动画 (Intersection Observer) ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// 只在有卡片元素的页面上监听
const cards = document.querySelectorAll('.event-card, .template-card, .work-card');
if (cards.length > 0) {
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// 滚动时顶部栏阴影
window.addEventListener('scroll', function() {
  const topBar = document.querySelector('.top-bar');
  if (topBar) {
    if (window.scrollY > 10) {
      topBar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      topBar.style.boxShadow = 'none';
    }
  }
});

// ========== 作品页面初始化 ==========
// 页面加载时从localStorage加载已保存的作品
document.addEventListener('DOMContentLoaded', function() {
  // 在工作台页面(workspace.html)加载最近作品
  const worksGrid = document.getElementById('worksGrid');
  if (worksGrid) {
    loadRecentWorks(worksGrid);
  }

  // 在作品与成长页面(growth.html)加载所有作品
  if (document.getElementById('storiesList')) {
    loadSavedWorks();
  }

  // 更新欢迎语 - 显示用户昵称
  const userName = localStorage.getItem('userNickname') || '小朋友';
  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeSubtitle = document.getElementById('welcomeSubtitle');

  if (welcomeTitle) {
    const hour = new Date().getHours();
    let greeting = '下午好';
    if (hour < 12) greeting = '早上好';
    else if (hour < 18) greeting = '下午好';
    else greeting = '晚上好';

    welcomeTitle.innerHTML = `${greeting}，<span id="userNameDisplay">${userName}</span>宝贝！👋`;
  }

  if (welcomeSubtitle) {
    const suggestions = [
      '今天想创作什么有趣的故事呢？',
      '开启你的创意冒险吧！',
      '用AI写出精彩故事～',
      '画出你心中的梦想！'
    ];
    welcomeSubtitle.textContent = suggestions[Math.floor(Math.random() * suggestions.length)];
  }

  // 检查是否有新生成的故事需要显示
  const newStoryTitle = sessionStorage.getItem('newStoryTitle');
  const newStoryContent = sessionStorage.getItem('newStoryContent');
  if (newStoryTitle && newStoryContent) {
    // 自动保存到作品集
    saveStoryToWorks(newStoryTitle, newStoryContent);
    sessionStorage.removeItem('newStoryTitle');
    sessionStorage.removeItem('newStoryContent');
  }

  // 预加载角色立绘图片（确保立绘正确显示）
  preloadCharacterImages();
});

// 在工作台加载最近作品
function loadRecentWorks(worksGrid) {
  // 清空现有内容
  worksGrid.innerHTML = '';

  // 加载最近的故事(最多3个)
  const stories = JSON.parse(localStorage.getItem(getUserKey('myStories')) || '[]');
  const recentStories = stories.slice(0, 3);

  if (recentStories.length === 0) {
    worksGrid.innerHTML = '<div class="work-card" style="display: flex; align-items: center; justify-content: center; min-height: 200px; color: var(--text-light);">暂无作品，开始创作吧！</div>';
    return;
  }

  recentStories.forEach(story => {
    const card = document.createElement('div');
    card.className = 'work-card';
    card.onclick = () => viewStory(story.title);

    const colors = [
      'linear-gradient(135deg, #FFE5E5 0%, #FFC9C9 100%)',
      'linear-gradient(135deg, #E5F3FF 0%, #C9E5FF 100%)',
      'linear-gradient(135deg, #E5FFE5 0%, #C9FFC9 100%)'
    ];
    const icons = ['📝', '📖', '✨'];
    const randomIndex = story.id % colors.length;

    card.innerHTML = `
      <div class="work-cover" style="background: ${colors[randomIndex]}; height: 150px;">
        <span style="font-size: 3rem;">${icons[randomIndex]}</span>
      </div>
      <div class="work-info">
        <h4>${story.title}</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${story.date}</p>
      </div>
    `;

    worksGrid.appendChild(card);
  });
}

// 加载已保存的作品
function loadSavedWorks() {
  // 只在有对应容器的页面加载
  const storiesList = document.getElementById('storiesList');
  const pictureBooksList = document.getElementById('pictureBooksList');
  const charactersList = document.getElementById('charactersList');

  // 加载故事
  if (storiesList) {
    const stories = JSON.parse(localStorage.getItem(getUserKey('myStories')) || '[]');
    stories.forEach(story => addStoryToWorksPage(story));
  }

  // 加载绘本
  if (pictureBooksList) {
    const pictureBooks = JSON.parse(localStorage.getItem(getUserKey('myPictureBooks')) || '[]');
    pictureBooks.forEach(book => addPictureBookToWorksPage(book));
  }

  // 加载角色
  if (charactersList) {
    const characters = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');
    characters.forEach(char => addCharacterToWorksPage(char));
  }

  // 更新统计数据
  updateGrowthStats();
}

// 保存绘本到我的作品
function savePictureBookToWorks(title, description, imageData) {
  let books = JSON.parse(localStorage.getItem(getUserKey('myPictureBooks')) || '[]');

  const newBook = {
    id: Date.now(),
    title: title,
    description: description,
    imageData: imageData,
    coverImage: './images/01.jpg', // 第一页作为封面
    date: new Date().toLocaleDateString('zh-CN'),
    tags: ['绘本']
  };

  books.unshift(newBook);
  localStorage.setItem(getUserKey('myPictureBooks'), JSON.stringify(books));
  addPictureBookToWorksPage(newBook);

  showToast('✅ 绘本已保存到我的作品', 'success');
}

// 动态添加绘本到作品页面
function addPictureBookToWorksPage(book) {
  const booksList = document.getElementById('pictureBooksList');
  if (!booksList) return;

  const card = document.createElement('div');
  card.className = 'work-card';
  card.onclick = () => viewPictureBook(book.title);

  const colors = [
    'linear-gradient(135deg, #E5F3FF 0%, #C9E5FF 100%)',
    'linear-gradient(135deg, #E5FFE5 0%, #C9FFC9 100%)',
    'linear-gradient(135deg, #FFF5E5 0%, #FFE5C9 100%)',
    'linear-gradient(135deg, #F3E5FF 0%, #E5C9FF 100%)',
    'linear-gradient(135deg, #FFE5F3 0%, #FFC9E5 100%)'
  ];
  const icons = ['📚', '📖', '🎨', '🖼️', '📕'];
  const randomIndex = book.id % colors.length;

  card.innerHTML = `
    <div class="work-cover work-cover-image">
      <img src="${book.coverImage || './images/01.jpg'}" 
           alt="${book.title}" 
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
      <div class="cover-fallback" style="display: none; width: 100%; height: 100%; background: ${colors[randomIndex]}; align-items: center; justify-content: center;">
        <span style="font-size: 3rem;">${icons[randomIndex]}</span>
      </div>
    </div>
    <div class="work-info">
      <h4>${book.title}</h4>
      <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem;">${book.date}</p>
    </div>
  `;

  booksList.insertBefore(card, booksList.firstChild);
}

// 查看绘本详情
function viewPictureBook(title) {
  const books = JSON.parse(localStorage.getItem(getUserKey('myPictureBooks')) || '[]');
  const book = books.find(b => b.title === title);

  if (book) {
    // 保存当前查看的绘本ID到sessionStorage，以便showPictureBookModal使用
    sessionStorage.setItem('currentViewPictureBook', JSON.stringify(book));

    // 显示绘本模态框
    showPictureBookModal();

    showToast(`查看绘本：《${title}》`, 'success');
  } else {
    showToast('绘本不存在', 'error');
  }
}

// 保存角色到我的作品
function saveCharacterToWorks(name, characterData) {
  let chars = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');

  const newChar = {
    id: Date.now(),
    name: name,
    data: characterData,
    date: new Date().toLocaleDateString('zh-CN'),
    tags: ['角色']
  };

  chars.unshift(newChar);
  localStorage.setItem(getUserKey('myCharacters'), JSON.stringify(chars));
  addCharacterToWorksPage(newChar);

  showToast('✅ 角色已保存到我的作品', 'success');
}

// 动态添加角色到作品页面
function addCharacterToWorksPage(char) {
  const charsList = document.getElementById('charactersList');
  if (!charsList) return;

  const card = document.createElement('div');
  card.className = 'work-card';
  card.onclick = () => viewCharacter(char.name);

  const colors = [
    'linear-gradient(135deg, #FFE5E5 0%, #FFC9C9 100%)',
    'linear-gradient(135deg, #FFF5E5 0%, #FFE5C9 100%)',
    'linear-gradient(135deg, #E5F3FF 0%, #C9E5FF 100%)',
    'linear-gradient(135deg, #E5FFE5 0%, #C9FFC9 100%)',
    'linear-gradient(135deg, #F3E5FF 0%, #E5C9FF 100%)'
  ];
  const icons = ['🎭', '🧒', '👦', '👧', '🧑'];
  const randomIndex = char.id % colors.length;

  const hasImage = char.data && char.data.hasImage && char.data.imageData;
  const imageData = hasImage ? char.data.imageData : null;

  card.innerHTML = `
    <div class="work-cover work-cover-image">
      ${imageData ?
        `<img src="${imageData}" alt="${char.name}" style="width: 100%; height: 100%; object-fit: cover;">` :
        `<div style="width: 100%; height: 100%; background: ${colors[randomIndex]}; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 3rem;">${icons[randomIndex]}</span>
        </div>`
      }
    </div>
    <div class="work-info">
      <h4>${char.name}</h4>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${char.data?.type || '我的角色'}</p>
      <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem;">${char.date}</p>
    </div>
  `;

  charsList.insertBefore(card, charsList.firstChild);
}

// 查看角色详情
function viewCharacter(name) {
  const chars = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');
  const char = chars.find(c => c.name === name);

  if (char) {
    // 保存当前查看的角色
    sessionStorage.setItem('currentViewCharacter', JSON.stringify(char));

    // 显示角色详情模态框
    showCharacterDetailModal();

    showToast(`查看角色：${name}`, 'success');
  } else {
    showToast('角色不存在', 'error');
  }
}

// 显示角色详情模态框
function showCharacterDetailModal() {
  const titleEl = document.getElementById('characterDetailTitle');
  const contentEl = document.getElementById('characterDetailContent');
  const modalEl = document.getElementById('characterDetailModal');

  if (!titleEl || !contentEl || !modalEl) return;

  // 从sessionStorage获取角色数据
  const char = JSON.parse(sessionStorage.getItem('currentViewCharacter') || '{}');

  if (!char || !char.name) {
    showToast('角色数据无效', 'error');
    return;
  }

  // 设置标题
  titleEl.textContent = '🎭 ' + char.name;

  // 生成角色详情HTML
  const charData = char.data || {};
  const hasImage = charData.hasImage && charData.imageData;

  // 角色属性展示
  const gender = charData.gender || '👦';
  const age = charData.age || '🧒';
  const hair = charData.hair || '💇';
  const eyeColor = charData.eyeColor || '#4A90E2';
  const skinColor = charData.skinColor || '#FFDAB9';
  const clothes = charData.clothes || '🎒';
  const accessory = charData.accessory || '👓';
  const shoes = charData.shoes || '👟';
  const prop = charData.prop || '🪄';

  let html = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">

      <!-- 角色立绘展示 -->
      <div style="text-align: center;">
        ${hasImage ?
          `<img src="${charData.imageData}" style="max-width: 200px; max-height: 200px; border-radius: var(--radius-lg); box-shadow: 0 8px 30px rgba(0,0,0,0.15);">` :
          `<div style="width: 200px; height: 200px; background: var(--primary-soft); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; font-size: 5rem; margin: 0 auto;">🎭</div>`
        }
      </div>

      <!-- 基本信息 -->
      <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-lg);">
        <h3 style="margin: 0 0 1rem 0; font-size: 1.1rem; color: var(--text);">基本信息</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; font-size: 0.95rem;">
          <div><strong>名称：</strong>${char.name}</div>
          <div><strong>性别：</strong>${gender}</div>
          <div><strong>年龄：</strong>${age}</div>
          <div><strong>发型：</strong>${hair}</div>
          <div><strong>瞳色：</strong><span style="display: inline-block; width: 16px; height: 16px; background: ${eyeColor}; border-radius: 50%; vertical-align: middle; margin-left: 5px;"></span></div>
          <div><strong>肤色：</strong><span style="display: inline-block; width: 16px; height: 16px; background: ${skinColor}; border-radius: 50%; vertical-align: middle; margin-left: 5px;"></span></div>
        </div>
      </div>

      <!-- 装扮详情 -->
      <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-lg);">
        <h3 style="margin: 0 0 1rem 0; font-size: 1.1rem; color: var(--text);">装扮细节</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; font-size: 0.95rem;">
          <div><strong>服装：</strong>${clothes}</div>
          <div><strong>配饰：</strong>${accessory}</div>
          <div><strong>鞋子：</strong>${shoes}</div>
          <div><strong>道具：</strong>${prop}</div>
        </div>
      </div>

      <!-- 描述信息 -->
      <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-lg);">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--text);">角色描述</h3>
        <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">
          ${charData.description || '这是一个精心设计的角色，拥有独特的个性和魅力。'}
        </p>
      </div>

      <!-- 元数据 -->
      <div style="font-size: 0.85rem; color: var(--text-light); text-align: center; padding: 0.5rem;">
        创建于 ${char.date || '未知时间'}
      </div>

    </div>
  `;

  contentEl.innerHTML = html;

  // 显示模态框
  modalEl.classList.remove('hidden');
}

// 关闭角色详情模态框
function closeCharacterDetailModal() {
  document.getElementById('characterDetailModal').classList.add('hidden');
}

// 在绘本生成中使用此角色
function useCharacterInPictureBook() {
  closeCharacterDetailModal();

  // 从sessionStorage获取当前角色
  const char = JSON.parse(sessionStorage.getItem('currentViewCharacter') || '{}');

  if (char && char.name) {
    // 跳转到绘本生成页面
    location.href = 'picturebook.html';
  } else {
    showToast('角色数据无效', 'error');
  }
}

// ========== 家长模式 ==========
let parentVerified = false;

function handlePwdInput(input, index) {
  const inputs = document.querySelectorAll('.pwd-input');
  
  if (input.value.length === 1 && index < inputs.length - 1) {
    inputs[index + 1].focus();
  }
}

function verifyParentPassword() {
  const inputs = document.querySelectorAll('.pwd-input');
  let password = '';
  inputs.forEach(input => password += input.value);
  
  if (password.length !== 4) {
    showToast('请输入完整的4位密码', 'error');
    return;
  }
  
  // 模拟验证（实际应用中应该与服务器验证）
  if (password === '1234' || password === '0000') {
    parentVerified = true;
    const parentVerify = document.getElementById('parentVerify');
    const parentControls = document.getElementById('parentControls');
    if (parentVerify) parentVerify.classList.add('hidden');
    if (parentControls) parentControls.classList.remove('hidden');
    showToast('验证成功', 'success');
  } else {
    showToast('密码错误，请重试', 'error');
    inputs.forEach(input => input.value = '');
    if (inputs[0]) inputs[0].focus();
  }
}

// ========== 反馈功能 (只在profile.html页面执行) ==========
if (document.querySelector('#feedbackSection')) {
  let currentRating = 0;

  // 评分星星点击事件
  document.querySelectorAll('#feedbackSection .star').forEach(star => {
    star.addEventListener('click', function() {
      const stars = document.querySelectorAll('#feedbackSection .star');
      const index = Array.from(stars).indexOf(this);
      currentRating = index + 1;

      stars.forEach((s, i) => {
        if (i <= index) {
          s.classList.add('filled');
          s.style.color = '#FFD166';
        } else {
          s.classList.remove('filled');
          s.style.color = 'inherit';
        }
      });

      const ratingText = document.getElementById('ratingText');
      if (ratingText) {
        const texts = ['', '很差 😞', '一般 😐', '还行 🙂', '不错 😊', '完美 🎉'];
        ratingText.textContent = texts[index + 1];
      }
    });
  });

  // 文件上传处理
  window.handleUpload = function(input) {
    const files = input.files;
    const preview = document.getElementById('uploadPreview');
    if (!preview) return;

    preview.innerHTML = '';

    if (files.length > 3) {
      showToast('最多只能上传3张图片', 'error');
      return;
    }

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.width = '80px';
        img.style.height = '80px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = 'var(--radius-md)';
        img.style.marginRight = '8px';
        img.style.marginBottom = '8px';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  };

  // 提交反馈
  window.submitFeedback = function(e) {
    if (e) e.preventDefault();

    const textarea = document.querySelector('#feedbackSection textarea');
    if (!textarea) return;

    if (!textarea.value.trim()) {
      showToast('请填写问题描述', 'error');
      return;
    }

    showToast('感谢你的反馈！', 'success');
    if (textarea) textarea.value = '';
    currentRating = 0;

    // 重置星星
    document.querySelectorAll('#feedbackSection .star').forEach(star => {
      star.classList.remove('filled');
      star.style.color = 'inherit';
    });

    const preview = document.getElementById('uploadPreview');
    if (preview) preview.innerHTML = '';
    const ratingText = document.getElementById('ratingText');
    if (ratingText) ratingText.textContent = '';
  };
}

// ========== 实时同步作品到成长页面 ==========
// 监听 localStorage 变化，实时更新 growth.html
window.addEventListener('storage', function(e) {
  // 只在当前页面是成长页面时更新
  if (!document.getElementById('growthPage')) return;

  const key = e.key;

  // 根据变化的键更新对应列表
  if (key === 'myStories') {
    refreshStoriesList();
  } else if (key === 'myPictureBooks') {
    refreshPictureBooksList();
  } else if (key === 'myCharacters') {
    refreshCharactersList();
  }
});

// 刷新故事列表
function refreshStoriesList() {
  const storiesList = document.getElementById('storiesList');
  if (!storiesList) return;

  storiesList.innerHTML = '';
  const stories = JSON.parse(localStorage.getItem(getUserKey('myStories')) || '[]');

  if (stories.length === 0) {
    storiesList.innerHTML = '<p style="color: var(--text-light);">暂无故事，去创作吧！</p>';
    return;
  }

  stories.forEach(story => addStoryToWorksPage(story));
  updateGrowthStats();
}

// 刷新绘本列表
function refreshPictureBooksList() {
  const pictureBooksList = document.getElementById('pictureBooksList');
  if (!pictureBooksList) return;

  pictureBooksList.innerHTML = '';
  const pictureBooks = JSON.parse(localStorage.getItem(getUserKey('myPictureBooks')) || '[]');

  if (pictureBooks.length === 0) {
    pictureBooksList.innerHTML = '<p style="color: var(--text-light);">暂无绘本，去生成吧！</p>';
    return;
  }

  pictureBooks.forEach(book => addPictureBookToWorksPage(book));
  updateGrowthStats();
}

// 刷新角色列表
function refreshCharactersList() {
  const charactersList = document.getElementById('charactersList');
  if (!charactersList) return;

  charactersList.innerHTML = '';
  const characters = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');

  if (characters.length === 0) {
    charactersList.innerHTML = '<p style="color: var(--text-light);">暂无角色，去设计吧！</p>';
    return;
  }

  characters.forEach(char => addCharacterToWorksPage(char));
  updateGrowthStats();
}

// 更新作品统计
function updateGrowthStats() {
  const stories = JSON.parse(localStorage.getItem(getUserKey('myStories')) || '[]');
  const pictureBooks = JSON.parse(localStorage.getItem(getUserKey('myPictureBooks')) || '[]');
  const characters = JSON.parse(localStorage.getItem(getUserKey('myCharacters')) || '[]');

  // 更新统计卡片
  const totalStories = document.getElementById('totalStories');
  const totalPictureBooks = document.getElementById('totalPictureBooks');
  const totalCharacters = document.getElementById('totalCharacters');

  if (totalStories) totalStories.textContent = stories.length;
  if (totalPictureBooks) totalPictureBooks.textContent = pictureBooks.length;
  if (totalCharacters) totalCharacters.textContent = characters.length;

  // 更新徽章计数
  const storyCountBadge = document.getElementById('storyCountBadge');
  const bookCountBadge = document.getElementById('bookCountBadge');
  const charCountBadge = document.getElementById('charCountBadge');

  if (storyCountBadge) storyCountBadge.textContent = stories.length;
  if (bookCountBadge) bookCountBadge.textContent = pictureBooks.length;
  if (charCountBadge) charCountBadge.textContent = characters.length;
}

