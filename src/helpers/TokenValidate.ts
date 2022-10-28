import jwtDecode from 'jwt-decode';
import { clientAxios } from '../config/axios';



export function getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if(accessToken)  return willExpireToken(accessToken) ? null : accessToken;
    
    if(!accessToken && !refreshToken) {

        return null;
    }
    
    if(!accessToken && refreshToken) {
        return willExpireToken(refreshToken) ? null : refreshToken
    }

    

}

export function getRefreshToken(){
  const refreshToken = localStorage.getItem('refreshToken')

  if(!refreshToken || refreshToken === 'null' || refreshToken === 'undefined'){
      return null
  }

  return willExpireToken(refreshToken) ? null : refreshToken
}

export async function refreshAccessToken(){
	const refreshToken = localStorage.getItem('refreshToken')
	try {
		await clientAxios.post('/auth/refresh-access-token', {refreshToken})
		.then( response => {
			const { accessToken, refreshToken }:any = response
			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', refreshToken)
		})
		
	} catch (error) {

	}
}

function willExpireToken(token: any) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { expiresIn }:any = metaToken;
    const now = (Date.now() + seconds) / 1000;
    return now > expiresIn;
}