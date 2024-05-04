import { useState } from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import "./App.css";

function App() {

  const [amount, setAmount] = useState() //initial amount to be work on 
  const [from, setFrom] = useState("usd") // initial currency from which we have to convert
  const [to, setTo] = useState("inr") // initial currency to which we want converted value
  const [convertedAmount, setConvertedAmount] = useState()
  const [selectCurrencyFrom, setSelectCurrencyFrom] = useState(from); // initially we show usd as default option in select panel currency
  const [selectCurrencyTo, setSelectCurrencyTo] = useState(to); // initially we show inr as default option in select panel currency

  //getting all currencies to be converted from "from" varibale to other types in key:value pair (list of objects in key:value pair)
  // it runs every time on re-render so that on new currency it fetches new lists becoz of selectCurrencyFrom var changes on changing value
  const currencyInfo = useCurrencyInfo(selectCurrencyFrom)

  //now here storing all keys only from list of objects
  const options = Object.keys(currencyInfo)

  //fucntion to swap the values and make changes in UI
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  //converting function, multiplying "From amount" to "To amount"
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[selectCurrencyTo])
  }

  return (
    <div className="w-full min-h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/1006060/pexels-photo-1006060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
    >
        <div className='bg-blue border border-gray-60 rounded-lg p-5 m-3 backdrop-blur-lg bg-white/30 font-bold'>Currency Converter</div>

        <div className="w-full m-3">
            <div className="w-full max-w-md mx-auto border-2 border-gray-100 rounded-lg p-5 backdrop-blur-lg bg-white/30">
                
                {/*making form, on submit it calls convert function */}
                <form
                  onSubmit={(e) => {
                      e.preventDefault();
                      convert()  
                  }}>

                  <div className="w-full mb-1">
                        {/* We are passing 2 function as a props, i.e onCurrencyChange() to change the currency type on UI when selecting from options tag */}
                        {/* and other is onAmountChange() i.e on changing amount in input tag it reflects the changes in UI as well as in amount */}
                      <InputBox
                          label="From"
                          amount={amount}
                          currencyOptions={options}
                          onCurrencyChange={(selectCurrencyFrom) => setSelectCurrencyFrom(selectCurrencyFrom)}
                          selectedCurrency={selectCurrencyFrom}
                          onAmountChange={(amount) => setAmount(amount)}
                          //here not passing amountDisable, as it is for amount from which money will be converted "input tag"
                      />
                  </div>

                  <div className="w-full h-0.5 m-3 p-4">
                      <button
                          type="button"
                          className="scale-100 hover:scale-90 transition duration-200 ease-in-out absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white rounded-md bg-black text-white font-bold px-2 py-1"
                          onClick={swap}
                      >
                          swap
                      </button>
                  </div>

                  <div className="w-full mt-1 mb-4">
                      <InputBox
                          label="To"
                          amount={convertedAmount}
                          currencyOptions={options}
                          onCurrencyChange={(selectCurrencyTo) => setSelectCurrencyTo(selectCurrencyTo)}
                          selectedCurrency={selectCurrencyTo}
                          //passing amountDisable as true for Converted amount input tag
                          amountDisable
                      />
                  </div>

                  <button type="submit" className="scale-100 hover:scale-95 transition duration-200 ease-in-out w-full bg-black font-bold border-4 text-white px-4 py-3 rounded-lg">
                      Convert {selectCurrencyFrom.toUpperCase()} to {selectCurrencyTo.toUpperCase()}
                  </button>
                </form>
            </div>
        </div>

        <div className='bg-blue border border-gray-60 rounded-lg p-5 m-3 backdrop-blur-lg bg-white/30'>
            <a href='https://github.com/ratneshmaurya' target='_blank' className='flex flex-col'>
                <p className='w-full font-bold'>Made by Ratnesh Maurya✨</p>
                <p className='text-sm'>Click To Learn more about me...</p>
            </a>
        </div>
    </div>
);
}

export default App