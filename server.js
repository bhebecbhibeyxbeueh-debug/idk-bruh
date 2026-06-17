const WebSocket = require('ws');
const port = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: port });

wss.on('connection', (ws) => {
    console.log('Novo jogador sincronizado!');

    ws.on('message', (message) => {
        // Recebe a ação de um jogador e espalha para todos os outros no mapa
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Jogador desconectado.');
    });
});

console.log(`Servidor WebSocket rodando na porta ${port}`);
