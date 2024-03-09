import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { contractABI, contractAddress } from "../config";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [userRegistrationContract, setUserRegistrationContract] =
    useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("username") !== null) {
      window.location.href = "/";
    }
    const loadBlockchainData = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        setWeb3(web3);
        const userRegistrationContract = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        const accounts = await web3.eth.getAccounts();
        setUserRegistrationContract(userRegistrationContract);
        setAccount(accounts[0]);
        await fetchUserData(userRegistrationContract);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };
    loadBlockchainData();
  }, []);

  const fetchUserData = async (contract) => {
    try {
      const userCount = await contract.methods.userCount().call();
      // console.log("User count:", userCount);
      const usersArray = [];
      for (let i = 1; i <= userCount; i++) {
        const user = await contract.methods.users(i).call();
        // console.log("User fetched:", user);
        usersArray.push(user);
      }
      // console.log("Fetched users:", usersArray);
      setUsers(usersArray);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!web3) {
        throw new Error("Web3 instance not initialized");
      }
      if (!userRegistrationContract) {
        throw new Error("User registration contract not initialized");
      }
      if (!username || !password) {
        throw new Error("Please provide both username and password");
      }

      const userExists = users.some(
        (user) => user.username === username && user.password === password
      );

      if (userExists) {
        console.log("User login successful");
        window.localStorage.setItem("username", username);
        window.location.href = "/";
      } else {
        alert("Incorrect username or password");
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <div>
      <h1>User Login</h1>
      <div>
        <table>
          <tr>
            <td>
              <label htmlFor="Username">Username: </label>
            </td>
            <td>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="Password">Password: </label>
            </td>
            <td>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={handleSubmit}>Submit</button>
            </td>
          </tr>
        </table>
      </div>
      New User? <Link to="/register">Register here</Link>
    </div>
  );
};

export default UserLogin;
