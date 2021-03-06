import styled from 'styled-components'

export const List = styled.FlatList`
 padding:10px;
 backgroundColor:${props=>props.theme.bg};
`

export const Image = styled.Image.attrs({
 resizeMode:'contain'
})`
 marginTop:25px;
 width:280px;
 height:280px;
`

export const Container = styled.View`
 flex:1;
 alignItems:center;
 backgroundColor:${props=>props.theme.bg};
`
export const Text = styled.Text`
 fontSize:45px;
 textAlign:center;
 fontWeight:600;
 color:${props=>props.theme.text};
`
