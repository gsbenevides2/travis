import styled from 'styled-components/native'

export const Container = styled.View`
 flex:1;
 backgroundColor:${props=>props.theme.color};
`

export const Image = styled.Image`
 flex:1;
 resizeMode:contain;
 width:undefined;
 height:undefined;
`
