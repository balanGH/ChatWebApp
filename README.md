# ChatWebApp

A secure real-time chat app built with **Node.js**, **Express**, **PostgreSQL**, and **Multer**, supporting encrypted messages and media uploads.  
Works **without internet** using **local network** (LAN-based communication).

---

## 🚀 Features

- 🔒 **Encrypted Messages** (bcrypt)
- 🖼️ **Media Upload Support**
- 📥 **Chat History Retrieval**
- 📡 **Offline Chat via Local Network**
- 🗃️ **PostgreSQL Integration**

---

## 🛠 Tech Stack

- Backend: Node.js, Express
- DB: PostgreSQL
- File Uploads: Multer
- Encryption: bcryptjs

---

## 📂 Project Structure

```

project/
├── uploads/
├── config/db.js
├── controllers/chatController.js
├── routes/chat.js
├── server.js

````

---

## 📡 API Endpoints

### `POST /api/chat/sendMessage`
Send encrypted text message  
Body:
```json
{
  "sender_id": 1,
  "receiver_id": 2,
  "message_text": "Hello"
}
````

---

### `POST /api/chat/sendMedia`

Upload media file
Form-data:

* `media_file`
* `sender_id`, `receiver_id`

---

### `GET /api/chat/:id/:oid`

Fetch & decrypt chat between two users

---

## 🗃️ Messages Table (PostgreSQL)

```sql
CREATE TABLE Messages (
  message_id SERIAL PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  group_id INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  message_text TEXT,
  message_type TEXT,
  media_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);
```

---

## 🔧 Setup

```bash
npm install
node server.js
```

Make sure all devices are connected to the **same Wi-Fi or LAN** to enable chat without internet access.
