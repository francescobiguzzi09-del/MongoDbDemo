import { connectToMongoDB, disconnectFromMongoDB } from './connessione.mjs';
import { Animale } from './modelli/animale.js';

const client = await connectToMongoDB();

try {
  const db = client.db("esercizio_animali");
  const animaliCollection = db.collection("animali");

  // Crea l'oggetto applicando i valori di default (presente: true, datacquisto: oggi)
  const nuovoAnimale = new Animale({ nome: "Fido" });

  // Inserisce il documento su MongoDB
  const risultato = await animaliCollection.insertOne(nuovoAnimale);
  console.log("Animale inserito con ID:", risultato.insertedId);
} finally {
  await disconnectFromMongoDB();
}