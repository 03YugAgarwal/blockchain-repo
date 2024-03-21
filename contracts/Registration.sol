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

    struct RegistrationData {
        uint registerId;
        string username;
        string vehicleNo;
        string vehicleType;
        string vehicleModel;
        string vehicleCompany;
        string vehicleColor;
        bool approved;
        string documentHash1;
        string documentHash2;
        string imageHash;
    }


  modifier restricted() {
    if (msg.sender == owner) _;
  }

    mapping(uint => User) public users;
    uint public userCount = 0;

    mapping(uint => RegistrationData) public registrationData;
    uint public registrationCount = 0;

    function createUser(string memory _username, string memory _password) public {
        userCount++;
        users[userCount] = User(userCount, _username, _password);
    }

    // function createRegistrationData(string memory _username, string memory _vehicleNo, string memory _vehicleType, string memory _vehicleModel, string memory _vehicleCompany, string memory _vehicleColor) public {
    //     registrationCount++;
    //     registrationData[registrationCount] = RegistrationData(registrationCount, _username, _vehicleNo, _vehicleType, _vehicleModel, _vehicleCompany, _vehicleColor, false);
    // }

    function createRegistrationData(string memory _username, string memory _vehicleNo, string memory _vehicleType, string memory _vehicleModel, string memory _vehicleCompany, string memory _vehicleColor, string memory _documentHashe1,string memory _documentHashe2, string memory _imageHash) public {
        registrationCount++;
        registrationData[registrationCount] = RegistrationData(registrationCount, _username, _vehicleNo, _vehicleType, _vehicleModel, _vehicleCompany, _vehicleColor, false, _documentHashe1, _documentHashe2, _imageHash);
    }

    
    function approveRegistration(uint _registerId) public {
        require(msg.sender == owner, "Only owner can approve registration");
        require(_registerId > 0 && _registerId <= registrationCount, "Invalid registration ID");
        registrationData[_registerId].approved = true;
    }
     

}