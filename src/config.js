// import TodoListContract from "../build/contracts/TodoList.json"; // Replace with your contract JSON file
// import TodoListContract from `${process.env.PUBLIC_URL}/build/contracts/TodoList.json`;
// import TodoListContract from process.env.PUBLIC_URL + '/build/contracts/TodoList.json';
import RegistratonContract from "contracts/Registration.json";

// export const contractAddress = "0xfB8947743e98dE53CAcc5C0058FC34E6280e643B";
export const contractAddress = RegistratonContract.networks["5777"].address;
export const contractABI = RegistratonContract.abi;
// const addressValue = RegistratonContract.networks["5777"].address;
// console.log(addressValue);
