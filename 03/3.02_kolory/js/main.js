/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/

//wkres logarytmiczny populacji bierzemy tylko pierwszy rok z pliku json i z niego bierzemy populacje

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "400")
    .attr("height", "400");

d3.json("data/data.json").then(function (data) {

// dorabiamy kolory do naszych zmiennych .dajemy kolory ze schmatu dla kontynentu
    //mozemy uzyc kolorow defaultowych np schemeCatergor10 lub sami dobrac odpowiedni kolor
    //ordinal to skala porzadkowa

    let scaleY = d3.scaleOrdinal()
        .domain(['africa', 'asia', 'europe', 'americas'])
        //  .range(d3.schemeCategory10);
        .range(['yellow', 'GREEN', 'BLUE', 'INDIGO'])

    console.log(scaleY('africa'));
    console.log(scaleY('europe'));

    // dokladamy skale logarytmiczna aby byly wysokosci
    let scaleYLog = d3.scaleLog().domain([1, 1000000000]).range([0, 400]).base(10);

    const rects = svg.selectAll("rect")
        .data(data[0].countries)
        .enter()
        .append("rect")
        .attr("y", (d) => {
            return 20;
        })
        .attr("x", function (d, i) {
            return (i * 2);
        })
        .attr("width", 2)
        .attr("height", (d) => {
            if (d.population > 0)
                return scaleYLog(d.population);
        })
        .attr("fill", (d) => {
            return scaleY(d.continent);
        });
});



