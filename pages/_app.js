/*jshint esversion: 6 */
import dynamic from "next/dynamic";
import { useState } from "react";
import "/styles/globals.css";
import "/styles/preloader.css";

const Preloader = dynamic(()=>import("/modules/preloader"),{ssr:false});

const AppModule = dynamic(()=>import('/modules/app_module'));
const DocumentResult = dynamic(()=>import("/start/document"),{loading:Preloader});

const MyApp = ({ Component, pageProps, session }) => {
    const [result,setResult] = useState(prev=>prev=false);
    useEffect(() => {
        if (typeof Window !== 'undefined') {
            let timer,loader = document.getElementById('globalLoader');
            if (loader)
                timer = setTimeout(()=>{
                    loader.style.cssText = "display:none;";
                },[1500]);
            return ()=>clearTimeout(timer);
        }
      }, []);
    return(
        <>
            <div id="globalLoader"><div className="header_preloader"><div className="logo_preloader"/><p>{translate["content"][locale]}</p></div><div className="footer_preloader"><div className="lds-ripple"><div></div><div></div></div></div></div>
            <AppModule change={(res)=>setResult(prev=>prev=res)} session={session}>
                <DocumentResult>
                    {result? <Preloader/>:<Component {...pageProps} />}
                </DocumentResult>
            </AppModule>
        </>
    )
}

export default MyApp;