// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Button from '@/app/components/Button';

// const ChangePasswordPage = () => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async () => {
//     // Implement password change logic here
//     // Make API call to change password
//     // Redirect to profile page on success
//     router.push('/profil');
//   };

//   const goback = async () => {
   
//     router.forward;
//   };

//   return (
// <div
//         className="
//           justify-center 
//           items-center 
//           flex 
//           overflow-x-hidden 
//           overflow-y-auto 
//           fixed 
//           inset-0 
//           outline-none 
//         "
//       >
//         <div className="
//           relative 
//           w-full
//           md:w-4/6
//           lg:w-3/6
//           xl:w-2/5
//           my-6
//           mx-auto 
//           h-full 
//           lg:h-auto
//           md:h-auto
//           "
//         >

//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl text-center font-bold mb-4">Changer le mot de passe</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="currentPassword" className="block">Mot de passe actuel</label>
//           <input
//             type="password"
//             id="currentPassword"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label htmlFor="newPassword" className="block">Nouveau mot de passe</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword" className="block">Confirmer le nouveau mot de passe</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div className="flex flex-col gap-2 ">
//                 <div 
//                   className="
//                     flex 
//                     flex-row 
//                     items-center 
//                     gap-4 
//                     w-full
//                   "
//                 >
                    
//                     <Button 
//                         label="Annuler" 
//                         onClick={goback}  />
//                     <Button 
//                         label="Changer le mot de passe" 
//                         onClick={handleSubmit}  />
//                 </div>
//         </div>
//       </form>
//     </div>
// </div>
// </div>
//   );
// };

// export default ChangePasswordPage;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await axios.post('/api/profile/change-password', {
        currentPassword,
        newPassword
      });
      toast.success('Mot de passe modifié avec succès');
      router.push('/profil');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || 'Une erreur est survenue');
      } else {
        toast.error('Une erreur est survenue lors du changement de mot de passe');
      }
    }
  };

  const goback = () => {
    router.back();
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl text-center font-bold mb-4">Changer le mot de passe</h1>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block">Mot de passe actuel</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block">Nouveau mot de passe</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block">Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4 w-full">
                <Button  outline label="Annuler" onClick={goback} />
                <Button label="Changer le mot de passe" onClick={handleSubmit} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
