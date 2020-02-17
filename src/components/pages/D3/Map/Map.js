import React from 'react'
import Model from '../../../../data/model'

const Map = props => {
  //console.log(props.data)

  function handleMap() {
    Model(1)
  }

  return (
    <div className='map'>
      <p>Map</p>
      <button onClick={handleMap}>Test Map</button>
      <p>{props.data.price}</p>
    </div>
  )
}

export default Map
