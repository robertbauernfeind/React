import React from 'react';
import { useState, useEffect } from 'react';
import "./css/converterRemake.css";
import { Button, Card, CardContent, CardHeader, Alert, Collapse, IconButton, ThemeProvider, createTheme, TextField, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function ConvPageRemake() {
    const [curr, setCurr] = useState([]);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [valueFrom, setValueFrom] = useState();
    const [valueTo, setValueTo] = useState();
    const [convRate, setConvRate] = useState();

    const requestCurrencies = async () => {
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

    const requestConversionRate = async () => {
        try {
            const url = "http://localhost:8080/conversionRate?fromCurr=" + from + "&toCurr=" + to;
            console.log(url);
            const res = await fetch(url, {mode:"cors"});
            const data = await res.json();
        
            
            console.log(data);
            setConvRate(data.rate);
        }
        catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        requestCurrencies();
    }, []);

    useEffect(() => {
        if((from !== undefined) && (to !== undefined)) {
            requestConversionRate();
        }
    }, [from, to])

    const handleChange = (event) => {
        switch(event.target.id) {
            case "txtFrom":
                setValueFrom(event.target.value);
                if(convRate !== undefined){
                    if(!isNaN(event.target.value)) {
                        const convertedVal = parseFloat(event.target.value) * convRate
                        setValueTo(Math.round(convertedVal * 100) / 100);
                    }
                }
                break;

            case "txtTo":
                setValueTo(event.target.value);
                if(convRate !== undefined){
                    if(!isNaN(event.target.value)) {
                        const convertedVal = parseFloat(event.target.value) / convRate
                        setValueFrom(Math.round(convertedVal * 100) / 100);
                    }
                }
                break;
        }
    }

    return(
        <>
            <Card sx={{
                maxWidth: 325
                }}
                className="inline-child remakeCard"
            >
                <CardHeader title="Currency Converter" subheader="Remake"/>
                <CardContent>
                    <div className='from'>
                        <TextField
                            id="txtFrom"
                            onChange={handleChange}
                            className="txtFields inline-childs"
                            size="small"
                            value={valueFrom}
                            sx={{
                                width: 80
                            }}
                        />
                        
                        <Autocomplete
                            sx={{
                                width: 120
                            }}
                            id='cbxFrom'
                            options={curr}
                            className="cbxFields inline-child"
                            size="small"
                            onInputChange={(val) => setFrom(val.target.outerText)}
                            renderInput={(params) => <TextField {...params} label="From"/>}
                        />
                    </div>

                    <div className='to'>
                        <TextField
                            id="txtTo"
                            onChange={handleChange}
                            className="txtFields inline-childs"
                            size="small"
                            value={valueTo}
                            sx={{
                                width: 80
                            }}
                        />
                        
                        <Autocomplete
                            sx={{
                                width: 120
                            }}
                            id='cbxTo'
                            options={curr}
                            className="cbxFields inline-child"
                            size="small"
                            onInputChange={(val) => setTo(val.target.outerText)}
                            renderInput={(params) => <TextField id="test" {...params} label="To"/>}
                        />
                    </div>
                </CardContent>
            </Card>

        </>
    );
}