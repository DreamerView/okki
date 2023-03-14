/*jshint esversion: 6 */
import Head from "next/head";
import dynamic from "next/dynamic";
import Router,{useRouter} from 'next/router';
import translate from "/translate/ux/loading_page";
import { useEffect,useState } from "react";
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react";
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
    const defaultState = {
        act:false,
        confirm:false,
        fullframe:false,
        urlframe:false,
        crop:false,
        getcrop:false,
        main:false,
        hideReq:false,
        headerHeight:0,
        notification:false,
        auth:false,
        login:null
    };


    const reducer = (state=defaultState,action) => {
    switch(action.type) {
        case "SetAction": return {...state,act:action.set};
        case "SetConfirm": return {...state,confirm:action.set};
        case "setFullFrame": return {...state,fullframe:action.set};
        case "setUrlFrame": return {...state,urlframe:action.set};
        case "setCropImage": return {...state,crop:action.set};
        case "getCropImage": return {...state,getcrop:action.set};
        case "actionMain": return {...state,main:action.set};
        case "hideRequest": return {...state,hideReq:action.set};
        case "setHeaderHeight": return {...state,headerHeight:action.set};
        case "setNotification": return {...state,notification:action.set};
        case "setAuth": return {...state,auth:action.set};
        case "setLogin": return {...state,login:action.set};
        default: return state;
    }
    };

    const store = createStore(reducer);

    return(
        <>
            <div id="globalLoader"><div className="header_preloader"><div className="logo_preloader"/><p>{translate["content"][locale]}</p></div><div className="footer_preloader"><div className="lds-ripple"><div></div><div></div></div></div></div>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <DocumentResult>
                    {result? <Preloader/>:<Component {...pageProps} />}
                    </DocumentResult>
                </Provider>
            </SessionProvider>
        </>
    )
}

export default MyApp;