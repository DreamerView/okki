import { SessionProvider } from "next-auth/react";
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import Router,{ useRouter } from "next/router";
import { useEffect } from "react";
import translate from "/translate/ux/loading_page";
import dynamic from "next/dynamic";
const DocumentResult = dynamic(()=>import("/start/document"));

const AppModule = ({children,session,change}) => {
    const {locale} = useRouter();
    useEffect(()=>{
        Router.events.on('routeChangeStart', () => change(true)),
        Router.events.on('routeChangeComplete', () => change(false)),
        Router.events.on('routeChangeError', () => change(false));
        return()=>{
            Router.events.off('routeChangeStart', () => change(true)),
            Router.events.off('routeChangeComplete', () => change(false)),
            Router.events.off('routeChangeError', () => change(false));
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
    return(<>
        <div id="globalLoader"><div className="header_preloader"><div className="logo_preloader"/><p>{translate["content"][locale]}</p></div><div className="footer_preloader"><div className="lds-ripple"><div></div><div></div></div></div></div>
        <SessionProvider session={session}>
            <Provider store={store}>
                <DocumentResult>
                    {children}
                </DocumentResult>
            </Provider>
        </SessionProvider>
    </>)
};

export default AppModule;