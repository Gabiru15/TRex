//variaveis dino
var trex, trexCorrendo, trexColidiu;

//variavel fim de jogo
var fimDeJogo,fimDeJogoImg;

//variaveis reiniciar
var reiniciar, reiniciarImg

//variaveis nuvens
var nuvem,imagemnuvem;


//variaveis chão
var chao,imagemchao,chaoinvisivel;

//variaveis obstuaculo
var obstaculo1, obstaculo2, obstaculo3, obstaculo4,
obstaculo5, obstaculo6;    
 
//pontuaçao
var pontuaçao=0;

var somPular, somMorrer, somCheckpoint;


var grupoDeObstaculo, grupoDeNuvens;

var JOGAR = 1;
var ENCERRAR = 0;
var estadoDeJogo = JOGAR;

//pre carrega as imagens que a gente usa na animação
function preload(){
  trexCorrendo = loadAnimation('img/trex1.png','img/trex2.png','img/trex3.png') ;
  
  trexColidiu = loadAnimation('img/trex_collided.png');
  
  fimDeJogoImg = loadImage('img/gameOver.png');
  reiniciarImg = loadImage('img/restart.png');
  
  imagemchao = loadImage('img/ground2.png');
  imagemnuvem = loadImage('img/cloud.png');
  
  somSalto = loadSound('sound/pular.mpeg')
  somMorte = loadSound('sound/morrer.mpeg')
  somCheckpoint = loadSound('sound/checkpoint.mpeg')
  
  obstaculo1 = loadImage('img/obstacle1.png');
  obstaculo2 = loadImage('img/obstacle2.png');
  obstaculo3 = loadImage('img/obstacle3.png');
  obstaculo4 = loadImage('img/obstacle4.png');
  obstaculo5 = loadImage('img/obstacle5.png');
  obstaculo6 = loadImage('img/obstacle6.png');
}




//cria as sprites e adiciona as animações
function setup(){
  //tamanho da tela
  createCanvas(600,200);
  //sprite trex
  trex = createSprite(50,180,20,50)
  trex.addAnimation('correndo',trexCorrendo)
  trex.addAnimation('colidiu', trexColidiu);
  trex.scale = 0.5;
  trex.x=30;
  
  //sprites chao
  chaoinvisivel = createSprite(300,190,600,10);
  chaoinvisivel.visible = false;
  chao = createSprite(300,180,600,20)
  chao.addImage('chao', imagemchao)
  chao.x = chao.width/2;

  fimDeJogo = createSprite(300,100)
  fimDeJogo.addImage('fim', fimDeJogoImg);
  fimDeJogo.scale = 0.5;
  
  reiniciar = createSprite(300,130);
  reiniciar.addImage('reiniciar', reiniciarImg);
  reiniciar.scale = 0.5;
  
  //cria os limites da tela
  edges = createEdgeSprites();
  
  grupoDeObstaculos = new Group();
   grupoDeNuvens = new Group();
  
  //trex.debug = true;
   trex.setCollider('circle',0,0,30);
  
}


//desenha os objetos na tela
function draw(){
  //da cor de fundo
 background('white')
  
  text('pontuação:' + pontuaçao, 500, 50);
    

  
  //cria o chão
  if( chao.x<0){
     chao.x = chao.width/2;
   }
     
  //aplica a ideia da gravidade ao dino   
  trex.velocityY = trex.velocityY +0.9;
  
  
  //faz o dino ficar no chão
   trex.collide(chaoinvisivel) 
  
  
  if(estadoDeJogo === JOGAR){
    
    if(pontuaçao>0 && pontuaçao%200 === 0) {
   somCheckpoint.play();
    }
    
    if(grupoDeObstaculos.isTouching(trex)){
  estadoDeJogo = ENCERRAR;
   somMorte.play();
  }
    
    fimDeJogo.visible = false;
    reiniciar.visible = false;
    
    
    //faz o trex pular
    if(keyDown('space') && trex.y>=160) {
    trex.velocityY = -13;
    somSalto.play();
   }
    
    //cria o chão
  if( chao.x<0){
     chao.x = chao.width/2;
   }
    
    //faz o chão andar ao contrario para dar ideia de jogo infinito
    chao.velocityX = -(5 + pontuaçao/200)
    grupoDeObstaculos.setVelocityXEach (-(5 + pontuaçao/200))
    
   //gerar  obstaculos e nuvens
    gerarObstaculos();
    gerarNuvens();
    
   //pontuação 
    pontuaçao = pontuaçao + Math.round(frameRate()/60);
  
  //-------------FIM DO IF-----------------
  } else if (estadoDeJogo === ENCERRAR){
    
     fimDeJogo.visible = true;
     reiniciar.visible = true;
    
    
    //velocidade do chão
    chao.velocityX=0;
    
    //velocidade das imagens se modo de jogo for encerrar
     grupoDeObstaculos.setVelocityXEach(0);
     grupoDeNuvens.setVelocityXEach(0);
    
    grupoDeObstaculos.setLifetimeEach(-1);
    grupoDeNuvens.setLifetimeEach(-1)
     trex.changeAnimation('colidiu', trexColidiu)
   
   if(mousePressedOver(reiniciar)){
    console.log('reiniciar');
    reset ();
}
    
  }
  //desenha os sprites na tela
   drawSprites();
  
   
}




function gerarNuvens(){
  
  if(frameCount%80 ===0) {
   nuvem = createSprite(600,90,10,10);
   nuvem.velocityX = -5; 
   nuvem.addImage('cloud',imagemnuvem);
   nuvem.scale = 1.0
   nuvem.y = Math.round(random(150,100));
    //da o tempo de vida a nuvem
   nuvem.lifetime = 140;
    nuvem.depth = trex.depth;
   trex.depth = trex.depth +1;  
    
    grupoDeNuvens.add(nuvem);
} 
}





function gerarObstaculos(){
if(frameCount % 60 === 0 ){
  var obstaculo = createSprite(600,165,10,40)
 //obstaculo.velocityX =-(5 + pontuaçao/500)
   var aleatorio = Math.round(random(1,6));
  
  switch(aleatorio){
    case 1: obstaculo.addImage(obstaculo1)    ;
       break;
      case 2: obstaculo.addImage(obstaculo2) 
       break;
      case 3: obstaculo.addImage(obstaculo3) 
       break;
       case 4: obstaculo.addImage(obstaculo4) 
       break;
       case 5: obstaculo.addImage(obstaculo5) 
       break;
       case 6: obstaculo.addImage(obstaculo6) 
       break;
        }  
  obstaculo.scale=0.5;
  obstaculo.lifetime=140;
  
  grupoDeObstaculos.add(obstaculo);
  

} 
}
function reset() {
 estadoDeJogo = JOGAR; 
 fimDeJogo.visible = false; 
 reiniciar.visible = false;
  
 grupoDeObstaculos.destroyEach();
 grupoDeNuvens.destroyEach();
  
  trex.changeAnimation('correndo', trexCorrendo);
  
  pontuaçao = 0;
}

