import { useEffect, useState } from 'react';
import './App.css'
import Template from './components/forms';

function App() {

 const [formId , setFormId]= useState(0)

  return (
    <>
   <Template templateId={formId} setFormId={setFormId} />
    </>
  )
}

export default App
