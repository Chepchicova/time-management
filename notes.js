// notes.js
function renderNotesPage() {
	const content = document.getElementById('content')
	content.innerHTML = `
    <div class="notes-view">
      <h1>Все заметки</h1>
      <div class="blocks-grid" id="blocksGrid">
        <div class="add-block-btn" id="addBlockBtn">+</div>
      </div>
    </div>
  `

	// Добавляем обработчики
	document.getElementById('addBlockBtn').addEventListener('click', addNewBlock)
}

function addNewBlock() {
	const grid = document.getElementById('blocksGrid')
	const blockId = Date.now()

	const block = document.createElement('div')
	block.className = 'note-block'
	block.innerHTML = `
    <div class="block-preview">
      <h3>Новая заметка</h3>
      <div class="preview-items">
        <div class="preview-item">
          <input type="checkbox">
          <span>Пример задачи</span>
        </div>
      </div>
    </div>
  `

	// Вставляем перед кнопкой
	grid.insertBefore(block, document.getElementById('addBlockBtn'))

	// Обработчик открытия блока
	block.addEventListener('click', () => {
		openBlockEditor(blockId)
	})
}

function openBlockEditor(blockId) {
	const content = document.getElementById('content')
	content.innerHTML = `
    <div class="block-editor">
      <button class="back-btn">←</button>
      <h2 class="block-title" contenteditable="true" placeholder="Название заметки">Новая заметка</h2>
      
      <div class="editor-items">
        <div class="editor-item">
          <input type="checkbox" id="item-1">
          <div class="item-text" contenteditable="true" placeholder="Новая задача"></div>
          <button class="remove-item-btn">×</button>
        </div>
      </div>
      
      <button class="add-item-btn">+ Добавить задачу</button>
    </div>
  `

	// Обработчики
	document.querySelector('.back-btn').addEventListener('click', renderNotesPage)

	document.querySelector('.add-item-btn').addEventListener('click', () => {
		const itemsContainer = document.querySelector('.editor-items')
		const newItem = document.createElement('div')
		newItem.className = 'editor-item'
		newItem.innerHTML = `
      <input type="checkbox" id="item-${Date.now()}">
      <div class="item-text" contenteditable="true" placeholder="Новая задача"></div>
      <button class="remove-item-btn">×</button>
    `
		itemsContainer.appendChild(newItem)
	})
}
