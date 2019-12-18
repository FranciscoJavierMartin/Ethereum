import React, { useEffect, useState } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

const App: React.FC = () => {
  const [manager, setManager] = useState<string>('');
  const [players, setPlayers] = useState<any[]>([]);
  const [balance, setBalance] = useState<any>('');
  const [value, setValue] = useState<any>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const setInitialManger = async () => {
      const myManager = await lottery.methods.manager().call();
      const myPlayers: any[] = await lottery.methods.getPlayers().call();
      const myBalance = await web3.eth.getBalance(lottery.options.address);

      setManager(myManager);
      setPlayers(myPlayers);
      setBalance(myBalance);
    };

    setInitialManger();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transactions success...');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.toWei(value, 'ether')
    });

    setMessage('You hace been entered');
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transactions success...');

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    setMessage('A winner has been picked');
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently{' '}
        {players.length} people entered, competing to win{' '}
        {web3.fromWei(balance, 'ether')} ether
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
          />
        </div>
        <button>Enter</button>
      </form>
      <hr/>
      <h4>Ready to pick a winner?</h4>
      <button onClick={onClick}>Pick a winner</button>
      <hr/>
      <h1>{message}</h1>
    </div>
  );
};

export default App;
