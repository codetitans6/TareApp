const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tareas-db')
  .then(() => {
    app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
  })
  .catch(err => console.error(err));
