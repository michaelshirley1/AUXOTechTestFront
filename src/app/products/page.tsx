import React from 'react';
import fetch from 'node-fetch';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';


interface Part {
  identifier: number;
  description: string;
  price: number;
  quantity: number;
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
          quantity: updatedRows[i][1].quantity
        });
      }
    }
  }
  export default async function products(){
    await getParts();
    return (
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Amount in Stock</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {parts.map((row) => (
          <TableRow key={row.identifier}>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    );
  };