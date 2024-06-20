import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook if you're using react-router
import backgroundImage from '../assets/BACKGROUND.jpg';
import profile from '../assets/profile.png';

const Profile = () => {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('email');

  const handleGoBack = () => {
    // Navigate back to the homepage
    navigate('/home');
  };

  const [isVisible, setIsVisible] = useState(false);

  const authors = ['Sean Kirk Handayan', 'Jerald Timbang', 'Metchlyr Balasabas', 'Kyle Langomes'];

  return (
    <div className="container4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', height: '100%', width: '100%', backgroundAttachment: 'fixed' }}>

      <div style={{ padding: "0 10%" }}>
        <h1 className="text-center mt-3" style={{ color: 'white', fontSize: '18px' }}>
          <span className="bold-text" style={{ color: 'white', fontSize: '45px' }}>FusionTech</span> news and media
        </h1>
      </div>
      <div style= {{paddingLeft: '100px'}}>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '120px' }}>
        <img src={profile} alt="FusionTech Logo" style={{ width: '150px', height: '150px', marginRight: '20px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '120px', color: 'white', fontWeight: 'bold' }}>You are logged in as: {userEmail}</div>

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
        <button style={styles.buttonStyle} onClick={handleGoBack}>Home</button>
    </div>

   


    </div>
  );
}

const styles = {
    root: {
      paddingHorizontal: 25,
      paddingTop: 10,
    },
    container: {
      backgroundColor: 'black',
      alignSelf: 'center',
      width: '100%',
      paddingVertical: 25,
      borderRadius: 5,
    },
    text: {
      alignSelf: 'center',
      fontSize: 24,
      fontWeight: '800',
      color: 'white'
    },

    buttonStyle: {
        marginTop: '30px',
        padding: '15px',
        width: '200px',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '20px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bolder',
        borderRadius: '5px',
        marginBottom: '20px'

      },
  };

export default Profile;
