// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Welcome {
    string public greeting;
    

    constructor(string memory initMessage) {
        greeting = initMessage;
    }

    function getGreeting() public view returns (string memory, address) {
      // Return a tuple containing the greeting message and the caller's address
        return (greeting, msg.sender);
    }
}