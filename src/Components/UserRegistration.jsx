import React from 'react'

const UserRegistration = () => {
  return (
    <div>
        <h1>User Registration</h1>
        <div>
            <form action="">
                <label htmlFor="Username">Username</label>
                <input type="text" />
                <label htmlFor="Password">Password</label>
                <input type="password" />
                <button>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default UserRegistration