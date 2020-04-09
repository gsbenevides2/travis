import styled from 'styled-components'

export const Container = styled.KeyboardAvoidingView`
 flex:1;
 justifyContent:center;
 alignItems:center;
 backgroundColor:${props=>props.theme.bg};
`
export const Title = styled.Text`
 fontSize:25px;
 color:${props=>props.theme.text};
 fontWeight:bold;
 marginBottom:10px;
`
export const InputStyle = {
 width:'90%',
 height:60,
}
export const HelperStyle = {
 alignSelf:'flex-start',
 marginLeft:'5%'
}
export const LogoStyle = {
 width:200,
 height:200,
 marginTop:-150,
 marginBottom:10
}
