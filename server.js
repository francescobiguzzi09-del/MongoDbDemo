const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongoDB, disconnectFromMongoDB } = require('./connessione.mjs');
const { Animale } = require('./modelli/animale.js');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/", async function(req, res) {
    var nomeanimale = String(req.body.nome);
    const client = await connectToMongoDB();
  
    try {
        const db = client.db("esercizio_animali");
        const animaliCollection = db.collection("animali");
    
        // Crea l'oggetto applicando i valori di default (presente: true, datacquisto: oggi)
        const nuovoAnimale = new Animale({ nome: nomeanimale});
    
        // Inserisce il documento su MongoDB
        const risultato = await animaliCollection.insertOne(nuovoAnimale);
        console.log("Animale inserito con ID:", risultato.insertedId);
    } finally {
        await disconnectFromMongoDB();
        res.send("Animale inserito con successo!");
  }
});

app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');
});