/*jshint esversion: 6 */
/*jshint esversion: 8 */
import {useState,useEffect, useCallback} from "react";
import Head from "next/head";
import NavbarApp from '/pages/navbar_app/nav';
import style from "/styles/signin/index.module.css";
import { useDispatch } from "react-redux";
const AesEncryption = require('aes-encryption');
import Image from "next/image";
import ServerJsonFetchReq from "/start/ServerJsonFetchReq";
import {getSession,signOut } from "next-auth/react";
const platform = require('platform');
import text from "/translate/signin/index_translate.json";

export const getServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control', 'no-store');
    const lang = context.locale,
    session = await getSession(context),
    data = await ServerJsonFetchReq({
        method:"GET",
        path:"/verify-user",
        cookie:context.req.headers.cookie,
        server:context,
        auth:"yes"
    }),
    ip = context.req.headers["x-real-ip"] || context.req.connection.remoteAddress;
    const ReturnBack = async() => {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            }
        }; 
    };
    const SocialNetwork = async() => {
        return {
            props: {data:session,ip:ip,lang:lang}
        }; 
    };
    const ReturnSignIn = () => {
        return  {
            redirect: {
                permanent: false,
                destination: '/'+lang+'/signin',
            }
        }; 
    };
    if(session!==null) return SocialNetwork();
    else if(session===null) return ReturnSignIn();
    return ReturnBack();
};

const LoginForm = ({data,ip,lang}) => {
    const [sign,setSign] = useState(null);
    const [params,setParams] = useState(null),
    getIp = ip!==null||ip!==undefined?ip:"::1",
    send = useDispatch(),
    [wait,setWait] = useState(false),
    [passValue,setPassValue] = useState('password'),
    [loading,setLoading] = useState(false);
    const setNotification = useCallback(({user,content,title,image}) => {
        send({
            type:"setNotification",
            set:{
                user:user,
                title:title,
                content:content,
                image:image
            }
        });
    },[send]);
    const handlerSocialNetwork = useCallback(async(session) =>{
        console.log(Date.now());
        if(wait===false&&session!==undefined) {
            const result = session;
            const aes = new AesEncryption();
            aes.setSecretKey(process.env.aesKey);
            const email = result.token.email!==undefined?result.token.email:"not";
            const socialId = aes.encrypt(String(result.token.id));
            const name = aes.encrypt(result.token.name);
            const image = aes.encrypt(result.token.image);
            const client = aes.encrypt(result.token.provider);
            const ipSend = aes.encrypt(getIp);
            const sendEmail = aes.encrypt(email);
            const checkVar = (result) =>{
                if(result===null) return null;
                else if(result===undefined) return null;
                else return result;
            };
            const clienInfo = aes.encrypt(JSON.stringify({name:checkVar(platform.name),version:checkVar(platform.version),product:checkVar(platform.product),manufacturer:checkVar(platform.manufacturer),layout:checkVar(platform.layout),os:checkVar(platform.os)}));
            setWait(true);
            try {
                if (typeof window !== 'undefined') {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            "WWW-Authenticate": process.env.authHeader,
                            "Accept":"application/json; charset=utf-8",
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        cache: "no-store",
                        body: JSON.stringify({socialId:socialId,name:name,image:image,client:client,clientInfo:clienInfo,getIp:ipSend,email:sendEmail})
                    };
                    const login = await fetch(process.env.backend+"/signin-with-socialnetwork", requestOptions);
                    if (login.status ===404) {
                        setNotification({user:"admin",content:"User email or password is not correct!"});
                        setTimeout(()=>setWait(false),[1000]);
                    } else if(login.status ===500) {
                        setNotification({user:"admin",content:"Something going wrong"});
                        setTimeout(()=>setWait(false),[1000]);
                    }
                    const response = await login.json();
                    if(response.auth===false) {
                        setParams(response);
                    } else if(response.auth===true) {
                        const accessToken = aes.decrypt(response.accessToken);
                        const clientId = aes.decrypt(response.clientId);
                        const today = new Date();
                        const expire = new Date();
                        expire.setTime(today.getTime() + 3600000*24*14);
                        document.cookie=`accessToken=${accessToken};path=/;secure;expires=${expire.toGMTString()}`;
                        document.cookie=`clientId=${clientId};path=/;secure;expires=${expire.toGMTString()}`;
                        setTimeout(()=>setWait(false),[1000]);
                        send({
                            type:"setAuth",
                            set:true
                        });
                        setTimeout(()=>signOut({callbackUrl: '/'}),[1000]);
                    }
                }
            } catch(e) {
                console.log(e);
            }
        }
    },[send,setNotification,wait,getIp]);
    let lazy = true;
    useEffect(()=>{
        return () => {
            if(typeof window !== "undefined"&&data!==undefined&&lazy===true) setTimeout(()=>handlerSocialNetwork(data),[1000]);
            lazy=false;
        };
    },[data,handlerSocialNetwork]);
    const handlerEmail = async(e) =>{
        e.preventDefault();
        if(loading===false&&data!==undefined) {
            const aes = new AesEncryption();
            aes.setSecretKey(process.env.aesKey);
            const email = aes.encrypt(e.target[0].value);
            const client = aes.encrypt("okki");
            setLoading(true);
            try {
                if (typeof window !== 'undefined') {
                   
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            "WWW-Authenticate": process.env.authHeader,
                            "Accept":"application/json; charset=utf-8",
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        cache: "no-store",
                        body: JSON.stringify({email:email,client:client})
                    };
                    const login = await fetch(process.env.backend+"/verify-email", requestOptions);
                    if (login.status ===404) {
                        setSign(e.target[0].value);
                        setParams({auth:false,email:false});
                        setTimeout(()=>setLoading(false),[1000]);
                    } else if(login.status ===500) {
                        setNotification({user:"admin",content:"Something going wrong"});
                        setTimeout(()=>setLoading(false),[1000]);
                    }
                    const response = await login.json();
                    if(response.success===true) {
                        setNotification({user:"admin",content:text.email_busy[lang]});
                        setLoading(false);
                    }
                }
            } catch(e) {
                console.log(e);
            }
        }
    };
    const handlerRegisterSN = async(e) => {
            e.preventDefault();
            if(loading===false&&data!==undefined) {
            const result = data;
            const aes = new AesEncryption();
            aes.setSecretKey(process.env.aesKey);
            const signId = String(result.token.id);
            const socialId = aes.encrypt(signId);
            const name = aes.encrypt(result.token.name);
            const image = aes.encrypt(result.token.image);
            const password = aes.encrypt(e.target[0].value)
            const client = aes.encrypt(result.token.provider);
            const ipSend = aes.encrypt(getIp);
            const email = result.token.email!==undefined?aes.encrypt(result.token.email):aes.encrypt(sign);
            const checkVar = (result) =>{
                if(result===null) return null;
                else if(result===undefined) return null;
                else return result;
            };
            const clienInfo = aes.encrypt(JSON.stringify({name:checkVar(platform.name),version:checkVar(platform.version),product:checkVar(platform.product),manufacturer:checkVar(platform.manufacturer),layout:checkVar(platform.layout),os:checkVar(platform.os)}));
            setLoading(true);
            try {
                if (typeof window !== 'undefined') {
                    const hostname = window.location.hostname;
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            "WWW-Authenticate": process.env.authHeader,
                            "Accept":"application/json; charset=utf-8",
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        cache: "no-store",
                        body: JSON.stringify({password:password,socialId:socialId,name:name,image:image,client:client,clientInfo:clienInfo,getIp:ipSend,email:email})
                    };
                    const login = await fetch(process.env.backend+"/register-socialnetwork", requestOptions);
                    if (login.status ===404) {
                        setNotification({user:"admin",content:"User email or password is not correct!"});
                        setTimeout(()=>setLoading(false),[1000]);
                    } else if(login.status ===500) {
                        setNotification({user:"admin",content:"Something going wrong"});
                        setTimeout(()=>setLoading(false),[1000]);
                    }
                    const response = await login.json();
                    if(result) {
                        const accessToken = aes.decrypt(response.accessToken);
                        const nameUser = aes.decrypt(response.name);
                        const surnameUser = aes.decrypt(response.surname);
                        const avatarUser = aes.decrypt(response.avatar);
                        const clientId = aes.decrypt(response.clientId);
                        const today = new Date();
                        const expire = new Date();
                        expire.setTime(today.getTime() + 3600000*24*14);
                        document.cookie=`accessToken=${accessToken};path=/;secure;expires=${expire.toGMTString()}`;
                        document.cookie=`clientId=${clientId};path=/;secure;expires=${expire.toGMTString()}`;
                        setNotification({title:nameUser+" "+surnameUser,content:"Welcome to the system!",image:avatarUser});
                        setWait(false);
                        send({
                            type:"setAuth",
                            set:true
                        });
                        signOut({callbackUrl: '/'});
                        setLoading(false);
                    }
                }
            } catch(e) {
                console.log(e);
            }
        }
    }
    return(
        <>
            <Head>
                <title>Okki ID</title>
                <meta property="og:title" content={`Okki ID`} />
                <meta name="description" content={`Welcome to Okki ID`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/"}} choice="alone" mode="standalone"/>
            <div className="main_app block_animation">
            <div className={style.login_form}>
                {params!==null&&params.auth===false?<h1 className={style.head_center}>{text['register_social'][lang]}</h1>:<h1 className={style.head_center}>{text['welcome_back'][lang]}</h1>}
                {params!==null&&params.auth===false?params.email===true?<p className={style.text_center}>{text['email'][lang]}</p>:<p className={style.text_center}>{text['password'][lang]}</p>:<p className={style.text_center}>{text['signin_text'][lang]}</p>}
                {data!==undefined&&data!==null&&
                <>
                <div className={style.signin_auth_form}>
                        <div className={style.signin_auth_form_image}>
                            <Image priority width={50} height={50} className={style.signin_auth_form_pic} src={data.token.image} alt="avatar" />
                        </div>
                        <div>
                            <h3>{data.token.name}</h3>
                            <p className={style.sub}>@{data.token.id}</p>
                        </div>
                    </div>
                    {params!==null&&params.auth===false?
                    params!==null&&params.email===true?<form onSubmit={(e) => handlerEmail(e)}><div className={style.login_row}>
                    <input type="email" name="email" className={`${style.login_input} ${style.email}`} placeholder={text['email_input'][lang]} required />
                            <button type="submit" className={`${style.login_button} brand_background anim_hover`}>{loading===true?<div className="button__preloader"><Image width={320} height={50} alt="preloader" src="/img/button-preloader.svg"/></div>:text['continue'][lang]}</button>
                        </div><div className={style.flex}>
                            <p className={style.sub}>{text['back_to'][lang]}</p>
                            <button type="button" onClick={()=>signOut({callbackUrl: '/signin'})} className={`${style.next_button} brand_background anim_hover`}>{text['back_button'][lang]}</button>
                        </div></form>:<form onSubmit={(e) => handlerRegisterSN(e)}><div className={style.login_row}>
                        <div className={style.password}>
                            <div className={style.password__show_row}>
                                <div className={style.password__show}>
                                    <Image priority width={24} height={24} alt="password" onClick={()=>{setPassValue(passValue==="password"?"text":"password")}} src={`/img/visibility${passValue==='password'?``:`_off`}.svg`}/>
                                </div>
                            </div>
                            <input type={passValue}  name="password" className={`${style.password_input} ${style.key}`} placeholder={text['password_input'][lang]} required/>
                            </div>
                            <button type="submit" className={`${style.login_button} brand_background anim_hover`}>{loading===true?<div className="button__preloader"><Image width={320} height={50} alt="preloader" src="/img/button-preloader.svg"/></div>:text['continue'][lang]}</button>
                        </div><div className={style.flex}>
                            <p className={style.sub}>{text['back_to'][lang]}</p>
                            <button type="button" onClick={()=>signOut({callbackUrl: '/signin'})} className={`${style.next_button} brand_background anim_hover`}>{text['back_button'][lang]}</button>
                        </div></form>:<div className={style.login_row}>
                                <div className="lds-ripple"><div></div><div></div></div>
                        </div>}
                    </>}

            </div>
        </div>
      </>
    );
};

export default LoginForm;