/*jshint esversion: 6 */
import Head from "next/head";
import NavbarApp from '/pages/navbar_app/nav';
import style from "/styles/signin/index.module.css";
import {useState,useEffect} from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
const AesEncryption = require('aes-encryption');
import ServerJsonFetchReq from "/start/ServerJsonFetchReq";
import text from "/translate/signup/index_translate.json";

export const getServerSideProps = async (context) => {
    // if(process.env.production===true) {
    //     context.res.setHeader(
    //         'Cache-Control',
    //         'public, s-maxage=10, stale-while-revalidate=59'
    //     );
    // }
    const lang = context.locale;
    const data = await ServerJsonFetchReq({
        method:"GET",
        path:"/get-data",
        cookie:context.req.headers.cookie,
        server:context,
        auth:"yes"
    });
    if(data!==undefined&&data.result==='redirect') {
        return {
            props: {lang:lang}
        }; 
    } 
    return {
        redirect: {
            permanent: false,
            destination: '/',
        }
    }; 
};

const SignUp = ({lang}) => {
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
          if(name!=="") return router.push('/signup/finish');
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
                            <button type="button" onClick={()=>name!==""?router.push('/signup/finish'):""} className={`${style.login_button} ${name===""?style.disable:"block_animation"}`}>{text.continue[lang]}</button>
                        </div>
                </div>
            </div>
        </>
    )
};
export default SignUp;