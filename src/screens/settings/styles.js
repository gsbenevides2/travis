import React from 'react';
import styled from 'styled-components'
import {AntDesign} from '@expo/vector-icons'
import {openBrowserAsync} from 'expo-web-browser';

export const Container = styled.View`
 flex:1;
 backgroundColor:${props=>props.theme.bg};
`

export const  UserData =  styled.View`
 padding:25px;
 flexDirection:row;
 alignItems:center;
`
export const  Avatar = styled.Image`
 height:100px;
 width:100px;
 borderRadius:500px;
`
export const  TextData = styled.View`
 marginLeft:20px;
`
export const  BoldText = styled.Text`
 fontWeight:700;
 color:${props=>props.theme.text};
 fontSize:20px;
`
export const  Text = styled.Text`
 color:${props=>props.theme.text};
`
export const AppData = styled.View`
 flex:1;
 alignItems:center;
 justifyContent:flex-end;
 marginBottom:12px;
`
export const OpenSource = (props)=>{
 const Container = styled.TouchableOpacity`
	flexDirection:row;
	alignItems:center;
 `
 const Text = styled.Text`
 color:${props.color};
	marginLeft:2px;
 `
 const open = ()=>{
	openBrowserAsync('https://github.com/gsbenevides2/travis')
 }
 return (
	<Container
	onPress={open}>
	 <AntDesign 
	 color={props.color}
	 name='github'/>
	 <Text>Open-Source Project ♥️</Text>
	</Container>
 )
}
export const  Version = styled.Text`
 color:${props=>props.theme.text};
`
