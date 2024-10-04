// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Vox {
    struct Petition {
        address creator;
        uint256 votes;
        address[] voters;
    }

    mapping(uint256 => Petition) public petitions;

    function vote(uint256 petitionId, address voterAddress) public {
        petitions[petitionId].votes += 1;
        petitions[petitionId].voters.push(voterAddress);
    }
}
