import React from 'react';
import {Image,StatusBar} from 'react-native';
import {View,AccountType,Info,Title,Url,LogoStyle} from './styles';

const TravisOrgLogo = require('../../../assets/travis_org_logo.png')
const TravisComLogo = require('../../../assets/travis_com_logo.png')
import {connect} from 'react-redux'

export default connect(state=>({
 theme:state.theme
}))(props=>{
 const {theme} = props
 const themeData = theme.data[theme.selected]
 function to(type){
	props.navigation.navigate('login',{type})
 }
  return (
	<View>
	 <StatusBar 
		backgroundColor={themeData.color}
		barStyle={`${theme.selected==='light'?'dark':'light'}-content`}/>
	 <AccountType onPress={()=>{
		to('org')
	 }}>
	 <Image style={LogoStyle} source={TravisOrgLogo}/>
	 <Info>
		<Title>Travis CI (Open Source repo)</Title>
		<Url>https://travis-ci.org</Url>
	 </Info>
	</AccountType>
	<AccountType onPress={()=>{
	 to('com')
	}}>
	<Image style={LogoStyle} source={TravisComLogo}/>
	<Info>
	 <Title>Travis CI (Private repo)</Title>
	 <Url>https://travis-ci.com</Url>
	</Info>
 </AccountType>
</View>
 );
})
