// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {

   error StudentNotRegistered();
   error StudentAlreadyRegistered();

   struct Student {
      string name;
      uint age;
      bool isRegistered;
   }

   mapping(address => Student) public students;

   function register(string memory _name, uint _age) public {
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