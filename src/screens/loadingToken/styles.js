import styled from 'styled-components/native'
import {ActivityIndicator} from 'react-native-paper'

export const Container = styled.View`
 flex:1;
 alignItems:center;
 justifyContent:center;
 backgroundColor:#ffffff;
`

export const Spinner = styled(ActivityIndicator).attrs({
 size:120
})``
