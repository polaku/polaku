const defaultState = {
  user_id: null,
  token: '',
  loading: false,
  error: {},
  dataAllEvent: [],
  eventsToday: [],
  eventsTomorrow: [],
  eventsThisWeek: [],
  eventsThisMonth: [],
  myEvents: [],
  eventsMengikuti: [],
  eventsDiajukan: [],
  eventsDitolak: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_DATA_LOADING': {
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCH_DATA_EVENT_SUCCESS': {
      return {
        ...state,
        loading: false,
        dataAllEvent: action.payload.dataAllEvent,
        eventsToday: action.payload.eventsToday,
        eventsTomorrow: action.payload.eventsTomorrow,
        eventsThisWeek: action.payload.eventsThisWeek,
        eventsThisMonth: action.payload.eventsThisMonth
      }
    }
    case 'FETCH_DATA_MY_EVENT_SUCCESS': {
      return {
        ...state,
        loading: false,
        myEvents: action.payload.myEvents,
        eventsMengikuti: action.payload.eventsMengikuti,
        eventsDiajukan: action.payload.eventsDiajukan,
        eventsDitolak: action.payload.eventsDitolak
      }
    }
    case 'FETCH_DATA_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case 'SET_DATA_USER':{
      return {
        ...state,
        user_id: action.payload.user_id,
        token: action.payload.token
      }
    }
    default:
      return state
  }

}

export default reducer