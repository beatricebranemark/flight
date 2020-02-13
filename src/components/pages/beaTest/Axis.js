  import React from 'react';
  import { scaleLinear, max, axisLeft, axisBottom, select } from "d3"
  

  export default class Axis extends React.Component {
    componentDidMount() {
      const node = this.refs[this.props.axis]
      select(node).call(this.props.scale)
    }
  
    render() {
      return (
        <g
          className="main axis date"
          transform={this.props.transform}
          ref={this.props.axis}
        />
      )
    }
  }