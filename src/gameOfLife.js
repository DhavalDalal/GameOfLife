var cellAt = function(r, c, world) {
  var row = world[r];
  if (row == undefined || row[c] == undefined) {
    return 0;
  }
  return world[r][c];
}

var neighbours = function(r, c, world) {
  return [
    cellAt(r-1, c-1, world), cellAt(r-1, c  , world), cellAt(r-1, c+1, world), 
    cellAt(r,   c-1, world),                          cellAt(r,   c+1, world), 
    cellAt(r+1, c-1, world), cellAt(r+1, c  , world), cellAt(r+1, c+1, world)  
  ];
}

var isAlive = cell => cell != 0;
var isUnderPopulated = liveNeighbours => liveNeighbours < 2;
var canSurvive = liveNeighbours => liveNeighbours == 2 || liveNeighbours == 3;
var isOverCrowded = liveNeighbours => liveNeighbours > 3;
var canReproduce = liveNeighbours => liveNeighbours == 3;

var newCell = function(cell, neighbours) {
  var liveNeighbours = neighbours.reduce((acc, _) => _ + acc, 0);
  if (isAlive(cell) && (isUnderPopulated(liveNeighbours) || isOverCrowded(liveNeighbours))) {
      return 0;
  }
  
  if (isAlive(cell) && canSurvive(liveNeighbours)) {
      return 1;
  }
  
  if(!isAlive(cell) && canReproduce(liveNeighbours)) {
      return 1;
  }
  return 0;
}

var newWorld = 
  oldWorld => oldWorld.map((row, r) => 
    row.map((cell, c) => 
      newCell(cell, neighbours(r, c, oldWorld))));
    