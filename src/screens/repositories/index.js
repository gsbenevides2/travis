import React from 'react'
import {RefreshControl} from 'react-native'
import {Container} from './styles'
import Repository from '~/components/repository'

import {connect} from 'react-redux'
import axios from 'axios'

function Screen(props){
 const [repos,setRepos] = React.useState([])
 const [loading,setLoad] = React.useState(true)
 function loadRepos(){
	setLoad(true)
	axios({
	 method:'get',
	 baseURL:`https://api.travis-ci.${props.type}`,
	 url:'/repos',
	 headers:{
		'Travis-API-Version':3,
		Authorization:`token ${props.token}`
	 },
	 params:{
		include:'build.branch,build.commit,build.created_by,build.request,repository.current_build,repository.default_branch,repository.email_subscribed,owner.github_id,owner.installation',
		limit:30,
		sort_by:'current_build:desc',
		'repository.active':true
	 }
	})
	 .then(response=>{
		const repos = response.data.repositories.map(repo=>{
		 const build = repo.current_build || {}
		 return{
			id:repo.id,
			slug:repo.slug,
			number:build.number,
			duration:build.duration,
			finished_at:build.finished_at,
			state:build.state,
			buildId:build.id
		 }
		})
	setLoad(false)
		setRepos(repos)
	 })

 }
 React.useEffect(loadRepos,[])
 return(
	<Container
	refreshControl={
	 <RefreshControl refreshing={loading} onRefresh={loadRepos}/>
	 }
	>{
	 repos.map(repo=>(
		<Repository onPress={()=>{
		 props.navigation.navigate('repository',{id:repo.buildId})
		}} key={repo.id} data={repo}/>))
	}</Container>
 )
 }
 export default connect(
 (data)=>(data)
 )(Screen)
