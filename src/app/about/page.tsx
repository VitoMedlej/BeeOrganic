import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Index = () => {
  return (
    <Container className='auto' sx={{px:{xs:1,sm:2},maxWidth:'lg'}}>
        <Box sx={{height:'auto',width:'auto',maxWidth:{xs:'100%',sm:'400px',}}}>
            <img src="https://ucarecdn.com/52bad3ac-a9b5-4828-841a-743ad5ba165f/408815357_241739175441936_7001628279217248818_n.jpg" alt="" className="img" />
      </Box>
      <Typography component='p' sx={{pt:4}}>
    {`
Welcome to BeeOrganic, a proud member of the Eiffel Institution family since our establishment in [Year]. Nestled in the heart of Lebanon, BeeOrganic is dedicated to championing the legacy of Lebanese-European expertise in bee culture, treatments, vitamins, and essential products. Under the umbrella of the esteemed Eiffel Institution, which has been a cornerstone since 1990, we passionately contribute to the growth of a robust Lebanese industry that caters to the unique climate of Lebanon and the broader Arab region, including Gulf countries.

At BeeOrganic, we uphold the principles of specialized knowledge, expertise, and high standards in crafting medications and treatments for various bee species. Our commitment to excellence has made us a trusted name in the industry, earning the confidence of nations such as Egypt, Oman, Yemen, Syria, UAE, Saudi Arabia, Jordan, and Kuwait. The unwavering support from these countries speaks volumes about our dedication to advancing bee culture and honey production sectors.

As part of the Eiffel Institution, BeeOrganic is proud to be associated with a legacy that extends across borders. Our products bear the distinction of being trademarked and registered with the Ministry of Economy under number 155929, ensuring that every bottle and jar carries the stamp of quality that has become synonymous with the Eiffel name.

Join us on our journey as we continue to blend tradition with innovation, bringing you the finest bee-derived products that are not just nourishing but also sustainably sourced. BeeOrganic – where the Eiffel Institution legacy meets the buzz of nature's goodness.`}
      </Typography>
    </Container>
  )
}

export default Index