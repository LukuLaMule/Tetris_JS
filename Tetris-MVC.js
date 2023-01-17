class Piece{

  //rotate
      
  rotate(){

    
    let save = JSON.parse(JSON.stringify(this.matrix)); // On crée une copie de la matrice du bloc.

    //on fait une rotation de 90°
    for (let i = 0; i < this.matrix.length; i++){
      for (let j = 0; j < this.matrix[0].length; j++){
        this.matrix[i][j] = save[this.matrix.length - 1 - j][i];
      }
    }

  }
  


  static TETROMINOS = [
    // carré
    [
      [1, 1],
      [1, 1]
    ],
    // barre
    [
      [0, 2 ,0 ,0 ],
      [0, 2 ,0 ,0 ],
      [0, 2 ,0 ,0 ],
      [0, 2 ,0 ,0 ]
    ],
    // L
    [
      [3, 0, 0],
      [3, 0, 0],
      [3, 3, 0]
    ],
    // L inversé
    [
      [0, 4, 0],
      [0, 4, 0],
      [4, 4, 0]
    ],
    // T
    [
      [5, 5, 5],
      [0, 5, 0],
      [0, 0, 0]
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


  isInsideCanvas(canvasHeight, canvasWidth) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.matrix[i][j] !== 0) {
          if (this.x + j < 0 || this.x + j + this.matrix[0].length > canvasWidth || this.y + i < 0 || this.y + i + this.matrix[0].length > canvasHeight) {
            
            return false;
          }
        }
      }
    }
    return true;
  }
}

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
        this.current_tetro = this.getRandomTetromino(); // On récupère un bloc aléatoire.
        this.gameover = false; // On initialise la variable gameover à false.
         // On génère un nombre aléatoire entre 0 et 6.
    }
    getRandomTetromino() { // On crée une fonction qui va nous permettre de récupérer un bloc aléatoire.
      let randomIndex = Math.floor(Math.random() * Piece.TETROMINOS.length);
      return new
      Piece(4, 0, randomIndex);
    }
    // Binding.
    bindDisplayGrid (callback) { 
      this.DisplayGrid = callback; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
    }

    bindSetInterval (sol){

      this.SetInterval = sol; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
      
    }



    play () {

        // Reset canvas.
 

        // Modifier la matrix.
        // matrix[bloc.y][bloc.x] = 0;

        for ( let i = 0; i < this.current_tetro.matrix.length; i++){ // On parcourt la matrice du bloc.

                for ( let j = 0; j < this.current_tetro.matrix[0].length; j++){ // On parcourt la matrice du bloc.
                    this.matrix[this.current_tetro.y+i][this.current_tetro.x+j] = 0;   // On met à jour la matrice du jeu.
                    
                }
        }
       
        this.current_tetro.y += 1; // On incrémente la position du bloc en y.
        
  
        for ( let i = 0; i <this.current_tetro.matrix.length; i++){ // On parcourt la matrice du bloc.

            for ( let j = 0; j < this.current_tetro.matrix[0].length; j++){ //  On parcourt la matrice du bloc.
              if (this.current_tetro.matrix[i][j] != 0) // Si la valeur de la matrice du bloc est différente de 0.
                this.matrix[this.current_tetro.y+i][this.current_tetro.x+j] = this.current_tetro.matrix[i][j]; // On met à jour la matrice du jeu.
            
            }
        }

        this.DisplayGrid(this.matrix); // On actualise la View.

        this.index +=1; // On incrémente l'index.
        

        // if (this.index == 14) { // Si l'index est égal à 12, on réinitialise l'index à 0.
        //   this.gameover = true; // On met la variable gameover à true.
        // }

        if (this.gameover) { // Si la variable gameover est à true, on arrête le jeu.
          this.SetInterval(); // On arrête le setInterval.
        }
    }

    
    moveLeft(){ // On déplace le bloc vers la gauche.

        for ( let i = 0; i <this.current_tetro.matrix.length; i++){
          for ( let j = 0; j < this.current_tetro.matrix[0].length; j++){ 
            this.matrix[this.current_tetro.y+i][this.current_tetro.x+j] = 0; // On met à jour la matrice du jeu.
        }
    }
        this.current_tetro.x -=1; // On décrémente la position du bloc en x.

        if (!this.current_tetro.isInsideCanvas(this.canvasHeight, this.canvasWidth)) { // Si le bloc sort du canvas.
          this.current_tetro.x +=1; // On incrémente la position du bloc en x.
        }
  
  }
    moveRight(){ // On déplace le bloc vers la droite.
        
        for ( let i = 0; i <this.current_tetro.matrix.length; i++){ // On parcourt la matrice du bloc.
          for ( let j = 0; j < this.current_tetro.matrix[0].length; j++){ // On parcourt la matrice du bloc.
            this.matrix[this.current_tetro.y+i][this.current_tetro.x+j] = 0; // On met à jour la matrice du jeu.
        }
    }
          this.current_tetro.x +=1; // On incrémente la position du bloc en x.

          if (!this.current_tetro.isInsideCanvas(this.canvasHeight, this.canvasWidth)) { // Si le bloc sort du canvas.
            this.current_tetro.x = -1; // On décrémente la position du bloc en x.
          }
  }

      moveDown(){ // On déplace le bloc vers le bas.
      
        for ( let i = 0; i <this.current_tetro.matrix.length; i++){
          for ( let j = 0; j < this.current_tetro.matrix[0].length; j++){ 
            this.matrix[this.current_tetro.y+i][this.current_tetro.x+j] = 0;
            
           
        }
        this.current_tetro.y +=1; // On incrémente la position du bloc en y.
        for ( let i = 0; i <this.current_tetro.matrix.length; i++){
          for ( let j = 0; j < this.current_tetro.matrix[0].length; j++){ 
            this.matrix[this.current_tetro.y+i][this.current_tetro.x+j] = 0;
            
      }
      //this.displayGrid(this.matrix);// On actualise la View.
    }
  }
}
      keepInCanvas() {
        for (let y = 0; y < this.current_tetro.matrix.length; y++) {
          for (let x = 0; x < this.current_tetro.matrix[y].length; x++) {
            if (this.current_tetro.matrix[y][x] !== 0) {
              if (this.current_tetro.x + x < 0 || this.current_tetro.x + x >= this.matrix[0].length || this.current_tetro.y + y < 0 || this.current_tetro.y + y >= this.matrix.length) {
                return true;
              }
            }
          }
        }
        return false;
      }


  // -------------------- test ------------ //
  
  
  
  }

  
    
  // ----------- fin test ------------- //
      



  class View {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id)
        this.context = this.canvas.getContext("2d");
        this.couleur = ['purple', 'yellow', 'green', 'purple', 'orange', 'pink', 'cyan'];
        this.rand = Math.floor(Math.random() * this.couleur.length);   
      this.initView();
    }

    initView () {}
  
    displayGrid (matrix) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i =0; i < matrix.length; i++){
        
            for (let j =0; j < matrix.length; j++){ // On parcourt la matrice du jeu.
                if(matrix [i][j] != 0 ){ // Si la case est différente de 0, on dessine un carré.
                
                this.context.fillStyle = this.couleur[matrix [i][j]]; // On définit la couleur du carré.
                this.context.fillRect(j * 50, i * 50, 50, 50); // On dessine le carré.
                this.context.stroke();
                }
                else{
                    this.context.strokeStyle = "#ccc";
                    this.context.strokeRect(j * 50, i * 50, 50, 50);
    
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
      this.interval = setInterval(() => {
        this.model.play();
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
            this.Piece.rotate();
            break;
          case 'ArrowDown':
            this.model.moveDown();
            break;
        }
      });
  }
}

  const app = new Controller(new Model(), new View('mycanvas'));