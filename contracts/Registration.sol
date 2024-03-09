pragma solidity >=0.4.21 <0.9.0;

contract Registration {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

   struct User {
        uint id;
        string username;
        string password;
    }


  modifier restricted() {
    if (msg.sender == owner) _;
  }

    mapping(uint => User) public users;
    uint public userCount = 0;

    function createUser(string memory _username, string memory _password) public {
        userCount++;
        users[userCount] = User(userCount, _username, _password);
    }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Registration upgraded = Registration(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}