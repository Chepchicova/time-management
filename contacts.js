/* ============================================================
   contacts.js
   ------------------------------------------------------------
   + description field added to each contact
   + two public functions:
       • renderContactsPage() → string-HTML
       • setupContactsPage()  → устанавливает обработчики
   ---------------------------------------------------------- */

const LS_KEY = 'contacts-v1'

/* ---------- low-level работа с localStorage ---------- */
function readContacts() {
	try {
		return JSON.parse(localStorage.getItem(LS_KEY)) || []
	} catch {
		return []
	}
}
function writeContacts(arr) {
	localStorage.setItem(LS_KEY, JSON.stringify(arr))
}

/* ---------- публичная HTML-разметка страницы ---------- */
export function renderContactsPage() {
	const contacts = readContacts()

	const itemHTML = c => `
       <li class="contact-item" data-id="${c.id}">
         <div class="contact-avatar" style="background:${c.color}">
           ${c.name.charAt(0).toUpperCase()}
         </div>
   
         <div class="contact-info">
           <span class="contact-name">${c.name}</span>
           <span class="contact-phone">${c.phone}</span>
           ${c.email ? `<span class="contact-email">${c.email}</span>` : ''}
           ${
							c.description
								? `<span class="contact-description">${c.description}</span>`
								: ''
						}
         </div>
   
         <div class="contact-actions">
           <button class="edit-btn" title="Редактировать"><img src="/assets/edit-01.svg" /></button>
           <button class="del-btn"  title="Удалить"><img src="/assets/delete.svg" /></button>
         </div>
       </li>`

	return `
       <section id="contactsPage" class="contacts-page">
         <h2 class="contacts-title">Контакты</h2>
   
         <button id="addContactBtn" class="add-contact-btn">
           ＋ Добавить контакт
         </button>
   
         <ul id="contactsList" class="contacts-list">
           ${
							contacts.length
								? contacts.map(itemHTML).join('')
								: '<li class="placeholder">у вас нет друзей!!!!!</li>'
						}
         </ul>
       </section>
     `
}

/* ---------- логика и обработчики ---------- */
export function setupContactsPage() {
	const $list = document.getElementById('contactsList')
	const $addBtn = document.getElementById('addContactBtn')

	function repaint() {
		const contacts = readContacts()
		if (!contacts.length) {
			$list.innerHTML = '<li class="placeholder">у вас нет друзей!!!!!</li>'
			return
		}
		$list.innerHTML = contacts
			.map(
				c => `
         <li class="contact-item" data-id="${c.id}">
           <div class="contact-avatar" style="background:${c.color}">
             ${c.name.charAt(0).toUpperCase()}
           </div>
   
           <div class="contact-info">
             <span class="contact-name">${c.name}</span>
             <span class="contact-phone">${c.phone}</span>
             ${c.email ? `<span class="contact-email">${c.email}</span>` : ''}
             ${
								c.description
									? `<span class="contact-description">${c.description}</span>`
									: ''
							}
           </div>
   
           <div class="contact-actions">
             <button class="edit-btn" title="Редактировать"><img src="/assets/edit.svg" /></button>
           <button class="del-btn"  title="Удалить"><img src="/assets/delete.svg" /></button>
           </div>
         </li>
       `
			)
			.join('')
	}

	function openEditor(contact = null) {
		const isEdit = !!contact
		const data = contact || {
			name: '',
			phone: '',
			email: '',
			description: '',
			color: '#5e5ee4',
		}

		const dlg = document.createElement('dialog')
		dlg.className = 'contact-dialog'
		dlg.innerHTML = `
         <form method="dialog" class="dialog-form">
           <h3>${isEdit ? 'Редактировать контакт' : 'Новый контакт'}</h3>
   
           <label>Имя
             <input name="name" value="${data.name}" required>
           </label>
   
           <label>Телефон
             <input name="phone" value="${data.phone}" required>
           </label>
   
           <label>E-mail
             <input type="email" name="email" value="${data.email}">
           </label>
   
           <label>Описание
             <textarea name="description" rows="2">${
								data.description
							}</textarea>
           </label>
   
           <label>Цвет
             <input type="color" name="color" value="${data.color}">
           </label>
   
           <menu>
             <button value="cancel">Отмена</button>
             <button value="ok" class="primary">Сохранить</button>
           </menu>
         </form>
       `
		document.body.append(dlg)
		dlg.showModal()

		dlg.addEventListener('close', () => {
			if (dlg.returnValue !== 'ok') {
				dlg.remove()
				return
			}

			const fd = Object.fromEntries(new FormData(dlg.querySelector('form')))
			const obj = {
				id: isEdit ? contact.id : Date.now(),
				name: fd.name.trim(),
				phone: fd.phone.trim(),
				email: fd.email.trim(),
				description: fd.description.trim(),
				color: fd.color,
			}

			const arr = readContacts()
			if (isEdit) {
				const idx = arr.findIndex(c => c.id === contact.id)
				arr[idx] = obj
			} else {
				arr.push(obj)
			}
			writeContacts(arr)
			repaint()
			dlg.remove()
		})
	}

	$addBtn?.addEventListener('click', () => openEditor())

	$list?.addEventListener('click', e => {
		const li = e.target.closest('.contact-item')
		if (!li) return
		const id = +li.dataset.id
		const arr = readContacts()
		const item = arr.find(c => c.id === id)

		if (e.target.matches('.edit-btn')) return openEditor(item)

		if (e.target.matches('.del-btn')) {
			if (!confirm(`Удалить контакт «${item.name}»?`)) return
			writeContacts(arr.filter(c => c.id !== id))
			repaint()
		}
	})

	repaint()
}

export function getContacts() {
	try {
		return JSON.parse(localStorage.getItem(LS_KEY)) || []
	} catch {
		return []
	}
}

export function getContactById(id) {
	return getContacts().find(c => c.id === id)
}
