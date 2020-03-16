import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import LoadingTokenScreen from './screens/loadingToken'
import SelectAccountTypeScreen from './screens/selectAccountType'
import LoginScreen from './screens/login';
import RepositoriesScreen from './screens/repositories';
import RepositoryScreen from './screens/repository';

const {
 Navigator:StackNavigator,
 Screen:StackScreen
} = createStackNavigator()

export default function(){
 return(
	<NavigationContainer>
	 <StackNavigator>
		<StackScreen
		name='loadingToken' 
		options={{
		 headerShown:false,
		 title:'Select your account type:'
		}} 
		component={LoadingTokenScreen}/>
		<StackScreen
		name='selectAccountType' 
		options={{
		 title:'Select your account type:'
		}} 
		component={SelectAccountTypeScreen}/>
		<StackScreen
		name='login' 
		options={{
		 title:'Log in'
		}} 
		component={LoginScreen}/>
		<StackScreen
		name='repositories' 
		options={{
		 title:'Repositories'
		}} 
		component={RepositoriesScreen}/>
		<StackScreen
		name='repository' 
		options={{
		 title:'Repository'
		}} 
		component={RepositoryScreen}/>

	 </StackNavigator>
	</NavigationContainer>
 )
}
