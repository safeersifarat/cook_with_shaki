import { Navbar, TextInput, Button,Avatar } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

export default function Header() {
  return (
    <Navbar className='border-b-2'>
     <span className='self-center whitespace-nowrap text-sm sm:text-xl 
     font-semibold dark:text-white px-2 py-1 bg-gradient-to-r
      from-indigo-500 via-purple-500 to-pink-500 rounded-lg
       text-white'>COOK WITH SHAKI
      </span>
     <form >
        <TextInput 
            type='text'
            placeholder='search recipies..'
            rightIcon={AiOutlineSearch}
        />
     </form>
     <div className='flex gap-3'>
      <Button className='hidden sm:inline' color='gray' pill>
        <FaMoon />
      </Button>
      <Link to='/signin'>
       <Button className='flex flex-wrap bg-transparent'>
       <Avatar rounded />
       </Button>
      </Link>
     </div>
    
    </Navbar> 
  )
}
  