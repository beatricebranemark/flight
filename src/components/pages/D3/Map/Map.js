import React, {useRef, useEffect} from 'react'
import Model from '../../../../data/model'
import {connect} from 'react-redux'
import * as d3 from 'd3'
import './index.css'
import store from '../../../../reducers/'
const Map = ({data, filter}) => {
  let d3Container = useRef(null)
  let countries = require('./csvjson.json')

  useEffect(() => {
    if (data.length > 0) {
      d3.select(d3Container.current)
        .selectAll('*')
        .remove()

      let svg = d3.select(d3Container.current)

      // The svg
      // Map and projection
      let projection = d3
        .geoMercator()
        .scale(150)
        .translate([1200 / 2, (600 / 2) * 1.5])

      // Change these data to see ho the great circle reacts*/

      var scale = d3
        .scaleSqrt()
        .domain([1, 10])
        .range([2, 10])
      // A path generator
      let path = d3.geoPath().projection(projection)

      let pathDot = d3
        .geoPath()
        .projection(projection)
        .pointRadius(function(d) {
          console.log(scale(d.scale))
          return scale(d.scale)
        })

      let g = svg.append('g')

      const zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on('zoom', zoomed)

      svg.call(zoom)

      function zoomed() {
        g.selectAll('path') // To prevent stroke width from scaling
          .attr('transform', d3.event.transform)
        svg
          .selectAll('.line')
          .attr('transform', d3.event.transform)
          .style('stroke-width', 1 / d3.event.transform.k)

        svg
          .selectAll('.dot')
          .attr('transform', d3.event.transform)
          .style('stroke-width', 0.1 / d3.event.transform.k)
      }
      function chosenCountry(country) {
        for (let i = 0; i < countries.length; i++) {
          if (countries[i].english == country) {
            filter.map.chosenCountry = countries[i].swedish
            break
          }
        }
        filter.map.filter = true
        Model(filter)
      }

      fetch(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
      )
        .then(response => {
          return response.json()
        })
        .then(map => {
          let groupByCountry = d3
            .nest()
            .key(function(d) {
              return [d.arrival_country, d.departure_country]
            })
            .entries(data)

          function colorMap(d) {
            let country = groupByCountry.filter(country => {
              let res = country.key.split(',')
              let swedish
              for (let i = 0; i < countries.length; i++) {
                if (countries[i].english == d.properties.name) {
                  swedish = countries[i].swedish
                }
              }
              if (res[0] == swedish) {
                return res
              }
              if (res[1] == swedish) {
                return res
              }
            })
            return country
          }

          // Draw the map
          g.selectAll('path')
            .data(map.features)
            .enter()
            .append('path')
            .attr('fill', function(d) {
              let country = colorMap(d)
              return country.length > 0
                ? '#83be83' //rgba(112,128,144, .2)
                : '#b8b8b8'
            }) // //return color(populationById[d.id])
            .attr('d', d3.geoPath().projection(projection))
            .on('mouseover', function(d) {
              d3.select(this).attr('fill', 'rgba(112,128,144, 1)')
              let xPosition = d3.mouse(this)[0] - 30
              let yPosition = d3.mouse(this)[1] - 50
              tooltip.attr(
                'transform',
                'translate(' + xPosition + ',' + yPosition + ')'
              )
              tooltip.select('text').text(d.properties.name)
              tooltip.style('display', 'block')
            })
            .on('mouseout', function(d) {
              let country = colorMap(d)
              d3.select(this).attr(
                'fill',
                country.length > 0 ? '#83be83' : '#b8b8b8'
              )
            })
            .on('click', function(d) {
              chosenCountry(d.properties.name)
            })
            .style('stroke', '#fff')
            .style('stroke-width', 0.2)

          // Create data: coordinates of start and end
          data.map(function(flight) {
            try {
              let coordinates = [
                [
                  parseInt(flight.departure_coord[1]),
                  parseInt(flight.departure_coord[0]),
                ],
                [
                  parseInt(flight.arrival_coord[1]),
                  parseInt(flight.arrival_coord[0]),
                ],
              ]
              let link = {
                type: 'LineString',
                coordinates: coordinates,
              }

              let link2 = {
                type: 'Point',
                coordinates: coordinates[1],
                scale: 1,
              }
              // Add the path
              svg
                .append('path')
                .attr('d', path(link))
                .attr('class', 'line')
                .style('fill', 'none')
                .style('stroke', function(d) {
                  if (flight.travel_type === 'Enkel') {
                    return 'blue'
                  } else if (flight.travel_type === 'Tur och retur') {
                    return 'orange'
                  } else if (
                    flight.travel_type === 'Flera destinationer'
                  ) {
                    return 'red'
                  }
                })
                .style('opacity', 0.5)
                .style('stroke-width', 2)

              svg
                .append('path')
                .attr('d', pathDot(link2))
                .attr('class', 'dot')
                .style('fill', 'red')
                .style('stroke', 'purple')
                .style('opacity', 1)
                .style('stroke-width', 0.5)
                .on('mouseover', function() {
                  d3.select(this).style('fill', 'blue')
                  store.dispatch({
                    type: 'SET_HOVER_DATA',
                    payload: [flight],
                  })
                })
                .on('mouseout', function() {
                  d3.select(this).style('fill', 'red')
                })
            } catch (TypeError) {
              console.log(TypeError)
            }
          })

          let tooltip = svg
            .append('g')
            .attr('class', 'tooltip')
            .style('display', 'none')

          tooltip
            .append('rect')
            .attr('width', 120)
            .attr('height', 30)
            .attr('fill', 'white')
            .style('opacity', 1)

          tooltip
            .append('text')
            .attr('x', 60)
            .attr('dy', '1.2em')
            .style('text-anchor', 'middle')
            .attr('font-size', '20px')
            .attr('font-weight', 'bold')
        })
    }
  })
  return (
    <svg
      width={1100}
      height={700}
      ref={d3Container}
      className='map'
    ></svg>
  )
}

const mapStateToProps = (state, ownProps) => {
  let newData =
    state.getMap.data.length == 0 ? state.getData : state.getMap
  console.log(ownProps)
  return {
    data: newData.data,
    filter: ownProps.filter,
  }
}
export default connect(mapStateToProps)(Map)
