import React from 'react'
import {
 RefreshControl,
 DeviceEventEmitter,
 StatusBar
} from 'react-native'
import {Container,List,Image,Text} from './styles'
import RepositoryItem from '~/components/repositoryItem'

import api from '~/services/api'

import emptyImage from '~/assents/empty.png'
import loadingImage from '~/assents/loading.png'

export default function(props){
 const [repos,setRepos] = React.useState(null)
 const [loading,setLoad] = React.useState(true)
 const [source,setSource] = React.useState(null)

 function loadData(){
	setLoad(true)
	const source = api.axios.CancelToken.source()
	setSource(source)
	api({
	 url:'/repos',
	 cancelToken:source.token,
	 params:{
		include:'build.branch,build.commit,build.created_by,build.request,repository.current_build,repository.default_branch,repository.email_subscribed,owner.github_id,owner.installation',
		limit:30,
		sort_by:'current_build:desc',
		'repository.active':true
	 }
	})
	 .then(response=>{
		const {repositories} = response.data
		setRepos(repositories)
		const buildingRepo = repositories.some(repo=>{
		 const buildingStates = [
			'created', 
			'queued', 
			'received', 
			'started'
		 ]
		 return buildingStates.includes(
			repo.current_build.state
		 )
		})
		if(buildingRepo){
		 loadData()
		}
		else{
		 setLoad(false)
		}
	 })
	 .catch(e=>{
		console.log('Axios Error Repositories',e)
		setLoad(false)
	 })
 }
 function handleRepositoryClick(id){
	props.navigation
	 .navigate('repository',{id})
	if(source) source.cancel('Canceled')
 }

 React.useEffect(()=>{
	async function load(){
	 await api.setAuthData()
	 loadData()
	}
	load()
	console.log('Ok')
	const unsubscribeToFocus = props
	 .navigation
	 .addListener('focus', () => {
		loadData()
	 });

	const unsubscribeToBlur = props
	 .navigation
	 .addListener('blur', () => {
		if(source){
		 source.cancel('Canceled')
		}
	 });

	return ()=>{
	 unsubscribeToFocus()
	 unsubscribeToBlur()
	 if(source) source.cancel('Canceled')
	}
 },[])

 if(repos){
	if(repos.length){
	 return(
		<>
		<StatusBar 
		backgroundColor='#ffffff'
		barStyle='dark-content'/>
		<List
		refreshControl={
		 <RefreshControl refreshing={loading} onRefresh={loadData}/>}
		 data={repos}
		 renderItem={({item})=>(
			<RepositoryItem onPress={()=>handleRepositoryClick(item.id)} data={item}/>)}
			keyExtractor={item => item.id.toString()}/>
		</>
	 )
	}
	else{
	 return (
		<Container>
		 <StatusBar 
		 backgroundColor='#ffffff'
		 barStyle='dark-content'/>
		 <Image source={emptyImage}/>
		 <Text>No active repositories</Text>
		</Container>
	 )
	}
 }
 else{
	return (
	 <Container>
		<StatusBar 
		backgroundColor='#ffffff'
		barStyle='dark-content'/>
		<Image source={loadingImage}/>
		<Text>Loading...</Text>
	 </Container>
	)
 }
}
