import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 onClick={()=>{window.location.href = "/"}}>Vehicle Registration</h1>
      <div>
        <button
          onClick={() => {
            window.location.href = "/new";
          }}
        >
          Register New Vehicle
        </button>
        <button
          onClick={() => {
            window.location.href = "/transfer";
          }}
        >
          Transfer Ownership
        </button>

        <button
          onClick={() => {
            window.localStorage.removeItem("username");
            window.location.href = "/login";
          }}
          className="logoutbutton"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
