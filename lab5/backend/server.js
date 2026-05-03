const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/my-react-app/build")));

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    res.json({ message: "Користувача успішно створено!", uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { uid } = req.body; 
  try {
    if (!uid) return res.status(400).json({ error: "Вкажіть uid користувача" });
    const customToken = await admin.auth().createCustomToken(uid);
    res.json({ message: "Успішний логін", token: customToken });
  } catch (error) {
    res.status(500).json({ error: "Помилка генерації токену: " + error.message });
  }
});

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "Доступ заборонено: Немає токену!" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Невалідний токен" });
  }
};

app.get("/api/startup", async (req, res) => {
  try {
    const snapshot = await db.collection("my_company").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Помилка сервера при отриманні даних" });
  }
});

app.post("/api/startup", async (req, res) => {
  const { companyName, industry } = req.body;

  if (!companyName || companyName.trim().length < 5) {
    return res.status(400).json({ 
      error: "Назва компанії має бути мінімум 5 символів!" 
    });
  }

  try {
    const docRef = await db.collection("my_company").add({
      companyName,
      industry,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ message: "Стартап успішно створено!", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: "Помилка збереження в базу даних" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/my-react-app/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});