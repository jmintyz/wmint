import Image from "next/image";
import Link from "next/link";
import { Logo } from "../components/Logo";
import blocImage from '../public/retina-display.jpg';

export default function Home() {
  return (
  <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative"> 
    <Image src={blocImage} alt="bloc" fill className="absolute"/>
    <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen bg-slate-900/90 rounded-md backrop-blur-sm">
      <Logo /><br/>
      <p>
        <br/> 
        <br/>
      </p>
      <Link href="/mint/new" className="btn">Commencer</Link>
                
      </div>
    </div>
    )
}
