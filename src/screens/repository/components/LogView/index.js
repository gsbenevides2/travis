import React from 'react';
import {DeviceEventEmitter} from 'react-native'
import moment from 'moment'

import {
 TextTitle,
 Container,
 Content,
 ButtonArea,
 ViewLogButton,
 RestartButton,
 Line
} from './styles'

import {states} from '~/utils'
import api from '~/services/api'

function Job(props){
 const {data} = props
 const color = states.colors[data.state]
 const icon = states.icons[data.state]

 let formatedDuration = '-'
 if(data.state === 'started')	{
	const startedAtDate = moment(data.started_at)
	const atualDate = moment(new Date())
	duration = atualDate.diff(startedAtDate,'seconds')
	const min = parseInt(duration /60)
	const sec = duration%60
	if(min>0){
	 formatedDuration = `${min} min ${sec} sec`
	}
	else{
	 formatedDuration =  `${sec} sec`
	}

 }
 else if(data.state === 'failed' ||data.state ===  'passed'){
	const startedAtDate = moment(data.started_at)
	const atualDate = moment(data.finished_at)
	duration = atualDate.diff(startedAtDate,'seconds')
	const min = parseInt(duration /60)
	const sec = duration%60
	if(min>0){
	 formatedDuration = `${min} min ${sec} sec`
	}
	else{
	 formatedDuration =  `${sec} sec`
	}
 }
 async function restartJob(){
	await api.setAuthData()
	api.post(`/job/${data.id}/${states.running.includes(data.state)?'cancel':'restart'}`)
	 .then(()=>{
		DeviceEventEmitter.emit('update')
	 })
 }
 return (
	<Container>
	 <Line
	 icon={icon}
	 color={color}
	 label={`#${data.number} - ${data.stage?.name || ''	}`}
	 bold/>
	 <Content>
		<Line
		icon='timer'
		label={formatedDuration}/>
	 </Content>
	 <ButtonArea>
		{/*
		 <ViewLogButton>View Log</ViewLogButton>
		 */}
		 <RestartButton 
		 icon={states.running.includes(data.state)? 'close':'reload1'}
		 onPress={restartJob}/>
	 </ButtonArea>
	</Container>
 )
}




export default function JobView(props){
 return(
	<>
	<TextTitle>Build Jobs</TextTitle>
	{props.data.map(job=>(
	 <Job data={job} key={job.id}/>
	))}
	</>
 )
}
