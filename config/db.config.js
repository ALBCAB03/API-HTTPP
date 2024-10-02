const mongoose = require("mongoose");
const path = require('path');
const Post = require ('../models/post.model');
const fs = require('fs');


const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;


MongoMemoryServer.create()
  .then((mongoServer) => mongoose.connect(mongoServer.getUri(), {
    dbName: "users",
  }))
  .then(async() => {
        console.log('Conectado a MongoDB');
        const jsonFilePath = path.join('data','users.json');
        fs.readFile(jsonFilePath, 'utf8', async (err, data) => {
            if (err) {
              return console.error('Error al leer el archivo JSON', err);
            }
        
            try {
              // Parsear los datos del archivo JSON
              const jsonData = JSON.parse(data);
        
              // Limpiar la colección de MongoDB (opcional, elimina todos los documentos previos)
              await Post.deleteMany({});
              console.log('Colección limpiada, todos los documentos eliminados.');
        
              // Insertar los nuevos datos del JSON
              const result = await Post.insertMany(jsonData);
              console.log('Datos iniciales insertados:', result);
            } catch (error) {
              console.error('Error al insertar los datos en MongoDB', error);
            }

        }); 
    })
  .catch((error) => {
    console.error("An error occurred trying to connect to the database", error);
    process.exit(1);
  });

process.on("SIGINT", () => {
  mongoose
    .disconnect()
    .then(() => {
      console.info("Successfully disconected mongodb");
      process.exit(0);
    })
    .catch((error) => {
      console.error("An error ocurred trying to disconect mongoose", error);
      process.exit(1);
    });
});