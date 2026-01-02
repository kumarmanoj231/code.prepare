import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Welcome to the app</h1>
    <SignedOut>
      <SignInButton mode='modal'>Login</SignInButton>
    </SignedOut>
    <SignedIn>
      <SignOutButton/>
    </SignedIn>

    <SignedIn>
      <UserButton/>
    </SignedIn>
    </>
  )
}

export default App
