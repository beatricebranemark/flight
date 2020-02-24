export default function getFilter() {
  let filter = {
    barChart: {
      filter: false,
      employees: [],
    },
    map: {
      filter: false,
      chosenCountry: '',
    },
    personList: {
      filter: false,
      employees: [],
    },
  }
  return filter
}
