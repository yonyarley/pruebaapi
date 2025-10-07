/**
 * @autor: Harol Mauricio Gómez Zapata
 * @fecha: 25/08/2025
 * @descripcion: Aplicación Express con conexión a MongoDB Atlas usando variable de entorno
 */

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const app = express();

// Modelo de Usuarios
const Usuarios = mongoose.model('Usuarios', new mongoose.Schema({
  usuario: String,
  correo: String,
  clave: String,
}));

// Verifica que la URI exista antes de intentar conectarse
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI no está definida en las variables de entorno.");
  process.exit(1);
}

// Conexión a MongoDB Atlas
console.log("🔍 MONGO_URI:", mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conectado correctamente a MongoDB Atlas"))
  .catch(err => {
    console.error("❌ Error al conectar con MongoDB:", err.message);
    process.exit(1); // Salir si no se puede conectar
  });

// Rutas
app.get('/', async (_req, res) => {
  console.log("📋 Listando usuarios...");
  try {
    const usuarios = await Usuarios.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).send("❌ Error al obtener usuarios.");
  }
});

app.get('/crear', async (_req, res) => {
  console.log("🆕 Insertando usuario...");
  try {
    await Usuarios.create({
      usuario: 'harol',
      correo: 'hmgomezz@sena.edu.co',
      clave: '12345'
    });
    res.send("✅ Usuario creado correctamente");
  } catch (err) {
    res.status(500).send("❌ Error al crear usuario.");
  }
});

// Rutas adicionales
app.get('/nueva', (_req, res) => res.send("Ruta creada en desarrollo OK"));
app.get('/otra', (_req, res) => res.send("Ruta creada en desarrollo OK"));
app.get('/de_nuevo', (_req, res) => res.send("Ruta creada en desarrollo OK"));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en el puerto: ${PORT}`));
