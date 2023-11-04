const net = require('net');
const router = express.Router();
const express = require('express');
const readline = require('readline-sync');

const servidor = {
    port:3000,
    host: 'localhost'
};

const client = net.createConnection(servidor);

    client.on('connect', () => {
        console.log('Conexión satisfactoria');
        sendLine();
    });


    client.on('data', (data) => {
        console.log('El servidor dice ' + data);
        sendLine();
    });

    client.on('error', (err) => {
        console.error(err.message);
    });

    function sendLine(client) {
        const line = readline.question('\nIngresa un mensaje\n');
        if (line === '0') {
            client.end();
        } else {
            client.write(line);
        }
    }