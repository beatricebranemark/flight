import React, {useEffect, useRef, useState} from 'react'
import Model from '../../../../data/model'
import * as d3 from 'd3'
import './BarChart.css'

const BarChart = props => {
  // Data

  let organisation_trips = props.data[0].values
  const d3Container = useRef(null)
  const airportData = require('../../../../data/airports.json')
  const filteredTravels = []


  const [active, setActive] = useState(false);

  /*let groupByOrganisation = d3
    .nest()
    .key(function(d) {
      return d.org_name
    })
    .entries(dataset)

  groupByOrganisation = groupByOrganisation.filter(organisation => {
    return organisation.key === 'ELEKTROTEKN TEORI & KONSTRUKT'
  })
  console.log(groupByOrganisation)*/


  let data_list = [
    {month: 'january', 2017: 0, 2018: 0, 2019: 0},
    {month: 'february', 2017: 0, 2018: 0, 2019: 0},
    {month: 'march', 2017: 0, 2018: 0, 2019: 0},
    {month: 'april', 2017: 0, 2018: 0, 2019: 0},
    {month: 'may', 2017: 0, 2018: 0, 2019: 0},
    {month: 'june', 2017: 0, 2018: 0, 2019: 0},
    {month: 'july', 2017: 0, 2018: 0, 2019: 0},
    {month: 'august', 2017: 0, 2018: 0, 2019: 0},
    {month: 'september', 2017: 0, 2018: 0, 2019: 0},
    {month: 'october', 2017: 0, 2018: 0, 2019: 0},
    {month: 'november', 2017: 0, 2018: 0, 2019: 0},
    {month: 'december', 2017: 0, 2018: 0, 2019: 0},
  ]

  organisation_trips.forEach(trip => {
    let date = trip.departure_time
    date = date.split('/')
    for (let j = 17; j < 20; j++) {
      if (date[2].slice(0, 2) === j.toString()) {
        for (let i = 0; i < 13; i++) {
          if (date[0] == i + 1) {
            if (trip.travel_type === 'Enkel') {
              data_list[i][20 + j.toString()] += 1
            } else if (trip.travel_type === 'Tur och retur') {
              data_list[i][20 + j.toString()] += 2
            } else {
              let path = trip.path.split('/')
              let firstDestination = path[0]
              let lastDestination = path[path.length - 1]
              airportData.forEach(airport => {
                if (airport.IATA === firstDestination) {
                  firstDestination = airport.City
                }
                if (airport.IATA === lastDestination) {
                  lastDestination = airport.City
                }
              })
              firstDestination === lastDestination
                ? (data_list[i][20 + j.toString()] += 2)
                : (data_list[i][20 + j.toString()] += 1)
            }
          }
        }
      }
    }
  })

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

  
  const sendData = (clickedBar) => {
    console.log(clickedBar.year)

  }
  

  useEffect(() => {

    // ändra detta till senare, om vi tar bart hela baren varje gång så kommer vi inte behålla "aktiva bars"
    var chart = d3.select('.svg_barchart')
    chart.remove();

    var svg = d3.select(d3Container.current),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - margin.bottom,
      g = svg
        .append('g')
        .attr('class', 'svg_barchart')
        .attr(
          'transform',
          'translate(' + margin.left + ',' + margin.top + ')'
        )

    var x0 = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)

    var x1 = d3.scaleBand().padding(0.05)

    var y = d3.scaleLinear().rangeRound([height, 0])

    var z = d3.scaleOrdinal().range(['#5394d0', '#70a788', '#7b6888'])

    //  var vals = '[{"State":"CA","Under 5 Years":2704659,"5 to 13 Years":4499890,"14 to 17 Years":2159981,"18 to 24 Years":3853788,"25 to 44 Years":10604510,"45 to 64 Years":8819342,"65 Years and Over":4114496},{"State":"TX","Under 5 Years":2027307,"5 to 13 Years":3277946,"14 to 17 Years":1420518,"18 to 24 Years":2454721,"25 to 44 Years":7017731,"45 to 64 Years":5656528,"65 Years and Over":2472223},{"State":"NY","Under 5 Years":1208495,"5 to 13 Years":2141490,"14 to 17 Years":1058031,"18 to 24 Years":1999120,"25 to 44 Years":5355235,"45 to 64 Years":5120254,"65 Years and Over":2607672},{"State":"FL","Under 5 Years":1140516,"5 to 13 Years":1938695,"14 to 17 Years":925060,"18 to 24 Years":1607297,"25 to 44 Years":4782119,"45 to 64 Years":4746856,"65 Years and Over":3187797},{"State":"IL","Under 5 Years":894368,"5 to 13 Years":1558919,"14 to 17 Years":725973,"18 to 24 Years":1311479,"25 to 44 Years":3596343,"45 to 64 Years":3239173,"65 Years and Over":1575308},{"State":"PA","Under 5 Years":737462,"5 to 13 Years":1345341,"14 to 17 Years":679201,"18 to 24 Years":1203944,"25 to 44 Years":3157759,"45 to 64 Years":3414001,"65 Years and Over":1910571}]';

    var data = data_list;
    var keys = Object.keys(data[3]).slice(0,3);

    var divTooltip = d3.select("body").append("div").attr("class", "toolTip");

    
    x0.domain(data.map(function (d) { return d.month; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();



    g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function (d) { return "translate(" + x0(d.month) + ",0)"; })
    .attr('id', function(d) {return d.month})
    
    //.on("click", function (d) {handleChange(d.key)} )
    //.on('click', function (d) {console.log(d.month)})
    .selectAll("rect")
    .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key], month: d.month }; }); })
    .enter().append("rect")
    .attr("x", function (d) { return x1(d.key); })
    .attr("y", function (d) { return y(d.value); })
    .attr("width", x1.bandwidth())
    .attr("height", function (d) { return height - y(d.value); })
    .attr("fill", function (d) { return z(d.key); })
    .attr('id', function(d) {return d.key})
    .on("mousemove", function(d){
      divTooltip.style("left", d3.event.pageX+10+"px");
      divTooltip.style("top", d3.event.pageY-25+"px");
      divTooltip.style("display", "inline-block");
      divTooltip.html((d.value+" travels"));
  })
  .on("mouseout", function(d){
      divTooltip.style("display", "none");
      // d3.select(window.activeBar).style('opacity',0.5);
      // window.activeBar = {};
  })
    
    .attr('class', 'bar_inactive')
    //.on('click', function(d) {changeClass()})
    .on('click', function(d) {
     // console.log(d3.select(this).attr('class'))
    d3.select(this).attr('class') == 'bar_inactive' ? d3.select(this).attr('class','bar_active') : d3.select(this).attr('class','bar_inactive')
    let obj = {month: d.month, year:d.key, class: d3.select(this).attr('class')}
     // console.log({month: d.month, year:d.key, class: d3.select(this).attr('class')})
      sendData(obj);
    });


g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x0));

g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
    .attr("x", 2)
    .attr("y", y(y.ticks().pop()) + 0.5)
    .attr("dy", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")
    .text("Number of travels");


  var legend = g.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice())
    .enter().append("g")
    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
    .on('click', function (d) {console.log(d)});

legend.append("rect")
    .attr("x", width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", z);

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function (d) { return d; });

  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
  tooltip.append("rect")
  .attr("width", 60)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

  tooltip.append("text")
  .attr("x", 30)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
  })

  return <svg width={width} height={height} ref={d3Container}></svg>
  /*
    <div className='barChart'>
      <p>BarChart</p>
    </div>
    */
}

export default BarChart
