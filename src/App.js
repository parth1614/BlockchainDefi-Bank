import React, { Component } from 'react';
import Main from './Main.js';
import Web3 from 'web3'
//import DaiToken from './abis/DaiToken.json'
import MyToken from './build/contracts/MyToken.json'
import FarmToken from './build/contracts/FarmToken.json'



class App extends Component {

async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadBlockchainData() {
    const web3 = window.web3
const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

     // Load DaiToken
    /*const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }*/

    // Load MyToken
    const MyTokenData = MyToken.networks[networkId]
    if(MyTokenData) {
      const MyToken = new web3.eth.Contract(MyToken.abi, MyTokenData.address)
      this.setState({ MyToken })
      let MyTokenBalance = await MyToken.methods.balanceOf(this.state.account).call()
      this.setState({ MyTokenBalance: MyTokenBalance.toString() })
    } else {
      window.alert('MyToken contract not be deployed to detected network.')
    }

    // Load TokenFarm
    const FarmTokenData = FarmToken.networks[networkId]
    if(FarmTokenData) {
      const FarmToken = new web3.eth.Contract(FarmToken.abi, FarmTokenData.address)
      this.setState({ FarmToken })
      let stakingBalance = await FarmToken.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('FarmToken contract not be deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  deposit = (amount) => {
    this.setState({ loading: true })
    this.state.MyToken.methods.approve(this.state.FarmToken._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.FarmToken.methods.deposit(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  withdraw = (amount) => {
    this.setState({ loading: true })
    this.state.FarmToken.methods.withdraw().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
     // daiToken: {},
      MyTOken: {},
      FarmToken: {},
     // daiTokenBalance: '0',
      MyTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }


 render(){

let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
       // daiTokenBalance={this.state.daiTokenBalance}
        MyTokenBalance={this.state.MyTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }


    return (
    
      <div className="Main">
    {content}
      </div>
  );
 }
}

export default App;
