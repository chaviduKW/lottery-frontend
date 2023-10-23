import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager:'',
    players:[],
    balance:''
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager:manager , players: players, balance:balance})
  }

  render() {
    //web3.eth.getAccounts().then(console.log)
    
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} people entered</p>
        <p>Total price pool is: {web3.utils.fromWei(this.state.balance,'ether')} ether</p>
      </div>
    );
  }
}
export default App;
