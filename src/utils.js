import {
 parseISO,
 differenceInSeconds,
 formatDistanceStrict
} from 'date-fns'

module.exports  = {
 runningStates:[
	'created', 
	'queued', 
	'received', 
	'started'
 ],
 colorByBuildState(state){
	const colors = {
	 created:'#F9A825',
	 queued:'#F9A825',
	 received:'#F9A825',
	 started:'#F9A825',
	 passed:'#038955',
	 ready:'#038955',
	 errored:'#D32F2F',
	 failed: '#D32F2F',
	}
	return colors[state] || '#757575'
 },
 capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
 },
 formateDuration(duration){
	if(typeof duration === 'undefined'){
	 return ' -'
	}
	const min = parseInt(duration /60)
	const sec = duration%60
	if(min>0){
	 return `${min} min ${sec} sec`
	}
	else{
	 return `${sec} sec`
	}
 },
 formateFinished(finishedAt){
	return formatDistanceStrict(
	 parseISO(finishedAt),new Date()
	)
 },
 calculateRanFor(initial,final,state){
	if(!initial && !final || state==='canceled'){
	 return ' - '
	}
	else if(initial && !final && state==='started'){
	 final = (new Date()).toISOString()
	}
	const initialDate = parseISO(initial)
	const finalDate = parseISO(final)
	const difference = differenceInSeconds(finalDate,initialDate)

	return module.exports.formateDuration(difference)
 },
 calculateDaysMonthsEtc(dateString){
	if(!dateString) return null
	const date = parseISO(dateString)
	return formatDistanceStrict(date,new Date())
 },
 ObjectIsEquivalent(a,b){
	var aProps = Object.getOwnPropertyNames(a);
	var bProps = Object.getOwnPropertyNames(b);
	if (aProps.length != bProps.length) {
	 return false;
	}
	for (var i = 0; i < aProps.length; i++) {
	 var propName = aProps[i];
	 if (a[propName] !== b[propName]) {
		return false;
	 }
	}
	return true;
 }
}
