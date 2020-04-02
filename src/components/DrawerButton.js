import React from 'react'
import {IconButton} from 'react-native-paper'

export default function DrawerButton({navigation,color}){
 return (
	<IconButton
	icon="menu"
	color={color}
	size={25} 
	onPress={()=>
		setTimeout(navigation.toggleDrawer,10)
	} />

 )
}

