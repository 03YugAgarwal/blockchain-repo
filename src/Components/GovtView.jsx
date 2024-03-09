import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { contractABI, contractAddress } from "../config";

const GovtView = () => {
  const storedLoginStatus = localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoginStatus === "true");
  const [vehicleData, setVehicleData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const registrationContract = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        const registrationCount = await registrationContract.methods
          .registrationCount()
          .call();
        const vehicleDataArray = [];
        for (let i = 1; i <= registrationCount; i++) {
          const vehicle = await registrationContract.methods
            .registrationData(i)
            .call();
          vehicleDataArray.push(vehicle);
        }
        setVehicleData(vehicleDataArray);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData();
  }, []);

  const handleApprove = async (index) => {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
      const registrationContract = new web3.eth.Contract(
        contractABI,
        contractAddress
      );
      const account = (await web3.eth.getAccounts())[0];
      const vehicleId = index + 1; // Add 1 to index to match with vehicleId in the contract
      await registrationContract.methods
        .approveRegistration(vehicleId)
        .send({ from: account });
      // Update the vehicle data after approval
      const updatedVehicleData = [...vehicleData];
      updatedVehicleData[index].approved = true;
      setVehicleData(updatedVehicleData);
      window.location.reload();
    } catch (error) {
      console.error("Error approving registration:", error);
    }
  };

  const handleLogin = () => {
    if (username !== "govt") {
      alert("Invalid Credentials");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn && (
        <>
          <h1>Govt View</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      {isLoggedIn && (
        <>
          <h1>Govt View</h1>
          <p>Welcome to the Govt View</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>All Vehicle Data</h2>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Username</th>
                <th>Vehicle No</th>
                <th>Vehicle Type</th>
                <th>Vehicle Model</th>
                <th>Vehicle Company</th>
                <th>Vehicle Color</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.approved ? "Approved" : "Pending"}</td>
                  <td>{vehicle.username}</td>
                  <td>{vehicle.vehicleNo}</td>
                  <td>{vehicle.vehicleType}</td>
                  <td>{vehicle.vehicleModel}</td>
                  <td>{vehicle.vehicleCompany}</td>
                  <td>{vehicle.vehicleColor}</td>
                  <td>
                    <button
                      disabled={vehicle.approved}
                      onClick={() => handleApprove(index)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default GovtView;
