# 📚 Financial Books REST API

This is a simple RESTful API built with **Node.js** and **Express** to manage a list of **financial books**. The data is stored in-memory (no database), making it perfect for learning and prototyping.

---

## 🚀 Features

- View all financial books
- Get a book by ID
- Add a new book
- Update an existing book
- Delete a book

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Postman (for testing)

---

## 📂 Project Setup

### 1. Clone the Repository

git clone https://github.com/your-username/financial-books-api.git
cd financial-books-api


### 2. Install Dependencies

npm install


### 3. Run the Server

node index.js


Server will start at: http://localhost:3000


---

## 📫 API Endpoints

### 🔍 Get All Books

GET /books


### 🔍 Get Book by ID

GET /books/:id


### ➕ Add a New Book

POST /books


**Request Body (JSON):**

{
  "title": "The Richest Man in Babylon",
  "author": "George S. Clason"
}


### ✏️ Update a Book by ID

PUT /books/:id


**Request Body (JSON):**

{
  "title": "Updated Book Title",
  "author": "Updated Author"
}


### ❌ Delete a Book

    DELETE /books/:id

---

## 📘 Initial Book List

The app comes preloaded with 12 top-rated financial books, including:

* Rich Dad Poor Dad – *Robert Kiyosaki*
* The Intelligent Investor – *Benjamin Graham*
* The Psychology of Money – *Morgan Housel*
* And more...

---

## 🧪 Testing

You can test the API using **Postman**, **cURL**, or any REST client.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Author

**Tikesh Sahu**
[GitHub](https://github.com/Tikesh-sahu-git)
