const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider({ gasLimit: 8000000 }));

const path = require('path');
const compiledFactory = require(path.resolve(__dirname, '../ethereum/build/CampaignFactory.json'));
const compiledCampaign = require(path.resolve(__dirname, '../ethereum/build/Campaign.json'));

///console.log(compiledFactory);
let accounts;
let factory;
let campaignAddress;
let campaign; //we are using these variables to make an instance to reuce the amount o code  we have to write

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    //we specify this line of code whenever we want to deploy a new contract
    //hence we dont specify the address in this
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: "1500000" });

        //anytime we send a transaction we only get a transaction recipt
    await factory.methods.createCampaign('100').send({
        from: accounts[0], //this is going to be the manager of this campaign
        gas: "1500000"
    });

    //this is es26 code
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    //this means we are taking the first element out of the array that is returned by the call and assigning it to campaignAdress

    //we write this line when the contract has already been deployed
    campaign = await new web3.eth.Contract(
       //JSON.parse(compiledCampaign.interface),
       compiledCampaign.abi,
       campaignAddress //we pass campaign address in this as an argumnet
    )
});

describe('Campaigns', () => {

    //to check the factory and the campaign were succressfully deployed
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    //test to check if account[0] is the manager of the campaign
    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    //test to check if people are able to onate money the campaign
    //and check if the preson is maked as an approver
    it('allows people to donate money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
            });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        //we are calling the approvers mapping which has a bool so if it returns true to our call
        //then it means this account is an approver
        //we can only look up single values form a mapping
        assert(isContributor);
    });

    //check if the campaign has got a minimum contribution
    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    //test to check if the manager has the abbility to create a payment request
    it('allows a manager to make a payment request', async () => {
        await campaign.methods
            .createRequest('buy chips', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1500000'
            });
        const request = await campaign.methods.requests(0).call();
        assert("buy chips", request.description);
    });


    //test that tests out everything the contract does
    it('processes requests', async () => {

        //we are contributing to the contract
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        // request to send 5 eather to accounts[1]
        await campaign.methods
            .createRequest('yelllow', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ from: accounts[0], gas: '1500000' 
        });

        //voting on the campaign request
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1500000'
        });

        //now we finalize the request
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1500000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance  = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 104);
    });
});