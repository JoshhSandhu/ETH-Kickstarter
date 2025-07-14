// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public{
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
contract Campaign {
    struct Request{
        string description;
        uint value;
        address payable recipient; //it can be another address
        bool complete;
        uint approvalCount; 
        mapping(address => bool) approvals; // Renamed from approverals
    }

    modifier restricted(){
        require(
            msg.sender == manager,
            "Not the manager"
        );
        _;
    }

    mapping(uint => Request) public requests;
    address public manager; //address of the manager
    uint public numRequests;
    uint public minimumContribution; //min amt of contributers for the campaign
    uint public approversCount; //number of approvers
    mapping(address => bool) public approvers;
    
    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    //the payable keywords helps Contributers recive transcations
   function contribute() public payable {
        require(
            msg.value > minimumContribution, 
            "The minimum contribution is not met"
        );

       if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
       }
       
    } 

    function createRequest(
        string memory description, 
        uint value, 
        address payable recipient
    ) public restricted {
        Request storage newRequest = requests[numRequests++]; 
        newRequest.description = description;
        newRequest.value= value;
        newRequest.recipient= recipient;
        newRequest.complete= false;
        newRequest.approvalCount= 0;
    }

    function approveRequest(uint index) public restricted
    {
        Request storage request = requests[index];

        //makes sure this person is the approver
        require(
            approvers[msg.sender], 
            "Not an approver"
        ); 
        
        //to make sure the approver has not voted till now
        //require statents can take place anywhere in the code
        require(
            !request.approvals[msg.sender], //already storing the request in a local variable
            "Already approved"
        ); 
        
        requests[index].approvals[msg.sender] = true; //the approver has been marked voted on the list
        requests[index].approvalCount++; // the approval count has been updated
    
    }

    function finalizeRequest(uint index) public restricted
    {
        //it's storage copy
        //this is a local variable created to use the request from
        Request storage request = requests[index]; 
        
        //checks that more than half of people have approve the campaign
        require(
            request.approvalCount > (approversCount / 2),
            "Not enough approvers"
        );

        //stops people from finilizing the request multiple times
        require(
            !request.complete,
            "Request already finalized"
        ); 
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCounts() public view returns (uint256){
            return numRequests;
    }

}