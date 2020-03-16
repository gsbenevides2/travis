export function handleBuildPassingColor(buildPassing){
 if(buildPassing === 'passed'){
	return '#05C47A'
 }
 else if(buildPassing === 'failed'){
	return '#D32F2F'
 }
 else if(buildPassing === 'created'){
	return '#FFF176'
 }
 else{
	return '#757575'
 }
}
