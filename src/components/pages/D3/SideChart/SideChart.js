import React, {useEffect, useRef, useState} from 'react'
import Model from '../../../../data/model'
import {connect} from 'react-redux'
import * as d3 from 'd3'

const SideChart = ({data, filter}) => {
  let organisation_trips = data

  //Lista med employees
  const employee_list = []
  const na_list = []

  //var filter.personList.employees = []

  let groupEmployees = d3

    .nest()
    .key(function(d) {
      return d.employee
    })
    .entries(organisation_trips)

  groupEmployees.forEach(d => {
    let employeeTickets = d3
      .nest()
      .key(function(d) {
        return d.ticket_type
      })
      .entries(d.values)

    let groupByTickets = {
      employee: d.key,
      position: employeeTickets[0].values[0].position,
      travelTypes: [
        employeeTickets[0].values ? employeeTickets[0].values.length : 0,
        employeeTickets[1] ? employeeTickets[1].values.length : 0,
        employeeTickets[2] ? employeeTickets[2].values.length : 0,
        employeeTickets[3] ? employeeTickets[3].values.length : 0,
      ],
      EkonomiKlass: employeeTickets[0].values ? employeeTickets[0].values.length : 0,
      EkonomiPremium: employeeTickets[1] ? employeeTickets[1].values.length : 0,
      Business: employeeTickets[2] ? employeeTickets[2].values.length : 0,
      Unknown: employeeTickets[3] ? employeeTickets[3].values.length : 0,
    }

    groupByTickets['total'] =
      groupByTickets.EkonomiKlass + groupByTickets.EkonomiPremium + groupByTickets.Business + groupByTickets.Unknown
    employee_list.push(groupByTickets)
  })

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

  const sendData = clickedBar => {
    if (clickedBar.hide) {
      showAll()
    } else {
      organisation_trips.forEach(trip => {
        if (trip.employee == clickedBar.emp) {
          //if (filter.personList.employees.includes(trip) === false) {
          if (clickedBar.class.split(' ')[1] == 'person_active') {
            filter.personList.employees.push(trip)
          }
          if (clickedBar.class.split(' ')[1] == 'person_inactive') {
            const index = filter.personList.employees.indexOf(trip)
            filter.personList.employees.splice(index, 1)
          }
          //}
        }
      })

      filter.personList.filter = true
      filter.personList.employees = filter.personList.employees
      Model(filter)
    }
  }

  const showAll = () => {
    filter.personList.employees = []
    filter.personList.filter = false
    filter.personList.employees = filter.personList.employees
    Model(filter)

    var bars = document.getElementsByClassName('sideChartRect')
    for (var i = 0; i < bars.length; i++) {
      let fullClassName = bars[i].className.baseVal.split(' ')
      bars[i].className.baseVal =
        'sideChartRect person_active ' + fullClassName[2]
    }
  }

  const dropdownChange = e => {
    loadData(e.target.value)
    /*organisation_trips.forEach(trip => {
      if (trip.position == e.target.value) {
        filter.personList.employees.push(trip)
      }
    })
    filter.personList.filter = true
    filter.personList.employees = filter.personList.employees
    Model(filter)*/
  }

  const getPositions = employees => {
    var positions = []
    employees.forEach(employee => {
      if (positions.includes(employee.position) === false)
        positions.push(employee.position)
    })
    return positions
  }

  /*const testFunction = (data) => {
   
    filter.personList.employees = []
    organisation_trips.forEach(trip => {
      data.forEach(employee => {
        if (trip.employee == employee.employee) {
          filter.personList.employees.push(trip)
        }
      })
    })      

    filter.personList.filter = true
    filter.personList.employees = filter.personList.employees
    Model(filter)
  }*/

  function loadData(filter) {
    let data = employee_list

    d3.select('svg')
      .selectAll('*')
      .remove()

    if (filter !== 'none' && filter !== 'all') {
      data = data.filter(p => {
        if (p.position === filter) {
          return p
        }
      })
    }

    var svg = d3.select('#chart'),
      margin = {top: 20, right: 20, bottom: 30, left: 44},
      width = +svg.attr('width') - margin.left - margin.right,
      height = data.length * 22 + 20 + margin.top,
      g = svg
        .append('g')
        .attr(
          'transform',
          'translate(' + margin.left + ',' + margin.top + ')'
        )

    var y = d3
      .scaleBand() // x = d3.scaleBand()
      .rangeRound([0, height - 32]) // .rangeRound([0, width])
      .padding(0.2)
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

    var divTooltip = d3.select('#sideChartToolTip')

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
      .attr('height', 20)
      .attr('class', function(d) {
        return (
          'sideChartRect person_active ' +
          d.data.employee +
          ' ' +
          d.data.position
        )
      })
      .on('mouseover', function(d) {
        divTooltip.style('left', d3.event.pageX + 10 + 'px')
        divTooltip.style('top', d3.event.pageY - 100 + 'px')
        divTooltip.style('display', 'block')
        divTooltip.style('background-color', 'white')
        divTooltip.html(
          d.data.position +
            ': <strong>' + 
            d.data.total +
            '</strong> one-way flights'
        )
      })
      .on('mouseout', function(d) {
        divTooltip.style('display', 'none')
      })
    /*.on('click', function(d) {
        var allStacked = document.getElementsByClassName(
          d.data.employee
        )
        let hide = false
        if (
          d3
            .select(this)
            .attr('class')
            .split(' ')[1] == 'person_active'
        ) {
          var allActive = document.getElementsByClassName(
            'person_active'
          )
          var AllInactive = document.getElementsByClassName(
            'person_inactive'
          )
          if (AllInactive.length == 0) {
            for (var i = 0; i < allActive.length; i++) {
              let fullClassName = d3
                .select(allActive[i])
                .attr('class')
              allActive[i].className.baseVal =
                'sideChartRect person_inactive ' +
                fullClassName.split(' ')[2]
            }
            for (var j = 0; j < allStacked.length; j++) {
              let fullClassName = d3
                .select(allStacked[j])
                .attr('class')
              allStacked[j].className.baseVal =
                'sideChartRect person_active ' +
                fullClassName.split(' ')[2]
            }
          } else if (allActive.length == 5) {
            hide = true
          } else {
            for (var j = 0; j < allStacked.length; j++) {
              let fullClassName = d3
                .select(allStacked[j])
                .attr('class')
              allStacked[j].className.baseVal =
                'sideChartRect person_inactive ' +
                fullClassName.split(' ')[2]
            }
          }
        } else {
          for (var j = 0; j < allStacked.length; j++) {
            let fullClassName = d3.select(allStacked[j]).attr('class')
            allStacked[j].className.baseVal =
              'sideChartRect person_active ' +
              fullClassName.split(' ')[2]
          }
        }

        let obj = {
          class: d3.select(this).attr('class'),
          emp: d.data.employee,
          cla: d3
            .select(this)
            .attr('class')
            .split(' ')[1],
          hide,
        }

        sendData(obj)
      })*/

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,0)') //  .attr("transform", "translate(0," + height + ")")
      .call(d3.axisLeft(y)) //   .call(d3.axisBottom(x));
  }

  useEffect(() => {
    loadData('none')
    //showAll()
    let data = employee_list

    d3.selectAll('.SideChartOption').remove()

    d3.select('#titleSelector')
      .selectAll('.SideChartOption')
      .data(getPositions(data))
      .enter()
      .append('option')
      .attr('class', 'SideChartOption')
      .text(function(d) {
        return d
      })
      .attr('value', function(d) {
        return d
      })
  })

  return (
    <React.Fragment>
      <div className='labels'>
        <div className='label'>
          Economy
          <div
            className='labelBox'
            style={{backgroundColor: '#7fc99a'}}
          ></div>
        </div>

        <div className='label'>
          Economy Premium
          <div
            className='labelBox'
            style={{backgroundColor: '#e9d52d'}}
          ></div>
        </div>

        <div className='label'>
          Business
          <div
            className='labelBox'
            style={{backgroundColor: '#eb9638'}}
          ></div>
        </div>

        <div className='label'>
          First Class
          <div
            className='labelBox'
            style={{backgroundColor: '#e01b16'}}
          ></div>
        </div>

        <div className='label'>
          Unknown
          <div
            className='labelBox'
            style={{backgroundColor: '#a05d56'}}
          ></div>
        </div>
      </div>
      <div className='sideChartFilters'>
        {/*<button
          id='sideChartSelectAll'
          className='btn btn-dark'
          onClick={e => showAll(e)}
        >
          Select all
        </button>*/}

        <select
          className='browser-default custom-select'
          id='titleSelector'
          onChange={e => dropdownChange(e)}
        >
          <option value='all'>All</option>
        </select>
      </div>

      <svg id='chart' width='320'></svg>
      <div
        id='sideChartToolTip'
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          padding: 5 + 'px',
          fontSize: 12 + 'px',
        }}
      ></div>
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => {
  let newData =
    state.getPerson.data.length == 0 ? state.getData : state.getPerson
  return {
    data: newData.data,
    filter: state.getFilterOptions.data,
  }
}
export default connect(mapStateToProps)(SideChart)
