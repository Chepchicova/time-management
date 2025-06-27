// profile.js
export function renderProfilePage(userData = {}) {
  // Получаем сохраненные данные из localStorage или используем дефолтные
  const savedData = JSON.parse(localStorage.getItem('userProfile')) || {};
  
  // Данные пользователя по умолчанию
  const defaultUser = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (123) 456-78-90',
    avatar: 'assets/default-avatar.jpg'
  };

  // Объединяем данные: сохраненные > переданные > дефолтные
  const user = { ...defaultUser, ...userData, ...savedData };

  // HTML структура профиля
  return `
    <div class="profile-container">
      <div class="profile-header">
        <h2>Мой профиль</h2>
      </div>
      
      <div class="profile-content">
        <div class="profile-avatar-section">
          <img src="${user.avatar}" alt="Аватар" class="profile-avatar" id="profileAvatar">
          <button class="change-avatar-btn" id="changeAvatarBtn">Сменить фото</button>
        </div>
        
        <div class="profile-details">
          <div class="detail-row">
            <span class="detail-label">Имя:</span>
            <span class="detail-value" id="userName">${user.name}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value" id="userEmail">${user.email}</span>
          </div>
          
          <div class="detail-row">
            <span class="detail-label">Телефон:</span>
            <span class="detail-value" id="userPhone">${user.phone}</span>
          </div>
        </div>
        
        <button class="edit-profile-btn" id="editProfileBtn">Редактировать профиль</button>
      </div>
    </div>
  `;
}

export function setupProfilePage() {
  // Загружаем сохраненные данные при инициализации
  const savedData = JSON.parse(localStorage.getItem('userProfile'));
  if (savedData) {
    if (savedData.avatar) {
      const avatar = document.getElementById('profileAvatar');
      if (avatar) avatar.src = savedData.avatar;
    }
    
    // Обновляем текстовые поля если есть сохраненные данные
    ['name', 'email', 'phone'].forEach(field => {
      const element = document.getElementById(`user${field.charAt(0).toUpperCase() + field.slice(1)}`);
      if (element && savedData[field]) {
        element.textContent = savedData[field];
      }
    });
  }

  // Обработчики событий
  document.getElementById('editProfileBtn')?.addEventListener('click', enableEditMode);
  document.getElementById('changeAvatarBtn')?.addEventListener('click', changeAvatar);
}

function enableEditMode() {
  const fields = ['userName', 'userEmail', 'userPhone'];
  
  fields.forEach(fieldId => {
    const element = document.getElementById(fieldId);
    if (element) {
      element.contentEditable = true;
      element.focus();
      element.classList.add('editing');
    }
  });

  const editBtn = document.getElementById('editProfileBtn');
  if (editBtn) {
    editBtn.textContent = 'Сохранить изменения';
    editBtn.removeEventListener('click', enableEditMode);
    editBtn.addEventListener('click', saveProfileChanges);
  }
}

function saveProfileChanges() {
  // Собираем обновленные данные
  const updatedData = {
    name: document.getElementById('userName')?.textContent || '',
    email: document.getElementById('userEmail')?.textContent || '',
    phone: document.getElementById('userPhone')?.textContent || '',
    avatar: document.getElementById('profileAvatar')?.src || ''
  };

  // Сохраняем в localStorage
  localStorage.setItem('userProfile', JSON.stringify(updatedData));

  // Выход из режима редактирования
  const fields = ['userName', 'userEmail', 'userPhone'];
  fields.forEach(fieldId => {
    const element = document.getElementById(fieldId);
    if (element) {
      element.contentEditable = false;
      element.classList.remove('editing');
    }
  });

  const editBtn = document.getElementById('editProfileBtn');
  if (editBtn) {
    editBtn.textContent = 'Редактировать профиль';
    editBtn.removeEventListener('click', saveProfileChanges);
    editBtn.addEventListener('click', enableEditMode);
  }
}

function changeAvatar() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const avatar = document.getElementById('profileAvatar');
        if (avatar) {
          avatar.src = event.target.result;
          
          // Обновляем данные в localStorage
          const currentData = JSON.parse(localStorage.getItem('userProfile')) || {};
          currentData.avatar = event.target.result;
          localStorage.setItem('userProfile', JSON.stringify(currentData));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  input.click();
}