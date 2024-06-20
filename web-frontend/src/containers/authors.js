import React, { useState } from 'react';

const initialAuthors = [
  { id: 1, lastname: 'Handayan', firstname: 'Sean Kirk', grade: 99 },
  { id: 2, lastname: 'Balasabas', firstname: 'Metchlyr', grade: 99 },
  { id: 3, lastname: 'Langomes', firstname: 'Kyle', grade: 99 },
  { id: 4, lastname: 'Timbang', firstname: 'Jerald', grade: 99 },
];

const Authors = () => {
  const [authors, setAuthors] = useState(initialAuthors);
  const [newAuthor, setNewAuthor] = useState({ lastname: '', firstname: '', grade: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor({ ...newAuthor, [name]: value });
  };

  const addAuthor = () => {
    const id = authors.length + 1;
    const updatedAuthors = [...authors, { id, ...newAuthor }];
    setAuthors(updatedAuthors);
    setNewAuthor({ lastname: '', firstname: '', grade: '' });
  };

  const deleteAuthor = (id) => {
    const updatedAuthors = authors.filter(author => author.id !== id);
    setAuthors(updatedAuthors);
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Authors</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Lastname</th>
              <th>Firstname</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(author => (
              <tr key={author.id}>
                <td>{author.lastname}</td>
                <td>{author.firstname}</td>
                <td>{author.grade}</td>
                <td><button style={styles.button} onClick={() => deleteAuthor(author.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.addAuthor}>
          <h2 style={styles.heading}>Add New Author</h2>
          <input type="text" name="lastname" value={newAuthor.lastname} placeholder="Lastname" onChange={handleInputChange} style={styles.input} />
          <input type="text" name="firstname" value={newAuthor.firstname} placeholder="Firstname" onChange={handleInputChange} style={styles.input} />
          <input type="text" name="grade" value={newAuthor.grade} placeholder="Grade" onChange={handleInputChange} style={styles.input} />
          <button onClick={addAuthor} style={styles.addButton}>Add Author</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  },
  container: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 4,
    cursor: 'pointer',
  },
  addAuthor: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 4,
    fontSize: 18,
    cursor: 'pointer',
  },
};

export default Authors;
