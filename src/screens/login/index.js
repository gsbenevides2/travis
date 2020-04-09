import React from 'react';
import {Image,View,StatusBar} from 'react-native';
import { CommonActions} from '@react-navigation/native';
import {TextInput,Button,HelperText} from 'react-native-paper'

import api from '~/services/api'

import {
 Container,
 Title,
 LogoStyle,
 InputStyle,
 HelperStyle
} from './styles';

const types ={
 org:{
	text:'Travis CI (Open Source repo)',
	image:require('../../../assets/travis_org_logo.png')
 },
 com:{
	text:'Travis CI (Private repo)',
	image:require('../../../assets/travis_com_logo.png')
 }
}

const textInputOptions = {
 label:'Enter the api key:',
 autoCapitalize:'none',
 autoCompleteType:'off',
 autoCorrect:false
}
import {connect} from 'react-redux'

export default connect(state=>({
 theme:state.theme
}))(props=>{
 const {theme} = props
 const themeData = theme.data[theme.selected]

 const inputRef = React.useRef(null)
 const [token,setToken] = React.useState('')
 const [error,setError] = React.useState(null)
 const {type} = props.route.params

 function login(){
	inputRef.current.blur()
	api.authenticate(type,token)
	 .then(()=>{
		props.navigation
		 .dispatch(CommonActions.reset(
			{
			 index: 1,
			 routes: [{ name: 'app'}]
			}));
	 })
	 .catch(error=>{
		inputRef.current.focus()
		if(error.response?.status===403) setError('Api key invalid!')
		else{
		 console.log(error)	
		}
	 })
 }

 return (
	<Container behavior="padding" enabled>
		<StatusBar 
		backgroundColor={themeData.color}
		barStyle={`${theme.selected==='light'?'dark':'light'}-content`}/>
	 <Image style={LogoStyle} source={types[type].image}/>
	 <Title>{types[type].text}</Title>
	 <TextInput 
	 style={InputStyle}
	 value={token}
	 error={error}
	 ref={inputRef}
	 onChangeText={text=>{
		setToken(text)
		setError(null)
	 }}
	 {...textInputOptions}/>
	 <HelperText
	 type='error'
	 style={HelperStyle}
	 visible={error}>{error}</HelperText>
	<Button mode="contained" onPress={login}>Log In</Button>
 </Container>
 );
})
