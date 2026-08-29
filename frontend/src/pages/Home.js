import React, { useContext } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../components/FoodDisplay'
import MobileApp from '../components/MobileApp'
import Chatbot from '../components/Chatbot'
import PopularPicks from '../components/PopularPicks'
import WhyFeasto from '../components/WhyFeasto'
import SignupBanner from '../components/SignupBanner'
import { StoreContext } from '../context/StoreContext'

const Home = () => {
  const [category, setCategory] = useState('All');
  const { token } = useContext(StoreContext);

  return (
    <div className='max-w-[1280px] mx-auto'>
      <Header/>
      <PopularPicks/>
      <WhyFeasto/>
      <SignupBanner/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <MobileApp/>
      {token && <Chatbot />}
    </div>
  )
}

export default Home