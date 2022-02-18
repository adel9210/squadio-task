import React from 'react';
import { ToastContainer } from 'react-toastify';
import UserBuilding from './components/UserBuilding/UserBuilding';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="App">
    {/* <h2 className={'app'}>Hi New Project</h2> */}
    <UserBuilding />
    <ToastContainer autoClose={1000} position="bottom-right" />
  </div>
);

export default App;
