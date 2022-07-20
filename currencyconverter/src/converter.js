import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import "./css/converter.css";

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
  const [input, setInput] = useState();
  const [fromCurr, setFromCurr] = useState();
  const [toCurr, setToCurr] = useState();
  const [convertedValue, setConvertedValue] = useState();

  const makeAPICall = async () => {

    if(fromCurr != null && toCurr != null){
      try{
        const url = "http://localhost:8080/conversionRate?fromCurr=" + fromCurr + "&toCurr=" + toCurr;
        console.log(url);
        const res = await fetch(url, {mode:"cors"});
        const data = await res.json();
        
        console.log(data.rate);
      }
      catch(e) {
        console.log(e);
      }
    } else {
      alert("fromCurr and toCurr must not be null");
    }
  }

  const currencies = LoadCurrencies();

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const handleFromSelection = (event) => {
    setFromCurr(event.target.value);
  }

  const handleToSelection = (event) => {
    setToCurr(event.target.value);
  }

  const handleSubmit = () => {
    if(fromCurr != null && toCurr != null && input != null) {
      makeAPICall();
    }
  }

  return(
      <>
          <div className='cFrom'>
              <h3 className='inline-child lblCurr'>From:</h3>
              <select className='inline-child ddlCurr' onChange={handleFromSelection}>
                  {currencies&&
                      currencies.map((data) => {return <option key={data}>{data}</option>})
                  }
              </select>
          </div>

          <div className='cTo'>
          <h3 className='inline-child lblCurr'>To:</h3>
              <select className='inline-child ddlCurr' onChange={handleToSelection}>
                  {currencies&&
                      currencies.map((data) => {return <option key={data}>{data}</option>})
                  }
              </select>
          </div>
          
          <div>
            <input className="tbxValue" type="text" placeholder='value' onChange={handleInputChange}/>
          </div>

          <div>
            <input className="btnSubmit" type="submit" value="convert" onClick={handleSubmit}/>
          </div>

          <p>{input}</p>
      </>
  );
}