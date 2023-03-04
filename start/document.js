/*jshint esversion: 6 */
import dynamic from 'next/dynamic';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState,useRef } from 'react';
import Header from "/start/header";
import Link from 'next/link';
const ConfirmMode = dynamic(()=>import('/start/confirm'),{ssr:false});
const FullFrame = dynamic(()=>import('/start/fullframe'),{ssr:false});
const ResizeImage = dynamic(()=>import('/start/cropimage'),{ssr:false});
const NotificationModule = dynamic(()=>import('/start/notification'),{ssr:false});
const AesEncryption = require('aes-encryption');
import ClientJsonFetchReq from "/start/ClientJsonFetchReq";
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

const DocumentResult = ({children}) => {
    const lazy = useRef(false),
    lazy1 = useRef(false),
    lazy2 = useRef(false),
    router = useRouter(),
    [header,setHeader] = useState(null),
    action = useSelector(state=>state.act),
    frame = useSelector(state=>state.fullframe),
    url = useSelector(state=>state.urlframe),
    image = useSelector(state=>state.crop),
    main = useSelector(state=>state.main),
    notification = useSelector(state=>state.notification),
    isTabletOrMobile = useMediaQuery({ query: '(min-width:1px) and (max-width:750px)' });
    useEffect(()=>{
        if(typeof Window !== 'undefined'&&lazy2.current) return;
        lazy2.current = true;
        const mobileHeader = ['/user','/user/history','/user/favourite','/user/device','/user/devices/[id]'],
        desktopHeader = ['/signin','/signup','/signup/surname','/signup/email','/signup/otp','/signup/password','/signup/finish','/signin/social-nerwork'],
        headerHide = isTabletOrMobile?[...mobileHeader,...desktopHeader]:desktopHeader,
        result = !headerHide.includes(router.pathname);
        setHeader((prev)=>prev=result);
        return () => {
            lazy2.current=false;
            setHeader((prev)=>prev=null);
        }
    },[router,isTabletOrMobile])
    useEffect(()=>{
        if (typeof window !== "undefined"&&lazy1.current) return;
        lazy1.current = true;
        action||frame||image?document.querySelector('html,body').style.cssText = "overflow: hidden;":document.querySelector('html,body').style.cssText = "";
        return () =>{
            return lazy1.current=false;
        };
    },[action,frame,image]);
    useEffect(()=>{
        if (typeof window !== "undefined"&&lazy.current) return;
        lazy.current = true;
        const result = async() => {
            const aes = new AesEncryption(),res = await ClientJsonFetchReq({method:"GET",path:'/get-data',cookie:document.cookie});;
            aes.setSecretKey(process.env.aesKey);
            if(res!==undefined) {
                const response = {avatar:aes.decrypt(res.avatar),name:aes.decrypt(res.name),surname:aes.decrypt(res.surname),login:aes.decrypt(res.login)};
                return localStorage.loginParams=JSON.stringify(response);
            } else return localStorage.loginParams=null;
        };
        result();
        return () =>{
            lazy.current = false;
        };
    },[]);
    return(
        <div>
            {notification!==false&&<NotificationModule/>}
            {frame!==false&&<FullFrame item={url} key={Date.now()}/>}
            {action!==false&&<ConfirmMode router={router} Link={Link} useDispatch={useDispatch} item={action} key={Date.now}/>}
            {image!==false&&<ResizeImage item={image} key={Date.now}/>}
            {header===true&&<Header useDispatch={useDispatch} action={router}/>}
            {main!==false&&<div className="main_hide"/>}
            <div className="result">{children}</div>
        </div>
    );
}

export default DocumentResult;