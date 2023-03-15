/*jshint esversion: 6 */
/*jshint esversion: 8 */
import Head from "next/head";
import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import ServerJsonFetchReq from "/start/ServerJsonFetchReq";
import {getSession,signOut } from "next-auth/react";
const SocialNetworkModule = dynamic(()=>import("/modules/signin/socialNetworkModule"),{ssr:false});

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
    
    return(
        <>
            <Head>
                <title>Okki ID</title>
                <meta property="og:title" content={`Okki ID`} />
                <meta name="description" content={`Welcome to Okki ID`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/"}} choice="alone" mode="standalone"/>
            <SocialNetworkModule lang={lang} data={data} ip={ip} signOut={signOut} />
      </>
    );
};

export default LoginForm;