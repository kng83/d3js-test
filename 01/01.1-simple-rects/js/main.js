let data = [[10, 20], [40, 50], [100, 320],[20,40]];

// moj na wyszukanie min i max
yMax = data.reduce((acc, current) => current[1] > acc[1] ? current : acc)[1];
yMin = data.reduce((acc, current) => current[1] < acc[1] ? current : acc)[1];
console.log(yMax,'max',yMin,'min');

let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", 500)
    .attr("height", 400);

let line = d3.scaleLinear().domain([yMin, yMax]).range([100, 200]);
console.log(line(10));

svg.selectAll("rect")
    .data(data)
    .enter()
    .append('rect')
    .attr('class','xxx')
    .attr('x', (d) => d[0])
    .attr('y', 10)
    .attr('height', (d) => line(d[1]))
    .attr('width', 10)
//    .attr("fill", "blue")



