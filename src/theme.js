import {AsyncStorage} from 'react-native'
import { DefaultTheme} from 'react-native-paper';
const theme = {
 light:{
	color:'#ffffff',
	text:'#000000',
	bg:'#ededed'
 },
 dark:{
	color:'#000000',
	text:'#ffffff',
	bg:'#121212'
 }
}
export async function loadTheme(dispatch){
 const theme = await AsyncStorage.getItem('theme')
 if(theme === 'dark'){
	dispatch(({
	 type:'SET_THEME',
	 payload:'dark'
	}))
 }
}
export function setTheme(value){
 AsyncStorage.setItem('theme',value)
 return ({
	type:'SET_THEME',
	payload:value
 })
}
export const styled = theme	
export const paper = {
 light:{
	...DefaultTheme,
	roundness: 2,
	colors: {
	 ...DefaultTheme.colors,
	 primary: '#02623D',
	 accent: '#05C47A'
	}
 },
 dark:{
	...DefaultTheme,
	roundness: 2,
	dark:true,
	colors: {
	 ...DefaultTheme.colors,
	 primary: '#02623D',
	 accent: '#05C47A',
	 text:theme.dark.text,
	 placeholder:theme.dark.text,
	 background:theme.dark.bg,
	 surface:theme.dark.bg
	}
 }
}
