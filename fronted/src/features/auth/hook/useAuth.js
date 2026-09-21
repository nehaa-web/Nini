import { useDispatch } from 'react-redux';
import { register, login, getMe } from '../services/auth.api.js';
import { setUser, setLoading, setError } from '../auth.slice.js';

export function useAuth() {

    const dispatch = useDispatch();

    async function handleRegister({ email , username ,password}) {

        try{
            dispatch(setLoading(true));
            const data = await register({ email , username , password})
            dispatch(setUser(data.user));
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Register failed'));
        } finally {
            dispatch(setLoading(false));
        }

    }

  async function handleLogin({ email, password }) {
  try {
    dispatch(setLoading(true));

    const data = await login({ email, password });

    dispatch(setUser(data.user));

    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Login failed"));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
}
 async function handleGetMe() {
  try {
    dispatch(setLoading(true));

    const data = await getMe()

    dispatch(setUser(data.user));
  } catch (error) {
    console.log("GET ME ERROR:", error);
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
}
    return { handleRegister, handleLogin, handleGetMe };
}