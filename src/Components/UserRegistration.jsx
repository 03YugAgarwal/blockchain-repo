import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { contractABI, contractAddress } from "../config";
import { Link, useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [web3, setWeb3] = useState(null);

  const [account, setAccount] = useState("");
  const [userRegistrationContract, setUserRegistrationContract] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("username") !== null) {
      window.location.href = "/";
    }

    const loadBlockchainData = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        setWeb3(web3);
        // let provider = window.ethereum;
        // console.log(provider);

        // if (typeof provider !== 'undefined') {
        //     //Metamask is installed
        //     provider
        //     .request({method: 'eth_requestAccounts' })
        //     .then((accounts) => {
        //     console.log(accounts);
        //     })
        //     .catch((err) => {
        //     console.log(err);
        //     });
        // }

        const userRegistrationContract = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        const accounts = await web3.eth.getAccounts();
        // console.log(accounts);
        setUserRegistrationContract(userRegistrationContract);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };
    loadBlockchainData();
  }, []);

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

      await userRegistrationContract.methods
        .createUser(username, password)
        .send({ from: account });

      setUsername("");
      setPassword("");
    // await alert("User registration successful");
      window.localStorage.setItem("username", username);
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
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
      Login: <Link to="/login">Login</Link>
    </div>
  );
};

export default UserRegistration;
