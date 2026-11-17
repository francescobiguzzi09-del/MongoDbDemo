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

app.post("/search", async function(req, res) {
    var nomeanimale = String(req.body.nome);
    const client = await connectToMongoDB();
    var risposta = "";

    try {
        const db = client.db("esercizio_animali");
        const animaliCollection = db.collection("animali");

        const risultati = await animaliCollection.find({ nome: nomeanimale }).toArray();

        if (risultati.length === 0) {
            risposta = "Nessun animale trovato con il nome inserito.";
        } else {
            // Se più righe hanno lo stesso nome le mette una sotto l'altra
            risposta = risultati
                .map(animale => `Nome: ${animale.nome} | Presente: ${animale.presente} | Data Acquisto: ${animale.datacquisto}`)
                .join("<br>");
        }
    } catch (error) {
        console.error("Errore durante la ricerca:", error);
        risposta = "Errore durante la ricerca.";
    } finally {
        await disconnectFromMongoDB();
        res.send(risposta);
    }
});

app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');
});