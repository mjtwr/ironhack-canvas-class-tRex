let btnStart = document.getElementsByClassName("start")[0];
btnStart.addEventListener("click", () =>{
    
    clearInterval(idInterval);
    iniciarJuego();
});
//ID INTERVAL
let idInterval;

//IMAGENES VAN ACA ARRIBA
const tRex = new Image()
tRex.src = "trex1.webp";
const cactusImg = new Image()
    cactusImg.src = "cactus1.webp";

const huesoImg = new Image()
huesoImg.src="hueso.png";

//SPRITES
const cero = new Image();
cero.src = "0.gif";
const uno = new Image();
uno.src = "1.gif";
const dos = new Image();
dos.src = "2.gif";
const tres = new Image();
tres.src = "3.gif";
const cuatro = new Image();
cuatro.src = "4.gif";
const cinco = new Image();
cinco.src = "5.gif";
const seis = new Image();
seis.src = "6.gif";
const siete = new Image();
siete.src = "7.gif";

const sprites = [cero,uno,dos,tres,cuatro,cinco,seis,siete];
let posicion = 0;

//Seleccionar canvas
let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d");

//LISTA DE ENEMIGOS/ OTROS ELEMENTOS
const nopalitos = [];
const huesos = [];

//CREAR NUESTRO PERSONAJE --> class
class Trex{
    constructor(x,y,w,h,color,vida, image){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.vida = vida;
        this.image = image;
        this.saltando = false;
        this.score = 0;
    }
    avanzar() {
       if( this.x + this.w < 330){ //x + w para que sea el ancho total de mi image
            this.x += 10;
        }
        
    }
    retroceder(){
        if(this.x > 0){
            this.x -= 10;
        }
       
    }
    saltar(){
        if(this.x < 220){
            this.saltando = true;
        }
        
        
    }
    agacharse(){
          ("Agacharse")
    }
   
    dibujarse(){
        ctx.fillStyle = this.color
        //ctx.fillRect(this.x, this.y, this.w, this.h);
        //image
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
        //ojos
        ctx.fillStyle = "black";
        //ctx.fillRect(this.x + 10, this.y + 10, 2,2);
        
    }
    morirse(){}
    disparar(){
          ("Disparar");
        const huesito = new Hueso(this.x + this.w, this.y + 10, 20, 40, huesoImg);
        huesos.push(huesito);
          (huesos);
    }
}

//Nuestro enemigo --> cactus
class Cactus {
    constructor(x,y,w,h,image, nivel){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
        this.nivel = nivel;
    }
    dibujarse(){
        ctx.fillStyle = "green"
        //ctx.fillRect(this.x,this.y,this.w, this.h);
        ctx.drawImage(this.image, this.x ,this.y,this.w, this.h);
        if (this.nivel === "facil"){
            this.x -= 1;
        }else{
            this.x -= 4;
        }
        
    }
}
//PODER - tirar hueso
class Hueso {
    constructor(x,y,w,h,image){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
    }
    dibujarse(){
        ctx.fillStyle = "green"
        //ctx.fillRect(this.x,this.y,this.w, this.h);
        ctx.drawImage(this.image, this.x ,this.y,this.w, this.h);
        this.x += 4; //lance hacia la derecha
        
        
    }
}
//Dibujar linea del piso
function dibujarPiso(){
    ctx.beginPath();
    ctx.moveTo(0, 170);
    ctx.lineTo(330 , 170);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
}
dibujarPiso();




//Mostrar titulo del Juego
function mostrarDatos(distancia, score, vida) {
    ctx.font = "22px Helvetica"
    ctx.fillStyle = "black";
    ctx.fillText("CrazyT-Rex", 100, 25);
    //Metros -- distancia
    ctx.fillText(`${distancia}mts`,20,25)
    //Score
    ctx.fillText(`Sc: ${score}`, 240,25);
    //Vida
    ctx.fillText(`Vida: ${vida}`, 220,50);
}


//Escuchar teclas
function teclas(dino) {//la metemos para que tenga acceso a la const -- scope en cascada
    //recibimos un evento
    document.addEventListener("keyup", (evento) => {
          ("tecla tocada", evento.code);
        switch (evento.code) {
            case "Space":
                  ("Jump!");
                dino.saltar(); 
                break;
            case "KeyF":
                  ("Dispara!");
                dino.disparar(); 
                break;
            case "ArrowRight":
                dino.avanzar();
                  ("Pa'l frente");
                break;
            case "ArrowLeft":
                  ("Pa' tras");
                dino.retroceder();
                break;
            case "ArrowDown":
                  ("Get Down Bro!");
                break;
            case "ArrowUp":
                  ("Pa' arriba!");
                break;
        }
    });
}

function crearCactus(){ //Creando enemigos
    const num = Math.floor(Math.random()* 150)
    if (num === 3){
        const cactus = new Cactus(300, 130,30,60,cactusImg,"facil");
        nopalitos.push(cactus);
    }
}

function iniciarJuego() {
    let distancia = 0; //contadorr distancia-mts
    const dinosaurio = new Trex(20, 130, 30, 60, "green", 100, cero)
    teclas(dinosaurio); 
      (dinosaurio);
    dinosaurio.dibujarse();

    //-----SET INTERVAL----AQUI SE REDIBUJA EL VIDEOJUEGO
   

    idInterval = setInterval(() => {
        ctx.clearRect(0,0,330,210);
        //MostrarDatos(distancia,score,vida)
        mostrarDatos(distancia, dinosaurio.score, dinosaurio.vida);
        distancia += 1;

        dibujarPiso();
          (sprites[posicion]);
        dinosaurio.image = sprites[posicion];
        posicion ++;
        if(posicion === 8){
            posicion = 0;
        }

        dinosaurio.dibujarse();//Lee datos

        //Esta saltando? y la gravedad (se baje)
        if(dinosaurio.saltando === true){
              ("saltaaandonflrnl")
            //altura max de salto
            if(dinosaurio.y > 0){ //tope
                dinosaurio.y -= 5; // la "rapidez"
                dinosaurio.x += 3; // avanza
            }else{ //bajarlo
                  ("bajate")
                dinosaurio.saltando = false;
            }
           
        }
         //no estas saltando?
         if (dinosaurio.saltando === false && dinosaurio.y < 130){
            dinosaurio.y += 12;
        }
        //Dibujar enemigos/otros elementos
        nopalitos.forEach((cactus, index)=> {
        cactus.dibujarse();
        if(cactus.x <= dinosaurio.x + dinosaurio.w && cactus.x >= dinosaurio.x){
              ("Toca X")
        }
        if(cactus.x <= dinosaurio.x + dinosaurio.w && cactus.x >= dinosaurio.x && cactus.y <= dinosaurio.y + dinosaurio.h){
            //Eliminar el elemento del array nopalitos
            //array.splice()
            nopalitos.splice(index,1);
            dinosaurio.vida -= 25;
            //si sigue visto
            if(dinosaurio.vida < 20){
                clearInterval(idInterval);//hacemos que se detenga
            }
            //alert("Chocaste"); para checar si si esta funcionando la colision
        }
        });
        //quitar cactus
        huesos.forEach((hueso, huesosIndex)=>{
            hueso.dibujarse();
            nopalitos.forEach((cactus, cactusIndex) => {
                if (hueso.x + hueso.w >= cactus.x){
                    //quitar huedo y cactus
                    huesos.splice(huesosIndex, 1);
                    nopalitos.splice(cactusIndex, 1);
                    dinosaurio.score += 1;
                }
            })
        })

        crearCactus();
    }, 1000 / 60);
}

//iniciarJuego();

//Agregar la imagen del T-rex - DONE
//Crear los cactus - DONE
//Brincar - DONE
//Recibir daño - DONE
//contador avance - DONE
//Score - DONE
//Perder
//Dispare - DONE
//Agregar sonidos