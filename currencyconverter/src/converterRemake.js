import React from 'react';
import { useState, useEffect } from 'react';
import "./css/converterRemake.css";
import { Button, Card, CardContent, CardHeader, Alert, Collapse, IconButton, ThemeProvider, createTheme, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function ConvPageRemake() {
    const [curr, setCurr] = useState({
        from: "",
        to: "",
        convRate: null
    });

    const handleTextChange = (event) => {
        switch(event.target.id) {
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
                    <TextField
                      id="convFrom"
                      label={curr.from}
                      onChange={handleTextChange}
                    />
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