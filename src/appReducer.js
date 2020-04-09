import theme from './theme'
const initialState = {
 theme:{
	selected:'light',
	data:theme.styled
 }
}

export default (state = initialState, action) => {
 switch (action.type) {
	case 'SET_THEME':
	 return { 
		...state, 
		theme:{
		 ...state.theme,
		 selected:action.payload 
		}
	 }
	default:
	 return state
 }
}
