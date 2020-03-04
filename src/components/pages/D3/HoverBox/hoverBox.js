import React, {useEffect, useRef} from 'react'
import './index.css'
import {connect} from 'react-redux'

const HoverBox = ({data}) => {
  

  let travel = data.data
  return travel.length > 0 ? (
    <div className='badge badge-secondary'>
      <span id="hoverText">{travel[0].departure_city}</span>
      <span  id="hoverText"><i class="fas fa-arrow-right"></i></span>
      <span id="hoverText">{travel[0].arrival_city}</span>
    </div>
  ) : (
   null
  )
}
const mapStateToProps = state => {
  return {
    data: state.getHover,
  }
}
export default connect(mapStateToProps)(HoverBox)

/*

departure_time: "01/14/2017 10:10:00"
arrival_time: "01/16/2017 23:25:00"
year: "2017"
org: "EES-ELEKTRO- OCH SYSTEMTEKNIK"
price: "6209"
path: "ARN/LHR/PHX/LAX/LHR/ARN"
ticket_type: "Ekonomiklass"
geographic_type: "Utrikes"
departure_code: "ARN"
departure_city: "Stockholm, Sverige (ARN-Arlanda)"
departure_country: "Sverige"
arrival_code: "LAX"
arrival_city: "Los Angeles, Kalifornien, USA (LAX-Los Angeles Intl.)"
arrival_country: "USA"
travel_type: "Tur och retur"
employee: "p2085"
birth_year: "1976"
gender: "Man"
school: "ECS"
org_code: "JRQ"
org_name: "MIKRO- OCH NANOSYSTEM"
position_code: "02"
position: "PROFESSOR"
salary: "78150"

*/
