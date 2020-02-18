import React from "react"
import { scaleLinear, max, axisLeft, axisBottom, select } from "d3"
import RenderCircles from "./RenderCircles"
import TrendLine from "./TrendLine"
import Axis from "./Axis"

export default class ScatterPlot extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const margin = { top: 20, right: 15, bottom: 60, left: 60 }
    const width = 800 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom
    const data = this.props.data

    const x = scaleLinear()
      .domain([
        0,
        max(data, function(d) {
          return d[0]
        })
      ])
      .range([0, width])

    const y = scaleLinear()
      .domain([
        0,
        max(data, function(d) {
          return d[1]
        })
      ])
      .range([height, 0])

    return (
      <div>
        <h3> Scatter Plot with Trend Line </h3>
        <svg
          width={width + margin.right + margin.left}
          height={height + margin.top + margin.bottom}
          className="chart"
        >
          <g
            transform={"translate(" + margin.left + "," + margin.top + ")"}
            width={width}
            height={height}
            className="main"
          >
            <RenderCircles data={data} scale={{ x, y }} />
            <TrendLine data={data} scale={{ x, y }} />
            <Axis
              axis="x"
              transform={"translate(0," + height + ")"}
              scale={axisBottom().scale(x)}
            />
            <Axis
              axis="y"
              transform="translate(0,0)"
              scale={axisLeft().scale(y)}
            />
          </g>
        </svg>
      </div>
    )
  }
}