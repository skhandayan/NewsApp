import React, { useState } from 'react';
import { supabase } from '../client';

function Registration() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
  
    const handleRegistration = async (event) => {
      event.preventDefault();
      try {
        const { user, error } = await supabase.auth.signUp({
          email,
          password,
          full_name: fullname, // Include fullname in the signUp call
        });
        if (error) {
          setError(error.message);
          return;
        }
        // Registration successful, handle further actions if needed
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <div style={styles.containerStyle}>
        <div style={styles.loginWrapperStyle}>
          <div style={styles.formSectionStyle}>
            <h1 style={styles.titleStyle}>Register</h1>
            <h6 style={{ fontSize: '11px', fontWeight: 'bold', color: 'grey' }}>
              Please enter the required credentials to access.
            </h6>
  
            <form style={styles.formCenter} onSubmit={handleRegistration}>
              <input
                type="text"
                placeholder="Fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                style={styles.inputStyle}
              />
  
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.inputStyle}
              />
  
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.inputStyle}
              />
  
              <button type="submit" style={styles.buttonStyle}>
                Register
              </button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div style={styles.smallTextStyle}>
              Forgot password?
              <a href="#" style={styles.linkStyle}>
                {' '}
                Click here
              </a>
            </div>
            <div style={styles.smallTextStyle}>
              Already have an account?
              <a href="#" style={styles.linkStyle}>
                {' '}
                Sign In here
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

const styles = {
  containerStyle: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e2e2e',
  },
  loginWrapperStyle: {
    display: 'flex',
    width: '900px',
    height: '600px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  formSectionStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
  },
  formCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  titleStyle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputStyle: {
    width: '250px',
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#ECECEC',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '13px',
    borderRadius: '5px'
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
  smallTextStyle: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#666',
    fontWeight: 'bold'
  },
  linkStyle: {
    color: 'black',
    textDecoration: 'none',
    marginLeft: '5px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default Registration;
