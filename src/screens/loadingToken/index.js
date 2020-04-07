import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {StatusBar} from 'react-native';
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
		 })
		 .catch(err=>{
			console.log(err.request)
			props.navigation
			 .dispatch(CommonActions.reset(
				{
				 index: 1,
				 routes: [{ name: 'selectAccountType'}]
				}));
		 })
	 }
	 else{
		props.navigation
		 .dispatch(CommonActions.reset(
			{
			 index: 1,
			 routes: [{ name: 'selectAccountType'}]
			}));
	 }
	}
	loadCredentials()
 },[])
 return (
	<Container>
		<StatusBar 
		backgroundColor='#ffffff'
		barStyle='dark-content'/>
	 <Spinner />
	</Container>	
 )
}

