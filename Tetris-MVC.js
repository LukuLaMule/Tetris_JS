

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

  constructor(x, y, index) { // On crée une fonction constructeur qui prend en paramètre la position x et y du bloc et l'index du bloc.
    this.x = x; this.y = y; // On initialise les variables x et y.
    this.matrix = JSON.parse(JSON.stringify(Piece.TETROMINOS[index]));// On crée une copie de la matrice du bloc.
  }

  isInsideCanvas() { // On crée une fonction qui vérifie si le bloc est dans le canvas.
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

export let current_tetro; // On crée une variable qui contient le bloc courant.

class Model {

  

  constructor() { // On crée une fonction constructeur.

    this.matrix = [ // On crée une matrice qui contient toutes les cases du canvas.
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
    
    
    this.getRandomTetromino(); // On appelle la fonction qui crée un bloc aléatoire.
    
    
  }

  Score = 0; // On crée une variable qui contient le score.
  // incrémente le score des qu'une piece est posée
  incrementScore() {
    this.Score += 10;// On incrémente le score de 10.
   


    //récupère l'élément score dans le html
    let score = document.getElementById("score");
    //affiche le score
    score.innerHTML = this.Score;

  }
 
  
  getRandomTetromino() { // On crée une fonction qui va nous permettre de récupérer un bloc aléatoire.
    let randomIndex = Math.floor(Math.random() * Piece.TETROMINOS.length); // On crée une variable qui contient un nombre aléatoire entre 1 et 7.
    current_tetro = new Piece(3, 0, randomIndex); // On crée une variable qui contient un nouveau bloc.

    // ajouter la piece dans la matrice
    for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
      for (let j = 0; j < current_tetro.matrix[0].length; j++) { // On parcourt la matrice du bloc.
        if (this.matrix[current_tetro.y + i][current_tetro.x + j] !== 0) { // On vérifie si la case n'est pas vide.
          alert("Game Over : Votre Score est de" + "\xa0" + this.Score ); // On affiche un message d'alerte.
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
    // retirer le bloc de la matrice
    for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
      for (let j = 0; j < current_tetro.matrix[0].length; j++) { //  On parcourt la matrice du bloc.
        if (current_tetro.matrix[i][j] != 0 && current_tetro.y + i >= 0 && current_tetro.x + j < this.matrix[0].length) // Si la valeur de la matrice du bloc est différente de 0.
          this.matrix[current_tetro.y + i][current_tetro.x + j] = 0; // On met à jour la matrice du jeu.
      }
    }
    // check collision
    for (let i = 0; i < current_tetro.matrix.length; i++) {  // On parcourt la matrice du bloc.
      for (let j = 0; j < current_tetro.matrix[0].length; j++) {
        if (current_tetro.matrix[i][j] != 0 && current_tetro.y + i + 1 >= this.matrix.length) { // Si la valeur de la matrice du bloc est différente de 0.
          authorized = false; // On ne peut pas descendre.
          break; // On arrête la boucle.
        }
        if (current_tetro.matrix[i][j] != 0 && this.matrix[current_tetro.y + i + 1][current_tetro.x + j] != 0) { // Si la valeur de la matrice du bloc est différente de 0.
          authorized = false; // On ne peut pas descendre.
          break; // On arrête la boucle.
        }
      }
    }
    if (authorized == true) { // Si on peut descendre.
      // chute qui s'accélère en fonction du score
      if (this.Score <= 100) {

        current_tetro.y += 1; // On incrémente la position du bloc en y.
      } else if (this.Score <= 200) { // Si le score est inférieur ou égal à 200.
        current_tetro.y += 2; // On incrémente la position du bloc en y.
      }
      else if (this.Score <= 300) { // Si le score est inférieur ou égal à 300.
        current_tetro.y += 3; // On incrémente la position du bloc en y.
      }
      else if (this.Score <= 400) { // Si le score est inférieur ou égal à 400.
        current_tetro.y += 4; // On incrémente la position du bloc en y.
      }
      else if (this.Score <= 500) { //  Si le score est inférieur ou égal à 500.
        current_tetro.y += 5; // On incrémente la position du bloc en y.
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

      for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
        for (let j = 0; j < current_tetro.matrix[0].length; j++) { // On parcourt la matrice du bloc.
          if (current_tetro.matrix[i][j] != 0) // Si la valeur de la matrice du bloc est différente de 0.
            this.matrix[current_tetro.y + i][current_tetro.x + j] = current_tetro.matrix[i][j]; // On met à jour la matrice du jeu.
        }
      }
    }
    else { // Si on ne peut pas descendre.
      for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
        for (let j = 0; j < current_tetro.matrix[0].length; j++) { // On parcourt la matrice du bloc.
          if (current_tetro.matrix[i][j] != 0) // Si la valeur de la matrice du bloc est différente de 0.
            this.matrix[current_tetro.y + i][current_tetro.x + j] = current_tetro.matrix[i][j]; // On met à jour la matrice du jeu.
        }
      }
      current_tetro = this.getRandomTetromino(); // On récupère un nouveau bloc.
    

    }
    this.DisplayGrid(this.matrix); // On affiche la matrice du jeu.
    

  }


  drop() { // Faire chuter le bloc directement en bas du canvas en vérifiant les collisions avec les autres blocs.


    // on supprime le bloc actuel de la matrice
    for (let i = 0; i < current_tetro.matrix.length; i++) { // matrice du bloc
      for (let j = 0; j < current_tetro.matrix[0].length; j++) { // matrice du bloc
        if (current_tetro.matrix[i][j] != 0 && current_tetro.y + i >= 0 && current_tetro.x + j < this.matrix[0].length) // Si la valeur de la matrice du bloc est différente de 0.
          this.matrix[current_tetro.y + i][current_tetro.x + j] = 0; // On met à jour la matrice du jeu.
      }
    }
    // check collision
    while (true) { // Tant que la collision n'est pas détectée.
      let authorized = true; // On peut descendre.
      for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
        for (let j = 0; j < current_tetro.matrix[0].length; j++) {
          if (current_tetro.matrix[i][j] != 0 && current_tetro.y + i + 1 >= this.matrix.length) { // Si la valeur de la matrice du bloc est différente de 0.
            authorized = false; // On ne peut pas descendre.
            break; // On arrête la boucle.
          } 
          if (current_tetro.matrix[i][j] != 0 && this.matrix[current_tetro.y + i + 1][current_tetro.x + j] != 0) { // Si la valeur de la matrice du bloc est différente de 0.
            authorized = false; // On ne peut pas descendre.
            break; // On arrête la boucle.
          }
        }
      }
      if (authorized == true) { // Si on peut descendre.
        current_tetro.y += 1; // On incrémente la position du bloc en y.
      } else { // Si on ne peut pas descendre.
        break;// On arrête la boucle.
      }
    }
    for (let i = 0; i < current_tetro.matrix.length; i++) { // On parcourt la matrice du bloc.
      for (let j = 0; j < current_tetro.matrix[0].length; j++) { // On parcourt la matrice du bloc.
        if (current_tetro.matrix[i][j] != 0) // Si la valeur de la matrice du bloc est différente de 0.
          this.matrix[current_tetro.y + i][current_tetro.x + j] = current_tetro.matrix[i][j]; // On met à jour la matrice du jeu.
      }
    }
    current_tetro = this.getRandomTetromino(); // On récupère un nouveau bloc.
    
    this.DisplayGrid(this.matrix); // On affiche la matrice du jeu.
  }
}

class View { // Classe qui gère l'affichage du jeu.
  constructor(canvas_id) { // Constructeur de la classe.
    this.canvas = document.getElementById(canvas_id) // On récupère le canvas.
    this.context = this.canvas.getContext("2d"); // On récupère le contexte du canvas.
    this.couleur = ['brown', 'yellow', 'green', 'blue', 'orange', 'pink', 'cyan']; // Couleurs des blocs.
    
    this.rand = Math.floor(Math.random() * this.couleur.length); // On choisit une couleur aléatoire.
    
   
  }
  

  displayGrid(matrix) { // Méthode qui affiche la grille du jeu.
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // On efface le canvas.
    this.context.strokeStyle = '#000'; // Couleur des lignes de la grille.

    // Dessine les lignes verticales de la grille
    for (let x = 0; x < matrix[0].length; x++) { 
      this.context.beginPath(); // On commence un nouveau tracé.
      this.context.moveTo(x * 50, 0); // On déplace le curseur.
      this.context.lineTo(x * 50, matrix.length * 50); // On trace une ligne.
      this.context.stroke(); // On dessine la ligne.
    }

    // Dessine les lignes horizontales de la grille
    for (let y = 0; y < matrix.length; y++) {
      this.context.beginPath(); 
      this.context.moveTo(0, y * 50); 
      this.context.lineTo(matrix[0].length * 50, y * 50);
      this.context.stroke();
    }

    for (let i = 0; i < matrix.length; i++) { // On parcourt la matrice du jeu.
      for (let j = 0; j < matrix[0].length; j++) { // On parcourt la matrice du jeu.
          if (matrix[i][j] != 0) {  // On vérifie que la case est vide.
          this.context.fillStyle = this.couleur[matrix[i][j]]; // On définit la couleur du carré.
          console.log(this.couleur[matrix[i][j]]); // On affiche la couleur du carré.
          this.context.fillRect(j * 50, i * 50, 50, 50); // On dessine le carré.
        }
      }
    }

    //supprimer ligne pleine  
    for (let row = 0; row < matrix.length; row++) { // On parcourt la matrice du jeu.
      if (matrix[row].every(col => col !== 0)) { // Si la ligne est pleine.
        matrix.splice(row, 1); // On supprime la ligne.
        matrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // On ajoute une ligne vide en haut.
      }

    }



  }
}

class Controller { // Classe qui gère les évènements du jeu.
  
  constructor(model, view, Piece) { // Constructeur de la classe qui appelle les classes Model et View et la classe Piece.
    this.model = model; // On récupère l'instance de la classe Model.
    this.view = view; // On récupère l'instance de la classe View.
    this.Piece = Piece; // On récupère l'instance de la classe Piece.
    

    this.bindDisplayCNF = this.bindDisplayCNF.bind(this); // On lie la fonction bindDisplayCNF à l'instance de la classe Controller.

    this.model.bindDisplayGrid(this.bindDisplayCNF); // On lie la fonction bindDisplayCNF à l'instance de la classe Model.

    this.stopGame = this.stopGame.bind(this); // On lie la fonction stopGame à l'instance de la classe Controller.
    this.model.bindSetInterval(this.stopGame); // On lie la fonction stopGame à l'instance de la classe Model.
    this.initEvent(); // On initialise les évènements.

    this.model.play(); // On lance le jeu.





    this.interval = setInterval(() => { // Toutes les 500ms, on fait descendre le bloc.
      if (!this.model.moveDown()) { 

      }
    }, 500); // On lance le jeu toutes les 500ms.


  }

  bindDisplayCNF(grid) { // On affiche la grille.
    this.view.displayGrid(grid); // On affiche la grille de la classe View.
  }

    stopGame() { // On stop le jeu.
    clearInterval(this.interval); // On arrête le setInterval.
     this.model.stopGame(); // On arrête le jeu.
     this.view.gameOver(); // On affiche le message de fin de jeu. 

   }

  initEvent() { // On initialise les évènements.
    document.addEventListener('keydown', (event) => { // On écoute l'évènement keydown.
      switch (event.key) { // On vérifie la touche pressée.
        case 'ArrowLeft': // Si la touche pressée est la flèche de gauche.
          this.model.moveLeft(); // On déplace le bloc vers la gauche.

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

        case ' ': // Si la touche pressée est la barre d'espace.
          this.model.drop();
          break;
        case 'Enter':
          this.model.drop();
          break;




      }
    });
  }
}

const app = new Controller(new Model(), new View('mycanvas')); // On lance le jeu en créant une instance de la classe Controller.