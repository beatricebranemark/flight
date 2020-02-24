import React, {useState} from 'react'
import BarChart from './BarChart/BarChart'
import Map from './Map/Map'
import PersonList from './PersonList/PersonList'
import store from '../../../reducers'
import NavBar from './NavBar/NavBar'
import HomeScreen from './HomeScreen'
import {Provider} from 'react-redux'

const D3Index = () => {
  const [data, setData] = useState(store.getState().getData.data)

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
              <BarChart />
              <Map />
            </div>
            <div className='col-sm-4'>
              <PersonList />
            </div>
          </div>
        )}
      </Provider>
    </div>
  )
}

export default D3Index
