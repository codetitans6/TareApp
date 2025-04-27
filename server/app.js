const express = require('express');
const mongoose = require('mongoose');
const tareaRoutes = require('./src/routes/tarea.routes');
const app = express();

app.use(express.json());
app.use('/api/tareas', tareaRoutes);

module.exports = app;
