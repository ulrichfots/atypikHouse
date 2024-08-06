'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (
        <Image onClick={() => router.push('/')}  alt="logo_atypikHouse" className="hidden md:block cursor-pointer" height= "130" width="150" 
        src="/images/logo.png"/>
    )
};
export default Logo;