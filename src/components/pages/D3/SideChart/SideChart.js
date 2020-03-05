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

  var filterByEmployee = []

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
    organisation_trips.forEach(trip => {
      if (trip.employee == clickedBar.emp) {
        if (clickedBar.cla == 'person_inactive') {
          filterByEmployee.push(trip)
        } else {
          const index = filterByEmployee.indexOf(trip)
          filterByEmployee.splice(index, 1)
        }
      }
    })
    filter.personList.filter = true
    filter.personList.employees = filterByEmployee
    Model(filter)
  }

  const showAll = () => {
    filterByEmployee = []

    var bars = document.getElementsByClassName('sideChartRect')
    for (var i = 0; i < bars.length; i++) {
      let fullClassName = bars[i].className.baseVal.split(' ')
      bars[i].className.baseVal =
        'sideChartRect person_active ' + fullClassName[2]
    }
  }

  const getPositions = employees => {
    var positions = []
    employees.forEach(employee => {
      if (positions.includes(employee.position) == false)
        positions.push(employee.position)
    })
    return positions
  }

  useEffect(() => {
    let data = employee_list
    d3.select('svg')
      .selectAll('*')
      .remove()
    var svg = d3.select('#chart'),
      margin = {top: 20, right: 20, bottom: 30, left: 42},
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') + margin.top,
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

    /*
d3.select('.labels')
		.append("select")
		.attr("id", "cityselector")
		.selectAll("option")
		.data(getPositions(data))
		.enter().append("option")
		.text(function(d) { return d; })
		.attr("value", function (d, i) {
      return i;
    });
    
*/
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
        return 'sideChartRect person_active ' + d.data.employee
      })
      .on('mouseover', function(d) {
        divTooltip.style('left', d3.event.pageX + 10 + 'px')
        divTooltip.style('top', d3.event.pageY - 150 + 'px')
        divTooltip.style('display', 'block')
        divTooltip.style('background-color', 'white')
        divTooltip.html(
          d.data.position + ' has traveld ' + d.data.total + ' times'
        )
      })
      .on('mouseout', function(d) {
        divTooltip.style('display', 'none')
      })
      .on('click', function(d) {
        var allStacked = document.getElementsByClassName(
          d.data.employee
        )
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
              /*
            for(var j = 0; j < allStacked.length; j++){
              let fullClassName = d3.select(allStacked[j]).attr('class')
              allStacked[j].className.baseVal = 'sideChartRect person_inactive '+fullClassName.split(' ')[2]
            }
          }
          */
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
            showAll()
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

        //console.log(allStacked[0].className.baseVal)

        /*
        d3.select(this).attr('class') == 'sideChartRect person_active '+ d.data.employee
          ? d3.selectAll(.).attr('class', function(d){ return 'sideChartRect person_inactive '+d.data.employee})
          : d3.select(this).attr('class', function(d){ return 'sideChartRect person_active '+d.data.employee})
        */
        let obj = {
          class: d3.select(this).attr('class'),
          emp: d.data.employee,
          cla: d3
            .select(this)
            .attr('class')
            .split(' ')[1],
        }

        sendData(obj)
      })

    /*bar.append("g").selectAll("text")
      .data(function(d) { return d; })
      .enter().append("text")
        .attr("class", "totalText")
        .attr("y", function(d) { return y(d.data.employee); })	
       .attr('dy', y.bandwidth() / 1.4)     //.attr("x", function(d) { return x(d.data.State); })
        .attr("x", function(d) { return x(d.data.total+2); })
        .text(function(d){return d.data.total} )
        .attr('fill', 'white');						    //.attr("width", x.bandwidth());	*/

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,0)') //  .attr("transform", "translate(0," + height + ")")
      .call(d3.axisLeft(y)) //   .call(d3.axisBottom(x));

    /*g.append("g")
      .attr("class", "axis")
	  .attr("transform", "translate(0,"+data.length*20+")")				// New line
      .call(d3.axisBottom(x).ticks(null, "s"))					//  .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("y", 2)												//     .attr("y", 2)
      .attr("x", x(x.ticks().pop()) + 0.5) 						//     .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")										//     .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("color", "#ffffff")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
	  .attr("transform", "translate("+ (-width) +",-10)");   	// Newline

  /*var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .attr("color", "white")
      .attr("class", "ticketType")

    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	 //.attr("transform", function(d, i) { return "translate(-50," + (data.length*10 + i * 20) + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      /*.attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")*/
    /*
      .attr("color", "#ffffff")
      .text(function(d) { return d; });
    */
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

        <button
          id='legendButton'
          className='btn btn-dark'
          onClick={e => showAll(e)}
        >
          Select all
        </button>
      </div>
      <svg
        id='chart'
        width='320'
        height={employee_list.length * 22 + 20}
      ></svg>
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
    filter: ownProps.filter,
  }
}
export default connect(mapStateToProps)(SideChart)
