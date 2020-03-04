const airportData = require('./../../../data/airports.json')
export default function countTrip(organisation_trips) {
  let data_list = [
    {month: 'january', 2017: 0, 2018: 0, 2019: 0},
    {month: 'february', 2017: 0, 2018: 0, 2019: 0},
    {month: 'march', 2017: 0, 2018: 0, 2019: 0},
    {month: 'april', 2017: 0, 2018: 0, 2019: 0},
    {month: 'may', 2017: 0, 2018: 0, 2019: 0},
    {month: 'june', 2017: 0, 2018: 0, 2019: 0},
    {month: 'july', 2017: 0, 2018: 0, 2019: 0},
    {month: 'august', 2017: 0, 2018: 0, 2019: 0},
    {month: 'september', 2017: 0, 2018: 0, 2019: 0},
    {month: 'october', 2017: 0, 2018: 0, 2019: 0},
    {month: 'november', 2017: 0, 2018: 0, 2019: 0},
    {month: 'december', 2017: 0, 2018: 0, 2019: 0},
  ]

  organisation_trips.forEach(trip => {
    let date = trip.departure_time
    date = date.split('-')
    for (let j = 17; j < 20; j++) {
      if (date[0].slice(2, 4) === j.toString()) {
        for (let i = 0; i < 13; i++) {
          if (date[1] == i + 1) {
            if (trip.travel_type === 'Enkel') {
              data_list[i][20 + j.toString()] += 1
            } else if (trip.travel_type === 'Tur och retur') {
              data_list[i][20 + j.toString()] += 2
            } else {
              let path = trip.path.split('/')
              let firstDestination = path[0]
              let lastDestination = path[path.length - 1]
              airportData.forEach(airport => {
                if (airport.IATA === firstDestination) {
                  firstDestination = airport.City
                }
                if (airport.IATA === lastDestination) {
                  lastDestination = airport.City
                }
              })
              firstDestination === lastDestination
                ? (data_list[i][20 + j.toString()] += 2)
                : (data_list[i][20 + j.toString()] += 1)
            }
          }
        }
      }
    }
  })
  return data_list
}
