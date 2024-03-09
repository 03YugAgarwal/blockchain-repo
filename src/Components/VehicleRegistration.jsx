import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { contractABI, contractAddress } from "../config";

const VehicleRegistration = () => {
  const [username, setUsername] = useState(window.localStorage.getItem("username")) || "";
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleCompany, setVehicleCompany] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");

  useEffect(()=>{
    if(window.localStorage.getItem("username") === null){
      window.location.href = "/login";
    }
  },[])

  const handleSubmit = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
      const registrationContract = new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      const accounts = await web3.eth.getAccounts();
      
      await registrationContract.methods
        .createRegistrationData(username, vehicleNo, vehicleType, vehicleModel, vehicleCompany, vehicleColor)
        .send({ from: accounts[0]});
      
      // Reset form fields after successful registration
        setUsername("");
      setVehicleNo("");
      setVehicleType("");
      setVehicleModel("");
      setVehicleCompany("");
      setVehicleColor("");

      console.log("Data registered successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error registering data:", error);
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>
        <table>
          <tbody>
            <tr>
              <td>Vehicle Number:</td>
              <td>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Vehicle Type:</td>
              <td>
                <input
                  type="text"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Vehicle Model:</td>
              <td>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Vehicle Company:</td>
              <td>
                <input
                  type="text"
                  value={vehicleCompany}
                  onChange={(e) => setVehicleCompany(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Vehicle Color:</td>
              <td>
                <input
                  type="text"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default VehicleRegistration;
