import styled from 'styled-components'
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export const Container = styled.View`
 flex:1;
 width:${screenWidth}px;
`
export const LogContainer = styled(WebView)`
`
