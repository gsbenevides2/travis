import React from 'react';
import {ScrollView,Image} from 'react-native';
import {AccountType,Info,Title,Url,LogoStyle} from './styles';

const TravisOrgLogo = require('../../../assets/travis_org_logo.png')
const TravisComLogo = require('../../../assets/travis_com_logo.png')

export default function(props) {
 function to(type){
	props.navigation.navigate('login',{type})
 }
  return (
	<ScrollView>
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
</ScrollView>
 );
}
