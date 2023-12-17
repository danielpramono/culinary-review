import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-green-300 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500">
                        Culinary 
                    </span>
                    <span className="text-slate-700">
                        Review
                    </span>
                </h1>
            </Link>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link> 
                <Link to='/SignIn'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Sign In</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}