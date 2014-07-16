// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:
tool.minDistance = 1;

var path;

function onMouseDown(event) {
  var x = event.point["x"]
  var y = event.point["y"]
  startPath(x, y);

  socket.emit('startPath', x, y );
}

function onMouseDrag(event) {
  var x = event.point["x"]
  var y = event.point["y"]
  drawPath(x, y);

  socket.emit('drawPath', x, y);
}

function startPath(x, y) {
  console.log("Drawing... X: " + x + " Y: " + y)
  path = new Path();
  path.strokeColor = '#00000';
  path.add(x, y)
}

function drawPath(x, y) {
  console.log("Drawing... X: " + x + " Y: " + y)
  path.add(x, y)
}

socket.on('startPath', function(x, y) {
  startPath(x, y);
  console.log("Received Start Path");
  paper.view.draw();
})

socket.on('drawPath', function(x, y) {
  drawPath(x, y);
  console.log("Received drawPath");
  paper.view.draw();
})