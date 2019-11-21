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

export function fetchDataMyTask(payload) {
  return {
    type: 'FETCH_DATA_MY_TASK',
    payload
  }
}

export function fetchDataMyContactUs() {
  return {
    type: 'FETCH_DATA_MY_CONTACT_US'
  }
}

export function fetchDataAllUser() {
  return {
    type: 'FETCH_DATA_ALL_USER'
  }
}
