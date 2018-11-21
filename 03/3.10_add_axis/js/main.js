/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.6 - Band scales
* Band scales pozwalaja nam okreslenie odleglosci miedzy elementami sekcja 3 wyklad 12
* padding outer , padding inner ,step
* padding inner and outer = <od 0 do 1> gdy 0 nie ma przestrzeni miedzy prostokatami
*/
// dodajemy osie


let margin = {left: 100, right: 10, top: 10, bottom: 200};

//liczymy nowa wysokosc i szerokosc

let width = 600 - margin.left - margin.right;
let height = 600 - margin.top - margin.bottom;

let svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right) //bylo 400
    .attr("height", height + margin.bottom + margin.top); //bylo 400

let g = svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`);


// X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 140)
    .attr("font-size", "1.6em")
    .attr("text-anchor", "middle")
    .text("The word's tallest buildings");

// Y Label dodajemy tu etykiete y
g.append("text")
    .attr("class", "y axis-label") //nazwa klasy nie jest wazna
    .attr("x", -(height / 2))
    .attr("y", -60)
    .attr("font-size", "1.6em")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)");


d3.json("data/buildings.json").then(function (data) {
    console.log(data);

    data.forEach(function (d) {
        d.height = +d.height;
    });


    //****  tu jako skladowe sa budynkow
    let x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width]) // tu dajemy szerokosc
        .paddingInner(0.2)
        .paddingOuter(0.3);

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.height)])
        .range([0, height]);

    //**** Bottom-AXIS dodajemy os na dole ekranu
    let xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x-axis") //klasa nie jest wazna
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
        .selectAll("text") //lapiemy wszystkie teksty
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-45)");

    //**** tu os z boku ekranu
    let yAxisCall = d3.axisLeft(y)
        .ticks(6) //to nam pokazuje podzialke ile ma byc
        .tickFormat(d => d + "m"); //wartosc w metrach


    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

    let rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", 0)
        .attr("x", (d) => x(d.name))
        .attr("width", x.bandwidth) // tutaj jest szerokosc pola ktora jest wyliczana na postwie ilosci elementow
        .attr("height", d => y(d.height))
        .attr("class", "update") // zamiast tego ponizej mozemy dac klase z css i dziala hover !!!
    // .attr("fill", (d) => {
    //     if (d.height > 600) {
    //         return "grey"
    //     }
    //     return "red";
    // });

});