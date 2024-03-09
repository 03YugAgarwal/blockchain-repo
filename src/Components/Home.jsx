import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { contractABI, contractAddress } from "../config";

const Home = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [userRegistrationContract, setUserRegistrationContract] =
    useState(null);
  const [users, setUsers] = useState([]);
  const [localStorageUsername, setLocalStorageUsername] = useState("");

  useEffect(() => {
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
        const storedUsername = window.localStorage.getItem("username");
        setLocalStorageUsername(storedUsername);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };
    loadBlockchainData();
  }, []);

  const fetchUserData = async (contract) => {
    try {
      const registrationCount = await contract.methods
        .registrationCount()
        .call();
      const usersArray = [];
      for (let i = 1; i <= registrationCount; i++) {
        const user = await contract.methods.registrationData(i).call();
        console.log("User fetched:", user);
        usersArray.push(user);
      }
      console.log("Fetched users:", usersArray);
      setUsers(usersArray);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          window.localStorage.removeItem("username");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
      <h1>Your Registered Vehicles: </h1>
      {localStorageUsername && (
        <table>
          <thead>
            <tr>
              <th>Status</th>
              {/* <th>Username</th> */}
              <th>Vehicle No</th>
              <th>Vehicle Type</th>
              <th>Vehicle Model</th>
              <th>Vehicle Company</th>
              <th>Vehicle Color</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                {user.username === localStorageUsername && (
                  <>
                    <td>{user.approved ? "Approved" : "Pending"}</td>
                    <td>{user.vehicleNo}</td>
                    <td>{user.vehicleType}</td>
                    <td>{user.vehicleModel}</td>
                    <td>{user.vehicleCompany}</td>
                    <td>{user.vehicleColor}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Register New Vehicle</h3>
      <button
        onClick={() => {
          window.location.href = "/new";
        }}
      >
        Register New Vehicle
      </button>
    </div>
  );
};

export default Home;
