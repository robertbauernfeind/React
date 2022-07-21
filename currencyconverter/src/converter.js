import React from 'react';
import { useState, useEffect } from 'react';
import "./css/converter.css";
import { Button, Card, CardContent, CardHeader, Alert, Collapse, IconButton, ThemeProvider, createTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>

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
  const [conversionRate, setConversionRate] = useState();
  const [convertedValue, setConvertedValue] = useState();
  const [alert, setAlert] = useState();

  const convertValue = async () => {
    setAlert({
      open: false
    });

    if(fromCurr != null && toCurr != null){
      try{
        const url = "http://localhost:8080/conversionRate?fromCurr=" + fromCurr + "&toCurr=" + toCurr;
        console.log(url);
        const res = await fetch(url, {mode:"cors"});
        const data = await res.json();
        
        console.log(data);

        if(data.msg != null) {
          throw {
            name: "Exception",
            message: data.msg,
            toString: function() {
              return (this.name + ": " + this.message);
            }
          }
        }

        var rate = data.rate;
        setConversionRate((Math.round(data.rate * 100) / 100).toString());

        setConvertedValue((Math.round((parseFloat(input) * rate) * 100) / 100));

        setAlert({
          type: "success",
          msg: "success!",
          open: true
        });
      }
      catch(e) {
        console.log(e);
        setAlert({
          type: "error",
          msg: e.toString(),
          open: true
        });
      }
    } else {
      setAlert({
        type: "warning",
        msg: "Currencies must be selected",
        open: true
      });
    }
  }

  const currencies = LoadCurrencies();

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setConvertedValue();
  }

  const handleFromSelection = (event) => {
    setFromCurr(event.target.value);
    setConvertedValue();
  }

  const handleToSelection = (event) => {
    setToCurr(event.target.value);
    setConvertedValue();
  }

  const handleSubmit = async () => {
    if(input != null && input != "") {
      convertValue();
    } else {
      setAlert({
        type: "warning",
        msg: "Value needed!",
        open: true
      });
      setConvertedValue();
    }
  }

  return(
    <>
      <Card 
        sx={{ maxWidth: 325}}
        className="inline-child"
        >
        <CardHeader title="Currency Converter"/>
        <CardContent>
          <div className='cFrom'>
              <h3 className='inline-child lblCurr'>From:</h3>
              <select className='inline-child ddlCurr' onChange={handleFromSelection}>
                <option key="defaultVal" defaultValue="" ></option>
                  {currencies&&
                      currencies.map((data) => {return <option key={data}>{data}</option>})
                  }
              </select>
          </div>

          <div className='cTo'>
          <h3 className='inline-child lblCurr'>To:</h3>
              <select className='inline-child ddlCurr' onChange={handleToSelection}>
                <option key="defaultVal" defaultValue="" ></option>
                  {currencies&&
                      currencies.map((data) => {return <option key={data}>{data}</option>})
                  }
              </select>
          </div>
          
          <div>
            <input className="tbxValue" type="text" placeholder='value' onSubmit={handleSubmit} onChange={handleInputChange}/>
          </div>

          <div>
            <Button className="btnSubmit" variant='contained' onClick={handleSubmit}>Submit</Button>
          </div>

          {convertedValue&&
            <p>{input} {fromCurr} are {convertedValue} {toCurr}</p>
          }
          {(conversionRate && convertedValue)&&
            <p>Conversion-rate: {conversionRate}</p>
          }

          {alert&&
            <Collapse in={alert.open}>
              <Alert 
                className="alert"
                severity={alert.type}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlert({
                        open: false
                      })
                    }}
                  >
                    <CloseIcon fontSize="inherit"/>
                  </IconButton>
                }
              >{alert.msg}</Alert>
            </Collapse>
          }
        </CardContent>
      </Card>
    </>
  );
}