/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/


let data = [[10,20],[40,50],[100,320]]

let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 500)
    .attr("height", 400);

let line = d3.line()
    .interpolate('linear')
    .x(function(d){ return x(d.x) })
    .y(function(d){ return y(d.y) });

svg.append("path")
    .attr("class", "line")
    .attr("d", line);

let path =d3.path()
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(2000)
    .ease("linear")
    .attr("stroke-dashoffset", 0);