const express = require('express');
const app = express();
app.use(express.json());

let posicoes = {};

// Recebe a posição do jogador
app.post('/api/posicao', (req, res) => {
    const { PlayerId, X, Y, Z, Estado } = req.body;
    
    if (PlayerId) {
        // Salva ou atualiza a posição do jogador
        posicoes[PlayerId] = { PlayerId, X, Y, Z, Estado, ultimaAtualizacao: Date.now() };
    }

    // Limpa jogadores que ficaram off-line (mais de 10 segundos sem mandar sinal)
    const agora = Date.now();
    Object.keys(posicoes).forEach(id => {
        if (agora - posicoes[id].ultimaAtualizacao > 10000) {
            delete posicoes[id];
        }
    });

    // Devolve a lista de todo mundo que está conectado
    res.status(200).json(Object.values(posicoes));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
