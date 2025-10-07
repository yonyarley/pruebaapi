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

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI no está definida. Revisa tus variables de entorno.");
  process.exit(1); // Salir para evitar error en conexión
}

console.log("🔍 MONGO_URI:", uri);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conectado correctamente a MongoDB"))
  .catch(err => {
    console.error("❌ Error al conectar con MongoDB:", err);
    process.exit(1);
  });

// Rutas
app.get('/', async (_req, res) => {
  console.log("📋 Listando usuarios...");
  try {
    const usuarios = await Usuarios.find();
    return res.send(usuarios);
  } catch (error) {
    console.error("❌ Error al listar usuarios:", error);
    return res.status(500).send("Error al listar usuarios");
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
    return res.send("✅ Usuario creado correctamente");
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    return res.status(500).send("Error al crear usuario");
  }
});

app.get('/nueva', (_req, res) => res.send("Ruta creada en desarrollo OK"));
app.get('/otra', (_req, res) => res.send("Ruta creada en desarrollo OK"));
app.get('/de_nuevo', (_req, res) => res.send("Ruta creada en desarrollo OK"));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en el puerto: ${PORT}`));
