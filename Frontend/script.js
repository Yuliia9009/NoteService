const apiUrl = 'http://localhost:8080/notes';

// Загрузка всех заметок
async function loadNotes() {
    const response = await fetch(apiUrl);
    const notes = await response.json();
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note.text;
        notesList.appendChild(li);
    });
}

// Добавление новой заметки
async function addNote() {
    const noteText = document.getElementById('noteText').value;
    if (!noteText.trim()) {
        alert('Введите текст заметки!');
        return;
    }

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: noteText })
    });

    document.getElementById('noteText').value = '';
    loadNotes();
}

// Функция для показа уведомлений
function showMessage(message, isError = false) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = message;
    msgDiv.style.padding = '10px';
    msgDiv.style.margin = '10px 0';
    msgDiv.style.borderRadius = '5px';
    msgDiv.style.color = isError ? 'white' : 'green';
    msgDiv.style.backgroundColor = isError ? 'red' : '#d4edda';
    document.body.insertBefore(msgDiv, document.getElementById('notesList'));

    setTimeout(() => {
        msgDiv.remove();
    }, 3000);
}

// Загрузка всех заметок
async function loadNotes() {
    try {
        const response = await fetch(apiUrl);
        const notes = await response.json();
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';

        notes.forEach(note => {
            const li = document.createElement('li');
            li.classList.add('fade-in');

            const textSpan = document.createElement('span');
            textSpan.textContent = note.text;
            textSpan.style.marginLeft = '15px';

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => deleteNote(note.id);

            // 💡 обёртка с флексом
            const wrapper = document.createElement('div');
            wrapper.classList.add('note-item');
            wrapper.appendChild(deleteButton);
            wrapper.appendChild(textSpan);

            li.appendChild(wrapper);
            notesList.appendChild(li);
        });
    } catch (error) {
        showMessage('Ошибка загрузки заметок', true);
    }
}

// Добавление новой заметки
async function addNote() {
    const noteText = document.getElementById('noteText').value.trim();
    if (!noteText) {
        showMessage('Введите текст заметки!', true);
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: noteText })
        });

        if (!response.ok) {
            throw new Error('Ошибка при добавлении заметки');
        }

        document.getElementById('noteText').value = '';
        showMessage('Заметка добавлена!');
        loadNotes();
    } catch (error) {
        showMessage('Ошибка при добавлении заметки', true);
    }
}

// Удаление заметки
async function deleteNote(id) {
    if (!confirm('Вы уверены, что хотите удалить заметку?')) {
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении заметки');
        }

        showMessage('Заметка удалена!');
        loadNotes();
    } catch (error) {
        showMessage('Ошибка при удалении заметки', true);
    }
}

window.onload = loadNotes;