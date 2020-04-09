import {
 MaterialCommunityIcons,
 Ionicons
} from '@expo/vector-icons'
import styled from 'styled-components'

export const Container = styled.View`
 backgroundColor:${props=>props.theme.color};
 borderLeftWidth:10px;
 borderLeftColor:${props=>props.color};
 paddingTop:10px;
 paddingLeft:5px;
`
export const FirstLine = styled.View`
 flexDirection:row;
 alignItems:center;
`
export const Content = styled.View`
 marginTop:10px;
 marginLeft:30px;
`
export const ContentBlock = styled.View`
 marginBottom:10px;
`
export const Line = styled.View`
 flexDirection:row;
`

export const SuperMaterialCommunityIcon = styled(MaterialCommunityIcons)
 .attrs(props=>({
	size:20,
	color:props.color
 }))``
export const MaterialCommunityIcon = styled(MaterialCommunityIcons).
 attrs({
	size:20
 })``
export const SuperIonicon = styled(Ionicons)
 .attrs(props=>({
	size:20,
	color:props.color
 }))``
export const Ionicon = styled(Ionicons)
 .attrs(props=>({
	color:props.theme.text,
	size:20
 }))``

export const BoldInfo = styled.Text`
 color:${props=>props.color};
 fontWeight:bold;
 marginLeft:10px;
`
export const SuperText = styled.Text`
 color:${props=>props.color};
 marginLeft:10px;
`
export const Text = styled.Text`
 color:${props=>props.theme.text};
 marginLeft:5px;
`
export const Avatar = styled.Image`
 width:18px;
 height:18px;
 borderRadius:20px;
`

export const Button = styled.TouchableOpacity`
 borderWidth:1px;
 justifyContent:center;
 paddingTop:5px;
 paddingBottom:5px;
 alignItems:center;
 borderColor:#e0e0e0;
 flexDirection:row;
 width:120px;
 borderRadius:10px;
`
