import { useEffect, useState } from 'react'
import { products } from '@service'
import { useParams } from 'react-router-dom'
import { ProductDetails } from '@modals'

const Index = () => {
   const { id } = useParams()
   const [data, setData] = useState({})
   const [detail, setDetail] = useState({})

   const getData = async()=>{
      const res = await products.getDetail(id)
      if(res.status === 200){
         setData(res?.data?.data?.product)
         setDetail(res?.data?.data?.product_detail)
      }
   }
   useEffect(()=>{
      getData()
   },[id])

  return (
    <div className='text-2xl'>
        <h1>Product name: {data.name} </h1>
        <h1>Product price: {data.price} </h1>
        <h1>Product detail: <ProductDetails detail={detail}/> </h1>
    </div>
  )
}

export default Index
