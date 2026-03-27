// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {

    struct File {
        string cid;
        string name;
        address uploader;
        uint timestamp;
    }

    File[] public files;

    function uploadFile(string memory _cid, string memory _name) public {
        files.push(File(_cid, _name, msg.sender, block.timestamp));
    }

    function getFile(uint index) public view returns (
        string memory, string memory, address, uint
    ) {
        File memory file = files[index];
        return (file.cid, file.name, file.uploader, file.timestamp);
    }

    function getTotalFiles() public view returns (uint) {
        return files.length;
    }
}