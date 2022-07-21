import React from 'react';
import { useState, useEffect } from 'react';
import "./css/converterRemake.css";
import { Button, Card, CardContent, CardHeader, Alert, Collapse, IconButton, ThemeProvider, createTheme, TextField, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function ConvPageRemake() {
    const [curr, setCurr] = useState({
        from: "",
        to: "",
        convRate: null,
        array: [],
        selectedFrom: "",
        selectedTo
    });

    const makeAPICall = async () => {
        try{
            const url = "http://localhost:8080/data";
            const res = await fetch(url, {mode:"cors"});
            const data = await res.json();
            
            setCurr({array: data});
        }
        catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        makeAPICall();
    }, []);

    const handleTextChange = (event) => {
        switch(event.target.id) {
            case "txtFrom":
        }
    }

    return(
        <>
            <Card sx={{
                maxWidth: 325
                }}
                className="inline-child"
            >
                <CardHeader title="Currency Converter" subheader="Remake"/>
                <CardContent>
                    <div className='from'>
                        <TextField
                            id="txtFrom"
                            label={curr.from}
                            onChange={handleTextChange}
                            className="txtFields"
                            size="small"
                            sx={{
                                width: 75
                            }}
                        />
                        
                        <Autocomplete
                            id='cbxFrom'
                            options={curr.array}
                            size="small"
                            renderInput={(params) => <TextField {...params} label="From"/>}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

async function RequestCurrencies() {
    const url = "http://localhost:8080/data";
    const res = await fetch(url, {mode:"cors"});
    const data = await res.json();

    return data;
}