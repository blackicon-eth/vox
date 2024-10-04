// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Vox {
    mapping(uint256 => uint256) public petitionVotes;

    function vote(uint256 petitionId) public {
        petitionVotes[petitionId] += 1;
    }

    function getVotes(uint256 petitionId) public view returns (uint256) {
        return petitionVotes[petitionId];
    }
}
