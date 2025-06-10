// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Campaign {
    struct Request{
        string description;
        uint value;
        address payable recipient; //it can be another address
        bool complete;
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    Request[] public request;
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

    function createRequest(string memory description, uint value, address recipient) public restricted
    {
        require(approvers[msg.sender]);
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: payable(recipient),
            complete: false
        });

        request.push(newRequest);
    }
}