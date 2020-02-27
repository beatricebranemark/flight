import React, {useEffect, useRef, useState} from 'react'
import Model from '../../../../data/model'
import {connect} from 'react-redux'
import * as d3 from 'd3'
const SideChart = () => {

const data = require('./data.csv')

    useEffect(() => {
        d3.csv(data).then(d => chart(d))
        function chart(csv) {
        
            var keys = csv.columns.slice(2);
            console.log(keys)
            var year   = [...new Set(csv.map(d => d.Year))]
            var states = [...new Set(csv.map(d => d.State))]
        
            var options = d3.select("#year").selectAll("option")
                .data(year)
            .enter().append("option")
                .text(d => d)
        
            var svg = d3.select("#chart"),
                margin = {top: 35, left: 35, bottom: 0, right: 0},
                width = +svg.attr("width") - margin.left - margin.right,
                height = +svg.attr("height") - margin.top - margin.bottom;
        
            var y = d3.scaleBand()
                .range([margin.left, width - margin.right])
                .padding(0.1)
        
            var x = d3.scaleLinear()
                .rangeRound([height - margin.bottom, margin.top])
        
            var xAxis = svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .attr("class", "x-axis")
        
            var yAxis = svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .attr("class", "y-axis")
        
            var z = d3.scaleOrdinal()
                .range(["steelblue", "darkorange", "lightblue"])
                .domain(keys);
        
            update(d3.select("#year").property("value"), 0)
        
            function update(input, speed) {
        
                var data = csv.filter(f => f.Year == input)
        
                data.forEach(function(d) {
                    d.total = d3.sum(keys, k => +d[k])
                    return d
                })
        
                x.domain([d3.max(data, d => d3.sum(keys, k => +d[k])),0]).nice();
        
                svg.selectAll(".y-axis").transition().duration(speed)
                    .call(d3.axisLeft(y).ticks(null, "s"))
        
                data.sort(d3.select("#sort").property("checked")
                    ? (a, b) => b.total - a.total
                    : (a, b) => states.indexOf(a.State) - states.indexOf(b.State))
        
                y.domain(data.map(d => d.State));
        
                svg.selectAll(".x-axis").transition().duration(speed)
                    .call(d3.axisBottom(x).tickSizeOuter(0))
        
                var group = svg.selectAll("g.layer")
                    .data(d3.stack().keys(keys)(data), d => d.key)
        
                group.exit().remove()
        
                group.enter().append("g")
                    .classed("layer", true)
                    .attr("fill", d => z(d.key));
        
                var bars = svg.selectAll("g.layer").selectAll("rect")
                    .data(d => d, e => e.data.State);
        
                bars.exit().remove()
        
                bars.enter().append("rect")
                    .attr("height", y.bandwidth())
                    .merge(bars)
                .transition().duration(speed)
                    .attr("y", d => y(d.data.State))
                    .attr("x", d => x(d[0]))
                    .attr("width", d => Math.abs(x(d[0]) - x(d[1])))
        
                var text = svg.selectAll(".text")
                    .data(data, d => d.State);
        
                text.exit().remove()
        
                text.enter().append("text")
                    .attr("class", "text")
                    .attr("text-anchor", "middle")
                    .merge(text)
                .transition().duration(speed)
                    .attr("y", d => y(d.State) + y.bandwidth() / 2)
                    .attr("x", d => x(d.total) - 5)
                    .text(d => d.total)
            }
        
            var select = d3.select("#year")
                .on("change", function() {
                    update(this.value, 750)
                })
        
            var checkbox = d3.select("#sort")
                .on("click", function() {
                    update(select.property("value"), 750)
                })
        }
        


      })

    

return <React.Fragment><svg id="chart" width="650" height="400"></svg>
    <select id="year"></select>
    <input type="checkbox" id="sort"/>	
Toggle sort 
    </React.Fragment>



}
export default SideChart