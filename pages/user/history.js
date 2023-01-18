/*jshint esversion: 6 */
import ServerJsonFetchReq from '/start/ServerJsonFetchReq';
import dynamic from 'next/dynamic';
import NavbarApp from '/pages/navbar_app/nav';
import style from "/styles/user/index.module.css";
import { useMediaQuery } from 'react-responsive';
import Head from 'next/head';
import ux from "/translate/user/index_translate";
import { useEffect,useState } from 'react';
import HeaderUser from '/pages/user/headerModule';
import HistoryUser from '/pages/user/historyModule';


export const getServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control', 'no-store');
    const locale = context.locale;
    console.time("history");
    const path = "/verify-user";
    const data = await ServerJsonFetchReq({
        method:"GET",
        path:path,
        cookie:context.req.headers.cookie,
        server:context,
        auth:"yes"
    });
    console.timeEnd("history");
    if(data!==undefined && data.result==='redirect') {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            }
        }; 
    }
    return {
        props: {locale:locale}
    }; 
};

const UserInterface = ({locale}) => {
    const [lazy,setLazy] = useState(false);
    const lang  = locale;
    const isTabletOrMobile = useMediaQuery({ query: '(min-width:1px) and (max-width:750px)' });
    useEffect(()=>{
        setLazy((lazy)=>lazy=true);
        return()=>{
            return false;
        }
    },[]);
    const titleHead = `${ux['recent'][lang]} | Okki.kz`;
    return(
    <>
        <Head>
                <title>{titleHead}</title>
        </Head>
        <NavbarApp lang={lang} to={{href:"/user"}} choice="alone" mode="standalone"/>
        <div className="main_app">
            <div className={style.user__main}>
                {lazy===true&&!isTabletOrMobile&&<HeaderUser lang={lang}/>}
                <HistoryUser lang={lang}/>
            </div>
        </div>
    </>
    );
};

export default UserInterface;