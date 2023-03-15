/*jshint esversion: 6 */
import Head from "next/head";
import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import ServerJsonFetchReq from "/start/ServerJsonFetchReq";
const PasswordModule = dynamic(()=>import("/modules/signup/passwordModule"),{ssr:false});

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

const SignUpPassword = ({lang,getIp}) => {
    return(
        <>
            <Head>
                <title>Okki ID</title>
                <meta property="og:title" content={`Okki ID`} />
                <meta name="description" content={`Welcome to Okki ID`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/"}} choice="alone" mode="standalone"/>
            <PasswordModule getIp={getIp} lang={lang}/>
        </>
    )
};
export default SignUpPassword;