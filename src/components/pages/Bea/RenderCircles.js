import React from "react"
import { scaleLinear, max, axisLeft, axisBottom, select } from "d3"

export default class RenderCircles extends React.Component {
    render() {
      let renderCircles = this.props.data.map((coords, i) => (
        <circle
          cx={this.props.scale.x(coords[0])}
          cy={this.props.scale.y(coords[1])}
          r="8"
          style={{ fill: "rgba(25, 158, 199, .9)" }}
          key={i}
        />
      ))
      return <g>{renderCircles}</g>
    }
  }
  
