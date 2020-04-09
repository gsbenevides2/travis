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
export default {
 setTheme:(value)=>({
	type:'SET_THEME',
	payload:value
 }),
 styled:theme,
 paper:{
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
}
