import styled from 'styled-components'

import { handleBuildPassingColor} from '~/utils'

export const Repo = styled.TouchableOpacity`
 width:100%;
 padding:10px;
 borderLeftWidth:10px;
 backgroundColor:white;
 borderLeftColor:${props=>handleBuildPassingColor(props.buildPassing)};
 marginBottom:5px;
`
export const RepoName = styled.Text`
 color:${props=>handleBuildPassingColor(props.buildPassing)};
`
export const RepoDuration = styled.Text`
`
export const RepoFinished = styled.Text`
`
