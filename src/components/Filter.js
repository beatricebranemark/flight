/*export default function getFilter() {
  let filter = {
    barChart: {
      filter: false,
    },
    map: {
      filter: false,
    },
    personList: {
      filter: false,
    },
  }
  return filter
}*/

class Filter {
  constructor() {
    this.filterBarchart = false
    this.filterMap = false
    this.filterPersonList = false
  }
}

let Filter = new Filter()
export default Filter
