import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";

export default function NewMint(props) {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generating, setGenereting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenereting(true);
    try {
    const response = await fetch("/api/generatePost", {
      method: 'POST',
      headers: {
        'content-type' : 'application/json',
      },
      body: JSON.stringify({topic, keywords}),
    });
    
    const json = await response.json();
    console.log('RESULT : ', json);
    if(json?.postId){
      router.push(`/mint/${json.postId}`);
    }
  } catch (e) {
    setGenereting(false);
  }
  };

 console.log(props);

    return (
    <div className="h-full-overflow-hidden">
      {!!generating && (
      <div className="text-green-500 flex h-full animate-pulse w-full flex-col justify-center items-center">
        <FontAwesomeIcon icon={faFingerprint} className="text-8xl"/>
        <h1>Generation...</h1>
      </div>
      )}
      {!generating && (
      <div className="w-full h-full flex flex-col overflow-auto">
      <form onSubmit={handleSubmit} className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
        <div>
          <label>
            <strong>Sujet du blog a generer</strong>
          </label>
          <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={topic} onChange={(e) => setTopic(e.target.value)}  maxLength={300}/>
        </div>
        <div>
        <label>
            <strong>Mots clef du blog a generer</strong>
          </label>
          <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={keywords} onChange={(e) => setKeywords(e.target.value)} maxLength={80}/>
          <small className="block mb-2">Mots clefs séparés par une virgule</small>
          </div>
      <button className="btn" type="submit" disabled={!topic.trim() || !keywords.trim()}>
      Generate  
      </button>  
      </form>
      </div>      
        )}
    </div> 
    );
  }

  NewMint.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
  };

  export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx){
      const props = await getAppProps(ctx);
      
      if(!props.availableTokens){

        
        return {
          redirect: {
            destination: "/token-topup",
            permanent:false,

          }
        }
      }

      
      return {
        props
      };
    }
  });