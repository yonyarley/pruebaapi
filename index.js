/**
 * @autor: Harol Mauricio Gómez Zapata
 * @fecha: 25/08/2025
 * @descripcion: Pequeña aplicación para probar
 *               una base de datos en un contenedor
 *               Docker o en MongoDB Atlas
 */

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // 👈 Cargar variables del archivo .env

// Modelo de Usuarios
const Usuarios = mongoose.model('Usuarios', new mongoose.Schema({
  usuario: String,
  correo: String,
  clave: String,
}));

const app = express();

// Conexión a MongoDB Atlas (o a Docker si lo prefieres)
console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado correctamente a MongoDB"))
  .catch(err => console.error("❌ Error al conectar con MongoDB:", err));

// Rutas
app.get('/', async (_req, res) => {
  console.log("📋 Listando usuarios...");
  const usuarios = await Usuarios.find();
  return res.send(usuarios);
});

app.get('/crear', async (_req, res) => {
  console.log("🆕 Insertando usuario...");
  await Usuarios.create({
    'usuario': 'harol',
    'correo': 'hmgomezz@sena.edu.co',
    'clave': '12345'
  });
  return res.send("✅ Usuario creado correctamente");
});

app.get('/nueva', (_req, res) => res.send("Ruta creada en desarrollo OK"));
app.get('/otra', (_req, res) => res.send("Ruta creada en desarrollo OK"));
app.get('/de_nuevo', (_req, res) => res.send("Ruta creada en desarrollo OK"));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en el puerto: ${PORT}`));
