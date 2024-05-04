import { useEffect, useState } from "react";

//creating our own hook
//hook is nothing just a function, and one hook can be build using other hooks
//naming our hook as use<Name>, i.e looks like hooks format
//our hook takes some parameter value
function useCurrencyInfo(currency){

    const [data,setData]=useState({}); // for storing data object fetched from API

    //here creating async await for fetching API data
    //Async await used becoz fetch is asynchronus function, thus the code after it might run before fecthing data from API.
    const apiData= async(url)=>{
        try{
            const res=await fetch(url)
            const data= await res.json();
            const value=data[currency]
            setData(value);
            console.log(value);
        }
        catch(error){
            console.log(error);
        }
    }

    //now calling another function to call API we use useEffect, once the rendering happens
    useEffect(()=>{
        apiData(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
    }, [currency])


    return data; //this function return data (state variable value to whosoever part is calling this function)
}

export default useCurrencyInfo;