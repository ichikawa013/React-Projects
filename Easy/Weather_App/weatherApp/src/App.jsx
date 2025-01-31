import { useState } from 'react'
import Weather from '../components/Weather'


function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-400 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8">Weather App</h1>
      <Weather />
    </div>
    </>
  )
}

export default App
