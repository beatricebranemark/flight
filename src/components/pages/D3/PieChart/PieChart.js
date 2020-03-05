import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import * as d3 from 'd3'
import './PieChart.css'

const PieChart = ({data, filter}) => {
    let organisation_trips = data
    const d3Container = useRef(null)

    var unique_departure_cities = []
    var unique_arrival_cities = []
    var unique_cities = []
    let table_objects = {}

    const [showStockholm,setShowStockholm] = useState(true)
    console.log(showStockholm)

    organisation_trips.forEach(trip => {
      var arrival = trip.arrival_city.split(',')
      var arrival_city = arrival[0]
      var g_type = trip.geographic_type
      var country = trip.arrival_country
      if (unique_arrival_cities.includes(arrival_city) == false) {
        unique_arrival_cities.push([arrival_city,g_type,country])
      }
    })

    /*
    if (unique_departure_cities.length > unique_arrival_cities) {
      unique_cities = unique_departure_cities
      for (var i = 0; i < unique_arrival_cities.length; i++) {
        if (
          unique_cities.includes(unique_arrival_cities[i]) == false
        ) {
          unique_cities.push(unique_arrival_cities[i])
        }
      }
    } else {
      for (var i = 0; i < unique_departure_cities.length; i++) {
        unique_cities = unique_arrival_cities

        if (
          unique_cities.includes(unique_departure_cities[i]) == false
        ) {
          unique_cities.push(unique_departure_cities[i])
        }
      }
    }*/


    const countOccurrances = city => {
      var count = 0
      for (var i = 0; i < organisation_trips.length; i++) {
        if (
          city == organisation_trips[i].arrival_city.split(',')[0]
        ) {
          count += 1
        }
      }
      return count
    }

    //  Create table_objects
    unique_arrival_cities.forEach(list => {
      table_objects[list[0]] = [countOccurrances(list[0]),list[1],list[2]]
    })

    var table_objects_no_stockholm = Object.assign({},table_objects)
    delete table_objects_no_stockholm['Stockholm']

    const clickedButton = () =>{
        if(showStockholm == true){
            setShowStockholm(false);
        }
        if(showStockholm == false){
            setShowStockholm(true); 
        }
    }

    console.log(table_objects)
    var width = 1000
    var height = 1000
    var margin = 40


    useEffect(()=>{
        // set the dimensions and margins of the graph
        var chart = d3.select('.pie_chart')
        chart.remove()

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin

        // append the svg object to the div called 'my_dataviz'
        var svg = d3.select(d3Container.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr('class', 'pie_chart')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Create dummy data
        //var data = {a: 9, b: 20, c:30, d:8, e:12, f:3, g:7, h:14}

        // set the color scale
        var color = d3.scaleOrdinal()
        .domain(['Utrikes', 'Inrikes', 'Europa', 'Norden'])
        .range(['#876f91', '#274156', '#BDC4A1', '#689FA3']);

        // Compute the position of each group on the pie:
        var pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(function(d) {return d.value[0]; })
        var data_show;
        if(showStockholm == true){
            data_show = table_objects
        }
        if(showStockholm == false){
            data_show = table_objects_no_stockholm
        }
        var data_ready = pie(d3.entries(data_show))
           
        // The arc generator
        var arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)

        // Another arc that won't be drawn. Just for labels positioning
        var outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

        var divTooltip = d3.select('#PieChartToolTip');
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('allSlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d){ return(color(d.data.value[1])) })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on('mouseover', function(d) {
            d3.select('.mouse_text').remove()
            d3.select('.mouse_text2').remove()

            svg.append("text")
            .attr("class", "mouse_text")
            .attr("text-anchor", "middle")
            .attr('font-size', '5em')
            .attr('y', 5)
            .attr('textLength', radius*0.8)
            .text(d.data.key+': '+d.data.value[0])

            svg.append("text")
            .attr("class", "mouse_text2")
            .attr("text-anchor", "middle")
            .attr('font-size', '3em')
            .attr('y', 42)
            .text(d.data.value[2])

          })

       
        

    })
    return(
        <React.Fragment>
       <svg width={width} height={height} ref={d3Container}></svg>
       <div>
       <button onClick={() => clickedButton()}>Hide Stockholm</button>
       </div>
       
       </React.Fragment>
    )
}


const mapStateToProps = (state, ownProps) => {
    let newData =
      state.getMap.data.length == 0 ? state.getData : state.getMap
    return {
      data: newData.data,
      filter: ownProps.filter,
    }
  }

  
  export default connect(mapStateToProps)(PieChart)

