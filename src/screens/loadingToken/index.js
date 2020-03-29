import React from 'react';
import {CommonActions} from '@react-navigation/native';
import { SplashScreen } from 'expo';
import api from '~/services/api'
import {Container,Spinner} from './styles'

export default function(props){

 React.useEffect(()=>{
	async function loadCredentials(){
	 const {type,token} = await api.getAuthData()
	 if(token && type){
	 api.reauthenticate() 
		 .then(()=>{
			props.navigation
			 .dispatch(CommonActions.reset(
				{
				 index: 1,
				 routes: [{ name: 'app'}]
				}));
			setTimeout(SplashScreen.hide,10)
		 })
		 .catch(err=>{
			console.log(err.request)
			props.navigation
			 .dispatch(CommonActions.reset(
				{
				 index: 1,
				 routes: [{ name: 'selectAccountType'}]
				}));
			setTimeout(SplashScreen.hide,10)
		 })
	 }
	 else{
		props.navigation
		 .dispatch(CommonActions.reset(
			{
			 index: 1,
			 routes: [{ name: 'selectAccountType'}]
			}));
			setTimeout(SplashScreen.hide,10)
	 }
	}
	loadCredentials()
 },[])
 return (
	<Container>
	 <Spinner />
	</Container>	
 )
}

