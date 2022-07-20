import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';

function LoadCurrencies() {
    const [curr, setCurr] = useState([]);
  
    const makeAPICall = async () => {
      try{
        const url = "http://localhost:8080/data";
        const res = await fetch(url, {mode:"cors"});
        const data = await res.json();
        
        setCurr(data);
      }
      catch(e) {
        console.log(e);
      }
    }
  
    useEffect(() => {
      makeAPICall();
    }, []);
  
    return(curr);
}

export function ConvPage() {
    const currencies = LoadCurrencies();

    return(
        <>
            <div className='cFrom'>
                <h3>From:</h3>
                <select>
                    {currencies&&
                        currencies.map((data) => {return <option key={data} onSelect={console.log("Selected")}>{data}</option>})
                    }
                </select>
            </div>
            <div className='cTo'>

            </div>
        </>
    );
}