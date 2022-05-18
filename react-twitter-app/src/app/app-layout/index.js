import React from 'react'
import Navbar from '../../components/common/core/navbar'

const AppLayouts = ({children}) => {
 return (
  <div className="flex flex-col">
   <div className="shadow z-10">
    <Navbar/>
   </div>
   <div className="h-full flex overflow-hidden">
    {/*<main className="max-w-7xl mx-auto overflow-y-auto focus:outline-none w-full z-0 bg-gray-100">{children}</main>*/}

    <main className="w-full">
     <div className="max-w-7xl mx-auto p-6">
      {children}
     </div>
    </main>
   </div>
  </div>
 )
}

export default AppLayouts
