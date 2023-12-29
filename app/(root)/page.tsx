'user server'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default async function Home() {
  const result = await fetchPost();  
  
  return (
    <>
      <h1 className='head-text text-left'>
        Home
      </h1>
    </>
  )
}
