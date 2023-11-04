const net = require('net');
const express = require('express');
const router = express.Router();
const readline = require('readline-sync');

const servidor = {
    port:10000,
    host: '100.20.92.101'
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