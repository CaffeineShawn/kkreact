import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
    return <>
        <div>Home</div>
        <nav>
            <div className='flex-col'>
            <Link to='/login'>Login</Link>
            <Link to='/posts'>Posts</Link>
            <Link to='/upload'>Upload</Link>
            </div>
        </nav>
    </>
}
export default Home