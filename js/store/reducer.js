const defaultState = {
  user_id: null,
  token: '',
  sisaCuti: 0,
  adminContactCategori: null,
  isRoomMaster: false,
  isAssistantRoomMaster: false,
  isEvaluator: false,
  position_id: null,
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
  eventsDitolak: [],
  allContactUs: [],
  myTaskButuhTindakan: [],
  myTaskPengajuan: [],
  myTaskDisetujui: [],
  myTaskDitolak: [],
  questionForMe: [],
  requestForMe: [],
  myPengajuanIjin: [],
  myPermintaan: [],
  myPertanyaan: [],
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_DATA_LOADING': {
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCH_DATA_LOADING_MY_CONTACT_US': {
      return {
        ...state,
        loading: true,
        myPengajuanIjin: []
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
    case 'FETCH_DATA_MY_TASK_SUCCESS': {
      return {
        ...state,
        loading: false,
        allContactUs: action.payload.allContactUs,
        myTaskButuhTindakan: [...action.payload.myTaskButuhTindakan],
        myTaskPengajuan: action.payload.myTaskPengajuan,
        myTaskDisetujui: action.payload.myTaskDisetujui,
        myTaskDitolak: action.payload.myTaskDitolak,
        questionForMe: action.payload.questionForMe,
        requestForMe: [...action.payload.requestForMe],
        isEvaluator: action.payload.isEvaluator
      }
    }
    case 'FETCH_DATA_MY_CONTACT_US_SUCCESS': {
      return {
        ...state,
        loading: false,
        myPengajuanIjin: action.payload.myPengajuanIjin,
        myPermintaan: action.payload.myPermintaan,
        myPertanyaan: action.payload.myPertanyaan
      }
    }
    case 'FETCH_DATA_ALL_USER_SUCCESS': {
      return {
        ...state,
        dataAllUser: action.payload.dataAllUser,
      }
    }
    case 'SET_DATA_USER': {
      return {
        ...state,
        user_id: action.payload.user_id,
        isRoomMaster: action.payload.isRoomMaster,
        token: action.payload.token,
        position_id: action.payload.position_id,
        sisaCuti: action.payload.sisaCuti,
        adminContactCategori: action.payload.adminContactCategori,
      }
    }
    case 'FETCH_DATA_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    default:
      return state
  }

}

export default reducer