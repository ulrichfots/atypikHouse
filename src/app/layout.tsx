// import { Nunito } from 'next/font/google'

// import Navbar from '@/app/components/navbar/Navbar';
// import LoginModal from '@/app/components/modals/LoginModal';
// import RegisterModal from '@/app/components/modals/RegisterModal';
// import SearchModal from '@/app/components/modals/SearchModal';
// import RentModal from '@/app/components/modals/RentModal';

// import ToasterProvider from '@/app/providers/ToasterProvider';

// import './globals.css'
// import ClientOnly from './components/ClientOnly';
// import getCurrentUser from './actions/getCurrentUser';

// export const metadata = {
//   title: 'Atypik House',
//   description: 'Trouvez des locations d\'habitations insolites en France et on Europe avec Atypik House. Découvrez des bulles, cabanes et plus pour une expérience unique et mémorable.',
// }

// const font = Nunito({ 
//   subsets: ['latin'], 
// });

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const currentUser = await getCurrentUser();

//   return (
//     <html lang="en">
//       <body className={font.className}>
//         <ClientOnly>
//           <ToasterProvider />
//           <LoginModal />
//           <RegisterModal />
//           <SearchModal />
//           <RentModal />
//           <Navbar currentUser={currentUser} />
//         </ClientOnly>
//         <div className="pb-20 pt-28">
//           {children}
//         </div>
//       </body>
//     </html>
//   )
// }

import { Nunito } from 'next/font/google'
import { Providers } from './providers/Providers'

import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Atypik House',
  description: 'Trouvez des locations d\'habitations insolites en France et on Europe avec Atypik House. Découvrez des bulles, cabanes et plus pour une expérience unique et mémorable.',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className="pb-20 pt-28">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
