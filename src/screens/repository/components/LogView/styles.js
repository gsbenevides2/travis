import React from 'react';
import styled from 'styled-components'
import { AntDesign,MaterialCommunityIcons} from '@expo/vector-icons'

export const TextTitle = styled.Text`
 fontWeight:600;
 fontSize:20px;
`

export const Container = styled.View`
 backgroundColor:#fff;
 marginTop:10px;
 padding:5px;
`
export const Line = props=>{
 const Container = styled.View`
	flexDirection:row;
 `
 const Text = styled.Text`
	marginLeft:10px;
	fontWeight:${props.bold?'bold':'normal'};
	color:${props.color || '#000'}
 `
 return (
	<Container>
	 <MaterialCommunityIcons
	 name={props.icon}
	 size={20}
	 color={props.color || '#000'}/>
	 <Text>{props.label}</Text>
	</Container>
 )
}
export const Content = styled.View`
 marginLeft:30px;
 marginTop:10px;
`
export const ButtonArea = styled.View`
 justifyContent:flex-end;
 flexDirection:row;
 marginTop:10px;
`

export const ViewLogButton = props=>{
 const Text = styled.Text`
	color:#8A9597;
	marginLeft:2px;
 `
 const Container = styled.TouchableOpacity`
	borderWidth:1px;
	borderColor:#8A9597;
	padding:5px;
	flexGrow:1;
	justifyContent:center;
	flexDirection:row;
 `

 return (
	<Container>
	 <AntDesign 
	 name='eyeo'
	 size={20}
	 color='#8A9597'/>
	 <Text>{props.children}</Text>
	</Container>
 )
}
export const RestartButton = props=>{
 const Container = styled.TouchableOpacity`
	borderWidth:1px;
	borderColor:#8A9597;
  padding:5px;
	justifyContent:center;
	flexDirection:row;
	borderRadius:20px;
	marginLeft:10px;
 `

 return (
	<Container onPress={props.onPress}>
	 <AntDesign 
	 name={props.icon}
	 size={20}
	 color='#8A9597'/>
	</Container>
 )
}

