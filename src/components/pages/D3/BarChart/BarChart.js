import React, {useEffect, useRef, useState} from 'react'
import Model from '../../../../data/model'
import {connect} from 'react-redux'
import * as d3 from 'd3'
import './BarChart.css'
import countTrips from '../CountTrips'
const BarChart = ({data, filter}) => {
  // Data
  let organisation_trips = data
  const d3Container = useRef(null)

  const filteredTravels = []
  const [active, setActive] = useState(false)

  let data_list = countTrips(organisation_trips)

  const getKeyByValue = (object, value) => {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop] === value) return prop
      }
    }
  }
  let months = {
    1: 'january',
    2: 'february',
    3: 'march',
    4: 'april',
    5: 'may',
    6: 'june',
    7: 'july',
    8: 'august',
    9: 'september',
    10: 'october',
    11: 'november',
    12: 'december',
  }

  const sendData = (clickedBar, cl) => {
    organisation_trips.forEach(trip => {
      if (trip.year == clickedBar.year) {
        let departure = trip.departure_time.split('/')
        let month_int = parseInt(departure[0])
        let ans = getKeyByValue(months, clickedBar.month)
        if (month_int == ans) {
          if (cl == 'bar_active') {
            filteredTravels.push(trip)
          }
          if (cl == 'bar_inactive') {
            const index = filteredTravels.indexOf(trip)
            filteredTravels.splice(index, 1)
          }
        }
      }
    })
    console.log(filteredTravels)
    filter.barChart.filter = true
    filter.barChart.employees = filteredTravels
    Model(filter)
  }

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom

  useEffect(() => {
    // ändra detta till senare, om vi tar bart hela baren varje gång så kommer vi inte behålla "aktiva bars"
    var chart = d3.select('.svg_barchart')
    chart.remove()
    d3.select('.toolTip').remove()

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

    var data = data_list

    var keys = Object.keys(data[3]).slice(0, 3)

    var divTooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'toolTip')

    x0.domain(
      data.map(function(d) {
        return d.month
      })
    )
    x1.domain(keys).rangeRound([0, x0.bandwidth()])
    y.domain([
      0,
      d3.max(data, function(d) {
        return d3.max(keys, function(key) {
          return d[key]
        })
      }),
    ]).nice()

    g.append('g')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function(d) {
        return 'translate(' + x0(d.month) + ',0)'
      })
      .attr('id', function(d) {
        return d.month
      })
      .selectAll('rect')
      .data(function(d) {
        return keys.map(function(key) {
          return {key: key, value: d[key], month: d.month}
        })
      })
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return x1(d.key)
      })
      .attr('y', function(d) {
        return y(d.value)
      })
      .attr('width', x1.bandwidth())
      .attr('height', function(d) {
        return height - y(d.value)
      })
      .attr('fill', function(d) {
        return z(d.key)
      })
      .attr('id', function(d) {
        return d.key
      })
      .on('mousemove', function(d) {
        divTooltip.style('left', d3.event.pageX + 10 + 'px')
        divTooltip.style('top', d3.event.pageY - 25 + 'px')
        divTooltip.style('display', 'inline-block')
        divTooltip.html(d.value + ' travels')
      })
      .on('mouseout', function(d) {
        divTooltip.style('display', 'none')
      })
      .attr('class', 'bar_inactive')
      //.on('click', function(d) {changeClass()})
      .on('click', function(d) {
        // console.log(d3.select(this).attr('class'))
        d3.select(this).attr('class') == 'bar_inactive'
          ? d3.select(this).attr('class', 'bar_active')
          : d3.select(this).attr('class', 'bar_inactive')
        let obj = {
          month: d.month,
          year: d.key,
          class: d3.select(this).attr('class'),
        }
        // console.log({month: d.month, year:d.key, class: d3.select(this).attr('class')})
        sendData(obj, d3.select(this).attr('class'))
      })

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0))

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Number of travels')

    var legend = g
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(keys.slice())
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * 20 + ')'
      })
      .attr('class', 'bar_inactive')
      .on('click', function(d) {
        d3.select(this).attr('class') == 'bar_inactive'
          ? d3.select(this).attr('class', 'bar_active')
          : d3.select(this).attr('class', 'bar_inactive')
        let obj = {
          month: '-',
          year: d,
          class: d3.select(this).attr('class'),
        }
        sendData(obj, d3.select(this).attr('class'))
      })

    legend
      .append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z)

    legend
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(function(d) {
        return d
      })

    // Prep the tooltip bits, initial display is hidden
    var tooltip = svg
      .append('g')
      .attr('class', 'tooltip')
      .style('display', 'none')

    tooltip
      .append('rect')
      .attr('width', 60)
      .attr('height', 20)
      .attr('fill', 'white')
      .style('opacity', 0.5)

    tooltip
      .append('text')
      .attr('x', 30)
      .attr('dy', '1.2em')
      .style('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
  })

  return <svg width={width} height={height} ref={d3Container}></svg>
}
const mapStateToProps = (state, ownProps) => {
  let newData
  if (
    ownProps.type === 'firstView' &&
    state.getSelectedOrg.data.length === 0
  ) {
    if (state.getSelectedSchool.data.length > 0) {
      newData = state.getSelectedSchool
    } else {
      newData = state.getData
    }
  } else {
    newData =
      state.getBar.data.length == 0 ? state.getData : state.getBar
  }
  return {
    data: newData.data,
    filter: ownProps.filter,
  }
}
export default connect(mapStateToProps)(BarChart)
