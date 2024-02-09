import { Box } from '@mui/material'
import React from 'react'
import Header from '../components/Header'

const Main = () => {
  return (
    //TODO bg 테마 적용
    <Box sx={{display:'flex', background:'white'}}>
      <Header />
    </Box>
  )
}

export default Main