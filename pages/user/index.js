/*jshint esversion: 6 */

import NavbarApp from '/pages/navbar_app/nav';
import dynamic from 'next/dynamic';
import style from "/styles/user/index.module.css";
import { useMediaQuery } from 'react-responsive';
import Head from 'next/head';
import ux from "/translate/user/index_translate";
import { useEffect,useState } from 'react';
const HeaderUser = dynamic(()=>import('/pages/user/headerModule'),{ssr:false});
const HistoryUser =  dynamic(()=>import('/pages/user/historyModule'),{ssr:false});
const AesEncryption = require('aes-encryption');

export const getServerSideProps = async (context) => {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );
    const path = '/get-data';
    const locale = context.locale;
    const cookie = context.req.headers.cookie;
    // try {
    if(cookie!==undefined) {
            const aes = new AesEncryption();
            aes.setSecretKey(process.env.aesKey);
            const getCookie = (cookieName) => {
                let cookies = {};
                cookie.split(';').forEach(function(el) {
                let [key,value] = el.split('=');
                cookies[key.trim()] = value;
                });
                return cookies[cookieName];
            };
            const reqUrl = context.req.headers['host'];
            const urlReq = reqUrl==='localhost:3000'?"http://":"https://";
            const originReq = urlReq+reqUrl;
            const userAccessToken = getCookie("accessToken");
            const userClientId = getCookie("clientId");
            if(userAccessToken!==undefined&&userAccessToken!==null&&userClientId!==undefined&&userClientId!==null) {
                const accessToken = aes.encrypt(userAccessToken);
                const clientId = aes.encrypt(userClientId);
                const requestOptions = {
                        method: 'GET',
                        headers: {
                            "WWW-Authenticate": process.env.authHeader,
                            "Origin":originReq,
                            "Authorization": `Bearer ${accessToken} ${clientId}`,
                            "Accept":"application/json; charset=utf-8",
                            "Content-Type": "application/json; charset=utf-8",
                            "Accept-Encoding":"gzip"
                        },
                        cache: "no-store"
                    };
                const login = await fetch(process.env.backend+path, requestOptions);
                if (login.status === 406) {
                    const tokenOptions = {
                        method: 'POST',
                        headers: {
                            "WWW-Authenticate": process.env.authHeader,
                            "Origin":originReq,
                            "Accept":"application/json; charset=utf-8",
                            "Content-Type": "application/json; charset=utf-8",
                            "Accept-Encoding":"gzip"
                        },
                        cache: "no-store",
                        body: JSON.stringify({accessToken:accessToken,clientId:clientId})
                    };
                    const send = await fetch(process.env.backend+"/generate-token",tokenOptions);
                    if(send.status === 409) {
                        console.log("It's conflict!");
                        context.res.setHeader('set-cookie', ["accessToken=;Max-Age=0;path=/"]);
                        context.res.setHeader('set-cookie', ["clientId=;Max-Age=0;path=/"]);
                        return {
                            redirect: {
                                permanent: false,
                                destination: '/signin',
                            }
                        };
                    } else {
                        const result = await send.json();
                        if(result.accessToken!==undefined) {
                            const response = aes.decrypt(result.accessToken);
                            const getClientId = aes.decrypt(result.clientId);
                            const today = new Date();
                            const expire = new Date();
                            expire.setTime(today.getTime() + 3600000*24*14);
                            context.res.setHeader('set-cookie', ["accessToken="+response+";path=/;secure;expires="+expire.toGMTString()+""]);
                            context.res.setHeader('set-cookie', ["clientId="+getClientId+";path=/;secure;expires="+expire.toGMTString()+""]);
                            console.log("token updated, new token is "+response);
                            const sendReqOpt =  {
                                    method: 'GET',
                                    headers: {
                                        // "WWW-Authenticate": process.env.authHeader,
                                        // "Origin":originReq,
                                        "Authorization": `Bearer ${aes.encrypt(response)} ${clientId}`,
                                        "Accept":"application/json; charset=utf-8",
                                        "Content-Type": "application/json; charset=utf-8",
                                        "Accept-Encoding":"gzip"
                                    },
                                    cache: "no-store"
                                };
                            const send = await fetch(process.env.backend+path, sendReqOpt);
                            // const res = await send.json();
                            return {props:{locale:locale}}
                        }
                    }
                } else if(login.status === 409) {
                    console.log("It's conflict!");
                    context.res.setHeader('set-cookie', ["clientId=;Max-Age=0;path=/"]);
                    context.res.setHeader('set-cookie', ["accessToken=;Max-Age=0;path=/"]);
                    return {result:'redirect',location:"/signin"};
                } 
                else {
                    const result = await login.json();
                    console.log(result);
                    return {props:{locale:locale}};
                }
            } else {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/signin',
                    }
                };
            }
        } 
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            }
        };
    // } catch(e) {
    //         console.log(e);
    //     }
};


const UserInterface = ({locale}) => {
    const [lazy,setLazy] = useState(false);
    const lang  = locale;
    const isTabletOrMobile = useMediaQuery({ query: '(min-width:1px) and (max-width:750px)' });
    useEffect(()=>{
        setLazy((lazy)=>lazy=true);
        return()=>{
            setLazy((lazy)=>lazy=false);
        }
    },[]);
    const titleHead = `${ux['recent'][lang]} | Okki.kz`;
    return(
    <>
        <Head>
                <title>{titleHead}</title>
        </Head>
        <NavbarApp lang={lang} to={{href:"/"}} choice="alone" mode="standalone"/>
        <div className="main_app">
            <div className={style.user__main}>
                <HeaderUser lang={lang}/>
                {lazy&&!isTabletOrMobile&&<HistoryUser lang={lang}/>}
            </div>
        </div>
    </>
    );
};

export default UserInterface;