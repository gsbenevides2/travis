import styled from 'styled-components'

export const View = styled.ScrollView`
 backgroundColor:${props=>props.theme.bg};
`
export const AccountType = styled.TouchableOpacity`
 flexDirection:row;
 padding:10px;
`
export const Info = styled.View`
 marginLeft:10px;
`
export const Title = styled.Text`
 color:${props=>props.theme.text};
 fontSize:18px;
 fontWeight:bold;
`
export const Url = styled.Text`
 color:#02623D;
`
export const LogoStyle = {
 width:80,
 height:80
}
