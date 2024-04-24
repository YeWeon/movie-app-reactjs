import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollars, setDollars] = useState('');
  const [selected, setSelected] = useState('');
  const [res, setRes] = useState('');
  const onChange = (event) => {
    setDollars(event.target.value);
  };
  const onSelectBoxChange = (event) => {
    setSelected(event.target.value);
  };
  const onClick = () => {
    setRes(Math.round((dollars / selected) * 100) / 100);
  };
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setSelected(json[0].quotes.USD.price);
        setLoading(false);
      });
  }, []);
  console.log(coins);
  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <div>
            <input
              type="number"
              value={dollars}
              onChange={onChange}
              placeholder="Write Dollars"
            ></input>
          </div>
          <div>
            <select onChange={onSelectBoxChange}>
              {coins.map((coin) => (
                <option value={coin.quotes.USD.price} key={coin.id}>
                  {coin.name} ({coin.symbol}): $
                  {Math.round(coin.quotes.USD.price * 100) / 100} USD
                </option>
              ))}
            </select>
          </div>
          <button onClick={onClick}>Show</button>
          <div>{res ? `You can buy ${res} coins!` : null}</div>
        </>
      )}
    </div>
  );
}

export default App;
