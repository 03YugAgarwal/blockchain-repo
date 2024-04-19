import React, { useState } from "react";
import Navbar from "./Navbar";
import Web3 from "web3";
import { contractABI, contractAddress } from "../config";

const Transfer = () => {

    const [vehicleNo, setVehicleNo] = useState("");
    // const [password, setPassword] = useState("");
    const [transferTo, setTransferTo] = useState("");

    

    const handleTransfer = async () => {
        try {
          const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
          const registrationContract = new web3.eth.Contract(
            contractABI,
            contractAddress
          );
          const account = (await web3.eth.getAccounts())[0];
          await registrationContract.methods
            .transferOwnership(vehicleNo,transferTo, window.localStorage.getItem("username") )
            .send({ from: account });
          window.location.href = '/';
        } catch (error) {
          console.error("Error transfering:", error);
        }
      };

  return (
    <div>
      <Navbar />
      <h1>Transfer Ownership</h1>
      <div className="transferForm">
        <h3>{null}</h3>
        <label>Vehicle Number:</label>
        <input type="text" value={vehicleNo}  onChange={(e) => setVehicleNo(e.target.value)} />
        <label>Transfer To: (username)</label>
        <input type="text" value={transferTo} onChange={(e) => setTransferTo(e.target.value)}/>
        <p>*This process is irreversible</p>
        <button onClick={handleTransfer}>Transfer</button>
      </div>
    </div>
  );
};

export default Transfer;
