import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { getAppProps } from "../../utils/getAppProps";
import Link from "next/link";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import QRCode from 'qrcode.react';

export default function Recevoir() {
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: 'POST',
    });
    const json = await result.json();
    console.log('Result: ', json);
    window.location.href = json.session.url;
  };

  const fixedText = "0x4324C907ce931356483885Fc3CC1f875E728DEb3";
    return (
    
    <div id="super" className="w-full my-8 flex flex-col overflow-auto">
      <div className="w-full  flex flex-col overflow-auto">
        <div className="m-auto w-full max-w-screen-sm flex">
          <div className="w-1/3 bg-slate-100 p-2 py-4  rounded-md shadow-xl border border-slate-200 shadow-slate-200 text-3xl text-center max-w-screen-sm">
        
          <Link href="/transfert/recevoir" className="m-auto w-full max-w-screen-sm mb-4">                         
                 <FontAwesomeIcon icon={faWallet} className="text-blue-500 pr-2" />    
            </Link>
          </div>
          <div className="w-1/3 bg-slate-100 p-2 py-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200 text-3xl text-center max-w-screen-sm">
         
          <Link disabeled href="/transfert/envoyer" className="m-auto w-full max-w-screen-sm mb-4">
           <FontAwesomeIcon icon={faPaperPlane} className="text-slate-400 pr-2" />                   
            </Link>
          </div>
          <div className="w-1/3 bg-slate-100 p-2 py-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200 text-3xl text-center max-w-screen-sm">
          
          <Link href="/transfert/historique" className="m-auto w-full max-w-screen-sm mb-4">
             <FontAwesomeIcon icon={faScroll} className="text-slate-400 pr-2" />                 
            </Link>
          </div>
        </div>
      </div>
      <form className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
        
      <div >       
        <QRCode value={fixedText} className="m-auto w-full max-w-screen-sm pt-2"/>
        <p className="m-auto w-full max-w-screen-sm text-center py-6">{fixedText}</p>
      </div>
       
      </form>
      </div>
      
      );
  }

  Recevoir.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
  };


  export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx){
      const props = await getAppProps(ctx);
      return {
        props
      };
    }
  });
  