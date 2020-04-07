import React from 'react';
import { CommonActions} from '@react-navigation/native';
import Constants from 'expo-constants'
import {openBrowserAsync} from 'expo-web-browser';
import {StatusBar} from 'react-native'
import {
 List,
 Portal,
 Dialog,
 Paragraph,
 Button
} from 'react-native-paper'

import {
 Container,
 UserData,
 Avatar,
 TextData,
 BoldText,
 Text,
 AppData,
 OpenSource,	
 Version
} from './styles'

import api from '~/services/api'

export default function SettingsScreen(props){
 const [data,setData] = React.useState(null)
 const [color,setColor] = React.useState('#ffffff')
 const [showDialog, setShowDialog] =  React.useState(false)
 function loadData(){
	api.get('/user')
	 .then(async response=>{
		const {type} = await api.getAuthData()
		setData({...response.data,type})
	 })
 }
 async function signOut(){
	setShowDialog(false)
	await api.clearAuthData()
	props.navigation
	 .dispatch(CommonActions.reset(
		{
		 index: 1,
		 routes: [{ name: 'selectAccountType'}]
		}));

 }
 function openWiki(){
	openBrowserAsync('https://github.com/gsbenevides2/travis/wiki')
 }
 React.useEffect(()=>{
	async function load(){
	 await api.setAuthData()
	 loadData()
	}
	load()
 },[])
 if(data){
	return(
	 <Container>
	 <StatusBar 
	 backgroundColor={color}
	 barStyle='dark-content'/>
		<UserData>
		 <Avatar
		 source={{uri:data.avatar_url}}/>
		 <TextData>
			<BoldText>{data.name}</BoldText>
			<Text>{data.login}</Text>
			<Text>travis-ci.{data.type}</Text>
		 </TextData>
		</UserData>
		<List.Item
		title='Sign Out'
		description='Click to sign out of your Travis account.'
		left={props=>(<List.Icon {...props} icon='logout-variant'/>)}
		onPress={()=>{
		 setColor('rgba(0,0,0,0.5)')
		 setShowDialog(true)
		}}/>
		<List.Item
		title='Help'
		description='Help Wiki.'
		left={props=>(<List.Icon {...props} icon='help-circle'/>)}
	  onPress={openWiki}/>
		<AppData>
		 <OpenSource />
		 <Version>Version {Constants.manifest.version}</Version>
		</AppData>
		<Portal>
		 <Dialog 
		 onDismiss={()=>{
			setColor('#ffffff')
			setShowDialog(false)
		 }}
		 visible={showDialog}>
			<Dialog.Title>Are you sure?</Dialog.Title>
			<Dialog.Content>
			 <Paragraph>You will be signed out of your account! Are you sure you want to continue?</Paragraph>
			</Dialog.Content>
			<Dialog.Actions>
			 <Button 
			 onPress={()=>{
				setColor('#ffffff')
				setShowDialog(false)
			 }}>Cancel</Button>
			 <Button onPress={signOut}>Ok</Button>
			</Dialog.Actions>
		 </Dialog>
		</Portal>
	 </Container>
	)
 }
 else{
	return <Container/>
 }
}
