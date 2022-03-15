import React from 'react';
import './App.css';
import LDMService from './services/LDMService';
import LDMList from './components/LDMList';
import LDMListViewModel from './viewmodels/LDMListViewModel';

function App() {
  let ldmViewModel = new LDMListViewModel(LDMService.instance);
  return <LDMList viewModel={ldmViewModel}/>
}

export default App;
