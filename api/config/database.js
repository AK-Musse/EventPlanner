 DATABASE_URL="mongodb+srv://ak1998:Abdibashi1998-@cluster0.ce9urwn.mongodb.net/events?retryWrites=true&w=majority"
const mongoose = require('mongoose');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});