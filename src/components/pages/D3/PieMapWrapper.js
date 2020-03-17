import React, {useState} from 'react'
import Map from './Map/Map'
import PieChart from './PieChart/PieChart'
import Filter from './../../Filter'

const PieMapWrapper = props => {
  const filter = Filter()
  const [view, setView] = useState('map')
  console.log(props.toggleBar)
  return (
    <div className="row" id={props.toggleBar}>
      <div id='viewButtons'>
        <button
          onClick={() => setView('map')}
          id={'mapViewButton'}
          type='button'
          className='btn btn-dark'
        >
          <i className='fas fa-globe-americas'></i>
        </button>
        <button
          onClick={() => setView('pie')}
          id={'pieViewButton'}
          type='button'
          className='btn btn-dark  mapPieActive'
        >
          <i className='fas fa-chart-pie'></i>
        </button>
      </div>

      {view === 'map' ? (
        <Map filter={filter} />
      ) : (
        <PieChart pieText={props.pieText} id='pieChart' />
      )}
    </div>
  )
}

export default PieMapWrapper
