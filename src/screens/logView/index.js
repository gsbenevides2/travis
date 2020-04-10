import React from 'react'
import {StatusBar,RefreshControl} from 'react-native'
import axios from 'axios'
import {IconButton} from 'react-native-paper'
import {Container,ScrollContainer,LogContainer} from './styles'
import ansicolor from 'ansicolor'

export default function LogView(props){
 const {jobId} = props.route.params
 const [html,setHtml] = React.useState('')
 const [loading,setLoading] = React.useState(false)

 async function loadData(){
	setLoading(true)
	props.navigation.setOptions({
	 headerRight:null
	})

	const {data} = await axios.get(`https://api.travis-ci.org/v3/job/${jobId}/log.txt`)
	const textHtml = data
	 .split('\n')
	 .map(line=>{
		const foldRE = /fold:(start|end):([\w_\-\.]+)/
		const timeRE = /time:(start|end):([\w_\-\.]+):?([\w_\-\.\=\,]*)/
		if(line.match(foldRE) || line.match(timeRE)){
		 try{
			const span = ansicolor.parse(line).spans[1]
			return `<span style='color:white;${span.css}'>${span.text}</span>`
		 }
		 catch(e){
			return ''
		 }
		}
		else{
		 return ansicolor.parse(line).spans.map(span=>{
			return `<span style='color:white;${span.css}'>${span.text}</span>`
		 }).join('')
		}
	 })
	 .join('<br\>')
	props.navigation.setOptions({
	 headerRight:()=>(
		<IconButton 
		icon='reload'
		color='#fff'
		onPress={loadData}
		size={25}		
	 />
	 )

	})
	setHtml(textHtml)
	setLoading(false)
 }

 React.useEffect(()=>{
	loadData()
 },[])
 return(
	<Container>
	 <StatusBar
	 barStyle='light-content'
	 backgroundColor='#000000'/>
	 <LogContainer
	 source={{
		html:`
	 <meta name='viewport' content='user-scale=1.0, minimum-scale=1.0'/>
	 <body style='background-color:#282a36'>
	 ${html}
	 </body>
	 `
	 }}/>
	</Container>
 )
}
