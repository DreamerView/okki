/*jshint esversion: 6 */
import Head from "next/head";
import NavbarApp from '/pages/navbar_app/nav';
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

const SignUp = ({lang}) => {
    const [name,setName] = useState("");
    const router = useRouter();
    useEffect(()=>{
        const nameUser = localStorage.getItem("RegistrationName");
        if(nameUser) setName(prev=>prev=nameUser);
        return () =>{
            return false;
        };
    },[]);
    const actionState = (e) => {
        setName(prev=>prev=e);
        localStorage.setItem("RegistrationName",e);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          if(name!=="") return router.push('/signup/surname');
        }
    };
    return(
        <>
            <Head>
                <title>Okki ID</title>
                <meta property="og:title" content={`Okki ID`} />
                <meta name="description" content={`Welcome to Okki ID`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/signin"}} choice="alone" mode="standalone"/>
            <div className="main_app_full block_animation">
                <div className={style.login_form}>
                    <h1 className={style.head_center}>{text.step1[lang]}</h1>
                    <p className={style.text_center}>{text.step1_text[lang]}</p>
                        <div className={style.login_row}>
                            <input onKeyDown={handleKeyDown} type="text" name="text" value={name} onChange={(e)=>actionState(e.target.value)} className={`${style.login_input} ${style.email}`} placeholder={text.step1_input[lang]} required />
                            <button type="button" onClick={()=>name!==""?router.push('/signup/surname'):""} className={`${style.login_button} ${name===""?style.disable:"block_animation anim_hover"}`}>{text.continue[lang]}</button>
                        </div>
                </div>
            </div>
        </>
    )
};
export default SignUp;