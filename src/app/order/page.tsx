import React from 'react';
import fetch from 'node-fetch';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

interface Part {
    identifier: number;
    description: string;
    price: number;
    quantity: number;
    orderedQuantity: number;
}

var parts: Part[] = [];

async function getParts() {
    if (parts.length == 0) {
      const https = require('https');
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
      const response = await fetch('https://localhost:55905/parts', { agent: httpsAgent });
      const result: Part[] = await response.json() as Part[];
      const updatedRows = Object.entries(result);

      for (var i = 0; i < updatedRows.length; i++) {
        parts.push({
          identifier: updatedRows[i][1].identifier,
          description: updatedRows[i][1].description,
          price: updatedRows[i][1].price,
          quantity: updatedRows[i][1].quantity,
          orderedQuantity: updatedRows[i][1].orderedQuantity
        });
      }
    }
}

var orderParts: Part[] = [];

export default async function order(){
    await getParts();
    var total = 0;
    //added a default part to the orderParts array for show purposes
    function addDisplayPart(){
      if (orderParts.length == 0){
        orderParts.push({
          identifier: 1,
          description: "test",
          price: 1,
          quantity: 1,
          orderedQuantity: 1,
        });
      }
    }
    //Would use this if the onclick was working
    function addPart(part: Part) {
      // 'use client'
      //   if (!orderParts.includes(part)){
      //     orderParts.push(part);
      //     parts = parts.filter(p => p !== part);
      //     updateTotal();
      //   }
    }
    function submitOrder() {
      // 'use client'
      //   Would use this if the onclick was working
      //   const https = require('https');
      // const httpsAgent = new https.Agent({
      //   rejectUnauthorized: false,
      // });
      // const response = await fetch('https://localhost:55905/parts', {
        // agent: httpsAgent
        //   method: "POST",
        //   mode: "cors",
        //   cache: "no-cache",
        //   credentials: "same-origin",
        //   headers: {
        //     "Content-Type": "application/json",
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //   },
        //   redirect: "follow",
        //   referrerPolicy: "no-referrer",
        //  body: JSON.stringify(orderParts)
      // });
      // return await response.json();
    }
    function updateTotal() {
      // 'use client'
      // for (var i = 0; i < orderParts.length; i++) {
      //   total += orderParts[i].price * orderParts[i].quantity;
      // }
      // return total;
    }
    addDisplayPart();
    return (
        <div>
        <Stack direction='row'>
        <TableContainer sx={{boxShadow: "5px 30px 40px rgba(0,0,0,.1)", marginRight:"1%"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {orderParts.map((row) => (
              <TableRow key={row.identifier}>
              <TableCell>{row.description}</TableCell>
                <TableCell>{"$" + row.price}</TableCell>
                <TableCell><TextField
          id="outlined-number"
          label=""
          type="number"
          onChange={updateTotal()}
          defaultValue={row.quantity}
          InputLabelProps={{
            shrink: true,
          }}
        /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <div style={{boxShadow: "5px 30px 40px rgba(0,0,0,.1)"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {parts.map((row) => (
              <TableRow key={row.identifier}>
                <TableCell><Button onClick={addPart(row)}>{<AddIcon />}</Button></TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </Stack>
      <Grid sx={{padding:"1%"}} justifyContent="space-between" container spacing={24}>
      <Grid item>
        <Typography variant="h6" component="div">
          Total: ${total}
        </Typography>
        </Grid>
        <Grid item>
        <Button sx={{float:"right"}} variant="contained" color="success" onClick={submitOrder()} endIcon={<SendIcon />}>
          Place Order
        </Button>
        </Grid>
      </Grid>
      </div>

    );
  };


