import React, { useState } from 'react';

function Authors() {
  // Initial data of authors
  const initialAuthors = [
    { id: 1, lastname: 'Handayan', firstname: 'Sean Kirk', grade: 99 },
    { id: 2, lastname: 'Balasabas', firstname: 'Metchlyr', grade: 99 },
    { id: 3, lastname: 'Langomes', firstname: 'Kyle', grade: 99 },
    { id: 4, lastname: 'Timbang', firstname: 'Jerald', grade: 99 },
  ];

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
        <h2 style={styles.text}>Authors</h2>
        <table style={{ width: '100%', color: 'white' }}>
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
                <td><button onClick={() => deleteAuthor(author.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2 style={styles.text}>Add New Author</h2>
          <input type="text" name="lastname" value={newAuthor.lastname} placeholder="Lastname" onChange={handleInputChange} />
          <input type="text" name="firstname" value={newAuthor.firstname} placeholder="Firstname" onChange={handleInputChange} />
          <input type="text" name="grade" value={newAuthor.grade} placeholder="Grade" onChange={handleInputChange} />
          <button onClick={addAuthor}>Add Author</button>
        </div>
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
    borderRadius: 5,
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    paddingBottom: '10px'
  },
};

export default Authors;
