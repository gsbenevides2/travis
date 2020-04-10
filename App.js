import React from 'react';
import {Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/routes';

import {ThemeProvider} from 'styled-components'

import { Provider,connect } from 'react-redux'
import store from './src/store'	
import * as theme from './src/theme'	

const RestOfApp = connect(store=>({
 theme:store.theme
})
)(props=>{

 return (
	<ThemeProvider theme={theme.styled[props.theme.selected]}>
	 <PaperProvider theme={theme.paper[props.theme.selected]}>
		<Routes />
	 </PaperProvider>
	</ThemeProvider>
 )
})


export default function App() {

 return (
	<Provider store={store}>
	 <RestOfApp />
	</Provider>
 );
}
