import { useDispatch} from 'react-redux';
import { login, register , getMe} from '../auth/auth.slice.js';
import { setUser, setLoading, setError } from '../auth/auth.slice.js';


export function useAuth() {

    const dispatch = useDispatch();

    async function handleRegister({ email , username ,password}) {

        try{
            dispatch(setLoading(true));
            const data = await register({ email , username ,password})

        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Registration failed'));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email , password}) {

        try{
            dispatch(setLoading(true));
            const data = await login({ email , password})
            dispatch(setUser(data.user));
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Login failed'));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {

        try{
            dispatch(setLoading(true));
            const data = await getMe()
            dispatch(setUser(data.user));
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'GetMe failed'));
        }finally {
            dispatch(setLoading(false));
        }   
    }

    return { handleRegister, handleLogin, handleGetMe };
}