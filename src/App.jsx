import { useState } from 'react'


import './App.css'
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; 

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar /> 
      <div className="flex">
        <Sidebar /> 
        <main className="flex-1 p-6">
     
        
        </main>
      </div>
    </div>
  );
}

export default App;
