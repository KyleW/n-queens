/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  // make a n x n board?
  var board = new Board({n: n});
  var availableRows = [];
  var availableColumns = [];

  // place the first piece
  for ( var i = 0; i < n; i++) {
    availableColumns.push(i);
    availableRows.push(i);
  }

  // find available spots for 2nd pieces
  while (availableRows.length > 0 && availableColumns.length > 0){
    board.togglePiece(availableRows.shift(), availableColumns.shift());
  }

  // turn board.attributes into a matrix and assign to solution\
  var solution = board.attributes;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, solutionCount){
  solutionCount = solutionCount || 1;

  if ( n === 1) {
    return solutionCount;
  } else {
    solutionCount = n * solutionCount;
    return countNRooksSolutions(n - 1, solutionCount);
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

//n has to be => 4 for this to work

window.findNQueensSolution = function(n){

  var board;
  var availableSpaces;
  var counter;

  var setBoard = function() {
    //make an n x n board
    board = new Board({n: n});

    // Make an array of all possible spaces
    availableSpaces = [];

    for ( var i = 0;  i < n; i++ ) {
      for (var j = 0; j < n; j++){
        availableSpaces.push([i,j]);
      }
    }

    counter = 0;//how many queens have been placed
  };


  // put a queen on the first space
  var placeQueen = function(start) {
    start = start || 0;
    var currentMove = availableSpaces.splice(start,1)[0];
    board.togglePiece(currentMove[0], currentMove[1]);
    counter++;

    // remove all spaces from the array that now have conflicts
    // remove rows
    for(var k = availableSpaces.length - 1 ; k >= 0; k--){
      //remove spaces in the same column, row, major and minor diagonal
      if (
        availableSpaces[k][0] === currentMove[0] || //columns
        availableSpaces[k][1] === currentMove[1] || //rows
        (currentMove[0]- availableSpaces[k][0]) === (currentMove[1] - availableSpaces[k][1]) || // major diagonal
        (currentMove[0] - availableSpaces[k][0]) === (availableSpaces[k][1] - currentMove[1])   //  //minor diagonal
        ) {
        availableSpaces.splice(k ,1);    //remove available space[i]
      }
    }

    if (availableSpaces.length > 0){
      placeQueen();
    }
  };


  setBoard();
  placeQueen();

  var starter = 0;
  while (n > 3 && counter !== n){
    setBoard();
    // start process again, but started on next value
    placeQueen(starter);
    starter++;
  }

  var solution = board.attributes;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

//  FROM DATA STRUCTURES SPRINT

// var makeTree = function(value){
//   var newTree = Object.create(treeMethods);
//   newTree.value = value;
//   newTree.children = [];
//   newTree.parent= null;
//   return newTree;
// };

// var treeMethods = {};

// treeMethods.addChild = function(value){
//   var temp = makeTree(); // generate a new tree
//   temp.value = value;
//   this.children.push(temp);
//   temp.parent= this;
// };

// treeMethods.depthFirstLog  = function(fn) {
//   fn.call(this, arguments);
//   if (this.children.length > 0) {
//     for (var i = 0; i< this.children.length; i++) {
//       this.children[i].depthFirstLog(fn);
//     }
//   }
// };


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n){

  var allPossible = function() {
    var availableSpaces = [];

    for ( var i = 0;  i < n; i++ ) {
      for (var j = 0; j < n; j++){
        availableSpaces.push([i,j]);
      }
    }

    return availableSpaces;
  }();

  console.log(allPossible);

  var makeNode = function(value){
    var newNode = Object.create(nodeMethods);
    newNode.value = value;
    newNode.children = [];
    newNode.parent= null;
    newNode.availableSpaces = allPossible;
    newNode.level = 0;
    return newNode;
  };

  var nodeMethods = {};

  nodeMethods.addChild = function(value){
    var temp = makeNode(); // generate a new tree
    temp.value = value;
    temp.parent= this;
    temp.level = this.level + 1;
    temp.availableSpaces = removeConflicts(this.availableSpaces , temp.value);
    this.children.push(temp);
  };

  // function that takes a list of available spaces and given a move subtracts all 
  var removeConflicts = function(availableSpaces,currentMove){
    //available spaces is an array of what's there before you make your move
    //currentMove is the move you're making right now
    for(var k = availableSpaces.length - 1 ; k >= 0; k--){
      //remove spaces in the same column, row, major and minor diagonal
      if (
        availableSpaces[k][0] === currentMove[0] || //columns
        availableSpaces[k][1] === currentMove[1] || //rows
        (currentMove[0]- availableSpaces[k][0]) === (currentMove[1] - availableSpaces[k][1]) || // major diagonal
        (currentMove[0] - availableSpaces[k][0]) === (availableSpaces[k][1] - currentMove[1])   //  //minor diagonal
        ) {
        availableSpaces.splice(k ,1);    //remove available space[i]
      }
    }
    //returns an array
    return availableSpaces;
  };

  var tree = makeNode();
  for (var i = 0 ; i < n ; i++){
    tree.addChild([0,i]);
  }

  console.log(tree);

  // var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};
