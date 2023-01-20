
class Piece{

  //rotate
      
  // rotate(canvasHeight, canvasWidth) {
  //   let save = JSON.parse(JSON.stringify(this.matrix)); // On crée une copie de la matrice du bloc.
  //   let tempMatrix = [];
  //   //on fait une rotation de 90°
  //   for (let i = 0; i < this.matrix.length; i++) {
  //     tempMatrix[i] = [];
  //     for (let j = 0; j < this.matrix[0].length; j++) {
  //       tempMatrix[i][j] = save[this.matrix.length - 1 - j][i];
  //     }
  //   }
    
  //   // On vérifie si la pièce ne sort pas du canvas après la rotation
  //   if (this.x + tempMatrix[0].length > canvasWidth || this.y + tempMatrix.length > canvasHeight) {
  //     return;
  //   }
  //   this.matrix = tempMatrix;
  // }

  

    
   


  static TETROMINOS = [
    // carré
    [
      [ 1, 1],
      [ 1, 1],
      
    ],
    // barre
    [
      [0, 2 ,0 ,0],
      [0, 2 ,0 ,0],
      [0, 2 ,0 ,0],
      [0, 2 ,0 ,0]
    ],
    // L
    [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3]
     
    ],
    // L inversé
    [
      [0, 4, 0 ],
      [0, 4, 0 ],
      [4, 4, 0 ]
      
    ],
    // T
    [
      [0, 0, 0],
      [5, 5, 5],
      [0, 5, 0]
    ],
    // S
    [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0]
    ],
    // S inversé
    [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ]
  ];

  constructor(x, y, index){
    this.x = x  ; this.y = y;
    this.matrix = JSON.parse(JSON.stringify(Piece.TETROMINOS[index])) ;// On crée une copie de la matrice du bloc.
  }


  isInsideCanvas() {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.matrix[i][j] !== 0) { // On vérifie si la case n'est pas vide.
          if (this.x + j < 0 || this.x + j + this.matrix[0].length >= 14 || this.y + i < 0 || this.y + i + this.matrix[0].length > 23) { // On vérifie si la pièce ne sort pas du canvas.
            
            return false;
          }
        }
      }
    }
    return true;
  }
}

export let current_tetro;

class Model {

  //fonction bouger droite gauche

    constructor() {
    
        this.matrix = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.index = 0; // On initialise l'index à 0.
        // this.current_tetro = new Piece(4, 0, 4); // On crée un nouveau bloc.
        //current_tetro = this.getRandomTetromino(); // On récupère un bloc aléatoire.
        this.getRandomTetromino();
        this.gameover = false; // On initialise la variable gameover à false.
         // On génère un nombre aléatoire entre 0 et 6.
    }

    getRandomTetromino() { // On crée une fonction qui va nous permettre de récupérer un bloc aléatoire.
      let randomIndex = Math.floor(Math.random() * Piece.TETROMINOS.length);
      current_tetro = new Piece(4, 0, randomIndex);

      // ajouter la piece dans la matrice
      for (let i = 0; i < current_tetro.matrix.length; i++) {
        for (let j = 0; j < current_tetro.matrix[0].length; j++) {
          if (current_tetro.matrix[i][j] !== 0) {
            let pieceValue = current_tetro.matrix[i][j];
            console.log(current_tetro.y + i, current_tetro.x + j);
            this.matrix[current_tetro.y + i][current_tetro.x + j] = pieceValue;
          }
        }
      }

      return current_tetro;
    }

    // Binding.
    bindDisplayGrid (callback) { 
      this.DisplayGrid = callback; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
    }

    bindSetInterval (sol){

      this.SetInterval = sol; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
      
    }

    play () {
      // Pour chaque block de matrix
  
      this.DisplayGrid(this.matrix); // On actualise la View.
        
      if (this.index == 15) { // Si l'index est égal à 15, on réinitialise l'index à 0.
        this.gameover = true; // On met la variable gameover à true.
      }

        if (this.gameover) { // Si la variable gameover est à true, on arrête le jeu.
          this.SetInterval(); // On arrête le setInterval.
      }
    }

    

    rotate() {
      // On crée une copie du bloc.
      let copy = JSON.parse(JSON.stringify(current_tetro));
      // On fait une rotation de 90°.
      for (let i = 0; i < copy.matrix.length; i++) {
        for (let j = 0; j < copy.matrix[0].length; j++) {
          copy.matrix[i][j] = current_tetro.matrix[j][i];
        }
      }
      // On inverse les lignes.
      copy.matrix = copy.matrix.map((row) => row.reverse()); 
      // On met à jour la matrice du jeu.
      for (let i = 0; i < copy.matrix.length; i++) {
        for (let j = 0; j < copy.matrix[0].length; j++) {
          this.matrix[current_tetro.y + i][current_tetro.x + j] = 0;
        }
      }
      // On met à jour la matrice du bloc.
      current_tetro.matrix = copy.matrix;
      // On vérifie si le bloc est dans le canvas.
      if (!current_tetro.isInsideCanvas(this.canvasHeight, this.canvasWidth)) {
        // Si le bloc sort du canvas, on annule la rotation.
        current_tetro.matrix = copy.matrix.reverse();
        current_tetro.matrix = current_tetro.matrix.map((row) => row.reverse());
      }
      // On met à jour la matrice du jeu.
      for (let i = 0; i < current_tetro.matrix.length; i++) {
        for (let j = 0; j < current_tetro.matrix[0].length; j++) {
          if (current_tetro.matrix[i][j] !== 0) {
            let pieceValue = current_tetro.matrix[i][j];
            this.matrix[current_tetro.y + i][current_tetro.x + j] = pieceValue;
          }
        }
      }
    }
    

  
    moveLeft(){ // On déplace le bloc vers la gauche.

        for (let i = 0; i < current_tetro.matrix.length; i++){
            for (let j = 0; j < current_tetro.matrix[0].length; j++){ 
                this.matrix[current_tetro.y+i][current_tetro.x+j] = 0; // On met à jour la matrice du jeu.
            }
        }    

        current_tetro.x -=1; // On décrémente la position du bloc en x.

        // Vérifier si le bloc est dans le canvas.
        if (!current_tetro.isInsideCanvas(this.canvasHeight, this.canvasWidth)) { // Si le bloc sort du canvas.
          console.log("Le bloc sort du canvas.");
            current_tetro.x +=1; // On incrémente la position du bloc en x.
        }  
  }
  
    moveRight(){ // On déplace le bloc vers la droite.
        
        for ( let i = 0; i < current_tetro.matrix.length; i++){ // On parcourt la matrice du bloc.
          for ( let j = 0; j < current_tetro.matrix[0].length; j++){ // On parcourt la matrice du bloc.
            this.matrix[current_tetro.y+i][current_tetro.x+j] = 0; // On met à jour la matrice du jeu.
        }
    }
          current_tetro.x +=1; // On incrémente la position du bloc en x.

          if (!current_tetro.isInsideCanvas(this.canvasHeight, this.matrix[0].length)) { // Si le bloc sort du canvas.
            console.log("Le bloc sort du canvas.");
            current_tetro.x -= 1; // On décrémente la position du bloc en x.
          }
  }

      moveDown(){ // On déplace le bloc vers le bas.

        for ( let i = 0; i < current_tetro.matrix.length; i++){
          for ( let j = 0; j < current_tetro.matrix[0].length; j++){ 
            this.matrix[current_tetro.y+i][current_tetro.x+j] = 0;
          }
        }

        current_tetro.y +=1; // On incrémente la position du bloc en x.

  
        for ( let i = 0; i <current_tetro.matrix.length; i++){ // On parcourt la matrice du bloc.
          for ( let j = 0; j < current_tetro.matrix[0].length; j++){ //  On parcourt la matrice du bloc.
            if (current_tetro.matrix[i][j] != 0) // Si la valeur de la matrice du bloc est différente de 0.
              this.matrix[current_tetro.y+i][current_tetro.x+j] = current_tetro.matrix[i][j]; // On met à jour la matrice du jeu.
          }
        }

        console.log(current_tetro.y + (current_tetro.matrix[0].length + 1) + " " + this.matrix.length); //

      
        this.DisplayGrid(this.matrix); 


        for ( let i = 0; i <current_tetro.matrix.length; i++){ // On parcourt la matrice du bloc.
          for ( let j = 0; j < current_tetro.matrix[0].length; j++){ //  On parcourt la matrice du bloc.
            if (current_tetro.y + (current_tetro.matrix[0].length) > this.matrix.length && current_tetro.matrix[i][j] !== 0) { // Si le bloc sort du canvas.
              console.log("Le bloc sort du canvas.");
              current_tetro.y -= 1; // On décrémente la position du bloc en y.

              current_tetro = this.getRandomTetromino(); // On crée un nouveau bloc.
              this.DisplayGrid(this.matrix, current_tetro);
            } 
          }
        }
      }

        // collision entre les blocs
      //   collision(){
      //   for (let i = 0; i < current_tetro.matrix.length; i++) { 
      //     for (let j = 0; j < current_tetro.matrix[0].length; j++) { 
      //       if (current_tetro.matrix[i][j] !== 0 && this.matrix[current_tetro.y + i + 1][current_tetro.x + j] !== 0) { 
      //         console.log("Collision");
      //         current_tetro = this.getRandomTetromino(); //
      //       }
      //     }
      //   }
      // }

      // collision entre les blocs
      

}
              
   
  

  class View {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id)
        this.context = this.canvas.getContext("2d");
        this.couleur = ['purple', 'yellow', 'green', 'blue', 'orange', 'pink', 'cyan'];
        this.rand = Math.floor(Math.random() * this.couleur.length);   
      this.initView();
    }

    initView () {}    
  
    displayGrid (matrix) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeStyle = '#ccc';

        // Dessine les lignes verticales de la grille
        for (let x = 0; x < matrix[0].length; x++) {
          this.context.beginPath();
          this.context.moveTo(x * 39, 0);
          this.context.lineTo(x * 39, matrix.length * 39);
          this.context.stroke();
      }

      // Dessine les lignes horizontales de la grille
      for (let y = 0; y < matrix.length; y++) {
          this.context.beginPath(); // On commence un nouveau tracé.
          this.context.moveTo(0, y * 38.8); // 38.8 pour que les lignes soient bien alignées
          this.context.lineTo(matrix[0].length * 38.8, y * 38.8);
          this.context.stroke();
      }

      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
        /*// Si la case est à 0
        this.context.strokeStyle = "#ccc";
        this.context.strokeRect(j * 50, i * 50, 50, 50);*/
          if (matrix[i][j] != 0) {  // On vérifie que la case est vide.
            this.context.fillStyle = this.couleur[matrix [i][j]]; // On définit la couleur du carré.
            this.context.fillRect(j * 38.9, i * 38.9, 39, 39); // On dessine le carré.
          }        
        }
      } 
    }
  }
  
  class Controller {
    constructor(model, view, Piece) {
      this.model = model;
      this.view = view;
      this.Piece = Piece;

     

      this.bindDisplayCNF = this.bindDisplayCNF.bind(this);
      this.model.bindDisplayGrid(this.bindDisplayCNF);

      this.stopGame = this.stopGame.bind(this);
      this.model.bindSetInterval(this.stopGame);
      this.initEvent();

      this.model.play();
    
      this.interval = setInterval(() => {
        if (!this.model.moveDown()) {
          
        }
    }, 500);

      
    }
    
    bindDisplayCNF (grid) {
      this.view.displayGrid(grid);
    }

    stopGame() {
      clearInterval(this.interval);
    }
    initEvent () { // On initialise les évènements.
      document.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'ArrowLeft':
            this.model.moveLeft();
           // context.clearRect(0, 0, canvas.width, canvas.height);
            break;
          case 'ArrowRight':
            this.model.moveRight();
            break;
          case 'ArrowUp':
            this.model.rotate();
            break;
          case 'ArrowDown':
            this.model.moveDown();
            break;
        }
      });
  }
}

  const app = new Controller(new Model(), new View('mycanvas'));