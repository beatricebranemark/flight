import Data from '../data/data'
import store from '../reducers'

export default function Model(filter) {
  const data = Data()
  store.dispatch({
    type: 'SET_DATA',
    payload: data[filter],
  })
}
