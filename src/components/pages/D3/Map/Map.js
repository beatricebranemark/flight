import React, {useRef, useEffect} from 'react'
import Model from '../../../../data/model'
import * as d3 from 'd3'
import './index.css'

const Map = props => {
  let d3Container = useRef(null)
  let countries = require('./csvjson.json')
  useEffect(() => {
    if (props.data.length > 0) {
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

      // A path generator
      let path = d3.geoPath().projection(projection)

      fetch(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
      )
        .then(response => {
          return response.json()
        })
        .then(map => {
          console.log(map)

          let groupByCountry = d3
            .nest()
            .key(function(d) {
              console.log(d)
              return [d.arrival_country, d.departure_country]
            })
            .entries(props.data[0].values)
          console.log(groupByCountry)

          /*data.features.forEach(function(d) {
            d.population = populationById[d.id]
          })*/

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
          svg
            .append('g')
            .selectAll('path')
            .data(map.features)
            .enter()
            .append('path')
            .attr('fill', function(d) {
              let country = colorMap(d)
              return country.length > 0 ? 'rgba(112,128,144, .2)' : '#b8b8b8'
            }) // //return color(populationById[d.id])
            .attr('d', d3.geoPath().projection(projection))
            .on('mouseover', function(d) {
              d3.select(this).attr('fill', 'rgba(112,128,144, 1)')
              console.log(d.properties.name)
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
                country.length > 0 ? 'rgba(112,128,144, .2)' : '#b8b8b8'
              )
            })
            .style('stroke', '#fff')
            .style('stroke-width', 0)

          // Create data: coordinates of start and end
          props.data[0].values.map(function(flight) {
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
              // Add the path
              svg
                .append('path')
                .attr('d', path(link))
                .style('fill', 'none')
                .style('stroke', 'purple')
                .style('opacity', 0.5)
                .style('stroke-width', 1.2)
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
  return <svg width={1100} height={700} ref={d3Container} className="map"></svg>
}

export default Map
