const initialState = {
 token: null,
 type:null
}

export default (state = initialState, action) => {
 switch (action.type) {
	case 'SET_TOKEN':
	 return { ...state, token: action.payload }
	case 'SET_TYPE':
	 return { ...state, type: action.payload }
	default:
	 return state
 }
}

