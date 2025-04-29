# 📝 NoteService

Мини-сервис для хранения заметок, созданный с использованием **ASP.NET Core**, **Docker**, **SQL Server** и лёгкого **Frontend (HTML + JS)**.

---

## 📦 Функциональность

- `GET /notes` — получить список всех заметок.
- `POST /notes` — добавить новую заметку.
- `DELETE /notes/{id}` — удалить заметку по ID.
- Веб-интерфейс: добавление и просмотр заметок прямо в браузере.

---

## 🚀 Быстрый старт

### 🔧 Требования:
- Установленный [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Git
- Браузер (Chrome, Safari, Firefox…)

---

### 🛠 Запуск проекта

1. Клонировать репозиторий:

```bash
git clone https://github.com/USERNAME/NoteService.git
cd NoteService
```

2.	Собрать и запустить контейнеры:

docker compose up --build

3.	Открыть в браузере:

http://localhost:8080/notes      ← Backend (API)
Frontend → открыть вручную: Frontend/index.html

---

🗄️ База данных

Используется SQL Server 2022 внутри Docker-контейнера.
Таблица Notes создаётся автоматически при первом запуске:

Поле	Тип	Описание
Id	int (PK)	Уникальный идентификатор
Text	string	Текст заметки

---

💡 Примеры запросов

➕ Добавить заметку (POST)

POST http://localhost:8080/notes
Content-Type: application/json

{
  "text": "Купить хлеб"
}

📋 Получить все заметки (GET)

GET http://localhost:8080/notes

❌ Удалить заметку (DELETE)

DELETE http://localhost:8080/notes/3

---

🌟 Спасибо за внимание!

---
