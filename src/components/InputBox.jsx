import React, {useId} from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   const amountInputId = useId()

    return (
        // this div is for whole amount section and currency section
        // also getting a classname from user, thus using backticks form and using varibale in that
        <div className={`flex flex-col md:flex-row bg-white p-3 rounded-lg text-sm ${className} `}>

            {/* this div is for the Amount part, i.e left part section */}
            <div className="w-full md:w-1/2 m-1.5">
                <label htmlFor={amountInputId}  className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-gray-100 p-2 rounded-lg"
                    type="number"
                    disabled={amountDisable}
                    // if amountDisable is there, i.e for converted amount input tag, then show the converted amount as placeholder
                    placeholder={amountDisable ? "Your Converted Amount" : "Enter Amount Here"}
                    value={amount}

                    //now here on changing the input value we check whether onAmountChange() function exist or not, 
                    // if yes then passing the parameter to function, and also converting to number first then passing as parameter i.e
                    //we are converting the event vaue into number, becoz bydefault it is in string
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>


            {/* this div is for the currency selection part, i.e right part section */}
            {/* important, as select tag just used to select values from something, but it works along with <option tag> */}
            <div className="w-full md:w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Select Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}>
                    
                {/* now showing here different options of currency as an option list */}
                {currencyOptions.map((currency) => (
                    <option key={currency} value={currency}>
                    {currency}
                    </option>
                ))}
                </select>

            </div>

        </div>
    );
}

export default InputBox;