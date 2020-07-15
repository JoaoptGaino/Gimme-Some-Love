import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Home = () => {
    const [image,setImage] = useState('');
    const [facts,setFacts] = useState('');
    async function loadFact(){
        try{    
            let response = await axios.get('https://cat-fact.herokuapp.com/facts',{params:{limit:1,size:'full'}})
            let fact = response.data.all[Math.floor(Math.random()*244)];
            setFacts(fact.text);
            console.log(fact.text);
        }catch(err){
            console.log(err);
        }
    }
    async function loadImage(){
        try{
            axios.defaults.headers.common['x-api-key'] = `${process.env.REACT_APP_KEY}`;
            let response = await axios.get('https://api.thecatapi.com/v1/images/search',{params:{limit:1,size:'full'}})
            let image = response.data[0];
            let responseFact = await axios.get('https://cat-fact.herokuapp.com/facts',{params:{limit:1,size:'full'}})
            let fact = responseFact.data.all[Math.floor(Math.random()*244)];
            setFacts(fact.text);
            console.log(fact.text);

            console.log(image.id);
            console.log(image.url);
            setImage(image.url);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            <h1>Some cute cat pics</h1>
            <pre>
                <img src={image}/>
                <p>{facts}</p>
            </pre>
            <button onClick={loadImage}>Click here</button>
            <button onClick={loadFact}>Fact</button>
        </div>
    )
}

export default Home;