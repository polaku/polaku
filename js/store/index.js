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
          ((Number(startDate[2]) < date + 1 && Number(startDate[1]) <= month && Number(startDate[0]) <= years) && Number((endDate[2]) > date + 1 && Number(endDate[1]) >= month && Number(startDate[0]) <= years)) || (Number(startDate[2]) <= date + 1 && Number(endDate[2]) >= date + 1 && Number(endDate[1]) === month && Number(endDate[0]) === years)) {
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
  } else if (action.type === 'FETCH_DATA_MY_TASK') {
    next({
      type: 'FETCH_DATA_LOADING'
    })

    let getData, tempButuhTindakan = [], tempPengajuan = [], tempDisetujui = [], tempDitolak = [], tempQuestionForMe = [], tempRequestForMe = [], evaluator = false, arrayAdminContactCategori = []

    if (action.payload.adminContactCategori) arrayAdminContactCategori = action.payload.adminContactCategori.split(',')

    try {
      getData = await API.get('/contactUs/allContactUs',
        {
          headers: { token }
        })

      await getData.data.data.forEach(el => {
        if (
          (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
          el.type === 'request' &&
          ((el.status === 'new' && el.evaluator_1 === action.payload.user_id) || (el.status === 'new2' && el.evaluator_2 === action.payload.user_id))) {
          tempButuhTindakan.push(el)
        }
      })

      if (tempButuhTindakan.length !== 0) evaluator = true

      await getData.data.data.forEach(el => {
        if (action.payload.adminContactCategori) {
          arrayAdminContactCategori.forEach(idAdminContactCategori => {
            // if (
            //   (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            //   el.type === 'request' &&
            //   ((el.status === 'new' && el.evaluator_1 === action.payload.user_id) || (el.status === 'new2' && el.evaluator_2 === action.payload.user_id))) {
            //   tempButuhTindakan.push(el)
            // } else if (
            //   (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            //   el.type === 'request' && el.status === 'approved' &&
            //   (el.evaluator_1 === action.payload.user_id || el.evaluator_2 === action.payload.user_id)) {
            //   tempDisetujui.push(el)
            // } else if (
            //   (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            //   el.type === 'request' && el.status === 'rejected' &&
            //   (el.evaluator_1 === action.payload.user_id || el.evaluator_2 === action.payload.user_id)) {
            //   tempDitolak.push(el)
            // }

            if (
              (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
              el.type === 'request' && el.status === 'approved') {
              tempDisetujui.push(el)
            } else if (
              (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
              el.type === 'request' && el.status === 'rejected') {
              tempDitolak.push(el)
            }

            if (
              (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
              el.type === 'request' && (el.status === 'new' || el.status === 'new2')) {
              tempPengajuan.push(el)
            }

            // KHUSUS ADMIN
            if (el.contact_categories_id === Number(idAdminContactCategori) && el.type === 'contact_us' && el.status === 'new') {
              tempQuestionForMe.push(el)
            } else if (Number(idAdminContactCategori) === 4 && el.contact_categories_id === 4 && el.type === 'request' && (el.status === 'new' || el.status === 'new2')) {  //Khusus HRD
              tempRequestForMe.push(el)
            } else if (el.contact_categories_id === Number(idAdminContactCategori) && el.type === 'request' && el.status === 'new') {
              tempRequestForMe.push(el)
            }

          })
        }
        // else {

        //   if (
        //     (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
        //     el.type === 'request' &&
        //     ((el.status === 'new' && el.evaluator_1 === action.payload.user_id) || (el.status === 'new2' && el.evaluator_2 === action.payload.user_id))) {
        //     tempButuhTindakan.push(el)
        //   }
        // }
      });
      
      next({
        type: 'FETCH_DATA_MY_TASK_SUCCESS',
        payload: {
          allContactUs: getData.data.data,
          myTaskButuhTindakan: tempButuhTindakan,
          myTaskPengajuan: tempPengajuan,
          myTaskDisetujui: tempDisetujui,
          myTaskDitolak: tempDitolak,
          questionForMe: tempQuestionForMe,
          requestForMe: tempRequestForMe,
          isEvaluator: evaluator
        }
      })

    } catch (err) {
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_MY_CONTACT_US') {
    next({
      type: 'FETCH_DATA_LOADING_MY_CONTACT_US'
    })

    let getData, tempPengajuan = [], tempPertanyaan = [], tempPermintaan = []

    try {
      getData = await API.get('/contactUs',
        {
          headers: { token }
        })

      await getData.data.data.forEach(el => {
        if (
          (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
          el.type === 'request') {
          tempPengajuan.push(el)
        }
        else if (
          el.date_imp === null && el.leave_date === null && el.date_ijin_absen_start === null &&
          el.type === 'request') {
          tempPermintaan.push(el)
        }
        else if (
          (el.type === 'contact_us' && el.status !== 'done' && el.status !== 'confirmation') || (el.type === 'contact_us' && new Date(el.done_expired_date).setDate(new Date(el.done_expired_date).getDate() + 1) > new Date())) {
          tempPertanyaan.push(el)
        }
        //else if (
        //   (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
        //   el.type === 'request' && el.status === 'rejected' &&
        //   (el.evaluator_1 === action.payload.user_id || el.evaluator_2 === action.payload.user_id)) {
        //   tempDitolak.push(el)
        // }
      });

      next({
        type: 'FETCH_DATA_MY_CONTACT_US_SUCCESS',
        payload: {
          myPengajuanIjin: tempPengajuan,
          myPermintaan: tempPermintaan,
          myPertanyaan: tempPertanyaan
        }
      })

    } catch (err) {
      next({
        type: 'FETCH_DATA_ERROR',
        payload: err
      })
    }
  } else if (action.type === 'FETCH_DATA_ALL_USER') {
    next({
      type: 'FETCH_DATA_LOADING'
    })

    try {
      getData = await API.get('/users',
        {
          headers: { token }
        })

      next({
        type: 'FETCH_DATA_ALL_USER_SUCCESS',
        payload: {
          dataAllUser: getData.data.data,
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
