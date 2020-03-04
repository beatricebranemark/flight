import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'

const TopTen = ({data, filter}) => {
  let organisation_trips = data

  let filtered_trips = []
  let deleted_trips = []
  var unique_departure_cities = []
  var unique_arrival_cities = []
  var unique_cities = []
  let table_objects = []

  if (data.length > 0) {
    organisation_trips.forEach(trip => {
      if (
        trip.travel_type == 'Enkel' &&
        trip.arrival_city.split(',')[0] == 'Stockholm'
      ) {
        deleted_trips.push(trip)
        filtered_trips = filtered_trips
      } else {
        filtered_trips.push(trip)
      }
    })

    // const createArrays = ()=>{
    organisation_trips.forEach(trip => {
      var departure = trip.departure_city.split(',')
      var arrival = trip.arrival_city.split(',')
      var departure_city = departure[0]
      var arrival_city = arrival[0]
      if (unique_departure_cities.includes(departure_city) == false) {
        unique_departure_cities.push(departure_city)
      }
      if (unique_arrival_cities.includes(arrival_city) == false) {
        unique_arrival_cities.push(arrival_city)
      }
    })
    // }

    // const createUnique = () =>{
    if (unique_departure_cities.length > unique_arrival_cities) {
      unique_cities = unique_departure_cities
      for (var i = 0; i < unique_arrival_cities.length; i++) {
        if (
          unique_cities.includes(unique_arrival_cities[i]) == false
        ) {
          unique_cities.push(unique_arrival_cities[i])
        }
      }
    } else {
      for (var i = 0; i < unique_departure_cities.length; i++) {
        unique_cities = unique_arrival_cities

        if (
          unique_cities.includes(unique_departure_cities[i]) == false
        ) {
          unique_cities.push(unique_departure_cities[i])
        }
      }
    }
    // }

    const countOccurrances = city => {
      var count = 0
      for (var i = 0; i < organisation_trips.length; i++) {
        if (
          city == organisation_trips[i].arrival_city.split(',')[0]
        ) {
          count += 1
        }
      }
      return count
    }

    //   const addTableObjects = () =>{
    unique_cities.forEach(city => {
      table_objects.push({city: city, occur: countOccurrances(city)})
    })
    //    }

    function compare(a, b) {
      if (a.occur < b.occur) {
        return 1
      }
      if (a.occur > b.occur) {
        return -1
      }
      return 0
    }

    table_objects.sort(compare)
  }
  //  createArrays();
  // createUnique();
  // addTableObjects()

  ////////CREATE TABLE///////

    return (
      <div className="table" id="topTen">
        <table id="table">
          <thead>
          <tr>
            <th>Destination</th>
            <th>Number of arrivals</th>
          </tr>
        </thead>
        <tbody>
          {table_objects.slice(0, 10).map(obj => (
            <tr>
              <td>{obj.city}</td>
              <td>{obj.occur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  let newData =
    state.getMap.data.length == 0 ? state.getData : state.getMap
  return {
    data: newData.data,
    filter: ownProps.filter,
  }
}

export default connect(mapStateToProps)(TopTen)
