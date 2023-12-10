import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
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
      const res = await fetch('/backend/signin', {
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
      navigate('/');
    } catch (error) {
      setLoading(false); 
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="me@example.com" required id="email" className="bg-slate-100 p-3 
        rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Password" required id="password" autoComplete="on" className="bg-slate-100 p-3 
        rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-800 text-white p-3 rounded-lg uppercase
        hover:opacity-95 disabled:opacity-65">
          {loading ? 'Loading...': 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p> Don&rsquo;t Have an account ?</p>
        <Link to='/signup'>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-600">
        {error && 'Something went wrong'}
      </p>
    </div>
  )
}
