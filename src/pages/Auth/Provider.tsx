import { GoogleOAuthProvider } from '@react-oauth/google';
import { Loginv2 } from './LoginV2';

export const Provider = () => {
    return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Loginv2 />
    </GoogleOAuthProvider>
    )
}


