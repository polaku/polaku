export function fetchDataEvent() {
  return {
    type: 'FETCH_DATA_EVENT'
  }
}

export function fetchDataMyEvent() {
  return {
    type: 'FETCH_DATA_MY_EVENT'
  }
}

export function setDataUser(payload) {
  return {
    type: 'SET_DATA_USER',
    payload
  }
}
