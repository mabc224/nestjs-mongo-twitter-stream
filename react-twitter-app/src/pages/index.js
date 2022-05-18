import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TweetListPage from './tweet-list-page'

const Pages = () => (
 <Routes>
  <Route path="*">
   <Route index={true} element={<TweetListPage/>}/>
  </Route>
 </Routes>
)

export default Pages
