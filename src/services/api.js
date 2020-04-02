import axios from 'axios'
import {AsyncStorage} from 'react-native';

module.exports = axios.create({
 headers:{
	'Travis-API-Version':3
 }
})

module.exports.setAuthData = async ()=>{
 const {token,type} = await module.exports.getAuthData()
 module.exports.defaults.baseURL = `https://api.travis-ci.${type}`
 module.exports.defaults.headers.common['Authorization'] = `token ${token}`
}

module.exports.clearAuthData = async ()=>{
 await AsyncStorage.clear()
}

module.exports.getAuthData = async ()=>{
 const data = await AsyncStorage.multiGet(
	['type','token']
 )
 const authData = {
	type:data[0][1],
	token:data[1][1]
 }
 module.exports.authData = authData
 return authData
}

module.exports.authenticate = (type,token)=>{
 return new Promise((res,rej)=>{
	axios({
	 method:'get',
	 baseURL:`https://api.travis-ci.${type}`,
	 url:'/repos',
	 headers:{
		'Travis-API-Version':3,
		Authorization:`token ${token}`
	 }
	})
	 .then(response=>{
		AsyncStorage.setItem('token',token)
		AsyncStorage.setItem('type',type)
		module.exports.defaults.baseURL = `https://api.travis-ci.${type}`
		module.exports.defaults.headers.common['Authorization'] = `token ${token}`
		res(response)
	 })
	 .catch(rej)
 })
}

module.exports.reauthenticate =  ()=>{
 return new Promise(async (res,rej)=>{
	const {type,token} = await module.exports.getAuthData()
	module.exports.authenticate(type,token)
	 .then(res)
	 .catch(rej)
 })
}

module.exports.axios = axios
