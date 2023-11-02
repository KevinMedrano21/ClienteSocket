const net = require('net');
const router = express.Router();
const express = require('express');
const readline = require('readline-sync');

// const servidor = {
//     host: process.env.SERVER_HOST, // Utiliza una variable de entorno para el host
//     port: process.env.SERVER_PORT // Utiliza una variable de entorno para el puerto
// };

function connectToServer(){
    const client = net.createConnection({host: process.env.SERVER_HOST, port: process.env.SERVER_PORT});
}



// const client = net.createConnection(servidor);

client.on('connect', ()=>{
    console.log('conexion satisfactoria')
    sendLine(cliente)
})

client.on('error', (err) => {
    console.error(err.message);
    // Si hay un error, intenta la reconexión después de un tiempo
    setTimeout(connectToServer, 1000);
});

client.on('data', (data)=>{
    console.log('El servidor dice' +data)
    sendLine()
})

client.on('error', (err)=>{
    console.log(err.message)
})


function sendLine(){
    var line = readline.question('\n ingresa un mensaje \n')
    if (line==0) {
        client.end()
    }else{
        client.write(line)
    }
}

connectToServer();

