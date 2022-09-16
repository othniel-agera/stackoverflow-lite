const express = require('express');
const db = require('./models/index.model');
const routes = require('./routes/index.route');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 4040;

db.sequelize.sync().then(() => {
  console.log('Database Synced');
}).catch((err) => {
  console.log(`Database synchronization failed ${err}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port #${PORT}`);
});
