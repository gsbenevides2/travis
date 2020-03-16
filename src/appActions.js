import { AsyncStorage } from 'react-native';

export default {
 setToken(token) {
	AsyncStorage.setItem('token',token)
	return { 
	 type: 'SET_TOKEN',
	 payload: token
	}
 },
 setType(type){
	AsyncStorage.setItem('type',type)
	return { 
	 type: 'SET_TYPE',
	 payload: type
	}
 }
}
 
