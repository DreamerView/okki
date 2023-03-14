import { SessionProvider } from "next-auth/react";
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
const AppModule = ({children,session}) => {
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
        <SessionProvider session={session}>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    </>)
};

export default AppModule;