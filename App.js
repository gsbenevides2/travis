import React from 'react';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/routes';

import {SplashScreen} from 'expo'
SplashScreen.preventAutoHide()

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
	 <PaperProvider theme={theme}>
		<Routes />
	 </PaperProvider>

 );
}
