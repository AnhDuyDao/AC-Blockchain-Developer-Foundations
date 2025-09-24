// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistryV2 {
   address public owner;

   

   struct Student {
      string name;
      uint age;
      bool isRegistered;
   }

   mapping(address => Student) private students;

   error StudentNotRegistered();
   error StudentAlreadyRegistered();
   error NotOwner(address caller, address owner);

   modifier onlyOwner() {
      if (msg.sender != owner) {
         revert NotOwner(msg.sender, owner);
      }
      _;
   }

   constructor() {
      owner = msg.sender;
   }

   function registerStudent(string memory _name, uint _age) public onlyOwner {
      if (students[msg.sender].isRegistered) {
         revert StudentAlreadyRegistered();
      }
      students[msg.sender] = Student(_name, _age, true);
   }

   function getStudent(address _studentAddress) public view returns (string memory, uint) {
      if (!students[_studentAddress].isRegistered) {
         revert StudentNotRegistered();
      }
      Student memory student = students[_studentAddress];
      return (student.name, student.age);
   }

   function isStudentRegistered(address user) public view returns (bool) {
      return students[user].isRegistered;
   }
}