import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
    return <>
            <div className='w-screen justify-around bg-purple-300 py-5 content-area flex flex-col'>
                <Link className="font-bold text-md bg-white px-4 py-3 flex justify-center text-center mx-10 my-3 rounded-md" to='/login'>Login</Link>
                <Link className="font-bold text-md bg-white px-4 py-3 flex justify-center text-center mx-10 my-3 rounded-md" to='/posts'>Posts</Link>
                <Link className="font-bold text-md bg-white px-4 py-3 flex justify-center text-center mx-10 my-3 rounded-md" to='/upload'>Upload</Link>   
            </div>
    </>
}
export default Home