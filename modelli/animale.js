export class Animale {
  constructor({ nome, presente = true, datacquisto = new Date() }) {
    if (!nome || typeof nome !== 'string') {
      throw new Error("Il campo 'nome' è obbligatorio.");
    }
    this.nome = nome;
    this.presente = Boolean(presente);
    this.datacquisto = new Date(datacquisto);
  }
}
