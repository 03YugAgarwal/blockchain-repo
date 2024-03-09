import "./App.css";

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { contractABI, contractAddress } from "./config";
import UserRegistration from "./Components/UserRegistration";

function App() {
  const [account, setAccount] = useState("");
  const [todoListContract, setTodoListContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  // const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        setWeb3(web3);
        const todoListContract = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        // console.log(todoListContract);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setTodoListContract(todoListContract);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };

    loadBlockchainData();
  }, []);

  return <div className="App">
    <UserRegistration />
  </div>;
}

export default App;
