import React from 'react'
import {
 Repo,
 RepoName,
 RepoDuration,
 RepoFinished
} from './styles'

import moment from 'moment'

import {
 states,
} from '~/utils'

export default function({data ,onPress}){
 const {current_build} = data
 const {state} = current_build
 const color =  states.colors[state]

 let formatedDuration = '-'
 if(state === 'started')	{
	const startedAtDate = moment(current_build.started_at)
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
 else if(state === 'failed' ||state ===  'passed'){
	const min = parseInt(current_build.duration /60)
	const sec = current_build.duration%60
	if(min>0){
	 formatedDuration = `${min} min ${sec} sec`
	}
	else{
	 formatedDuration =  `${sec} sec`
	}
 }

 let formatedFinished = '-'
 if(current_build.finished_at){
	formatedFinished = moment(current_build.finished_at).fromNow()
 }
 return(
	<Repo onPress={onPress}  color={color}>
	 <RepoName color={color}>{data.slug}</RepoName>
	 <RepoDuration>Duration: {formatedDuration}</RepoDuration>
	 {current_build.finished_at && 
		 <RepoFinished>Finished: {formatedFinished}</RepoFinished>
	 }
		</Repo>
 )
}
