import React from 'react'
import {IconButton} from 'react-native-paper'

export default function DrawerButton({navigation,color}){
 return (
	<IconButton
	icon="menu"
	style={{
	 color:`${color}`,
	}}
	size={30} 
	onPress={()=>
		setTimeout(navigation.toggleDrawer,10)
	} />

 )
}

