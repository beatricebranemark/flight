import React from 'react'
import {Icon, Image, Statistic} from 'semantic-ui-react'
import Model from '../../../../data/model'
import {connect} from 'react-redux'

const TotalCounts = (data, props) => {
  return (
    <>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>
            <Icon name='plane' />
            {data.data.length}
          </Statistic.Value>
          <Statistic.Label>Flights (one-way)</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  let newData
  if (state.getSelectedOrg.data.length === 0) {
    if (state.getMap.data.length > 0) {
      newData = state.getMap
    } else if (state.getSelectedSchool.data.length > 0) {
      newData = state.getSelectedSchool
    } else {
      newData = state.getData
    }
  } else {
    newData =
      state.getMap.data.length > 0 ? state.getMap : state.getData
  }
  return {
    data: newData.data,
  }
}

export default connect(mapStateToProps)(TotalCounts)
