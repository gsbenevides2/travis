import React from 'react';
import { CommonActions} from '@react-navigation/native';
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
 Text
} from './styles'

import api from '~/services/api'

export default function SettingsScreen(props){
 const [data,setData] = React.useState(null)
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
		onPress={()=>setShowDialog(true)}/>
		<Portal>
		 <Dialog 
		 onDismiss={()=>setShowDialog(false)}
		 visible={showDialog}>
			<Dialog.Title>Are you sure?</Dialog.Title>
			<Dialog.Content>
			 <Paragraph>You will be signed out of your account! Are you sure you want to continue?</Paragraph>
			</Dialog.Content>
			<Dialog.Actions>
			 <Button onPress={()=>setShowDialog(false)}>Cancel</Button>
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
