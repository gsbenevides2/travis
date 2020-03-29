import React from 'react'

import moment from 'moment'

import {DeviceEventEmitter} from 'react-native'

import api from '~/services/api'

import {
 Container,
 FirstLine,
 Content,
 ContentBlock,
 Line,

 SuperMaterialCommunityIcon,
 MaterialCommunityIcon,
 SuperIonicon,
 Ionicon,

 BoldInfo,
 SuperText,
 Text,
 Avatar,

 Button
}from './styles'

export default function CurrentBuild({data}) {
 let  boldInfo = '--'
 let title = '--'
 if(data.event_type === 'push'){
	boldInfo = data.branch.name
	title= data.commit.message.split('\n')[0]
 }
 else if(data.event_type === 'pull_request'){
	boldInfo = `Pull Request #${data.pull_request_number}`
	title = data.pull_request_title
 }

let formatedDuration = '-'
 if(data.state === 'started')	{
	const startedAtDate = moment(data.started_at)
	const atualDate = moment(new Date())
	duration = atualDate.diff(startedAtDate,'seconds')
	const min = parseInt(duration /60)
	const sec = duration%60
	if(min>0){
	 formatedDuration = `Running for ${min} min ${sec} sec`
	}
	else{
	 formatedDuration =  `Running for ${sec} sec`
	}

 }
 else if(data.state === 'failed' ||data.state ===  'passed'){
	const min = parseInt(data.duration /60)
	const sec = data.duration%60
	if(min>0){
	 formatedDuration = `Ran for ${min} min ${sec} sec`
	}
	else{
	 formatedDuration =  `Ran for ${sec} sec`
	}
 }

 let formatedFinished = '-'
 if(data.finished_at){
	formatedFinished = moment(data.finished_at).fromNow()
 }

 const url = new URL(data.created_by.avatar_url)
 url.searchParams.append('s','36')

 const buildingStates = [
	'created', 
	'queued', 
	'received', 
	'started'
 ]

 async function restartBuild(){
	await api.setAuthData()
	api.post(`/build/${data.id}/${buildingStates.includes(data.state)?'cancel':'restart'}`)
	 .then(()=>{
		DeviceEventEmitter.emit('update')
	 })
 }
 return (
	<Container state={data.state}>
	 <FirstLine>
		<SuperMaterialCommunityIcon state={data.state}  name='cancel'/>
		<BoldInfo state={data.state}>{boldInfo}</BoldInfo>
		<SuperText state={data.state}>{title}</SuperText>
	 </FirstLine>
	 <Content>
		<ContentBlock>
		 <Line>
			<Ionicon name='ios-git-commit'/>
			<Text>Commit {data.commit.sha.slice(0,7)}</Text>
		 </Line>
		 {/*
		<Line>
		 <Ionicon name='ios-git-pull-request'/>
		 <Text> #2: Bump minimist from 1.2.0 to 1.2.5 in /iris </Text>
		</Line>
		*/}
		<Line>
		 <Ionicon name='ios-git-branch' />
		 <Text> Branch {data.branch.name} </Text>
		</Line>
	 </ContentBlock>
	 <ContentBlock>
		<Line>
		 <Avatar source={{uri:url.toString()}} />
		 <Text>{data.created_by.login}</Text>
		</Line>
	 </ContentBlock>
	 <ContentBlock>
		<Line>
		 <SuperIonicon state={data.state} name='ios-git-pull-request'/>
		 <SuperText state={data.state}> #{data.number} {data.state}</SuperText>
		</Line>
	 </ContentBlock>
	 <ContentBlock>
		<Line>
		 <Ionicon name='ios-timer'/>
		 <Text>{formatedDuration}</Text>
		</Line>
		<Line>
		 <Ionicon name='ios-calendar'/>
		 <Text>{formatedFinished}</Text>
		</Line>
	 </ContentBlock>
	 <ContentBlock>
		<Button onPress={restartBuild}>
		 <Ionicon name={`${buildingStates.includes(data.state)?'md-close':'md-refresh'}`}/>
		 <Text>{buildingStates.includes(data.state)?'Cancel':'Restart'} Build </Text>
		</Button>
	 </ContentBlock>
	</Content>
 </Container>
 );
}
