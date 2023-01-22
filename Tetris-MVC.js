

class Piece {

  // On crée une variable statique qui contient toutes les matrices de blocs. 


  static TETROMINOS = [
    // carré
    [
      [1, 1],
      [1, 1],

    ],
    // barre
    [
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0]
    ],
    // L
    [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3]

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
  // vairirable qui contient la longueur du canvas

  constructor(x, y, index) {
    this.x = x; this.y = y;
    this.matrix = JSON.parse(JSON.stringify(Piece.TETROMINOS[index]));// On crée une copie de la matrice du bloc.
  }

  isInsideCanvas() {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.matrix[i][j] !== 0) { // On vérifie si la case n'est pas vide.
          if (this.x + j < 0 || this.x + j + this.matrix[0].length >= 9 + current_tetro.matrix.length) { // On vérifie si la pièce ne sort pas du canvas.

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
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],
      [0, 0, 0, 0, 0, 0, 0, 0, 0,],

    ];
    this.index = 0; // On initialise l'index à 0.
    // this.current_tetro = new Piece(4, 0, 4); // On crée un nouveau bloc.
    //current_tetro = this.getRandomTetromino(); // On récupère un bloc aléatoire.
    this.getRandomTetromino();
    this.gameover = false; // On initialise la variable gameover à false.
    // On génère un nombre aléatoire entre 0 et 6.
  }

  Score = 0;
  // incrémente le score des qu'une piece est posée
  incrementScore() {
    this.Score += 10;
    //des qu'on atteint 100 points, on augmente la vitesse de la piece


    //récupère l'élément score dans le html
    let score = document.getElementById("score");
    //affiche le score
    score.innerHTML = this.Score;

  }


  // a chaque fois qu'une ligne est complète, on la supprime et on incrémente le score
  removeLine() {
    let line = 0;
    for (let i = 0; i < this.matrix.length; i++) {
      let isLine = true;
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.matrix[i][j] === 0) {
          isLine = false;
          break;
        }
      }
      if (isLine) {
        line++;
        for (let k = i; k > 0; k--) {
          for (let j = 0; j < this.matrix[0].length; j++) {
            this.matrix[k][j] = this.matrix[k - 1][j];
          }
        }
        for (let j = 0; j < this.matrix[0].length; j++) {
          this.matrix[0][j] = 0;
        }
        i--;
      }
    }
    if (line === 1) {
      this.Score += 40;
    } else if (line === 2) {
      this.Score += 100;
    } else if (line === 3) {
      this.Score += 300;
    } else if (line === 4) {
      this.Score += 1200;
    }
    //récupère l'élément score dans le html
    let score = document.getElementById("score");
    //affiche le score
    score.innerHTML = this.Score;
  }

  
  
  getRandomTetromino() { // On crée une fonction qui va nous permettre de récupérer un bloc aléatoire.
    let randomIndex = Math.floor(Math.random() * Piece.TETROMINOS.length);
    current_tetro = new Piece(3, 0, randomIndex);

    // ajouter la piece dans la matrice
    for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
      for (let j = 0; j < current_tetro.matrix[0].length; j++) { // On parcourt la matrice du bloc.
        if (this.matrix[current_tetro.y + i][current_tetro.x + j] !== 0) { // On vérifie si la case n'est pas vide.
          alert("Game Over : Votre Score est de" + "\xa0" + this.Score );
        


        }
        if (current_tetro.matrix[i][j] !== 0) { // On vérifie si la case n'est pas vide.
          let pieceValue = current_tetro.matrix[i][j]; // On récupère la valeur de la case.
          console.log(current_tetro.y + i, current_tetro.x + j); // On affiche la position de la case.
          this.matrix[current_tetro.y + i][current_tetro.x + j] = pieceValue; // On ajoute la valeur de la case dans la matrice.

        }

      }

    }
    this.incrementScore(); // On incrémente le score.
    return current_tetro; //  On retourne le bloc.
  }

  // Binding.
  bindDisplayGrid(callback) { // On crée une fonction qui va nous permettre de récupérer un bloc aléatoire.
    this.DisplayGrid = callback; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
  }

  bindSetInterval(sol) { // On crée une fonction qui va nous permettre de récupérer un bloc aléatoire.

    this.SetInterval = sol; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.

  }

  play() {

    this.DisplayGrid(this.matrix); // On actualise la View.

  }

  // Si une ligne est complète, on la supprime.
  removeLine() {
    let line = 0;
    for (let i = 0; i < this.matrix.length; i++) {
      let isLine = true;
      for (let j = 0; j < this.matrix[0].length; j++) {
        if (this.matrix[i][j] === 0) {
          isLine = false;
          break;
        }
      }
      if (isLine) {
        line++;
        for (let k = i; k > 0; k--) {
          for (let j = 0; j < this.matrix[0].length; j++) {
            this.matrix[k][j] = this.matrix[k - 1][j];
          }
        }
        for (let j = 0; j < this.matrix[0].length; j++) {
          this.matrix[0][j] = 0;
        }
        i--;
      }
    }
    if (line === 1) {
      this.Score += 40;
    } else if (line === 2) {
      this.Score += 100;
    } else if (line === 3) {
      this.Score += 300;
    } else if (line === 4) {
      this.Score += 1200;
    }
    //récupère l'élément score dans le html
    let score = document.getElementById("score");
    //affiche le score
    score.innerHTML = this.Score;
  }

  rotate() {
    // On crée une copie du bloc.
    let copy = JSON.parse(JSON.stringify(current_tetro));
    for (let i = 0; i < copy.matrix.length; i++) { // On parcourt la matrice du bloc.
      for (let j = 0; j < copy.matrix[0].length; j++) { // On parcourt la matrice du bloc.
        copy.matrix[i][j] = current_tetro.matrix[j][i]; // On fait une rotation de 90°.
      }
    }
    // On inverse les lignes.
    copy.matrix = copy.matrix.map((row) => row.reverse());
    // On met à jour la matrice du jeu.
    for (let i = 0; i < copy.matrix.length; i++) { // On parcourt la matrice du bloc.
      for (let j = 0; j < copy.matrix[0].length; j++) { // On parcourt la matrice du bloc.
        this.matrix[current_tetro.y + i][current_tetro.x + j] = 0; // On met à jour la matrice du jeu.
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
    for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
      for (let j = 0; j < current_tetro.matrix[0].length; j++) { // On parcourt la matrice du bloc.
        if (current_tetro.matrix[i][j] !== 0) { // On vérifie si la case n'est pas vide.
          let pieceValue = current_tetro.matrix[i][j]; // On récupère la valeur de la case.
          this.matrix[current_tetro.y + i][current_tetro.x + j] = pieceValue; // On ajoute la valeur de la case dans la matrice.
        }
      }
    }
  }

  moveLeft() { // On déplace le bloc vers la gauche.

    for (let i = 0; i < current_tetro.matrix.length; i++) {
      for (let j = 0; j < current_tetro.matrix[0].length; j++) {
        this.matrix[current_tetro.y + i][current_tetro.x + j] = 0; // On met à jour la matrice du jeu.
      }
    }

    current_tetro.x -= 1; // On décrémente la position du bloc en x.

    // Vérifier si le bloc est dans le canvas.
    if (!current_tetro.isInsideCanvas()) { // Si le bloc sort du canvas.
      console.log("Le bloc sort du canvas.");
      current_tetro.x += 1; // On incrémente la position du bloc en x.
    }
  }

  moveRight() { // On déplace le bloc vers la droite.

    for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
      for (let j = 0; j < current_tetro.matrix[0].length; j++) { // On parcourt la matrice du bloc.
        this.matrix[current_tetro.y + i][current_tetro.x + j] = 0; // On met à jour la matrice du jeu.
      }
    }
    current_tetro.x += 1; // On incrémente la position du bloc en x.

    if (!current_tetro.isInsideCanvas()) { // Si le bloc sort du canvas.
      console.log("Le bloc sort du canvas.");
      current_tetro.x -= 1; // On décrémente la position du bloc en x.
    }
  }

  moveDown() {
    let authorized = true;
    // remove the current tetromino from the matrix
    for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
      for (let j = 0; j < current_tetro.matrix[0].length; j++) { //  On parcourt la matrice du bloc.
        if (current_tetro.matrix[i][j] != 0 && current_tetro.y + i >= 0 && current_tetro.x + j < this.matrix[0].length) // Si la valeur de la matrice du bloc est différente de 0.
          this.matrix[current_tetro.y + i][current_tetro.x + j] = 0; // On met à jour la matrice du jeu.
      }
    }
    // check collision
    for (let i = 0; i < current_tetro.matrix.length; i++) {
      for (let j = 0; j < current_tetro.matrix[0].length; j++) {
        if (current_tetro.matrix[i][j] != 0 && current_tetro.y + i + 1 >= this.matrix.length) {
          authorized = false;
          break;
        }
        if (current_tetro.matrix[i][j] != 0 && this.matrix[current_tetro.y + i + 1][current_tetro.x + j] != 0) { // Si la valeur de la matrice du bloc est différente de 0.
          authorized = false;
          break;
        }
      }
    }
    if (authorized == true) {
      // chute qui s'accélère en fonction du score
      if (this.Score <= 100) {

        current_tetro.y += 1;
      } else if (this.Score <= 200) {
        current_tetro.y += 2;
      }
      else if (this.Score <= 300) {
        current_tetro.y += 3;
      }
      else if (this.Score <= 400) {
        current_tetro.y += 4;
      }
      else if (this.Score <= 500) {
        current_tetro.y += 5;
      }
      else if (this.Score <= 600) {
        current_tetro.y += 6;
      }
      else if (this.Score <= 700) {
        current_tetro.y += 7;
      }
      else if (this.Score <= 800) {
        current_tetro.y += 8;
      }

      for (let i = 0; i < current_tetro.matrix.length; i++) {
        for (let j = 0; j < current_tetro.matrix[0].length; j++) {
          if (current_tetro.matrix[i][j] != 0) // Si la valeur de la matrice du bloc est différente de 0.
            this.matrix[current_tetro.y + i][current_tetro.x + j] = current_tetro.matrix[i][j]; // On met à jour la matrice du jeu.
        }
      }
    }
    else {
      for (let i = 0; i < current_tetro.matrix.length; i++) {
        for (let j = 0; j < current_tetro.matrix[0].length; j++) {
          if (current_tetro.matrix[i][j] != 0) // Si la valeur de la matrice du bloc est différente de 0.
            this.matrix[current_tetro.y + i][current_tetro.x + j] = current_tetro.matrix[i][j]; // On met à jour la matrice du jeu.
        }
      }
      current_tetro = this.getRandomTetromino();
    

    }
    this.DisplayGrid(this.matrix);
    

  }

  // La pièce tombe directement en bas du canvas.
  drop() {
    // Faire chuter le bloc directement en bas du canvas en vérifiant les collisions avec les autres blocs.


    // on supprime le bloc actuel de la matrice
    for (let i = 0; i < current_tetro.matrix.length; i++) {
      for (let j = 0; j < current_tetro.matrix[0].length; j++) {
        if (current_tetro.matrix[i][j] != 0 && current_tetro.y + i >= 0 && current_tetro.x + j < this.matrix[0].length)
          this.matrix[current_tetro.y + i][current_tetro.x + j] = 0;
      }
    }
    // check collision
    while (true) {
      let authorized = true;
      for (let i = 0; i < current_tetro.matrix.length; i++) {
        for (let j = 0; j < current_tetro.matrix[0].length; j++) {
          if (current_tetro.matrix[i][j] != 0 && current_tetro.y + i + 1 >= this.matrix.length) {
            authorized = false;
            break;
          }
          if (current_tetro.matrix[i][j] != 0 && this.matrix[current_tetro.y + i + 1][current_tetro.x + j] != 0) {
            authorized = false;
            break;
          }
        }
      }
      if (authorized == true) {
        current_tetro.y += 1;
      } else {
        break;
      }
    }
    for (let i = 0; i < current_tetro.matrix.length; i++) {
      for (let j = 0; j < current_tetro.matrix[0].length; j++) {
        if (current_tetro.matrix[i][j] != 0)
          this.matrix[current_tetro.y + i][current_tetro.x + j] = current_tetro.matrix[i][j];
      }
    }
    current_tetro = this.getRandomTetromino();
    
    this.DisplayGrid(this.matrix);
  }
}

class View {
  constructor(canvas_id) {
    this.canvas = document.getElementById(canvas_id)
    this.context = this.canvas.getContext("2d");
    this.couleur = ['brown', 'yellow', 'green', 'blue', 'orange', 'pink', 'cyan'];
    
    this.rand = Math.floor(Math.random() * this.couleur.length);
    
   
  }

 

  //fonction game over
  gameOver() {
    this.context.font = "50px Arial";
    this.context.fillStyle = "red";
    this.context.textAlign = "center";
    this.context.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
  }


  displayGrid(matrix) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = '#000';

    // Dessine les lignes verticales de la grille
    for (let x = 0; x < matrix[0].length; x++) {
      this.context.beginPath();
      this.context.moveTo(x * 50, 0);
      this.context.lineTo(x * 50, matrix.length * 50);
      this.context.stroke();
    }

    // Dessine les lignes horizontales de la grille
    for (let y = 0; y < matrix.length; y++) {
      this.context.beginPath(); // On commence un nouveau tracé.
      this.context.moveTo(0, y * 50);
      this.context.lineTo(matrix[0].length * 50, y * 50);
      this.context.stroke();
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
          if (matrix[i][j] != 0) {  // On vérifie que la case est vide.
          this.context.fillStyle = this.couleur[matrix[i][j]]; // On définit la couleur du carré.
          console.log(this.couleur[matrix[i][j]]);
          this.context.fillRect(j * 50, i * 50, 50, 50); // On dessine le carré.
        }
      }
    }

    //supprimer ligne pleine  
    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row].every(col => col !== 0)) {
        matrix.splice(row, 2);
        matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }

    }



  }
}

class Controller {
  constructor(model, view, Piece) {
    this.model = model;
    this.view = view;
    this.Piece = Piece;
    

    this.bindDisplayCNF = this.bindDisplayCNF.bind(this); // On lie la fonction bindDisplayCNF à l'instance de la classe Controller.

    this.model.bindDisplayGrid(this.bindDisplayCNF); // On lie la fonction bindDisplayCNF à l'instance de la classe Model.

    this.stopGame = this.stopGame.bind(this); // On lie la fonction stopGame à l'instance de la classe Controller.
    this.model.bindSetInterval(this.stopGame); // On lie la fonction stopGame à l'instance de la classe Model.
    this.initEvent(); // On initialise les évènements.

    this.model.play(); // On lance le jeu.





    this.interval = setInterval(() => { // On lance le jeu.
      if (!this.model.moveDown()) { // Si la pièce ne peut pas descendre.

      }
    }, 500); // On lance le jeu toutes les 500ms.


  }

  bindDisplayCNF(grid) { // On affiche la grille.
    this.view.displayGrid(grid); 
  }

  stopGame() { // On stop le jeu.
    clearInterval(this.interval); // On arrête le setInterval.
    this.model.stopGame(); // On arrête le jeu.
    this.view.gameOver(); // On affiche le message de fin de jeu. 

  }

  initEvent() { // On initialise les évènements.
    document.addEventListener('keydown', (event) => { // On écoute l'évènement keydown.
      switch (event.key) { // On vérifie la touche pressée.
        case 'ArrowLeft':
          this.model.moveLeft();

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

        case ' ':
          this.model.drop();
          break;
        case 'Enter':
          this.model.drop();
          break;




      }
    });
  }
}

const app = new Controller(new Model(), new View('mycanvas'));