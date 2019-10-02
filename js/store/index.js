import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../config/API';

const api = store => next => async action => {
  let token = await AsyncStorage.getItem('token')

  if (action.type === 'FETCH_DATA_EVENT') {

    next({
      type: 'FETCH_DATA_LOADING'
    })

    let getData, startDate, endDate, dayNow, date, month, years
    let today = [], tomorrow = [], thisWeek = [], thisMonth = []

    dayNow = new Date().getDay()
    date = new Date().getDate()
    month = new Date().getMonth() + 1
    years = new Date().getFullYear()

    try {
      getData = await API.get('/events',
        {
          headers: { token }
        })

      getData.data.data.forEach(el => {
        startDate = el.start_date.split('-')
        endDate = el.end_date.split('-')

        if ((Number(startDate[2]) === date && Number(startDate[1]) === month && Number(startDate[0]) === years) ||
          ((Number(startDate[2]) < date && Number(startDate[1]) <= month && Number(startDate[0]) <= years) && (Number(endDate[2]) > date && Number(endDate[1]) >= month && Number(startDate[0]) <= years))) {
          today.push(el)
        }
        if ((Number(startDate[2]) === date + 1 && Number(startDate[1]) === month && Number(startDate[0]) === years) ||
          ((Number(startDate[2]) < date + 1 && Number(startDate[1]) <= month && Number(startDate[0]) <= years) && Number((endDate[2]) > date + 1 && Number(endDate[1]) >= month && Number(startDate[0]) <= years)) || (Number(startDate[2]) <= date + 1 && Number(endDate[2]) >= date + 1 && Number(endDate[1]) === month && Number(endDate[0]) === years) ) {
          tomorrow.push(el)
        }
        if ((Number(startDate[2]) >= date && Number(startDate[1]) <= month && Number(startDate[0]) <= years) && Number((endDate[2]) >= date && Number(endDate[1]) >= month && Number(startDate[0]) <= years)) {
          thisMonth.push(el)
        }
        if (Number(startDate[2]) >= date && Number(startDate[2] <= (date + (7 - dayNow))) && Number(startDate[1]) === month && Number(startDate[0]) === years) {
          thisWeek.push(el)
        }
      })

      next({
        type: 'FETCH_DATA_EVENT_SUCCESS',
        payload: {
          dataAllEvent: getData.data.data,
          eventsToday: today,
          eventsTomorrow: tomorrow,
          eventsThisWeek: thisWeek,
          eventsThisMonth: thisMonth
        }
      })

    } catch (err) {
      next({
        type: 'FETCH_DATA_EVENT_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_MY_EVENT') {
    next({
      type: 'FETCH_DATA_LOADING'
    })

    let startDate, endDate, date, month, years
    let all = [], mengikuti = [], diajukan = [], ditolak = []

    date = new Date().getDate()
    month = new Date().getMonth() + 1
    years = new Date().getFullYear()

    try {
      getData = await API.get('/events/myevents',
        {
          headers: { token }
        })

      getData.data.data.forEach(el => {
        startDate = el.start_date.split('-')
        endDate = el.end_date.split('-')
        if (Number(startDate[2]) >= date && Number(startDate[1]) >= month && Number(startDate[0]) <= years && el.status === 0) {
          diajukan.push(el)
        } else if (Number(startDate[2]) >= date && Number(startDate[1]) >= month && Number(startDate[0]) <= years && el.status === 2) {
          ditolak.push(el)
        }
        if (Number(startDate[2]) >= date && Number(startDate[1]) >= month && Number(startDate[0]) <= years) {
          all.push(el)
        }
      })

      getData.data.dataFollowing.forEach(el => {
        startDate = el.start_date.split('-')
        endDate = el.end_date.split('-')

        if (Number(endDate[2]) >= date && Number(startDate[1]) >= month && Number(startDate[0]) <= years) {
          mengikuti.push(el)
        }
      })

      next({
        type: 'FETCH_DATA_MY_EVENT_SUCCESS',
        payload: {
          myEvents: all,
          eventsMengikuti: mengikuti,
          eventsDiajukan: diajukan,
          eventsDitolak: ditolak
        }
      })

    } catch (err) {
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else {
    next(action)
  }
}

const store = createStore(reducer, applyMiddleware(api))

export default store
