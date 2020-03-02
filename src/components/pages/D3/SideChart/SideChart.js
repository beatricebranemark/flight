import React, {useEffect, useRef, useState} from 'react'
import Model from '../../../../data/model'
import {connect} from 'react-redux'
import * as d3 from 'd3'
import './SideChart.css'

const SideChart = ({data, filter}) => {
  let organisation_trips = data

  //Lista med employees
  const employee_list = []
  const na_list = []

  let ost = d3

    .nest()
    .key(function(d) {
      return d.employee
    })
    .entries(organisation_trips)

  ost.forEach(d => {
    let korv = d3
      .nest()
      .key(function(d) {
        return d.ticket_type
      })
      .entries(d.values)

    let ko = {
      employee: d.key,
      position: korv[0].values[0].position,
      travelTypes: [
        korv[0].values ? korv[0].values.length : 0,
        korv[1] ? korv[1].values.length : 0,
        korv[2] ? korv[2].values.length : 0,
        korv[3] ? korv[3].values.length : 0,
      ],
      EkonomiKlass: korv[0].values ? korv[0].values.length : 0,
      EkonomiPremium: korv[1] ? korv[1].values.length : 0,
      Business: korv[2] ? korv[2].values.length : 0,
      Unknown: korv[3] ? korv[3].values.length : 0,
    }

    ko['total'] =
      ko.EkonomiKlass + ko.EkonomiPremium + ko.Business + ko.Unknown
    employee_list.push(ko)
  })

  console.log(employee_list)

  //Click function, chosen employee är från början hela employee list
  const chosen_employees_list = []

  function chosenEmployee(evt, id) {
    //=inactive by default

    if (evt.target.className == 'person_inactive') {
      evt.target.className = 'person_active'
      if (chosen_employees_list.includes(id) === false) {
        //om personen inte finns i listan, lägg till
        chosen_employees_list.push(id)
      }
    } else {
      evt.target.className = 'person_inactive'
      if (chosen_employees_list.includes(id) === true) {
        //om personen finns i listan, ta bort
        const index = chosen_employees_list.indexOf(id)
        chosen_employees_list.splice(index, 1)
      }
    }
    //send list to model here
    filter.personList.filter = true
    filter.personList.employees = chosen_employees_list
    Model(filter)
  }

  useEffect(() => {
    let data = employee_list
    d3.select('svg')
      .selectAll('*')
      .remove()
    var svg = d3.select('#chart'),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - margin.bottom,
      g = svg
        .append('g')
        .attr(
          'transform',
          'translate(' + margin.left + ',' + margin.top + ')'
        )

    var y = d3
      .scaleBand() // x = d3.scaleBand()
      .rangeRound([0, height]) // .rangeRound([0, width])
      .paddingInner(0.1)
      .align(0.1)

    var x = d3
      .scaleLinear() // y = d3.scaleLinear()
      .rangeRound([0, width]) // .rangeRound([height, 0]);

    var z = d3
      .scaleOrdinal()
      .range(['#7fc99a', '#e9d52d', '#eb9638', '#e01b16', '#a05d56'])

    var keys = [
      'EkonomiKlass',
      'EkonomiPremium',
      'Business',
      'FirstClass',
      'Unknown',
    ]

    data.sort(function(a, b) {
      return b.total - a.total
    })
    y.domain(
      data.map(function(d) {
        return d.employee
      })
    ) // x.domain...
    x.domain([
      0,
      d3.max(data, function(d) {
        return d.total
      }),
    ]).nice() // y.domain...
    z.domain(keys)

    let bar = g
      .append('g')
      .selectAll('g')
      .data(d3.stack().keys(keys)(data))
      .enter()

    bar
      .append('g')
      .attr('fill', function(d) {
        return z(d.key)
      })
      .selectAll('rect')
      .data(function(d) {
        return d
      })
      .enter()
      .append('rect')
      .attr('y', function(d) {
        return y(d.data.employee)
      }) //.attr("x", function(d) { return x(d.data.State); })
      .attr('x', function(d) {
        return x(d[0])
      }) //.attr("y", function(d) { return y(d[1]); })
      .attr('width', function(d) {
        return x(d[1]) - x(d[0])
      }) //.attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr('height', y.bandwidth())

    bar
      .append('g')
      .selectAll('text')
      .data(function(d) {
        return d
      })
      .enter()
      .append('text')
      .attr('class', 'totalText')
      .attr('y', function(d) {
        return y(d.data.employee)
      })
      .attr('dy', y.bandwidth() / 2) //.attr("x", function(d) { return x(d.data.State); })
      .attr('x', function(d) {
        return x(d.data.total + 5)
      })
      .text(function(d) {
        return d.data.total
      })
      .attr('fill', 'white') //.attr("width", x.bandwidth());

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,0)') //  .attr("transform", "translate(0," + height + ")")
      .call(d3.axisLeft(y)) //   .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')') // New line
      .call(d3.axisBottom(x).ticks(null, 's')) //  .call(d3.axisLeft(y).ticks(null, "s"))
      .append('text')
      .attr('y', 2) //     .attr("y", 2)
      .attr('x', x(x.ticks().pop()) + 0.5) //     .attr("y", y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em') //     .attr("dy", "0.32em")
      .attr('fill', '#000')
      .attr('color', '#ffffff')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .attr('transform', 'translate(' + -width + ',-10)') // Newline

    var legend = g
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .attr('color', 'white')

      .selectAll('g')
      .data(keys.slice().reverse())
      .enter()
      .append('g')
      //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
      .attr('transform', function(d, i) {
        return 'translate(-50,' + (300 + i * 20) + ')'
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
  })

  return (
    <React.Fragment>
      <svg
        id='chart'
        width='400'
        height='1200'
        max-height='300'
        overflow='scroll'
      ></svg>
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => {
  let newData =
    state.getPerson.data.length == 0 ? state.getData : state.getPerson
  return {
    data: newData.data,
    filter: ownProps.filter,
  }
}
export default connect(mapStateToProps)(SideChart)
