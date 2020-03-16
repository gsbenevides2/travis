import styled from 'styled-components'

import { handleBuildPassingColor} from '~/utils.js'
export const Container = styled.View`
 padding:10px;
`
export const Card = styled.View`
 backgroundColor:#fff;
 borderLeftWidth:10px;
 borderLeftColor:${props=>handleBuildPassingColor(props.buildPassing)};

 padding:10px;
`
export const CardTitle = styled.Text`
 color:${props=>handleBuildPassingColor(props.buildPassing)};
 fontSize:20px;
 fontWeight:bold;
`
export const CardStat = styled.View`
 flex-direction: row;
 align-items: center;
`
export const StatText = styled.Text`
 marginLeft:5px;
`
export const StatTextColor = styled.Text`
 color:${props=>handleBuildPassingColor(props.buildPassing)};
 marginLeft:5px;
`
