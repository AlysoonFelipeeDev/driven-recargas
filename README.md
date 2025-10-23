# 🚀 Driven Recargas

API REST para gerenciamento de **recargas de celular**, construída com **Node.js**, **TypeScript** e **PostgreSQL**.

---

## 🌐 Deploy

**Base URL:**  
🔗 https://driven-recargas.onrender.com

---

## 🧠 Health Check

| Método | Rota | Descrição | Exemplo de resposta |
|:--|:--|:--|:--|
| **GET** | `/health` | Testa se o servidor está online | `{ "status": "ok" }` |
| **GET** | `/health/db` | Testa a conexão com o banco | `{ "dbTime": "2025-10-23T...", "transportadoras": 4 }` |

---

## 📱 Endpoints principais

### ➕ Criar telefone
**POST** `/phones`

```json
{
  "number": "47999999999",
  "carrierId": 1,
  "name": "Fulano",
  "description": "Cliente de teste",
  "document": "12345678901"
}
```

**Respostas:**
- ✅ **201** – Telefone criado  
- ⚠️ **409** – Número duplicado ou limite de 3 telefones por documento  
- ❌ **422** – Dados inválidos  

---

### 🔍 Buscar telefones por documento
**GET** `/phones/:document`

**Exemplo de resposta:**
```json
[
  {
    "id": 1,
    "number": "47999999999",
    "name": "Fulano",
    "description": "Cliente de teste",
    "carrier": { "id": 1, "name": "Vivo", "code": 15 }
  }
]
```

---

### 💰 Criar recarga
**POST** `/recharges`

```json
{ "phoneId": 1, "amount": 20 }
```

**Respostas:**
- ✅ **201** – Recarga registrada  
- ⚠️ **404** – Telefone não encontrado  
- ❌ **422** – Valor inválido  

---

### 📊 Resumo por documento
**GET** `/summary/:document`

**Exemplo de resposta:**
```json
{
  "document": "12345678901",
  "phones": [
    {
      "id": 1,
      "number": "47999999999",
      "name": "Fulano",
      "description": "Cliente de teste",
      "carrier": { "id": 1, "name": "Vivo", "code": 15 },
      "recharges": [
        { "id": 10, "amount": 20, "createdAt": "2025-10-23T..." }
      ]
    }
  ]
}
```

---

## ⚙️ Como rodar localmente

### 1️⃣ Pré-requisitos
- Node.js 18+  
- PostgreSQL instalado e rodando

### 2️⃣ Crie um arquivo `.env`
```bash
DATABASE_URL=postgres://postgres:SENHA@localhost:5432/driven_recargas
PORT=4000
```

### 3️⃣ Instale e rode
```bash
npm install
npm run build
npm run start   # ou: npm run dev
```

> As tabelas e o seed (`carriers`) são criados automaticamente no primeiro start.

---

## 🧩 Tecnologias utilizadas
- Node.js + Express  
- TypeScript  
- PostgreSQL (pg)  
- Joi (validação de dados)  
- Dotenv  
- Arquitetura em camadas (routers → controllers → services → repositories)

---

## 📄 Estrutura do projeto
```
src/
 ┣ config/
 ┣ controllers/
 ┣ services/
 ┣ repositories/
 ┣ routes/
 ┣ setup.ts
 ┣ server.ts
sql/
 ┣ seed.sql
```

---

## 🧪 Teste rápido via terminal

```bash
curl https://driven-recargas.onrender.com/health
curl https://driven-recargas.onrender.com/health/db
```

---

## 👨‍💻 Desenvolvido por
**Alyson Felipe Ozório**  
Projeto realizado durante o curso **Driven Full Stack Developer**
