import React from 'react'
import {
 RefreshControl,
 DeviceEventEmitter
} from 'react-native'
import {IconButton} from 'react-native-paper'

import CurrentBuild from './components/CurrentBuild'
import JobView from './components/LogView'
import {Container} from './styles'
import {states} from '~/utils'
import api from '~/services/api'

import {openBrowserAsync} from 'expo-web-browser';
export default function Repository(props){
 const [data,setData] = React.useState(null)
 const [loading,setLoading] = React.useState(false)
 const {id} = props.route.params
 const [source,setSource] = React.useState(null)
 function loadData(calback){
	const source = api.axios.CancelToken.source()
	setSource(source)
	setLoading(true)
	api({
	 url:`/repo/${id}`,
	 cancelToken:source.token,
	 params:{
		include:'repository.current_build,build.created_by,build.jobs,job.stage'
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
		 backgroundColor:states.colors[response.data.current_build.state]
		},
		headerTintColor:'#fff',
		headerRight:()=>(
		 <IconButton 
		 icon='open-in-new'
		 color='#fff'
		 onPress={()=>{
			openBrowserAsync(`https://travis-ci.${api.authData.type}/github/${response.data.slug}`)
		 }}
		 size={25}		
		/>
		)
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
	const unsubscribeToBlur = props
	 .navigation
	 .addListener('blur', () => {
		if(source){
		 source.cancel('Canceled')
		}
	 });

	DeviceEventEmitter.addListener('update',loadData)
	return ()=>{
	 console.log('OK')
	 unsubscribeToBlur()
	 DeviceEventEmitter.removeListener('update')
	 if(source){
		source.cancel('Cancelled')
	 }
	}
 },[])
 return(
	<Container
	refreshControl={
	 <RefreshControl 
	 refreshing={loading} 
	 onRefresh={loadData}/>}>
	 { data && 
		<>
		<CurrentBuild data={data.current_build}/>
		<JobView data={data.current_build.jobs} />
		</>
	 }
	 </Container>
 )
}

