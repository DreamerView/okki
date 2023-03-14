/*jshint esversion: 6 */
import Head from "next/head";
import dynamic from "next/dynamic";
import Router,{useRouter} from 'next/router';
import translate from "/translate/ux/loading_page";
import { useEffect,useState } from "react";
import "/styles/globals.css";
import "/styles/preloader.css";

const Preloader = () => {
    const [timer,setTimer] = useState(false),{locale} = useRouter();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setTimer((prev)=>prev=true);
        },[150]);
        return ()=>clearTimeout(timer);
    },[]);
    return(
        <>
            <Head>
                <title>{translate["loading"][locale]}</title>
            </Head>
            <div className="main__preloader">
                {timer&&
                <svg className="main__preloader_pic" xmlns="http://www.w3.org/2000/svg" style={{ margin: "auto" }} width="200" height="200" display="block" preserveAspectRatio="xMidYMid" viewBox="0 0 100 100">
                    <path d="M10 50a40 40 0 0080 0 40 42 0 01-80 0"><animateTransform attributeName="transform" dur="1s" keyTimes="0;1" repeatCount="indefinite" type="rotate" values="0 50 51;360 50 51"/></path>
                </svg>}
            </div>
        </>
    )
};
const AppModule = dynamic(()=>import('/modules/app_module'),{ssr:false});
const DocumentResult = dynamic(()=>import("/start/document"),{loading:Preloader});

const MyApp = ({ Component, pageProps, session }) => {
    const {locale} = useRouter(),[result,setResult] = useState(false);
    useEffect(()=>{
        Router.events.on('routeChangeStart', () => setResult((prev)=>prev=true)),
        Router.events.on('routeChangeComplete', () => setResult((prev)=>prev=false)),
        Router.events.on('routeChangeError', () => setResult((prev)=>prev=false));
        return()=>{
            Router.events.off('routeChangeStart', () => setResult((prev)=>prev=true)),
            Router.events.off('routeChangeComplete', () => setResult((prev)=>prev=false)),
            Router.events.off('routeChangeError', () => setResult((prev)=>prev=false));
        };
    },[]);
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
            <AppModule session={session}>
                <DocumentResult>
                    {result? <Preloader/>:<Component {...pageProps} />}
                </DocumentResult>
            </AppModule>
        </>
    )
}

export default MyApp;