import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg p-10">
        {/* Form Section */}
        <div className="w-96">
          <h2 className="text-2xl font-semibold mb-5">Email</h2>
          <input 
            type="email" 
            placeholder="email" 
            className="w-full p-3 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <h2 className="text-2xl font-semibold mb-5">Password</h2>
          <input 
            type="password" 
            placeholder="password" 
            className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <a href="#" className="text-sm text-gray-500 hover:text-gray-800 mb-5 inline-block">
            Forgot password?
          </a>
          <button className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700">
            Login
          </button>
        </div>
        
        {/* Logo Section */}
        <div className="ml-20 flex flex-col justify-center">
          <h1 className="text-4xl font-bold">MelodyMix</h1>
          <p className="text-lg text-gray-500 mt-3">Transform Your Musical Experience!</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
