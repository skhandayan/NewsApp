import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../assets/BACKGROUND.jpg';
import axios from 'axios';
import '../style/style.css';
import profile from '../assets/profile.png'
import { useNavigate } from 'react-router-dom';

const API_KEY = 'd0b69496c18e463f888a273cb521ea9f';

function Home() {
    const [news, setNews] = useState([]);
    const [errors, setErrors] = useState("")
    const [breakingNews, setBreakingNews] = useState([]);
    const [articles, setArticles] = useState([]);
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false); 
    const userEmail = localStorage.getItem('email');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        photo: ''
    });
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});


    useEffect(() =>{
        axios.get("http://127.0.0.1:8000/todos")
        .then(res => setNews(res.data))
        .catch(err => setErrors(err.message))
    },[])

    
    



    const handleLogout = () => {
      // Clear user data
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      // Handle any additional logout logic (like redirecting to login page)
      navigate('/');
    };
  
    useEffect(() => {
      // Check if user is logged in, if not, redirect to login page
      if (!userEmail) {
        navigate('/');
      }
    }, [userEmail]);

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

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Fetch breaking news on component mount
        fetchBreakingNews();
    }, []);

    const fetchBreakingNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`);
            // Get only the first article from the response
            if (response.data.articles.length > 0) {
                setBreakingNews([response.data.articles[0]]);
            } else {
                setBreakingNews([]); // No breaking news available
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    
    const handlePostNews = async () => {
        const form = new FormData();
        form.append("title", formData.title);
        form.append("description", formData.description);
        if (formData.photo) {
            form.append("photo", formData.photo);
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/todos', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const newPost = response.data;
            setNews([...news, newPost]);
            setFormData({ title: '', description: '', photo: null });
            // Initialize likes and comments for the new post
            setLikes({ ...likes, [newPost.id]: 0 });
            setComments({ ...comments, [newPost.id]: [] });
        } catch (error) {
            console.error("Error posting news:", error);
            setErrors(error.message);
        }
    };

    const deleteNews = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/todos/${id}`);
            const updatedNews = news.filter(item => item.id !== id);
            setNews(updatedNews);
            // Remove likes and comments for the deleted post
            const updatedLikes = { ...likes };
            delete updatedLikes[id];
            setLikes(updatedLikes);
            const updatedComments = { ...comments };
            delete updatedComments[id];
            setComments(updatedComments);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLike = (id) => {
        setLikes({ ...likes, [id]: likes[id] + 1 });
    };

    const handleCommentSubmit = (e, id) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        if (comment) {
            setComments({ ...comments, [id]: [...comments[id], comment] });
            e.target.comment.value = '';
        }
    };

    return (
        <div className="container4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', height: '100%', width: '100%', backgroundAttachment: 'fixed' }}>

            <div style={{ padding: "0 5%" }}>
                
            <div style={{ color: 'white', fontSize: '18px', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',  paddingBottom: '30px'}}>
                <h1 style={{ color: 'white', fontSize: '18px', }}>
                    <span className="bold-text" style={{ color: 'white', fontSize: '45px' }}>FusionTech</span> news and media
                </h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '20px' }}>Welcome, {userEmail}</span>
                    <a href="/profile">
                        <img src={profile} alt="FusionTech Logo" style={{ width: '70px', height: '70px', marginRight: '20px' }} />
                    </a>
                    <div style={{ position: 'relative' }}>
                        <button style={styles.dropdownItem} onClick={toggleDropdown}>▼</button>
                        {isOpen && (
                            <div style={styles.dropdownMenu}>
                                <a href="/profile" style={styles.dropdownItem}>Profile</a>
                                <button style={styles.dropdownItem} onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            </div>

            <div style={{ padding: "0 8%" }}>


            <form style={{ display: 'grid', gridTemplateColumns: '1fr', columnGap: '20px', paddingBottom: '50px' }}>
    <h2 className="mt-4" style={{ color: 'white', gridColumn: 'span 1' }}>Post News</h2>
    <div className="form-group">
    <input type="text" className="form-control" placeholder="Title" name="title" value={formData.title} onChange={handleInputChange} style={{ maxWidth: "100%", fontWeight: 'bold', borderRadius: '0' }} />
    </div>
    <div className="form-group">
        <input type="text" className="form-control" style={{ paddingBottom: '60px', fontWeight: 'bold', borderRadius: '0' }} placeholder="Description" name="description" value={formData.description} onChange={handleInputChange} />
    </div>
    <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <input type="file" className="form-control-file" name="photo" accept="image/*" onChange={handleInputChange} style={{ fontWeight: 'bold', marginRight: '10px', borderRadius: '0', color:'white'}} />
        <button type="button" className="btn btn-dark" style={{ fontWeight: 'bold' }} onClick={handlePostNews}>Post News</button>
    </div>
</form>










                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <div style={{ marginTop: '20px', marginBottom: '20px', color: 'white', width: '48%' }}>
    <h2>Your posted news</h2>
    <hr />
    <br />
    {news.map((item) => (
                            <div className="card rounded shadow-lg mb-3" key={item.id} >
                                {item.photo && <img src={`http://127.0.0.1:8000${item.photo}`} className="card-img-top" alt="News" style={{ width: '100%', height: '200px' }} />}
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <hr />
                                    <p className="card-text">Posted by: {userEmail}</p>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <button className="btn btn-primary" onClick={() => handleLike(item.id)}>Like ({likes[item.id] || 0})</button>
                                        <button className="btn btn-danger mt-2" onClick={() => deleteNews(item.id)} style={{ marginLeft: '10px' }}>Delete</button>
                                    </div>
                                    <form onSubmit={(e) => handleCommentSubmit(e, item.id)} style={{ marginTop: '10px' }}>
                                        <div className="input-group">
                                            <input type="text" name="comment" className="form-control" placeholder="Add a comment..." />
                                            <div className="input-group-append">
                                                <button className="btn btn-dark" type="submit">Comment</button>
                                            </div>
                                        </div>
                                    </form>
                                    <ul className="list-group mt-2">
                                        {(comments[item.id] || []).map((comment, index) => (
                                            <li key={index} className="list-group-item">{userEmail}:  {comment}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

        <div>
        <div >
    <h2>Breaking News</h2>
    <hr />
    <br />
        {breakingNews.map((article, index) => (
            <div className="card rounded shadow-lg mb-3" key={index}>
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

    <div style={{ width: '48%' }}>
        <h2 className="mt-4" style={{ color: 'white' }}>Search Country</h2>
        <form onSubmit={handleSubmitCountry}>
            <div className="input-group mb-3">
                <input style={{ fontWeight: 'bold' }}
                    type="text"
                    className="form-control"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country..."
                />
                <div className="input-group-append" style={{ paddingLeft: '20px' }}>
                    <button className="btn btn-dark" style={{ fontWeight: 'bold' }} type="submit">Search</button>
                </div>
            </div>
        </form>
        <div >

        {loading && <div className="text-center" style={{ color: 'white' }}>Loading...</div>} 
 
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
    </div>
</div>
            </div>
        </div>
    );
}

const styles = {
    buttonStyle: {
      marginTop: '30px',
      padding: '10px',
      width: '110px',
      backgroundColor: '#212529',
      color: 'white',
      fontSize: '20px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bolder',
      borderRadius: '5px',
      marginBottom: '20px'
    },

    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: '0',
        zIndex: '1000',
        display: 'block',
        float: 'left',
        minWidth: '10rem',
        padding: '0.5rem 0',
        margin: '0.125rem 0 0',
        fontSize: '1rem',
        color: '#212529',
        textAlign: 'left',
        listStyle: 'none',
        backgroundColor: 'black',
        backgroundClip: 'padding-box',
        border: '1px solid rgba(0, 0, 0, 0.15)',
        borderRadius: '0'
    },
    dropdownItem: {
        display: 'block',
        width: '100%',
        padding: '10px 20px',
        clear: 'both',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'black',
        textAlign: 'inherit',
        whiteSpace: 'nowrap',
        border: 'none',
        borderRadius: '0',
        textDecoration: 'none'
    },
  };

export default Home;
