import React from 'react';
import { Drawer ,Title} from 'react-native-paper';

import {Container} from './styles';

export default function DrawerContent(props){
 const {state} = props

 const icons = {
	Repositories:'book-variant',
	Settings:'settings-outline'
 }

 const {routes} = state
 return (
	<Container>
	 <Title style={{marginLeft:10}}>Travis CI</Title>
	 {
	 routes.map(route=>(
		<Drawer.Item
		style={{width:'100%',marginHorizontal:0}}
		key={route.key}
		active={routes[state.index].key === route.key}
		onPress={()=>{
		 props.navigation.navigate(route.name)
		}}
		icon={icons[route.name]}
		label={route.name} />
	 ))
	}</Container>
 )
}
