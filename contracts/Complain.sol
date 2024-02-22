// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Complain {

    struct Candidate {
        string name;
        string party;
        string imageUri;
    }

    struct Voter {
        address adr;
        bool voted;
        uint weight;
    }

    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount;

    address public owner;

    mapping(uint256 => uint256) public votes;
    uint256 public totalVotes;

    mapping (uint8 => Voter) public voters;

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string calldata name, string calldata party, string calldata imageUri) public {
        require(owner == msg.sender, "Not the owner of the contract");
        candidateCount++;
        Candidate memory person = Candidate({ name: name, party: party, imageUri: imageUri });
        candidates[candidateCount] = person;
    }

    function giveRightToVote(uint8 voter) public {
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }


    function vote(uint256 id,uint8 voter) public {
        require(voters[voter].weight > 0, "You don't have the right to vote.");
        require(!voters[voter].voted,"You have already voted" );
        require(id > 0, "Candidate doesn<t exist");
        require(id <= candidateCount, "Candidate doesn<t exist");
        votes[id]++;
        totalVotes++;
        voters[voter].voted = true;
    }
}