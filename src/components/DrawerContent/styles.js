import styled from 'styled-components'
import {DrawerContentScrollView} from '@react-navigation/drawer';

export const Container = styled(DrawerContentScrollView)`
 backgroundColor:${props=>props.theme.bg};
`
