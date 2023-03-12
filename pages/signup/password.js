/*jshint esversion: 6 */
import Head from "next/head";
import NavbarApp from '/modules/navbar_app/nav';
import style from "/styles/signin/index.module.css";
import {useState,useEffect} from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import AesEncryption from "aes-encryption";
const platform = require('platform');
import ServerJsonFetchReq from "/start/ServerJsonFetchReq";
import text from "/translate/signup/index_translate.json";

export const getServerSideProps = async (context) => {
    const lang = context.locale;
    const data = await ServerJsonFetchReq({
        method:"GET",
        path:"/get-data",
        cookie:context.req.headers.cookie,
        server:context,
        auth:"yes"
    });
    const ip = context.req.headers["x-real-ip"] || context.req.connection.remoteAddress;
    if(data!==undefined&&data.result==='redirect') {
        return {
            props: {lang:lang,getIp:ip}
        }; 
    } 
    return {
        redirect: {
            permanent: false,
            destination: '/',
        }
    }; 
};

const SignUp = ({lang,getIp}) => {
    const [name,setName] = useState("");
    const [passValue,setPassValue] = useState('password');
    const router = useRouter();
    useEffect(()=>{
        const nameUser = localStorage.getItem("RegistrationName");
        const surnameUser = localStorage.getItem("RegistrationSurname");
        const emailUser = localStorage.getItem("RegistrationEmail");
        const otpUser = localStorage.getItem("RegistrationOTP");
        const otpUserVerified = localStorage.getItem("RegistrationOTPVerified");
        const passwordUser = localStorage.getItem("RegistrationPassword");
        if(!nameUser) router.push('/signup');
        else if(!surnameUser) router.push('/signup/surname');
        else if(!emailUser) router.push('/signup/email');
        else if(!otpUser) router.push('/signup/email');
        else if(otpUserVerified) {
            const aes = new AesEncryption();
            aes.setSecretKey(process.env.aesKey);
            if(otpUser) {
                const dectryptOTP = aes.decrypt(otpUser);
                const decryptVerified = aes.decrypt(otpUserVerified);
                if(decryptVerified!=="verified-"+dectryptOTP) router.push('/signup/email');
            } else router.push('/signup/email');
        }
        if(passwordUser) setName(prev=>prev=passwordUser);
        return () =>{ 
            return false;
        };
    },[router]);
    const actionState = (e) => {
        setName(prev=>prev=e);
        localStorage.setItem("RegistrationPassword",e);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          if(name!=="") return createAcc();
        }
    };
    const createAcc = async() =>{
        const aes = new AesEncryption();
        aes.setSecretKey(process.env.aesKey);
        const nameUser = localStorage.getItem("RegistrationName");
        const surnameUser = localStorage.getItem("RegistrationSurname");
        const emailUser = localStorage.getItem("RegistrationEmail");
        const passwordUser = name;
        const checkVar = (result) =>{
            if(result===null) return null;
            else if(result===undefined) return null;
            else return result;
        };
        const clienInfo = JSON.stringify({name:checkVar(platform.name),version:checkVar(platform.version),product:checkVar(platform.product),manufacturer:checkVar(platform.manufacturer),layout:checkVar(platform.layout),os:checkVar(platform.os)});
        const requestOptions = {
            method: 'POST',
            headers: {
                "WWW-Authenticate": process.env.authHeader,
                "Accept":"application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
            },
            cache: "no-store",
            body: JSON.stringify({name:aes.encrypt(nameUser),surname:aes.encrypt(surnameUser),email:aes.encrypt(emailUser),password:aes.encrypt(passwordUser),client:aes.encrypt("okki"),clientInfo:aes.encrypt(clienInfo),getIp:aes.encrypt(getIp)})
        };
        const login = await fetch(process.env.backend+"/register-id", requestOptions);
        const result = await login.json();
        if(result.email===true) {
            router.push("/signup/email");
        }
        if(result.success === true) {
            const accessToken = aes.decrypt(result.accessToken);
            const clientId = aes.decrypt(result.clientId);
            const today = new Date();
            const expire = new Date();
            expire.setTime(today.getTime() + 3600000*24*14);
            document.cookie=`accessToken=${accessToken};path=/;secure;expires=${expire.toGMTString()}`;
            document.cookie=`clientId=${clientId};path=/;secure;expires=${expire.toGMTString()}`;
            localStorage.removeItem("RegistrationName");
            localStorage.removeItem("RegistrationSurname");
            localStorage.removeItem("RegistrationEmail");
            localStorage.removeItem("RegistrationOTP");
            localStorage.removeItem("RegistrationOTPVerified");
            localStorage.removeItem("RegistrationPassword");
            window.location.href="/";
        }
    };
    return(
        <>
            <Head>
                <title>Okki ID</title>
                <meta property="og:title" content={`Okki ID`} />
                <meta name="description" content={`Welcome to Okki ID`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/"}} choice="alone" mode="standalone"/>
            <div className="main_app_full block_animation">
                <div className={style.login_form}>
                    <h1 className={style.head_center}>{text.step5[lang]}</h1>
                    <p className={style.text_center}>{text.step5_text[lang]}</p>
                        <div className={style.login_row}>
                            <div className={style.password}>
                                <div className={style.password__show_row}>
                                    <div className={style.password__show}>
                                        <Image width={24} height={24} alt="password" onClick={()=>{setPassValue(passValue==="password"?"text":"password")}} src={`/img/visibility${passValue==='password'?``:`_off`}.svg`}/>
                                    </div>
                                </div>
                                <input onKeyDown={handleKeyDown} type={passValue} value={name} onChange={(e)=>actionState(e.target.value)} name="password" className={`${style.password_input} ${style.key}`} placeholder={text.step5_input[lang]} required/>
                            </div>
                            <button type="button" onClick={()=>name!==""?createAcc():""} className={`${style.login_button} ${name===""?style.disable:"block_animation"}`}>{text.continue[lang]}</button>
                        </div>
                </div>
            </div>
        </>
    )
};
export default SignUp;