// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Campaign {
    struct Request{
        string description;
        uint value;
        address recipient; //it can be another address
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals; // Renamed from approverals
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    
    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    //the payable keywords helps Contributers recive transcations
    function Contributers() public payable {
        require(msg.value > minimumContribution, "The minimum contribution is not met");
        approvers[msg.sender] = true;
    } 

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request storage newRequest = requests.push(); 
        newRequest.description = description;
        newRequest.value= value;
        newRequest.recipient= recipient;
        newRequest.complete= false;
        newRequest.approvalCount= 0;
    }

    function approveRequest(uint index) public restricted
    {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender] == false); //require statents can take place anywhere in the code

        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    
    }
}