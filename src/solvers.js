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
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
