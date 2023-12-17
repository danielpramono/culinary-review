import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
      
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/backend/google', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
              }),
            });
            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log('could not login with google', error);
        }
    };
    return (
        <button type="button" onClick={handleGoogle} className="bg-red-700 text-white rounded-lg p-3 uppercase
        hover:opacity-95">
            Continue With Google
        </button>
    )
}