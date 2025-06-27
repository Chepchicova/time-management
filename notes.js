// notes.js
let notesData = [];

export function renderNotesPage() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="notes-view">
      <h1>Заметки</h1>
      <div class="blocks-grid" id="blocksGrid">
        ${notesData.map(note => `
          <div class="note-block" data-id="${note.id}">
            ${note.title && note.title !== 'Заголовок' ? 
              `<div class="block-footer">${note.title}</div>` : ''}
          </div>
        `).join('')}
        <div class="add-block-circle" id="addBlockBtn">
      <img src="/assets/additem.svg" width="24" height="24" alt="Add item">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  `;

  document.getElementById('addBlockBtn').addEventListener('click', addNewBlock);
  
  document.querySelectorAll('.note-block').forEach(block => {
    block.addEventListener('click', () => {
      const noteId = parseInt(block.dataset.id);
      openNoteEditor(noteId);
    });
  });
}

// Остальные функции (addNewBlock, openNoteEditor) остаются без изменений

function addNewBlock() {
  const newNote = {
    id: Date.now(),
    title: "Заголовок",
    content: ""
  };
  notesData.push(newNote);
  renderNotesPage();
}

function openNoteEditor(noteId) {
  const note = notesData.find(n => n.id === noteId);
  
  // Преобразуем Markdown-подобный синтаксис в HTML
  const formattedContent = note.content.replace(/-\s\[(x| )\]\s(.+)/g, 
    '<div class="task-line"><input type="checkbox" $1 class="samsung-checkbox"><span>$2</span></div>'
  );

  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="note-editor">
      <button class="back-btn">←</button>
      <h2 class="note-title" contenteditable="true">${note.title}</h2>
      <div class="title-divider"></div>
      <div class="note-content" id="noteContent">${formattedContent || `
        <div class="task-line">
          <input type="checkbox" class="samsung-checkbox">
          <span contenteditable="true">Новая задача</span>
        </div>
      `}</div>
    </div>
  `

  // Ограничение заголовка
  const titleEl = document.querySelector('.note-title');
  titleEl.addEventListener('input', () => {
    if (titleEl.textContent.length > 50) {
      titleEl.textContent = titleEl.textContent.slice(0, 50);
    }
  });

  const contentEl = document.getElementById('noteContent');
  
  // Обработчик для новых задач
  contentEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTask = document.createElement('div');
      newTask.className = 'task-line';
      newTask.innerHTML = `
        <input type="checkbox" class="samsung-checkbox">
        <span contenteditable="true"></span>
      `;
      e.target.closest('.task-line').after(newTask);
      
      // Фокусируемся на новой задаче
      const range = document.createRange();
      range.selectNodeContents(newTask.querySelector('span'));
      range.collapse(true);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });

  document.querySelector('.back-btn').addEventListener('click', () => {
    note.title = titleEl.textContent;
    // Сохраняем в Markdown-подобном формате
    note.content = Array.from(contentEl.querySelectorAll('.task-line')).map(line => {
      const checked = line.querySelector('input').checked ? 'x' : ' ';
      const text = line.querySelector('span').textContent;
      return `- [${checked}] ${text}`;
    }).join('\n');
    renderNotesPage();
  });
}