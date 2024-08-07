// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// const EditProfilePage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('/api/user/profile');
//         const user = response.data;
//         setName(user.name || '');
//         setEmail(user.email || '');
//       } catch (error) {
//         setError('Échec de la récupération de l\'utilisateur');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.put('/api/user/update', { name, email, password });
//       router.push('/profil');
//     } catch (error) {
//       setError('Échec de la mise à jour du profil');
//     }
//   };

//   if (loading) {
//     return <p>Chargement...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Modifier le profil</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nom</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Mot de passe</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Enregistrer les modifications
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProfilePage;


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import ImageUpload from '@/app/components/Inputs/ImageUpload';

const EditProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [image, setImage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/profile');
      const userData = await response.json();
      setName(userData.name || '');
      setEmail(userData.email || '');
      setImageSrc(userData.image || '');
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, image: imageSrc }),
    });
    if (response.ok) {
      router.push('/profil');
    }
  };
  const goback = () => {
    router.back();
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 outline-none">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        
        <div className="container mx-auto p-4">
          <h1 className="text-2xl text-center font-bold mb-4">Modifier le profil</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block">Nom</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block">Image de profil</label>
              <ImageUpload
                onChange={(value) => setImageSrc(value)}
                value={imageSrc}
              />
            </div>
            <Button 
              label="Enregistrer les modifications"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }}
            />
          </form>

          <div className="flex flex-col gap-2 py-3">
            <div className="flex flex-row items-center gap-4 w-full">
              <Button label="Annuler" outline onClick={goback} />
              <Button label="Changer le mot de passe" onClick={() => router.push('/profil/change-password')} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
