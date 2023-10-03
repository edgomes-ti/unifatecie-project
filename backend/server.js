require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Inicializa o app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do Banco de Dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.json({ message: 'Servidor rodando!' });
});

// Nova Rota para listar todos os grupos
app.get('/grupos', (req, res) => {
    const query = "SELECT * FROM Grupos";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(result);
    });
});

// Nova Rota para listar todos os cursos
app.get('/cursos', (req, res) => {
    const query = "SELECT * FROM Cursos";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(result);
    });
});

// Nova Rota para filtrar cursos por modalidade
app.get('/cursos/modalidade/:modalidade', (req, res) => {
    const modalidade = req.params.modalidade;
    const query = "SELECT * FROM Cursos WHERE Modalidade = ?";
    db.query(query, [modalidade], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(result);
    });
});

// Nova Rota para filtrar cursos por grupo
app.get('/cursos/grupo/:grupoId', (req, res) => {
    const grupoId = req.params.grupoId;
    const query = "SELECT * FROM Cursos WHERE GrupoID = ?";
    db.query(query, [grupoId], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(result);
    });
});

// Define a porta e inicia o servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
