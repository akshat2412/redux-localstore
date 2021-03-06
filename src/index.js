const isNull = value => value === 'undefined' || value === null

const hasSameProps = (obj1, obj2) =>
  Object.keys(obj1).every(prop => obj2.hasOwnProperty(prop))

const getLocalStore = () => {
  try {
    return JSON.parse(window.localStorage.getItem('reduxStore'))
  } catch (e) {
    return {}
  }
}

const setLocalStore = store => {
  try {
    return window.localStorage.setItem(
      'reduxStore',
      JSON.stringify(store.getState())
    )
  } catch (e) {
    return {}
  }
}

export const resetLocalStore = () => localStorage.removeItem('reduxStore')

export const getState = () => (!isNull(getLocalStore()) ? getLocalStore() : {})

export const defineState = defaultState => reducer => {
  if (getState().hasOwnProperty(reducer)) {
    const localReducer = getState()[reducer]
    return hasSameProps(defaultState, localReducer)
      ? localReducer
      : defaultState
  }
  return defaultState
}

export default store => store.subscribe(() => setLocalStore(store))
