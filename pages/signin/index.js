/*jshint esversion: 6 */
/*jshint esversion: 8 */
import Head from "next/head";
import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
const IndexModule = dynamic(()=>import( "/modules/signin/indexModule"),{ssr:false,loading:NavPreloader});
import ServerJsonFetchReq from "/start/ServerJsonFetchReq";
import { getProviders, signIn,getSession,getCsrfToken } from "next-auth/react";

export const getServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control', 'no-store');
    const lang = context.locale,
    session = await getSession(context.req),
    provider = await getProviders(context.req),
    csrftoken = await getCsrfToken(context.req),
    data = await ServerJsonFetchReq({
        method:"GET",
        path:"/verify-user",
        cookie:context.req.headers.cookie,
        server:context,
        auth:"yes"
    }),
    ip = context.req.headers["x-real-ip"] || context.req.connection.remoteAddress;
    const ReturnTo = async() => {
        return {
            props: {
                providers: provider,
                csrfToken:csrftoken,
                ip:ip,
                lang:lang
            }
        }; 
    };
    const ReturnBack = async() => {
        return {
            redirect: {
                destination: '/',
            }
        }; 
    };
    const SocialNetwork = async() => {
        return {
            redirect: {
                destination: '/'+lang+'/signin/social-nerwork',
            }
        }; 
    };
    if(session!==null) return SocialNetwork();
    if(data!==undefined&&data.result==='redirect') return ReturnTo();
    return ReturnBack();
};

const LoginForm = ({providers,ip,lang}) => {
    return(
        <>
            <Head>
                <title>Okki ID</title>
                <meta property="og:title" content={`Okki ID`} />
                <meta name="description" content={`Welcome to Okki ID`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/"}} choice="alone" mode="standalone"/>
            <IndexModule lang={lang} providers={providers} ip={ip} signIn={signIn}/>
      </>
    );
};

export default LoginForm;