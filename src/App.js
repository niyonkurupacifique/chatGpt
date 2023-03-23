import logo from './logo.svg';
import './App.css';

import {Configuration, OpenAIApi} from 'openai'
import { useState } from 'react';
function App() {
  const [prompt,setPrompt]=useState("")
  const [picUrl,setPicUrl]=useState("")
  const [chat,setChart]=useState("")
  const configuration = new Configuration({
    apiKey:'',
  });
  const openai = new OpenAIApi(configuration);
  const generateImage=async()=>{
   const response= await openai.createImage({
      prompt:prompt,
      n: 1,
      size: "1024x1024",
    });
    setPicUrl(response.data.data[0].url)
  }
  const generateChat=async()=>{
  const chatResponse= await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content:prompt}],
    });
    const message=chatResponse.data.choices[0].message;
    setChart(message)
    console.log(message)
  }
  const getInput=(event)=>{
  const result=event.target.value
  console.log(result)
  setPrompt(result)
  }

  
  return (

    <div className="App">
    
     
     <input onChange={getInput} type='text' placeholder='any picture.....'></input>
     
     <button onClick={generateImage}>generate</button>
     <button onClick={generateChat}>generate words</button>
     <img width={200} src={picUrl} alt="picture"></img>
     <p>{chat.content}</p>
    </div>
  );
}

export default App;
