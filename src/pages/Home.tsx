import React from 'react'
import { Link } from 'react-router-dom'
import { Flipped } from 'react-flip-toolkit'

const Home = () => {
  return (
    <>
      <div className="w-screen h-screen py-5 content-area flex flex-col">
        <div className="flex-1 justify-around flex flex-col w-80 md:w-1/2 mx-auto text-xl">
          <Flipped flipId={'login'}>
            <Link
              className="font-bold text-md bg-white px-4 py-3 flex justify-center text-center mx-10 my-3 rounded-md"
              to="/login"
            >
              Login
            </Link>
          </Flipped>

          <Link
            className="font-bold text-md bg-white px-4 py-3 flex justify-center text-center mx-10 my-3 rounded-md"
            to="/infinityScroll"
          >
            Posts
          </Link>
          <Link
            className="font-bold text-md bg-white px-4 py-3 flex justify-center text-center mx-10 my-3 rounded-md"
            to="/searchPage"
          >
            SearchPage
          </Link>
          <Link
            className="font-bold text-md bg-white px-4 py-3 flex justify-center text-center mx-10 my-3 rounded-md"
            to="/upload"
          >
            Upload
          </Link>
        </div>
      </div>
    </>
  )
}
export default Home
