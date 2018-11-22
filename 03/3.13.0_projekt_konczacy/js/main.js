/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

let margin = {left: 100, right: 20, top: 10, bottom: 150};
let width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 140)
    .attr("font-size", "1.6em")
    .attr("text-anchor", "middle")
    .text("Month");

// Y Label dodajemy tu etykiete y
g.append("text")
    .attr("class", "y axis-label") //nazwa klasy nie jest wazna
    .attr("x", -(height / 2))
    .attr("y", -60)
    .attr("font-size", "1.6em")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");



d3.json("data/revenues.json").then(data => {
    //zamiana wartosci string na number
    data.forEach(el => el.revenue = + el.revenue);

    //Elementy osi x
    let x = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([0, width]) // tu dajemy szerokosc
        .paddingInner(0.2)
        .paddingOuter(0.3);

    //Elementy osi y
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.revenue)])
        .range([height, 0]);

    //Osie
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

    let yAxisCall = d3.axisLeft(y)
        .ticks(12)
        .tickFormat(d => "$"+d);
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);


    // Rysujemy prostokaty
    let rects = g.selectAll("rect").data(data);
    rects.enter()
        .append("rect")
        .attr("y", d=> y(d.revenue)) // odwracamy prostokaty by zaczynaly sie od dolu osi [3] bylo 0
        .attr("x", d => x(d.month))
        .attr("width", x.bandwidth)
        .attr("height", d => height - y(d.revenue)) //tu wyliczamy nowa wysokosc naszych prostowkotow po odwroceniu osi mamy teraz normalne ale odwrócone [2]
        .attr("class", "update");
});