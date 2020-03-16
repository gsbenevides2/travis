import React from 'react'
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';

import {connect} from 'react-redux'
import axios from 'axios'

import { handleBuildPassingColor} from '~/utils.js'
import {
 Container,
 Card,
 CardTitle,
 CardStat,
 StatText,
 StatTextColor
} from './styles'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Screen(props){
 const [data,setData] = React.useState(null)
 const {id} = props.route.params
 console.log(id)
 function loadData(){
	axios({
	 method:'get',
	 baseURL:`https://api.travis-ci.${props.type}`,
	 url:`/build/${id}`,
	 headers:{
		'Travis-API-Version':3,
		Authorization:`token ${props.token}`
	 },
	 params:{
		/*include:'build.branch,build.commit,build.created_by,build.request,repository.current_build,repository.default_branch,repository.email_subscribed,owner.github_id,owner.installation',
		limit:30,
		sort_by:'current_build:desc',
		'repository.active':true*/
	 }
	}).then(response=>{
	 const {data:responseData} = response
	 //console.log(responseData)
	 setData({
		title:responseData.commit.message,
		number:responseData.number,
		state:responseData.state,
		sha:responseData.commit.sha,
		eventType:capitalizeFirstLetter(
		 responseData.event_type.replace('_',' ')
		),
		branch:responseData.branch.name
	 })
	})

 }
 React.useEffect(loadData,[])
 return(
	<Container>
	 {data && <Card buildPassing={data.state}>
		<CardTitle buildPassing={data.state}>
		 {data.eventType}: {data.title.split('\n')[0]}
		</CardTitle>
		<CardStat>
		 <Ionicons name='ios-git-commit' size={15} color={handleBuildPassingColor(data.state)}/> 
		 <StatTextColor buildPassing={data.state}>
			#{data.number} {data.state}
		 </StatTextColor>
		</CardStat>
		<CardStat>
		 <Ionicons name='ios-git-commit' size={15}/> 
		 <StatText>Commit: {data.sha.slice(0,7)}</StatText>
		</CardStat>
		<CardStat>
		 <MaterialCommunityIcons name='source-branch' size={15}/> 
		 <StatText>Branch: {data.branch}</StatText>
		</CardStat>
		<CardStat>
		 <MaterialCommunityIcons name='timer' size={15}/>
		 <StatText>Ran for 53 sec</StatText>
		</CardStat>
		<CardStat>
		 <MaterialCommunityIcons name='calendar' size={15}/>
		 <StatText>About 2 hours ago</StatText>
		</CardStat>
	 </Card>}
	</Container>
 )
}

export default connect(data=>data)(Screen)
