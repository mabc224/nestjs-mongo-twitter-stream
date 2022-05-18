import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AppLayouts from '../app/app-layout'
import Pages from './../pages/index'

const App = () => {
 return (
  <AppLayouts>
   <Routes>
    <Route exact path="/" element={<>
     <h1 className="text-8xl">Get information about real time Tweets of specific topic such as Bitcoin</h1>
     <h4 className="text-4xl mt-6">Press "Tweets" in Navbar</h4>
    </>
    }/>
    <Route path="tweets/*" element={<Pages/>}/>
    <Route
     path="*"
     element={
      <main className="p-2">
       <p>There's nothing here!</p>
      </main>
     }
    />
   </Routes>
  </AppLayouts>
 )
}

export default App
