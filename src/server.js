require('dotenv').config();
const app = require('./app.js');
const { db } = require('./database/config.js');
const initModel = require('./models/initModels.js')
//console.log('Hello from Taller de motos app')

//authentication
db.authenticate()
  .then(() => {
    console.log('Database Authenticated ...😊');
  })
  .catch((error) => {
    console.log('☠️Error when authenticating to db. ');
  });

// inicializacion de las relaciones del modelo
initModel();  

//synchronization
db.sync()
  .then(() => {
    console.log('Database Synchronized...😀');
  })
  .catch((error) => {
    console.log('☠️Error sychronizing to db. ');
  });

//console.log("server.js started")
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server runnig at port ${PORT} 👍`);
});
