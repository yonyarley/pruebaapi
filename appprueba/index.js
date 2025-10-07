/** 
 * @autor: Harol Mauricio Gómez Zapata
 * @fecha: 25/08/2025
 * @descripcion: Pequeña aplicación para probar
 *               una base de datos en un contenedor
 *               Docker
*/

import express from 'express'
import mongoose from 'mongoose'

const Usuarios = mongoose.model('Usuarios', new mongoose.Schema({
    usuario: String,
    correo: String,
    clave: String,
}));

const app = express();
// mongoose.connect('mongodb://root:r0O7@localhost:27018/mibd?authSource=admin');
mongoose.connect('mongodb://root:r0O7@mongohmgz:27017/mibd?authSource=admin');

app.get('/', async(_req, res) => {
    console.log("listado de usuarios ...");
    const usuarios = await Usuarios.find();
    return res.send(usuarios);
});

app.get('/crear', async(_req, res) => {
    console.log("Insertando ...");
    await Usuarios.create({'usuario': 'harol', 
                            'correo': 'hmgomezz@sena.edu.co', 
                            'clave': '12345'});
    return res.send("OK");
});

app.get('/nueva', async(_req, res) => {
    return res.send("ruta creada en desarrollo OK");
});

app.get('/otra', async(_req, res) => {
    return res.send("ruta creada en desarrollo OK");
});

app.get('/de_nuevo', async(_req, res) => {
    return res.send("ruta creada en desarrollo OK");
});

app.listen(3000, () => console.log("Escuchando en el puerto: 3000"));