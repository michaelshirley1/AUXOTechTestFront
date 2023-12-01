import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React, { CSSProperties } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Paper,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AUXO',
  description: 'AUXO Automotive Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link
  rel="icon"
  href="/icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
  />
      <div>
      <Container>
      <AppBar position="static">
        <Toolbar  sx={{ justifycontent: "space-between" }} >
          <Image src="https://auxosoftware.com/wp-content/themes/auxo-software/images/logo.svg" width={75} height={75} alt="" style={{ paddingRight: "2%" } as CSSProperties}/>
            <Button className="layoutButton" color="inherit" startIcon={<HomeIcon />}  href="/">
            Home
          </Button>
          <Button className="layoutButton" color="inherit" startIcon={<AddIcon />}  href="/order">
            Add Order
          </Button>
          <Button className="layoutButton" color="inherit" startIcon={<InsertDriveFileIcon />} href="/products">
            All Stock
          </Button>
        </Toolbar>
      </AppBar>
        <Paper>
          {children}
        </Paper>
      </Container>
    </div>
    </html>
  )
}
