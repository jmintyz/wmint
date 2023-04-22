import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { faMapSigns } from "@fortawesome/free-solid-svg-icons";
import { faSpaceShuttle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logo } from "../Logo";

export const AppLayout = ({ children, availableTokens, mints, postId }) => {
  const { user } = useUser();
  return (
    <div className="flex flex-col h-screen max-h-screen bg-gradient-to-r from-slate-800 to-cyan-800">
      <div className="flex items-center justify-between text-white bg-gradient-to-r from-slate-800 to-cyan-800 h-20 px-4">
        <div className="m-auto w-full max-w-screen-sm w-400px flex items-center justify-between mt-2">
          <Logo />
          <div className="flex items-center">
            

            {!!user ? (
              <div className="flex items-center ml-4">
                <div className="min-w-[100px]">
                  <Image
                    src={user.picture}
                    alt={user.name}
                    height={50}
                    width={50}
                    className="rounded-full ml-10"
                  />
                </div>
                <div className="ml-2">
                  <div className="font-bold">{user.email}</div>
                  <Link className="text-sm" href="/api/auth/logout">
                    Quitter
                  </Link>
                </div>
              </div>
            ) : (
              <Link href="/api/auth/login">Connexion</Link>
            )}
          </div>
        </div>
      </div>

      
        <div id="super" className="w-full my-8 flex flex-col overflow-auto">
      <form className="m-auto w-full max-w-screen-sm bg-slate-100 p-0 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
        <div>
            <h1 className="text-4xl pl-2">Solde Total :</h1>
          
           </div>
        <div id="jo" className="text-4xl text-center flex items-center m-auto w-full max-w-screen-sm">
        <Link href="/token-topup" className="m-auto w-full max-w-screen-sm mb-4">
            <FontAwesomeIcon icon={faCoins} className="text-yellow-500 pr-2" />
              
              <span className="pl-1">{availableTokens} €</span>
              
              
            </Link>
          </div>
       
      </form>
      </div>
      <div className="w-full my-2 flex flex-col overflow-auto">
        <div className="m-auto w-full max-w-screen-sm flex">
      <div className="w-1/3 bg-slate-100 p-2 rounded-md shadow-xl border border-slate-200 shadow-slate-200 text-2xl text-center max-w-screen-sm">
          <FontAwesomeIcon icon={faSpaceShuttle} className="text-purple-500 pr-2" /> <br/>
          <Link href="/activites/all" className="m-auto w-full max-w-screen-sm mb-4">
                         
              <span className="pl-1">Activités</span>       
            </Link>
          </div>      
        
          <div className="w-1/3 bg-slate-100 p-2 mx-12 rounded-md shadow-xl border border-slate-200 shadow-slate-200 text-2xl text-center max-w-screen-sm">
          <FontAwesomeIcon icon={faMoneyCheck} className="text-green-500 pr-2" />  <br/>
          <Link href="/depot" className="m-auto w-full max-w-screen-sm mb-4">   
              <span className="pl-1">Dépot</span>       
            </Link>
          </div>
          <div className="w-1/3 bg-slate-100 p-2 rounded-md shadow-xl border border-slate-200 shadow-slate-200 text-2xl text-center max-w-screen-sm">
          <FontAwesomeIcon icon={faMapSigns} className="text-orange-500 pr-2" />   <br/>
          <Link disabeled href="/transfert/recevoir" className="m-auto w-full max-w-screen-sm mb-4">
                        
              <span className="pl-1">Transfert</span>       
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-grow overflow-hidden">
        

        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};
