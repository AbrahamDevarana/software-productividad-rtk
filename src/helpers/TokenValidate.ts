import jwtDecode from 'jwt-decode';
import { clientAxios } from '../config/axios';



export function getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
        return null;
    }

    return willExpireToken(accessToken) ? null : accessToken;

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