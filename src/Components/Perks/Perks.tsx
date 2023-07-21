import { Box, Typography } from '@mui/material'
import React from 'react'

const Perks = () => {
    const items = [
        {
            title: 'World Wide Shipping',
            icon : 'https://www.svgrepo.com/show/282152/worldwide-shipping-and-delivery.svg'
        },
        {
            title: 'Best Quality',
            icon : 'https://www.svgrepo.com/show/467238/quality-3.svg'
        },
        {
            title: 'Super Comfortable',
            icon : 'https://www.svgrepo.com/show/513311/heart.svg'
        },
        {
            title: 'Delivery all over 🇱🇧',
            icon : 'https://cdn-icons-png.flaticon.com/512/9198/9198208.png'
        },

    ]
  return (
    <Box className='w100' sx={{px:1,py:8}}>
        <Box>
        <Typography
                className='sectionTitle box'
                sx={{
                  pt:'.5em',
                  mx:1,
                  width:'100%',
                  display:{xs:'flex',sm:'flex'},
                fontSize: {
                    xs: '1.2em',
                    sm: '1.4em'
                },
                fontWeight: '600'
            }}>
Advantages
            </Typography>
        </Box>
        <Box  className='flex wrap gap auto row justify-between'>

        {
           items.map(i=>{
                return <Box key={i.title} className='center items-center auto flex col' sx={{
                    py:2,
                    width:{xs:'49%',sm:'24%'}}}>
                    <Box sx={{width:'100px'}}>
                        <img src={i.icon} alt="" className="img contain" />
                    </Box>
                    <Typography className='text-center' sx={{fontSize:'1.15em'}}  component={'h1'}>{i.title}</Typography>
                    {/* <Typography sx={{fontSize:'.9em'}} component={'p'}>Fooer Name</Typography> */}
                </Box>
            })
        }
        </Box>

    </Box>
  )
}

export default Perks