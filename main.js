// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //contenuto, serve per disegnare nel canvas

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//il programma deve generare molte palline simili, quindi conviene creare un oggetto per rappresentarle
//creo il costruttore Ball

function Ball(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

//aggiungo i metodi al prototipo 
//inserisco la funzione che disegna le palline
Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
}

//funzione per muovere le palline
Ball.prototype.update = function(){
    //cambiare la direzione se la pallina raggiunge il bordo
    if((this.x + this.size) >= width){ //includo this.size per far rimbalzare la pallina sul bordo e non sul suo centro
        this.velX = -(this.velX);
    }
    if((this.x - this.size) <= 0){
        this.velX = -(this.velX);
    }
    if((this.y + this.size) >= height){
        this.velY = -(this.velY)
    }
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    //aggiornare la posizione della pallina per farla muovere
    this.x += this.velX;
    this.y += this.velY;
}
//per rilevale lo scontro tra due palline
Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) { //controllo che la pallina presa in esame non sia la stessa pallina j-esima del metodo collisionDetect , Non vogliamo controllare se una palla si è scontrata con se stessa
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) { //se le due palline si sovrappongono cambiano colore
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }
  

//ora creiamo le palline:

let balls = []; //è un array in cui salvo le palline create

//creamo un ciclo che genera istanze dell'oggetto Ball():

while(balls.length < 25){  //continua a creare palline finchè sono meno di 25
    let size = random(10,20); //genero una dimensione casuale delle palline tra 10 e 20 px
    let ball = new Ball(
        random(0 + size,width - size), //posizione x, valore minimo è dato dalla dimensione della pallina e non può essere negativo, cosi la pallina non viene generata fuori dallo schermo, per il valore MASSIMO prendo la larghezza dello schermo e sottraggo la dimensione della pallina, per la stessa ragione
        random(0 + size,height - size),//posizione y
        random(-7,7), //velocità x
        random(-7,7), //velocità y
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    );

    balls.push(ball); //aggiungo la pallina all'array
} 

function loop() { //funzione per animare
    //creo uno sfondo, serve per coprire il disegno precedente prima che venga fatto quello successivo, altrimenti vedrei una traccia continua anziche una pallina 
    ctx.fillStyle = 'rgba(0, 0, 0, 0.30)';
    ctx.fillRect(0, 0, width, height);
    //CICLO per disegnare le palline e aggiornare la posizione
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loop); //serve per ripetere in loop la funzione
  }
  //bisogna chiamare la funzione per far partire l'animazione
  loop();
