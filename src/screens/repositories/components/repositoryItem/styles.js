import styled from 'styled-components'

export const Repo = styled.TouchableOpacity`
 width:100%;
 padding:10px;
 borderLeftWidth:10px;
 backgroundColor:${props=>props.theme.color};
 borderLeftColor:${props=>props.color}};
 marginBottom:5px;
`
export const RepoName = styled.Text`
 color:${props=>props.color};
`
export const RepoDuration = styled.Text`
 color:${props=>props.theme.text};
`
export const RepoFinished = styled.Text`
 color:${props=>props.theme.text};
`
