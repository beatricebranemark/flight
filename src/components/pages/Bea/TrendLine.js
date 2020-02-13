import React from 'react';
import { scaleLinear, max, axisLeft, axisBottom, select } from "d3"

function sortNumber(a, b) {
    return a - b
  }
  
function linearRegression(y, x) {
    var lr = {}
    var n = y.length
    var sum_x = 0
    var sum_y = 0
    var sum_xy = 0
    var sum_xx = 0
    var sum_yy = 0

    for (var i = 0; i < y.length; i++) {
        sum_x += x[i]
        sum_y += y[i]
        sum_xy += x[i] * y[i]
        sum_xx += x[i] * x[i]
        sum_yy += y[i] * y[i]
    }

    lr["slope"] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x)
    lr["intercept"] = (sum_y - lr.slope * sum_x) / n
    lr["r2"] = Math.pow(
        (n * sum_xy - sum_x * sum_y) /
        Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)),
        2
    )

    return x => {
        return lr.slope * x + lr.intercept
    }
}

export default class TrendLine extends React.Component {
    render() {
      let x_coords = this.props.data.map(n => {
        return n[0]
      })
      let y_coords = this.props.data.map(n => {
        return n[1]
      })
      const trendline = linearRegression(y_coords, x_coords)
  
      // Lowest and highest x coordinates to draw a plot line
      const lowest_x = x_coords.sort(sortNumber)[0]
      const hightest_x = x_coords.sort(sortNumber)[x_coords.length - 1]
      const trendline_points = [
        [lowest_x, trendline(lowest_x)],
        [hightest_x, trendline(hightest_x)]
      ]
  
      return (
        <line
          x1={this.props.scale.x(trendline_points[0][0])}
          y1={this.props.scale.y(trendline_points[0][1])}
          x2={this.props.scale.x(trendline_points[1][0])}
          y2={this.props.scale.y(trendline_points[1][1])}
          style={{ stroke: "black", strokeWidth: "2" }}
        />
      )
    }
  }