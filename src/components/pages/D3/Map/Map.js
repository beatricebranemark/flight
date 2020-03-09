import React, {useRef, useEffect, useState} from 'react'
import Model from '../../../../data/model'
import {connect} from 'react-redux'
import * as d3 from 'd3'
import './index.css'

const Map = ({data, filter}) => {
  let d3Container = useRef(null)
  const legendContainer = useRef(null)
  let countries = require('./csvjson.json')

  const [showStockholm, setShowStockholm] = useState(true)
  const [showText, setShowText] = useState('Hide')

  var data_no_stockholm = []
  data.forEach(trip => {
    var arrival = trip.arrival_city.split(',')
    var arrival_city = arrival[0]
    if (arrival_city != 'Stockholm') {
      data_no_stockholm.push(trip)
    }
  })

  const clickedButton = () => {
    if (showStockholm == true) {
      setShowStockholm(false)
      setShowText('Show')
    }
    if (showStockholm == false) {
      setShowStockholm(true)
      setShowText('Hide')
    }
  }
  useEffect(() => {
    if (data.length > 0) {
      d3.select(d3Container.current)
        .selectAll('*')
        .remove()

      let svg = d3.select(d3Container.current)

      var data_show
      if (showStockholm == true) {
        data_show = data
      }
      if (showStockholm == false) {
        data_show = data_no_stockholm
      }
      let countedData = d3
        .nest()
        .key(function(d) {
          return d.arrival_city
        })
        .entries(data_show)

      let min = d3.min(
        countedData.map(value => {
          return value.values.length
        })
      )

      let max = d3.max(
        countedData.map(value => {
          return value.values.length
        })
      )

      // The svg
      // Map and projection
      let projection = d3
        .geoMercator()
        .scale(200)
        .translate([1200 / 2, (600 / 2) * 1.5])

      // Change these data to see ho the great circle reacts*/

      var scale = d3
        .scaleSqrt()
        .domain([min, max])
        .range([2, 10])
      // A path generator
      let path = d3.geoPath().projection(projection)

      /*let pathDot = d3
        .geoPath()
        .projection(projection)
        .pointRadius(function(d) {
          return scale(d.scale)
        })*/
      /* .pointRadius(function(d) {
          let scaling = scale(d.scale)
          return scaling
        })*/

      let g = svg.append('g')

      const zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on('zoom', zoomed)

      svg.call(zoom)

      function zoomed() {
        g.attr('transform', 'translate(' + d3.event.transform.k + ')')

        g.selectAll('path') // To prevent stroke width from scaling
          .attr('transform', d3.event.transform)

        svg
          .selectAll('.line')
          .attr('transform', d3.event.transform)
          .style('stroke-width', 2 / d3.event.transform.k)

        svg
          .selectAll('circle') // To prevent stroke width from scaling
          .attr('transform', d3.event.transform)
          .attr('r', function(d) {
            let newScale = Math.abs(
              scale(d.scale / (d3.event.transform.k + 1))
            )
            return newScale
          })
      }

      d3.select('#zoom_in').on('click', function() {
        // Smooth zooming
        zoom.scaleBy(svg.transition().duration(750), 1.3)
      })

      d3.select('#zoom_out').on('click', function() {
        // Ordinal zooming
        zoom.scaleBy(svg, 1 / 1.3)
      })

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
                try {
                  if (countries[i].english == d.properties.name) {
                    swedish = countries[i].swedish
                  }
                } catch (TypeError) {
                  console.log(TypeError)
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
            .style('fill', function(d) {
              let country = colorMap(d)
              return country.length > 0
                ? '#7B92A3' //rgba(112,128,144, .2) rgb(113, 191, 126)
                : '#D8D6DB'
            }) // //return color(populationById[d.id])
            .attr('d', d3.geoPath().projection(projection))
            .on('mouseover', function(d) {
              d3.select(this).style('fill', '#9E9DA0')
              let xPosition = d3.mouse(this)[0] - 30
              let yPosition = d3.mouse(this)[1] - 50
              try {
                /*tooltip.attr(
                  'transform',
                  'translate(' + xPosition + ',' + yPosition + ')'
                )*/
                tooltip.select('text').text(d.properties.name)
                tooltip.style('display', 'block')
              } catch (TypeError) {
                console.log(TypeError)
              }
            })
            .on('mouseout', function(d) {
              let country = colorMap(d)
              d3.select(this).style(
                'fill',
                country.length > 0 ? '#7B92A3' : '#D8D6DB'
              )
            })

            .style('stroke', '#fff')
            .style('stroke-width', 0.2)
        })
      let dotLinks = []
      let pathLinks = []
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
            arrival_code: flight.arrival_code,
            departure_code: flight.departure_code,
          }
          pathLinks.push(link)
          let cityCounts = countedData.filter(city => {
            return city.key === flight.arrival_city
          })
          let link2 = {
            type: 'Point',
            coordinates: coordinates[1],
            scale: cityCounts[0].values.length,
            arrival_code: flight.arrival_code,
            departure_code: flight.departure_code,
            departure_city: flight.departure_city,
            arrival_city: flight.arrival_city,
          }
          dotLinks.push(link2)
        } catch (TypeError) {
          console.log(TypeError)
        }
      })
      // Add the path
      svg
        .selectAll('path')
        .data(pathLinks)
        .enter()
        .append('path')
        .attr('d', function(d) {
          return path(d)
        })
        .attr('class', function(d) {
          return 'line' + ' ' + d.arrival_code
        })
        .style('fill', 'none')
        .style('stroke', 'none')
        .style('opacity', 0.5)
        .style('stroke-width', 2)

      svg
        .selectAll('circle')
        .data(dotLinks)
        .enter()
        .append('circle')

        .attr('cx', function(d) {
          return projection(d.coordinates)[0]
        })
        .attr('cy', function(d) {
          return projection(d.coordinates)[1]
        })
        .style('r', function(d) {
          return scale(d.scale)
        })
        .attr('class', function(d) {
          return 'dot' + ' ' + d.arrival_code + '1'
        })
        .style('fill', function(d) {
          return 'red'
        })
        .style('opacity', 1)
        .style('stroke-width', 0.5)
        .on('mouseover', function(d) {
          d3.select(this).style('fill', 'yellow ')
          d3.selectAll('.' + d.arrival_code).style(
            'stroke',
            'yellow  '
          )
          let xPosition = d3.mouse(this)[0] - 60
          let yPosition = d3.mouse(this)[1] - 100
          try {
            /*tooltip.attr(
              'transform',
              'translate(' + xPosition + ',' + yPosition + ')'
            )*/
            tooltip
              .select('text')
              .text(
                d.arrival_city + ', ' + d.scale + ' flights to here'
              )
            tooltip.style('display', 'block')
          } catch (TypeError) {
            console.log(TypeError)
          }
        })
        .on('mouseout', function(d) {
          d3.select(this).style('fill', 'red')
          d3.selectAll('.' + d.arrival_code).style('stroke', 'none')
        })

      let tooltip = svg
        .append('g')
        .attr('class', 'tooltip')
        .style('display', 'none')
        .attr('transform', 'translate(' + 20 + ',' + 10 + ')')

      /*tooltip
        .append('rect')
        .attr('height', 40)
        .attr('width', '100%')
        .attr('fill', 'white')
        .style('border-radius', 10)
        .style('opacity', 1)*/

      tooltip
        .append('text')
        .attr('x', 10)
        .attr('dy', '1.2em')
        .style('text-anchor', 'left')
        .attr('font-size', '24px')
        .attr('font-weight', 'bold')
        .style('fill', 'white')
        .style('text-shadow', '2px 2px')
    }
  })
  return (
    <React.Fragment>
      <button
        id='showStockholmButton'
        className='btn btn-light m-2'
        onClick={clickedButton}
      >
        {showText} Stockholm
      </button>

      <button className='btn btn-light m-2' id='zoom_in'>
        <i className='fas fa-plus'></i>
      </button>
      <button className='btn btn-light m-2' id='zoom_out'>
        <i className='fas fa-minus'></i>
      </button>

      <svg
        id='svgMap'
        width={1068}
        height={700}
        ref={d3Container}
        className='map'
        style={{backgroundColor: '#333940'}}
      ></svg>
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => {
  let newData =
    state.getMap.data.length == 0 ? state.getData : state.getMap
  return {
    data: newData.data,
    filter: state.getFilterOptions.data,
  }
}
export default connect(mapStateToProps)(Map)
