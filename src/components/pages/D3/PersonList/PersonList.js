import React, {useEffect, useRef} from 'react'
import Model from '../../../../data/model'
import * as d3 from 'd3'

const PersonList = props => {
  console.log(props.data)

  // Data
  const dataset = props.data
  const d3Container = useRef(null)
  console.log(dataset)

  // Dimensions
  const totalW = 600
  const totalH = 300
  const margin = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  }
  const w = totalW - margin.left - margin.right
  const h = totalH - margin.top - margin.bottom

  // Scales
  useEffect(() => {
    //drawChart()
    let xScale = d3.scaleLinear().domain([0, 10])

    let yScale = d3
      .scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([h, 0])

    // DOM
    let svg = d3.select(d3Container.current)

    let g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('id', 'bar-g')

    // Data Bars
    g.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d.org))
      .attr('width', 10)
      .attr('height', (d, i) => i)
      .attr('fill', d => `rgb(150,0,0)`)
      .attr('rx', 10)
  })
  // Labels are added the same way as above...

  return <svg width={totalW} height={totalH} ref={d3Container}></svg>
}

export default PersonList
