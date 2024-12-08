/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/users/${id}`)
        .then((response: { data: { name: SetStateAction<string>; email: SetStateAction<string>; }; }) => {
          setName(response.data.name);
          setEmail(response.data.email);
        })
        .catch(() => setErrorMessage('Gagal mengambil data pengguna.'));
    }
  }, [id]);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${id}`, { name, email });
      router.push('/admin/user'); // Redirect ke daftar pengguna
    } catch (error) {
      setErrorMessage('Gagal memperbarui pengguna.');
    }
  };

  return (
    <div>
      <h1>Edit Pengguna</h1>
      <form onSubmit={handleUpdateUser}>
        <div>
          <label>Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditUser;
