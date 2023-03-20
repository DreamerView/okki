/*jshint esversion: 6 */
import Head from "next/head";
import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/signin/index.module.css";
import {useState,useEffect} from 'react';
import { useRouter } from "next/router";
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

const SignUpSurname = ({lang}) => {
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const router = useRouter();
    useEffect(() => {
        const nameUser = localStorage.getItem("RegistrationName");
        const surnameUser = localStorage.getItem("RegistrationSurname");
        if(nameUser) setName(prev=>prev=nameUser);
        else router.push('/signup');
        if(surnameUser) setSurname(prev=>prev=surnameUser);
        return () => {
            return false;
        };
    },[router]);
    const actionState = (e) => {
        setSurname(prev=>prev=e);
        localStorage.setItem("RegistrationSurname",e);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          if(surname!=="") return router.push('/signup/email');
        }
    };
    return(
        <>
            <Head>
                <title>Okki ID</title>
                <meta property="og:title" content={`Okki ID`} />
                <meta name="description" content={`Welcome to Okki ID`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/signup"}} choice="alone" mode="standalone"/>
            <div className="main_app_full ">
                <div className={style.login_form}>
                    <h1 className={style.head_center}>{text.step2[lang]} <u>{name}!</u></h1>
                    <p className={style.text_center}>{text.step2_text[lang]}</p>
                        <div className={style.login_row}>
                            <input onKeyDown={handleKeyDown} type="text" name="surname" value={surname} onChange={(e)=>actionState(e.target.value)} className={`${style.login_input} ${style.email}`} placeholder={text.step2_input[lang]} required />
                            <button type="button" onClick={()=>surname!==""?router.push('/signup/email'):""} className={`${style.login_button} ${surname===""?style.disable:""}`}>{text.continue[lang]}</button>
                        </div>
                </div>
            </div>
        </>
    )
};
export default SignUpSurname;