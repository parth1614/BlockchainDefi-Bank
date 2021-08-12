// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    //using SafeMath for uint256; 
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token) ERC20("FarmToken", "FRM")
    {
        token = IERC20(_token);
    }

    //BALANCE FUNCTION
    function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
     //DEPOSIT FUNCTION
     function deposit(uint256 _amount) public  {
    // Amount must be greater than zero
    require(_amount > 0, "amount cannot be 0");

    // Transfer MyToken to smart contract
    token.safeTransferFrom(msg.sender, address(this), _amount);

    // Mint FarmToken to msg sender
    _mint(msg.sender, _amount);
}

    //WITHDRAW FUNCTION
   
   function withdraw(uint256 _amount) public {
   //Withdraw from contracct
   _burn(msg.sender, _amount);
   //transfer to account
   token.safeTransfer(msg.sender, _amount);
}
  
}