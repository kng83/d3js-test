/*
*    main.js
*    Mastering Data Visualization with D3.js
*    5.2 - Looping with intervals
*/

let margin = {left: 80, right: 20, top: 50, bottom: 100};

let width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//Flag
let flag = true;

//Transition function (powinna byc mniejsza niz nasz update)
let t = d3.transition().duration(750)

let g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

let xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

let yAxisGroup = g.append("g")
    .attr("class", "y axis");

// X Scale
let x = d3.scaleBand().range([0, width]).padding(0.2);

// Y Scale
let y = d3.scaleLinear().range([height, 0]);


// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

// Y Label
let yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

d3.json("data/revenues.json").then(function (data) {
    //Clean data -bierzemy 2 dane bo bedziemy je wyswietlac naprzemiennie
    data.forEach(d => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });

    d3.interval(() => {
        // aby pokazac na innych danych jak znikaja
        let newData = flag ? data : data.slice(1)
        updata(newData);
        flag = !flag;
    }, 1000);

    updata(data);
});

function updata(data) {
    //tu czytamy flage
    let value = flag ? "revenue" : "profit";

    // tu dajemy domeny deklarowane wczesniej
    x.domain(data.map(d => d.month));
    y.domain([0, d3.max(data, d => d[value])]);

    // X Axis
    let xAxisCall = d3.axisBottom(x);
    xAxisGroup.call(xAxisCall);

    // Y Axis
    let yAxisCall = d3.axisLeft(y).tickFormat(d => "$" + d);
    // tu do grupy dodajemy transition dzieki temu skalujemy os y
    yAxisGroup.transition(t).call(yAxisCall);

    // Join new data with old elements
    // DAta ma tu callback dzieki temu mozemy sprawic byl usuwany pierwszy prostokat
    // Zwraca callback klucz do tablicy ktorym bedziemy sie poslugiwac tak usuwany byl
    // nasz ostatni element a tak bedzie pierwszy
    let rects = g.selectAll("rect")
        .data(data, (d) => d.month);

    // Exit old elements not present in new data set
    // Transycja dla exit
    rects.exit()
        .attr("fill", "red")
        .transition(t)
        .attr("y", y(0))
        .attr("height", 0)
        .remove();

    /* UPDATE old elements present in new data (nie dajemy juz to enter) tu niema append
     transition dla wszystkich przy updatcie */
    // rects
    //     .transition(t)
    //     .attr("y", d => y(d[value]))
    //     .attr("x", d => x(d.month))
    //     .attr("height", d => height - y(d[value]))
    //     .attr("width", x.bandwidth);

    /* ENTER new elements present in new data
     Dot transycji dajemy y za transycja dzieki temu mamy ladny start
     Aby klocki nie spadaly to zaczynamy od y 0 */

    // rects.enter()
    //     .append("rect")
    //     .attr("x", d => x(d.month))
    //     .attr("width", x.bandwidth)
    //     .attr("y", y(0))
    //     .attr("height", 0)
    //     .attr("fill", "blue")
    //     .transition(t)
    //     .attr("y", d => y(d[value]))
    //     .attr("height", d => height - y(d[value]))


    // Poniewaz w update i enter mamy powielony kod mozemy uzyc merge

    rects.enter()
        .append("rect")
        .attr("fill", "blue")
        .attr("y", y(0)) //po to by przystarcie prostokaty wychodzily z 0
        .attr("height", 0) //prostokaty maja wysokosc 0 na starcie i pozniej jest tranzycja
        .attr("x", d => x(d.month))
        .attr("width", x.bandwidth)
        //UPDATE jes tu mergem tu jest nasz update dzieki temu mamy tylko enter a zmiany sa po intrukcji merge
        .merge(rects)
        .transition(t)
        //  .attr("x", d => x(d.month))
        //  .attr("width", x.bandwidth)
        .attr("y", d => y(d[value]))
        .attr("height", d => height - y(d[value]))

    let label = flag ? "Revenue" : "Profit";
    yLabel.text(label);
}







