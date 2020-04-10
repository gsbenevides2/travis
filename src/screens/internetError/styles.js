import styled from 'styled-components'

export const Container = styled.View`
 flex:1;
 backgroundColor:${props=>props.theme.bg};
 alignItems:center;
`
export const Image = styled.Image.attrs({
 resizeMode:'contain'
})`
 marginTop:25px;
 width:280px;
 height:280px;
`
export const Title = styled.Text`
 marginTop:10px;
 fontSize:45px;
 textAlign:center;
 fontWeight:600;
 color:${props=>props.theme.text};
`
export const Text = styled.Text`
 marginTop:5px;
 marginBottom:10px;
 fontSize:20px;
 color:${props=>props.theme.text};
`
