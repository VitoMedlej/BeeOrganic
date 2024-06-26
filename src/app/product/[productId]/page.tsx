"use client"
import Btn from '@/Components/Btn/Btn'
import HomeProductsCarousel from '@/Components/HomeProductsCarousel/HomeProductsCarousel'
import ProductImageCarousel from '@/Components/ProductImageCarousel/ProductImageCarousel'
// import ProductOptionSelect from '@/Components/ProductOptionSelect/ProductOptionSelect'
// import ProductReview from '@/Components/ProductReview/ProductReview'
import {  Box, CircularProgress, Divider, Grid, Typography } from '@mui/material'
import {BsWhatsapp} from 'react-icons/bs'
import {AiOutlineShoppingCart} from 'react-icons/ai'
// import BreadCrumb from '@/Components/BreadCrumb/BreadCrumb'
// import  Head from 'next/head'
import useCart from '@/Hooks/useCart'
import { useEffect, useState } from 'react'
import { IProduct } from '@/Types/Types'
import { useParams } from 'next/navigation'
import { server } from '@/Utils/Server'
import { QuantityPicker } from '@/Components/Shared/QuantityPicker/QuantityPicker'
import ProductOptionSelect from '@/Components/ProductOptionSelect/ProductOptionSelect'
import SelectWeight from '@/Components/SelectWeight/SelectWeight'


function roundWeight(weight : any) {
  if (weight % 100 === 0) {
      // If weight is already a multiple of 100, return as is
      return weight;
  } else {
      // Round to the nearest hundred
      const rounded = Math.round(weight / 100) * 100;
      // Check if rounding down is needed
      if (weight % 100 === 50 && weight > rounded) {
          return rounded + 50; // Round down for numbers ending in 50
      }
      return rounded;
  }
}
function parseSize(sizeStr: string): number | any {
  let size: number | any;

  if (sizeStr.endsWith('g')) {
    // Remove the last character ('g') and parse the remaining string to a float
    size = parseFloat(sizeStr.slice(0, -1));
  } else {
    // If the string doesn't end with 'g', parse it directly
    size = parseFloat(sizeStr);
  }

  return roundWeight(size);
}





const Index = () => {
    const {productId} = useParams()
    const {incrementQty} = useCart()
 
    const {addToCart}= useCart()
    const [loading,setLoading] = useState(false)
    const [selectedQuantity,setSelectedQuantity] = useState(1)
    // const [productselectedSize,setproductselectedSize] = useState('')

    const [data,setData] = useState<{
      product: IProduct | any ;
      moreProducts: IProduct[] | never[];
    }>
    ({
      product : null,
      moreProducts : []
    })
    console.log('data?.product: ', data?.product);
   
    
    const [selectedSize, setselectedSize] = useState({size:'',price:''});
    
       const InitialFetch = async () => {
        try {
          setLoading(true)
          const req = await fetch(`${server}/api/get-by-id?id=${productId}`,{ cache: 'no-store' })
          const res = await req.json()
        
          if (res?.success && res?.product) {
          setData({product:res?.product,moreProducts : res?.moreProducts})
          
          setLoading(false);
        
    
          }
          setLoading(false)
          return null

        }
        catch(er) {
          console.log('er getAll: ', er);
          setLoading(false)

      
        }
      }
      useEffect(() => {
        
        InitialFetch()
        
        return  ()=> setLoading(false)

      }, [])
      console.log('data?.product?.sizes ? data?.product?.sizes:  [{price:Number(data?.product?.price),size:`250`}]: ', data?.product?.sizes && data?.product?.sizes?.length > 0 ? data?.product?.sizes:  [{price:Number(data?.product?.price),size:`250`}]);
  return (
     
    
      <Box sx={{mt:4}}>
 
{!loading && data?.product !== undefined && data?.product?.title ?  <Grid sx={{maxWidth:'lg',mx:1,pt:{sm:15,md:15,lg:9}}} className='auto' container>
       <Grid  item xs={12}  md={7} >
         <ProductImageCarousel images={data?.product?.images}/>
   
       </Grid>
       <Grid sx={{
        // border:'1px solid #00000029',
        px:{xs:1,sm:1.5}}} item xs={12}  md={5}>
         <Box sx={{pt:{xs:3,sm:0}}}>
             <Typography component={'h1'} sx={{fontWeight:400,pt:1,fontSize:{xs:'2em',sm:'2.25sem',md:'3em'}}}>
              {data?.product?.title || 'Loading Product Details'}
             </Typography>
           { data?.product?.inStock !== false ? <Typography className='green' component={'h1'} sx={{fontSize:'1.25em',fontWeight:300}}>
               In Stock
             </Typography>
            : 
            <Typography className='red' component={'h1'} sx={{color:'red',fontSize:'1.25em',fontWeight:300}}>
               Out of stock
             </Typography>
            }
          {data?.product?.inStock !== false &&   <Typography 
                 component={'h1'} sx={{my:.25,fontWeight:500,color:'green',fontSize:{xs:'1em',sm:'1.55em'}}}>
                 ${
                 selectedSize?.price ||
                 data?.product?.price || 0}
             </Typography>}
             
            
         </Box>
   
      
         
            {data?.product?.inStock !== false ? <Box className='flex wrap ' sx={{my:2,position:'relative'}}>
              <Box sx={{width:{xs:'max-content'}}}>

             <QuantityPicker 
                    onChange={(e:number)=>{setSelectedQuantity(e)}}
                    
                    min={1} max={10} value={selectedQuantity}/>
              </Box>
            
     
              <SelectWeight
              selectedSize={selectedSize  }
              setselectedSize={setselectedSize}

              sizes={data?.product?.sizes &&
                 data?.product?.sizes?.length > 0
                 ? data?.product?.sizes: 
               [{price:Number(data?.product?.price),size:`${parseSize(data?.product?.size)}`}]}/>
     
             <Btn 
                     onClick={()=>addToCart(selectedQuantity,`${data?.product?._id}`,{title : data.product.title ,category: data.product.category,img:data.product.images[0], _id : data.product._id,price:selectedSize?.price ? selectedSize?.price : data?.product?.price, productselectedSize:selectedSize?.size,productselectedPrice:selectedSize?.price},true,true)}
             
              sx={{gap:.5,
                borderRadius:0,
             width:{xs:'95%',sm:'95%'}}}>
                 <Typography component='h1'>
                 ADD TO CART

                 </Typography>
                 <AiOutlineShoppingCart  fontSize={'medium'}/>
             </Btn>
            

             <a 
             className='center  text-center'
             style={{textDecoration:'none',width:'95%'}} href={`https://wa.me/${process.env.NEXT_PUBLIC_WA}?text=I would like to know more about: ${data?.product?.title || 'Product Name'}`} target='_blank' rel='noopener'>


<Btn      sx={{gap:.5,
                borderRadius:0,
                mt:1,
                border:'none',
                background:'white',color:'green',
             width:{xs:'100%'}}}>
                 WHATSAPP 
                 <BsWhatsapp fontSize={'medium'}/>
             </Btn>
             </a>
          

             </Box>
            :
            <Typography component={'h1'} sx={{color:'red',fontWeight:400,pt:1,fontSize:{xs:'1.5em',sm:'2.25sem'}}}>
            Out of Stock
           </Typography>
            }
         <Divider></Divider>

         <Box sx={{pt:4}}>
         {/* { data?.product?.size && <Box >
             <Box sx={{pb:1}}>
                 <Typography >

                Product Weight:{' '}
                  <strong>
                 {data?.product?.size}
                  </strong>
                 </Typography>
             </Box>
            
         </Box>} */}

         {/* { data?.product?.colors && data?.product?.colors?.length > 0 && <Box className='flex' sx={{py:2}}>
                 <Typography >
                 <strong>Colors:</strong>{' '}
                 </Typography>
             <Box  className='flex wrap row' sx={{gap:'.1em'}}>
                 {
                 
                data?.product?.colors.map((color : string)=>{
                  
                  return <Box className='cursor' key={color}
                  onClick={()=>setproductselectedSize(color)}
                  sx={{mx:1,width:'25px',height:'25px',borderRadius:'50%',boxShadow:'1px 1px 3px gray',background:color,border:`2px solid ${color === productselectedSize ? 'blue':'transparent'}`}}></Box>
                 }) }
             </Box>
              
             
         </Box>} */}
           { data?.product?.Category && <Box >
             <Box >
                 <Typography >
                {data.product.category}
                 </Typography>
             </Box>
            
         </Box>}

           
             <Typography className='gray' sx={{whiteSpace:'pre-wrap',maxWidth:'100%'}}>
   {data?.product?.description}
             </Typography>
         </Box>
       </Grid>
         {/* <ProductReview/>  */}
       <HomeProductsCarousel Collectiontitle={"Shop More Products"} delay={3000} data={data?.moreProducts} />
   </Grid> : <Box className='flex auto center align-center' sx={{py:15}}>

     <CircularProgress />
   </Box>
     }
   </Box>
    
  )
}

export default Index




