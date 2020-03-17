import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import store from '../../../../reducers'
import * as d3 from 'd3'

const PieChart = ({data, props, pieProp, showStockholm}) => {
  let organisation_trips = data
  const d3Container = useRef(null)
  const d3Container2 = useRef(null)
  const legendContainer = useRef(null)

  var unique_departure_cities = []
  var unique_arrival_cities = []
  var unique_cities = []
  let table_objects = {}

  const [showText, setShowText] = useState(
    showStockholm ? 'Hide' : 'Show'
  )

  organisation_trips.forEach(trip => {
    var arrival = trip.arrival_city.split(',')
    var arrival_city = arrival[0]
    var g_type = trip.geographic_type
    var country = trip.arrival_country
    if (unique_arrival_cities.includes(arrival_city) == false) {
      unique_arrival_cities.push([arrival_city, g_type, country])
    }
  })

  const countOccurrances = city => {
    var count = 0
    var dep = []
    for (var i = 0; i < organisation_trips.length; i++) {
      if (city == organisation_trips[i].arrival_city.split(',')[0]) {
        count += 1
        dep.push(organisation_trips[i].departure_city.split(',')[0])
      }
    }
    //console.log(dep)
    return [count, dep]
  }

  //  Create table_objects
  unique_arrival_cities.forEach(list => {
    table_objects[list[0]] = [
      countOccurrances(list[0])[0],
      list[1],
      list[2],
      countOccurrances(list[0])[1],
    ]
  })

  var table_objects_no_stockholm = Object.assign({}, table_objects)
  delete table_objects_no_stockholm['Stockholm']

  const clickedButton = () => {
    if (showStockholm === true) {
      store.dispatch({
        type: 'SET_STOCKHOLM',
        payload: false,
      })
      setShowText('Show')
    }
    if (showStockholm === false) {
      store.dispatch({
        type: 'SET_STOCKHOLM',
        payload: true,
      })
      setShowText('Hide')
    }
  }

  var width = 1068
  var height = 700
  var margin = 0

  useEffect(() => {
    // set the dimensions and margins of the graph
    var chart = d3.select('.pie_chart')
    chart.remove()
    d3.select('.pie_legend').remove()

    var y = d3
      .scaleBand() // x = d3.scaleBand()
      .rangeRound([0, height - 32]) // .rangeRound([0, width])
      .padding(0.2)
      .align(0.1)

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg2 = d3
      .select(d3Container2.current)
      .append('svg')
      .append('g')
      .attr('class', 'object_table')

    var svg = d3
      .select(d3Container.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('class', 'pie_chart')
      .attr(
        'transform',
        'translate(' + width / 2 + ',' + height / 2 + ')'
      )

    // set the color scale
    var color = d3
      .scaleOrdinal()
      .domain(['Utrikes', 'Inrikes', 'Europa', 'Norden'])
      .range(['#876f91', '#274156', '#BDC4A1', '#689FA3'])

    // Compute the position of each group on the pie:
    var pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value(function(d) {
        return d.value[0]
      })
    var data_show

    if (showStockholm == true) {
      data_show = table_objects
    }
    if (showStockholm == false) {
      data_show = table_objects_no_stockholm
    }

    var sortable = []
    for (var trip in data_show) {
      sortable.push([trip, data_show[trip]])
    }

    sortable.sort(function(a, b) {
      return a[1][1].localeCompare(b[1][1])
    })

    var objSorted = {}
    sortable.forEach(function(item) {
      objSorted[item[0]] = item[1]
    })

    var data_ready = pie(d3.entries(objSorted))

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)

    var divTooltip = d3.select('#PieChartToolTip')
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .sort(function(a, b) {
        return a.data.value[1].localeCompare(b.data.value[1])
        // return (a.data.value[1] - b.data.value[1]);
      })
      .attr('fill', function(d) {
        if (d.data.key == 'Stockholm') {
          return '#848484'
        } else {
          return color(d.data.value[1])
        }
      })
      .attr('stroke', 'white')
      .attr('class', 'slice_inactive')
      .style('stroke-width', '2px')
      .style('opacity', 1)
      .on('click', function(d) {
        /* d3.selectAll('.click_text').remove()
          var dep_list= []
          var dep_count = {}
          var dep_list_objects = []
          for(var i = 0;i<d.data.value[3].length;i++){
            if(dep_list.includes(d.data.value[3][i])==false){
              dep_list.push(d.data.value[3][i])
            }
          }
          dep_list.forEach(city =>{
            var count = 0
            for(var i = 0;i<d.data.value[3].length;i++){
              if(city == d.data.value[3][i]){
                count +=1
              }
            }
            dep_list_objects.push({key: city, value: count})

          })
          console.log(dep_list_objects)

          y.domain(
            dep_list_objects.map(function(d) {
              return d.key
            }))

            svg2
            .selectAll('click_text')
            .data(dep_list_objects)
            .enter()
            .append("text")
            .attr('class', 'click_text')
            .attr('font-size', '1em')
            .attr('x', 35)
            .attr('y', function(d){console.log(d);return y(d.key)})
            .attr('dx','4em')
            .text(function(d){ return d.key+': '+d.value})*/
      })
      .on('mouseover', function(d) {
        d3.select(this).style('opacity', 0.5)
        d3.select('.mouse_text').remove()
        d3.select('.mouse_text2').remove()

        svg
          .append('text')
          .attr('class', 'mouse_text')
          .attr('text-anchor', 'middle')
          .attr('font-size', '4em')
          .attr('y', 5)
          .attr('textLength', radius * 0.8)
          .text(d.data.key + ': ' + d.data.value[0])

        svg
          .append('text')
          .attr('class', 'mouse_text2')
          .attr('text-anchor', 'middle')
          .attr('font-size', '2em')
          .attr('y', 42)
          .text(d.data.value[2])
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 1)
      })

    var legend_data = [
      {key: 'Not Europe', value: '#876f91'},
      {key: 'Domestic', value: '#274156'},
      {key: 'Europe', value: '#BDC4A1'},
      {key: 'Scandinavia', value: '#689FA3'},
      {key: 'Stockholm', value: '#848484'},
    ]
    var legendContainerSVG = d3.select(legendContainer.current)

    var legend = legendContainerSVG
      .append('g')
      .attr('class', 'pie_legend')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 13)
      .attr('text-anchor', 'start')
      .selectAll('g')
      .data(legend_data)
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        //return 'translate(' + i * 65 + ',' + 0 + ')'
        return 'translate(0,' + i * 50 + ')'
      })
    //.attr('class', 'legend_active')

    legend
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', function(d, i) {
        return 130
      })
      .attr('y', -21)
      .attr('dy', '3em')
      .text(function(d) {
        return d.key
      })

      legend
      .append('rect')
      .attr('x', 145)
      .attr('width', 23)
      .attr('height', 23)
      .attr('fill', function(d) {
        return d.value
      })
  })
  return (
    <React.Fragment>
      <h1 id='pieChartText'>
        Number of flight arrivals to each city
      </h1>

      <svg
        id='pieChart'
        width={width}
        height={height}
        ref={d3Container}
      ></svg>

      <div>
        <button
          data-toggle='tooltip'
          title='Most flights to Stockholm are return trips and you can therefore choose to hide them'
          id='hideButton'
          className='btn-custom2'
          onClick={() => clickedButton()}
        >
          {showText} Stockholm as a destination
        </button>
      </div>
      <svg
        className={pieProp}
        width={200}
        height={400}
        ref={legendContainer}
      ></svg>
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => {
  let newData =
    state.getMap.data.length == 0 ? state.getData : state.getMap
  return {
    data: newData.data,
    filter: ownProps.filter,
    pieProp: ownProps.pieText,
    showStockholm: state.getShowStockholm.data,
  }
}

export default connect(mapStateToProps)(PieChart)
