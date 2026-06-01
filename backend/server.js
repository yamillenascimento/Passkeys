const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const dbUsers = {}; 
const dbChallenges = {}; 

app.post('/api/register/challenge', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'E-mail obrigatório.' });
    
    const challenge = Math.random().toString(36).substring(2);
    dbChallenges[email] = challenge;

    res.json({
        challenge: Buffer.from(challenge).toString('base64url'),
        rp: { name: "Sistema Seguro", id: "localhost" },
        user: { id: Buffer.from(email).toString('base64url'), name: email, displayName: email },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        
        authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
        }
    });
});

//Cadastro
app.post('/api/register/verify', (req, res) => {
    const { email, credential } = req.body;
    
    if (!email) return res.status(400).json({ error: 'E-mail obrigatório.' });

    dbUsers[email] = {
        id: credential ? credential.id : null
    };

    res.json({ success: true });
});

//Login
app.post('/api/login/challenge', (req, res) => {
    const { email } = req.body;
    
    if (!dbUsers[email]) {
        return res.status(400).json({ error: 'Conta não encontrada no sistema.' });
    }

    const challenge = Math.random().toString(36).substring(2);
    dbChallenges[email] = challenge;

    res.json({
        challenge: Buffer.from(challenge).toString('base64url'),
        allowCredentials: [{ type: "public-key", id: dbUsers[email].id }],
        userVerification: "required"
    });
});

app.post('/api/login/verify', (req, res) => {
    const { email } = req.body;
    
    if (!dbUsers[email]) {
        return res.status(400).json({ error: 'Falha na autenticação.' });
    }
    
    res.json({ success: true });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../frontend/index.html')));

app.listen(3000, () => console.log("Servidor rodando em: http://localhost:3000"));