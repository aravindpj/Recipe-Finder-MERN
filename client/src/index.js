import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Viewdetail from './pages/Viewdetail/Viewdetail';
import Addrecipe from './pages/Addrecipe/Addrecipe';
import Signin from './pages/Signin/Signin';
import Signup from './pages/SignUp/Signup';
import {store} from './store/store'
import { Provider } from 'react-redux'
import Myrecipe from './pages/Myrecipe/Myrecipe';
const router = createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:"/recipeview/:recipeId",
        element:<Viewdetail/>
      },
      {
        path:"/addrecipe",
        element:<Addrecipe/>
      },
      {
        path:"/signin",
        element:<Signin/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:'/myrecipe',
        element:<Myrecipe/>
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

   <Provider store={store}>
     <RouterProvider router={router}/>
   </Provider> 

);


