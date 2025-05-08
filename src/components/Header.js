import React from 'react'

const Header = ({ user, userRole, onLogout }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <p className="mb-0"><strong>User:</strong> {user.email}</p>
        <p className="mb-0"><strong>Role:</strong> {userRole}</p>
      </div>
      <button onClick={onLogout} className="btn btn-outline-danger">Logout</button>
    </div>
  )
}

export default Header

