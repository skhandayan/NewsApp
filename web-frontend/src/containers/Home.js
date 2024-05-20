import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../assets/BACKGROUND.jpg';
import axios from 'axios';
import '../style/style.css';
import profile from '../assets/profile.png'

const API_KEY = 'd0b69496c18e463f888a273cb521ea9f';

function Home() {
    const [articles, setArticles] = useState([]);
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false); 
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: ''
    });

    const handleSubmitCountry = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`);
            setArticles(response.data.articles);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePostNews = async () => {
        try {
            await axios.post('your_backend_api_url/news', formData);
            console.log('News posted successfully:', formData);
        } catch (error) {
            console.error('Error posting news:', error);
        }
    };

    const fetchData = async (selectedCategory) => {
        setLoading(true); 
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${selectedCategory}&apiKey=${API_KEY}`);
            setArticles(response.data.articles);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="container4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', height: '100%', width: '100%', backgroundAttachment: 'fixed' }}>

            <div style={{ padding: "0 10%" }}>
                <h1 className="text-center mt-3" style={{ color: 'white', fontSize: '18px' }}>
                    <span className="bold-text" style={{ color: 'white', fontSize: '45px' }}>FusionTech</span> news and media
                </h1>

                <a href="/profile">
                    <img src={profile} alt="FusionTech Logo" style={{ width: '70px', height: '70px', marginRight: '20px' }} />
                </a>


                {/* News Form */}
                <form style={{ display: 'grid', gridTemplateColumns: '1fr auto', columnGap: '20px' }}>
                    <h2 className="mt-4" style={{ color: 'white', gridColumn: 'span 2' }}>Post News</h2>
                    <div className="form-group" >
                        <input type="text" className="form-control" style={{ paddingBottom: '60px', fontWeight: 'bold'}} placeholder="Description" name="description" value={formData.description} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleInputChange} 
                        style={{ width: "100%", maxWidth: "100%", fontWeight: 'bold'}} 
                        />
                        <button type="button" className="btn btn-dark" style={{ marginTop: '20px', width: '200px', alignContent: 'end', fontWeight: 'bold'}} onClick={handlePostNews}>Post News</button>
                    </div>
                </form>


                {/* Search Country */}
                <h2 className="mt-4" style={{ color: 'white' }}>Search Country</h2>
                <form onSubmit={handleSubmitCountry}>
                    <div className="input-group mb-3" style={{ width: '72%' }}>
                        <input style={{fontWeight: 'bold'}}
                            type="text"
                            className="form-control"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Enter country..."
                        />
                        <div className="input-group-append" style={{ paddingLeft: '20px' }}>
                            <button className="btn btn-dark" style={{fontWeight: 'bold'}} type="submit">Search</button>
                        </div>
                    </div>
                </form>

                {loading && <div className="text-center" style={{ color: 'white' }}>Loading...</div>} {/* Loading screen */}

                <div className="row mt-4">
                    <div className="col-md-8">
                        {articles.map((article, index) => (
                            <div className="card rounded shadow-lg mb-3" key={index} >
                                {article.urlToImage && <img src={article.urlToImage} className="card-img-top" alt="..." />}
                                <div className="card-body">
                                    <p className="card-text">{article.author}</p>
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text">{article.source.name}</p>
                                    <p className="card-text">{article.description}</p>
                                    <hr />
                                    <small>date: {article.publishedAt}</small>
                                    <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-dark mt-2" style={{ color: 'white', margin: '20px' }}>See News</a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4" style={{ paddingLeft: '90px', }}>
                        <h3><b style={{ color: 'white' }}>Category</b></h3>
                        <hr />
                        <br />
                        <ul className="list-group">
                            <li className="list-group-item">
                                <button className="btn btn-dark btn-block" style={{fontWeight: 'bold'}} onClick={() => fetchData('technology')}>Technology</button>
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-dark btn-block" style={{fontWeight: 'bold'}} onClick={() => fetchData('health')}>Health</button>
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-dark btn-block" style={{fontWeight: 'bold'}} onClick={() => fetchData('entertainment')}>Entertainment</button>
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-dark btn-block" style={{fontWeight: 'bold'}} onClick={() => fetchData('sports')}>Sports</button>
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-dark btn-block" style={{fontWeight: 'bold'}} onClick={() => fetchData('science')}>Science</button>
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-dark btn-block" style={{fontWeight: 'bold'}} onClick={() => fetchData('business')}>Business</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
