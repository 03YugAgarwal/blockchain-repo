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

    function getUserId(string memory _username) public view returns(uint) {
        for(uint i = 1; i <= userCount; i++) {
            if(keccak256(abi.encodePacked(users[i].username)) == keccak256(abi.encodePacked(_username))) {
                return i;
            }
        }
        return 0;
    }
    function getRegistrationId(string memory _vehicleNo) public view returns(uint) {
        for(uint i = 1; i <= registrationCount; i++) {
            if(keccak256(abi.encodePacked(registrationData[i].vehicleNo)) == keccak256(abi.encodePacked(_vehicleNo))) {
                return i;
            }
        }
        return 0;
    }

    function transferOwnership(string memory _vehicleNo, string memory _username,string memory _oldUsername) public{
        uint registerId = getRegistrationId(_vehicleNo);
        require(registerId > 0, "Invalid vehicle number");
        require(msg.sender == owner, "Only owner can transfer ownership");

        if(keccak256(abi.encodePacked(_username)) != keccak256(abi.encodePacked(_oldUsername))) {
            return;
        }

        registrationData[registerId].username = _username;
    }

}