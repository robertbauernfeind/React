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
        selectedTo: ""
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

    const handleChange = (event) => {
        switch(event.target.id) {
            case "txtFrom":
                break;

            case "txtTo":
                break;

            case "cbxFrom":
                console.log(event.target.value);
                break;

            case "cbxTo":
                console.log(event.target.value);
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
                            label={curr.from}
                            onChange={handleChange}
                            className="txtFields inline-childs"
                            size="small"
                            sx={{
                                width: 75
                            }}
                        />
                        
                        <Autocomplete
                            sx={{
                                width: 120
                            }}
                            id='cbxFrom'
                            options={curr.array}
                            className="cbxFields inline-child"
                            size="small"
                            renderInput={(params) => <TextField {...params} label="From"/>}
                        />
                    </div>

                    <div className='to'>
                        <TextField
                            id="txtTo"
                            label={curr.to}
                            onChange={handleChange}
                            className="txtFields inline-childs"
                            size="small"
                            sx={{
                                width: 75
                            }}
                        />
                        
                        <Autocomplete
                            sx={{
                                width: 120
                            }}
                            id='cbxTo'
                            options={curr.array}
                            className="cbxFields inline-child"
                            size="small"
                            renderInput={(params) => <TextField {...params} label="To"/>}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}