import React from 'react';
import {ScrollView,Image,AsyncStorage} from 'react-native';
import { CommonActions} from '@react-navigation/native';

import {connect} from 'react-redux'
import appActions from '~/appActions' 
import axios from 'axios'

import {Container,Spinner} from './styles'

function Screen(props){

 React.useEffect(()=>{
	async function loadCredentials(){
	 const token = await AsyncStorage.getItem('token')
	 const type = await AsyncStorage.getItem('type')
	 if(token && type){
		axios({
		 method:'get',
		 baseURL:`https://api.travis-ci.${type}`,
		 url:'/repos',
		 headers:{
			'Travis-API-Version':3,
			Authorization:`token ${token}`
		 }
		})
		 .then(()=>{
			props.dispatch(appActions.setToken(token))
			props.dispatch(appActions.setType(type))
			props.navigation
			 .dispatch(CommonActions.reset(
				{
				 index: 1,
				 routes: [{ name: 'repositories'}]
				}));
		 })
		 .catch(()=>{
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
	 <Spinner />
	</Container>	
 )
}

export default connect(data=>data)(Screen)
