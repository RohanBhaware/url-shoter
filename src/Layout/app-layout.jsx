import { Outlet } from "react-router-dom"
import Header from "../components/Header";
// import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        {/* Header */}

        <Header/>
        <Outlet /> 

        {/* body */}

      </main>
      {/* footer */}
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made by ____?? 
      </div>
    </div>
  )
}

export default AppLayout;
