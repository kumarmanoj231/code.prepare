import React from 'react'
import {SignedIn, SignedOut, SignInButton, SignOutButton, UserButton} from "@clerk/clerk-react"
import toast from 'react-hot-toast'

const HomePage = () => {
  return (
    <div>
      <h1>Home page</h1>
      <button className='btn btn-primary' onClick={()=>{
        toast.error("This is a success toast");
      }}>click me</button>

      <SignedOut>
        <SignInButton mode='modal'>
          <button className='btn btn-primary'>login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton/>
      </SignedIn>

      <UserButton/>

    </div>
  )
}

export default HomePage

