import React, { useEffect, useState } from "react";
import "./HomeCard.css";
import Web3 from "web3";
import { contractABI, contractAddress } from "../config";

const HomeCard = (props) => {
  const handleApprove = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
      const registrationContract = new web3.eth.Contract(
        contractABI,
        contractAddress
      );
      const account = (await web3.eth.getAccounts())[0];
      const vehicleId = props.index + 1;
      await registrationContract.methods
        .approveMarketplace(vehicleId)
        .send({ from: account });
      window.location.reload();
    } catch (error) {
      console.error("Error approving marketplace:", error);
    }
  };
  console.log(props.user);
  return (
    <div className={`homecard ${props.user.approved} `}>
      <img src={props.user.imageHash} alt="vehicle" />
      <h3>{props.user.vehicleNo}</h3>
      <h3>{props.user.vehicleType}</h3>
      <h3>{props.user.vehicleModel}</h3>
      <h3>{props.user.vehicleCompany}</h3>
      <h3>{props.user.vehicleColor}</h3>
        <a
          href={props.user.documentHash1}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
        <a
          href={props.user.documentHash2}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
        {/* <button onClick={()=> window.location.href = "/transfer"} >Transfer Ownership</button> */}
      </div>
  );
};

export default HomeCard;
