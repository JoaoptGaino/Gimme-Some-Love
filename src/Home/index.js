import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
const Home = () => {
    const [image, setImage] = useState('');
    const [facts, setFacts] = useState('');
    const heart = '<3';
    async function handleFactPhoto() {
        const cat = document.querySelector('#catImage');
        try {
            alert('Prepare for cuteness!!!');
        
            axios.defaults.headers.common['x-api-key'] = `${process.env.REACT_APP_KEY}`;
            //image API response
            let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit: 1, size: 'full' } })
            let image = response.data[0];
            //facts API response
            let responseFact = await axios.get('https://cat-fact.herokuapp.com/facts', { params: { limit: 1, size: 'full' } })
            let fact = responseFact.data.all[Math.floor(Math.random() * 244)];
            //this will make the cat image container appear
            cat.style.display = 'block';

            //these two will set the states
            setImage(image.url);
            setFacts(fact.text);


        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="content">
        <h1 className="title">Giving you some love {heart}</h1>
            <div className="content-text">
                <h1>Some cute cat pics</h1>
                <div className="stuff">
                    <img id="catImage" className="catImage" src={image} />
                    <p className="fact">{facts}</p>
                </div>
                <button className="btn" onClick={handleFactPhoto}>Click here</button>
            </div>
        </div>
    )
}

export default Home;