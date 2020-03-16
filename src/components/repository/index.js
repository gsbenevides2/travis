import React from 'react'
import {parseISO,formatDistanceStrict} from 'date-fns'
import {
 Repo,
 RepoName,
 RepoDuration,
 RepoFinished
} from './styles'

function formateDuration(duration){
 if(typeof duration === 'undefined'){
	return ' -'
 }
 const min = parseInt(duration /60)
 const sec = duration%60
 if(min>0){
	return ` ${min} min ${sec} sec`
 }
 else{
	return ` ${sec} sec`
 }
}

export default function({data ,onPress}){
 return(
	<Repo onPress={onPress}  buildPassing={data.state}>
	 <RepoName buildPassing={data.state}>{data.slug}</RepoName>
	 <RepoDuration>Duration:{formateDuration(data.duration)}</RepoDuration>
	 {data.finished_at && <RepoFinished>Finished: {formatDistanceStrict(parseISO(data.finished_at),new Date())} ago</RepoFinished>}
	</Repo>
 )
}
