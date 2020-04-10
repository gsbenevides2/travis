import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack'

import LoadingTokenScreen from './screens/loadingToken'
import InternetErrorScreen from './screens/internetError'
import SelectAccountTypeScreen from './screens/selectAccountType'
import LoginScreen from './screens/login';
import RepositoriesScreen from './screens/repositories';
import RepositoryScreen from './screens/repository';
import LogViewScreen from './screens/logView';

import SettingsScreen from './screens/settings';

import DrawerButton from './components/DrawerButton' 
import DrawerContent from './components/DrawerContent' 

import {IconButton} from 'react-native-paper'
import {openBrowserAsync} from 'expo-web-browser';

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
import {connect} from 'react-redux'

export default connect(state=>({
 theme:state.theme
}))(props=>{
 const {theme} = props
 const themeData = theme.data[theme.selected]
 return(
	<NavigationContainer>
	 <Stack.Navigator
	 screenOptions={{
		headerStyle: {
		 backgroundColor:themeData.color,
		},
		headerTintColor:themeData.text
	 }}>
	 <Stack.Screen
	 name='loadingToken' 
	 options={{
		headerShown:false
	 }} 
	 component={LoadingTokenScreen}/>
	 <Stack.Screen
	 name='internetError' 
	 options={{
		headerShown:false
	 }} 
	 component={InternetErrorScreen}/>
	 <Stack.Screen
	 name='selectAccountType' 
	 options={{
		title:'Select your account type:'
	 }} 
	 component={SelectAccountTypeScreen}/>
	 <Stack.Screen
	 name='login' 
	 options={{
		title:'Log in',
		headerRight:()=>(
		 <IconButton 
		 color={themeData.text}
		 icon='help-circle-outline'
		 onPress={()=>{
			openBrowserAsync('https://github.com/gsbenevides2/travis/wiki/How-to-get-the-API-token%3F')
		 }}
		 size={25}		
		/>
		)
	 }}
		 component={LoginScreen}/>
		 <Stack.Screen
		 options={{
			headerShown:false
		 }}
		 name='app'>
		 {()=>(
			<Drawer.Navigator
			drawerContent={(props)=>(<DrawerContent {...props}/>)}
			drawerContentOptions={{
			 activeTintColor:'#038955'
			}}>
			<Drawer.Screen name='Repositories'>
			 {()=>(
				<Stack.Navigator
				screenOptions={{
				 headerStyle: {
					backgroundColor: themeData.color,
				 },
				 headerTintColor:themeData.text
				}}>
				<Stack.Screen
				name='repositories' 
				options={({navigation})=>({
				 title:'My Repositories',
				 headerLeft: ()=>(<DrawerButton color={themeData.text} navigation={navigation}/>)
				})} 
				 component={RepositoriesScreen}/>
				 <Stack.Screen
				 name='repository' 
				 options={{
					title:'Repository'
				 }} 
				 component={RepositoryScreen}/>
				 <Stack.Screen
				 name='logView' 
				 options={{
					title:'View Log',
					headerStyle: {
					 backgroundColor:'#000000'
					},
					headerTintColor:'#ffffff'

				 }} 
				 component={LogViewScreen}/>
				</Stack.Navigator>
			 )}
			 </Drawer.Screen>
			 <Drawer.Screen name='Settings'>
				{()=>(
				 <Stack.Navigator
				 screenOptions={{
					headerStyle: {
					 backgroundColor: themeData.color,
					},
					headerTintColor:themeData.text
				 }}>
				 <Stack.Screen
				 name='settings' 
				 options={({navigation})=>({
					title:'Settings',
					headerLeft: ()=>(<DrawerButton color={themeData.text} navigation={navigation}/>)
				 })} 
					component={SettingsScreen}/>
				 </Stack.Navigator>
				)}
				</Drawer.Screen>

			 </Drawer.Navigator>
		 )}
			</Stack.Screen>
		 </Stack.Navigator>
		</NavigationContainer>
 )
})
