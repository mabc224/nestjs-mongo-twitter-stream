import React from 'react'
import { Provider } from 'react-redux'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import store from '../redux/store/store'
import App from './index'

const MainApp = () =>
 <Provider store={store}>
  <BrowserRouter>
   <Routes>
    <Route path="/*" element={<App/>}/>
   </Routes>
  </BrowserRouter>
 </Provider>

export default MainApp
