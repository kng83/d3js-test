/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "400")
    .attr("height", "400");

d3.json("data/buildings.json").then(function (data) {

    // skalowanie osi y (nazwa moze byc inna)
    // naszym inputem sa wartosci dla y z przedzialu 0-828 skalujemy je do obszaru 0-400
    // zmienna y bedzie referencja do funkcji skalujacej
    let scaleY = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);

    console.log(scaleY(100));
    console.log(scaleY(414)); //200

    console.log(scaleY.invert(48.3)); //np jak chcemy budynyk ktory ma 48.3 pixele to jaka wartosc powninna byc na input
    console.log(scaleY.invert(200)); //414


    const rects = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", 20)
        .attr("x", function (d, i) {
            return (i * 60);
        })
        .attr("width", 40)
        .attr("height", (d) => {
            return scaleY(d.height);
        })
        .attr("fill", (d) => {
            return "grey";
        });
});



