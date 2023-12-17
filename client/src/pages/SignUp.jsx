import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from '../components/OAuth';


export default function SignUp() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({...formData, [e.target.id]: e.target.value})
  }
 // console.log(formData); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/backend/signup', {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
        const data = await res.json();
        setLoading(false);
        if(data.success === false){
          setError(true);
          return
        }
      navigate('/signin')
    } catch (error) {
      setLoading(false); 
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" required id="username" className="bg-slate-100 p-3 
        rounded-lg" onChange={handleChange}/>
        <input type="email" placeholder="me@example.com" required id="email" className="bg-slate-100 p-3 
        rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Password" required id="password" autoComplete="on" className="bg-slate-100 p-3 
        rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-800 text-white p-3 rounded-lg uppercase
        hover:opacity-95 disabled:opacity-65">
          {loading ? 'Loading...': 'Sign Up'}
        </button>
        <Auth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to='/signin'>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      <p className="text-red-600">
        {error && 'Something went wrong'}
      </p>
    </div>
  )
}
