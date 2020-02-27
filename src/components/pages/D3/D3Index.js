import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import PersonList from './PersonList/PersonList'
import store from '../../../reducers'
import NavBar from './NavBar/NavBar'
import HomeScreen from './HomeScreen'
import {Provider} from 'react-redux'
import Filter from './../../Filter'

const D3Index = () => {
  const [data, setData] = useState(store.getState().getData.data)
  const filter = Filter()
  store.subscribe(() => {
    setData(store.getState().getData.data)
  })

  return (
    <div className='homepage'>
      <div className='homepage__heading'>
        <h1 className='homepage__heading__title'>Flight</h1>
      </div>

      <Provider store={store}>
        <NavBar data={data} />
        {data.length == 0 ? (
          <HomeScreen />
        ) : (
          <div className='row'>
            <div className='col-sm-8'>
              <BarChart filter={filter} />
              <Map filter={filter} />
            </div>
            <div className='col-sm-4'>
              <PersonList filter={filter} />
            </div>
          </div>
        )}
      </Provider>
    </div>
  )
}

export default D3Index
