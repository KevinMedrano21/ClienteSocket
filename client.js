const net = require('net');
const router = express.Router();
const express = require('express');
const readline = require('readline-sync');

// const servidor = {
//     host: process.env.SERVER_HOST, // Utiliza una variable de entorno para el host
//     port: process.env.SERVER_PORT // Utiliza una variable de entorno para el puerto
// };

function connectToServer() {
    const client = new net.Socket();

    client.connect(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
        console.log('Conexión satisfactoria');
        sendLine(client);
    });

    client.on('error', (err) => {
        console.error(err.message);
        // Si hay un error, intenta la reconexión después de un tiempo
        setTimeout(connectToServer, 1000);
    });

    client.on('data', (data) => {
        console.log('El servidor dice ' + data);
        sendLine(client);
    });

    function sendLine(client) {
        const line = readline.question('\nIngresa un mensaje\n');
        if (line === '0') {
            client.end();
        } else {
            client.write(line);
        }
    }
}

connectToServer();
