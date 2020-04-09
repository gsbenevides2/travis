import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import api from '~/services/api'
import {Container,Image} from './styles'
import {connect} from 'react-redux'

export default connect(state=>({
 theme:state.theme
}))(props=>{
 const {theme} = props
 const themeData = theme.data[theme.selected]

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
	 backgroundColor={themeData.color}
	 barStyle={`${theme.selected==='light'?'dark':'light'}-content`}/>
	 <Image
	 source={require('../../../assets/splash.png')}
	 fadeDuration={0}/>
	</Container>
 )
})

