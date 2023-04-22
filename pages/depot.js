import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function TokenTopup() {
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: 'POST',
    });
    const json = await result.json();
    console.log('Result: ', json);
    window.location.href = json.session.url;
  };

    return (
    
    <div id="super" className="w-full my-8 flex flex-col overflow-auto">
      <form className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
        
          <div id="jo" className="text-2xl text-center flex items-center m-auto w-full max-w-screen-sm">
        <button className="btn" onClick={handleClick}>
        Déposer
      </button>
          </div>
       
      </form>
      </div>
      
      );
  }

  TokenTopup.getLayout = function getLayout(page, pageProps) {
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
  