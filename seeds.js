const mongoose = require("mongoose");
const Celebrity = require("./models/Celebrity.model");

// open up the connection to mongo
mongoose.connect("mongodb://localhost/movies-lab");

const celebrities = [
  {
    name: "Leonardo Capri",
    occupation: "actor",
    catchPhrase: "It's me, Leomario",
  },
  {
    name: "Steve Jobs",
    occupation: "unemployed",
    catchPhrase: "iIcan see you",
  },
  {
    name: "Elon Tusk",
    occupation: "CEO",
    catchPhrase: "Earth sucks!Let's go to mars",
  },
];

Celebrity.insertMany(celebrities)
  .then((celebrities) => {
    console.log(`Success! - ${celebrities.length} were added to the database`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
