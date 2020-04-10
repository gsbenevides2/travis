import React from 'react'
import {StatusBar} from 'react-native';
import {Button} from 'react-native-paper'
import {
 Container,
 Image,
 Title,
 Text
} from './styles'
import image from '~/assents/network.png'
import {connect} from 'react-redux'
import {CommonActions} from '@react-navigation/native';

export default connect(state=>({
 theme:state.theme
}))(props=>{
 const {theme} = props
 const themeData = theme.data[theme.selected]

 return(
	<Container>
	 <StatusBar 
	 backgroundColor={themeData.color}
	 barStyle={`${theme.selected==='light'?'dark':'light'}-content`}/>
	 <Image source={image}/>
	 <Title>Oops, it looks like you have no internet.</Title>
	 <Text>Check your wi-fi or cell phone signal.</Text>
	 <Button onPress={()=>{
		props.navigation.dispatch(
		 CommonActions.reset({
			index:1,
			routes:[{name:'loadingToken'}]
		 })
		)
	 }}>Try again</Button>
	</Container>
 )
})
