/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.6 - Selections and data joins
*/

//import * as d3 from 'd3';
let data = [25, 20, 10, 12, 15,40];

let svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);


//funckcja data tworzy nam tutaj tyle okregow ile jest elementow tablicy nastepnie
// wywolujac funkcje circles.enter() mamy doostetp do kazdego elemntu tablicy i mozemy napodstawie jego rysowac
//kola (.data(data) dziala jak foreach .
let circles = svg.selectAll("circle")
    .data(data);

circles.enter()
    .append("circle")
        .attr("cx", (d, i)=> (i * 50) + 25)
        .attr("cy", 100)
        .attr("r", (d) => d)
        .attr("fill", "#627332");