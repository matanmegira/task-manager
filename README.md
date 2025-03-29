# Secure Task Management Application

This is a full-stack secure task management application built as a technical exercise. It implements user authentication, task CRUD operations, and multiple security best practices.

---

## 🚀 Technologies Used

- **Frontend**: Angular + Angular Material
- **Backend**: Node.js + Express (with TypeScript)
- **Authentication**: JWT with refresh tokens
- **Storage**: In-memory JavaScript objects (no external DB)
- **Security**: HTTPS (self-signed), bcrypt, AES encryption, rate limiting

---

## 🛠️ How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/matanmegira/task-manager.git
```

---

### 2. Backend Setup

```bash
cd task-manager-server
npm install
```

🔐 Generate self-signed certificates for development:

```bash
openssl req -nodes -new -x509 -keyout ssl.key -out ssl.cert -days 365
```

▶️ Start the backend:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd task-manager-client
npm install
```

> Make sure the SSL certificates (`ssl.key`, `ssl.cert`) are available in the root of the client directory.  
> You can copy them from the server folder if needed.

▶️ Start the frontend:

```bash
npm start
```

---

