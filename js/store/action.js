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

export function setUserId(payload) {
  return {
    type: 'SET_USER_ID',
    payload
  }
}