import React from 'react';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux'
import store from './src/store'
import Routes from './src/routes';

const theme = {
 ...DefaultTheme,
 roundness: 2,
 colors: {
	...DefaultTheme.colors,
	primary: '#02623D',
	accent: '#05C47A',
 },
};

export default function App() {
 return (
	<Provider store={store}>
	 <PaperProvider theme={theme}>
		<Routes />
	 </PaperProvider>
	</Provider>

 );
}
