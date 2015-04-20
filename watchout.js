// start slingin' some d3 here.

$(document).ready(function(){
var generateElements = function (n) {
var object = [];


   for (var i = 0; i < n; i++) {  
   	 var element = {};
   	  element.x = Math.floor(Math.random() * 500) + 0;
      element.y = Math.floor(Math.random()* 800) + 0;
      element.r = 10;
      object.push (element);

   } 
   return object;
}

  var elements = generateElements (50);


  var gameBoardWidth = 800;
  var gameBoardHeight = 500;
  var currentPlayer = new Player(gameBoardHeight/2, gameBoardWidth/2, 13);
  var collisions = 0;
  
  
 setInterval (function () { 
  debugger;
  currentPlayer.score++;
  document.getElementById("currentScore").innerHTML= currentPlayer.score;
}, 50);

  var gameBoard = d3.select('body')
              .append('svg')
              .attr('class', 'gameBoard')
              .attr('width', gameBoardWidth)
              .attr('height', gameBoardHeight);

  var drag = d3.behavior.drag()
             .on('dragstart', function() { player.style('fill', 'red'); })
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { player.style('fill', 'black'); });
      debugger;


  var player = gameBoard.selectAll('.draggableCircle')
                .data([currentPlayer])
                .enter()
                .append('svg:circle')
                .attr('class', 'draggableCircle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'black');

  var enemies = gameBoard.selectAll('.enemies')
                .data(elements)
                .enter()
                .append('svg:circle')
                .attr('class', 'enemies')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .style ("fill", "green")
                .style ({
                   top: 50,
                   left:69
                });

  var checkCollision = function(enemies, callback) {
  for (var i = 0; i < enemies[0].length; i++) {
    var radiusSum = parseFloat(enemies[0][i]["attributes"]["r"]["nodeValue"]) + parseFloat(currentPlayer.r);
    var xDiff = parseFloat(enemies[0][i]["attributes"]["cx"]["nodeValue"]) - parseFloat(currentPlayer.x);
    var yDiff = parseFloat(enemies[0][i]["attributes"]["cy"]["nodeValue"]) - parseFloat(currentPlayer.y);
    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < radiusSum) {
      return callback();
    }
  }
};


  var move = function (){
    debugger;
  enemies.transition().duration (1000)
     .attr('cx', function(d) { return Math.floor(Math.random() * (200 + 1)) + 0 + d.x; })
     .attr("cy", function(d) { return Math.floor(Math.random() * (200 + 1)) + 0 + d.y; }) ;

  checkCollision(enemies , function (){
    collisions++;
    document.getElementById("scoreDisplay").innerHTML= collisions;
    currentPlayer.score = 0;
    console.log (collisions);
   });    
   }; 
   
  
setInterval(move, 1000);

});



  






