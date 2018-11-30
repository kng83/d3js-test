/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 500)
    .attr("height", 400);

let path = d3.path();
path.moveTo(10,10);
path.lineTo(400,400);

svg.append('path').attr('d',path)
    .transition()
    .duration(2000)
   // .ease("linear")
    .attr("stroke", "orange")
    .attr("stroke-width", 5);


svg.append("line")
    .attr("x1", 20)
    .attr("y1", 70)
    .attr("x2", 100)
    .attr("y2", 350)
    .attr("stroke", "brown")
    .attr("stroke-width", 5);

svg.append("rect")
    .attr("x", 200)
    .attr("y", 50)
    .attr("width", 240)
    .attr("height", 120)
    .attr("fill", "blue")

svg.append("ellipse")
    .attr("cx", 300)
    .attr("cy", 300)
    .attr("rx", 50)
    .attr("ry", 70)
    .attr("fill", "yellow");