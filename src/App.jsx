import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UrlProvider from './constext'

import AppLayout from './Layout/app-layout'
import RequireAuth from './components/require-auth'

import RedirectLink from './pages/redirectLink'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/dashboard'
import Links from './pages/link'
import Auth from './pages/auth'



const router = createBrowserRouter([
  
 {
    element:<AppLayout/>,
    children: [
      {
        path: '/',
        element:<LandingPage/>,
      },
      {
        path: '/dashboard',
        element:(
          <RequireAuth>
            <Dashboard/>
          </RequireAuth>
        ),
      },
      {
        path: '/link/:id',
        element:(
          <RequireAuth>
            <Links/>
          </RequireAuth>
        ),
      },
      {
        path: '/auth',
        element:<Auth/>,
      },
      {
        path: '/:id',
        element:<RedirectLink/>,
      },
    ],
  },
]);


function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App



//DB
// https://supabase.com/dashboard/project/jprnzgtywwxtbfaojqgu/editor/17317