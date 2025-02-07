const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Настройка хранилища Multer
const storage = multer.diskStorage({
    destination: 'uploads/', // Куда сохранять файлы
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Дата + расширение
    }
});

const upload = multer({ storage });

// Раздаём статику из public
app.use(express.static('public'));

// Обработчик загрузки файлов
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Файл не загружен' });
    }
    res.json({ message: 'Файл загружен!', filename: req.file.filename });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
