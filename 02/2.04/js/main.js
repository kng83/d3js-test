/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.4 - Adding SVGs with D3
*/

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400)
	.attr("fill","grey");


var circle = svg.append("circle")
	.attr("cx", 100)
	.attr("cy", 250)
	.attr("r", 70)
	.attr("fill", "steelblue");

var line = svg.append("rect")
    .attr("x",100)
    .attr("y",250)
	.attr("width",5)
	.attr("height",10)
	.attr("fill","red")
