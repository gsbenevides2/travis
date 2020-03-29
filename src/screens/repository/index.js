import React from 'react'
import {
 RefreshControl,
 DeviceEventEmitter
} from 'react-native'

import CurrentBuild from './components/CurrentBuild'
import {Container} from './styles'
import { colorByBuildState} from '~/utils'
import api from '~/services/api'

export default function Repository(props){
 const [data,setData] = React.useState(null)
 const [loading,setLoading] = React.useState(false)
 const {id} = props.route.params
 const [source] = React.useState(api.axios.CancelToken.source())

 function loadData(calback){
	setLoading(true)
	api({
	 url:`/repo/${id}`,
	 cancelToken:source.token,
	 params:{
		include:'repository.current_build,build.created_by'
	 }
	}).then(response=>{
	 const buildingStates = [
		'created', 
		'queued', 
		'received', 
		'started'
	 ]

	 setData(response.data)
	 props.navigation.setOptions({
		title:response.data.slug,
		headerStyle:{
		 backgroundColor:colorByBuildState(response.data.current_build.state)
		},
		headerTintColor:'#fff'
	 })
	 if(buildingStates.includes(response.data.current_build.state)){
		loadData()
	 }
	 else{
		setLoading(false)
	 }
	})
	 .catch(e=>{
		console.log('Axios error Repository',	e)
	 })
 }

 React.useEffect(()=>{
	async function load(){
	 await api.setAuthData()
	 loadData()
	}
	load()
	DeviceEventEmitter.addListener('update',loadData)
	return ()=>{
	 DeviceEventEmitter.removeListener('update')
	 source.cancel('Cancelled')
	}
 },[])
 return(
	<Container
	refreshControl={
	 <RefreshControl 
	 refreshing={loading} 
	 onRefresh={loadData}/>}>
	 { data && 
		<CurrentBuild data={data.current_build}/>
	 }
	 </Container>
 )
}

