/*jshint esversion: 6 */
import Head from "next/head";
import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import ServerJsonFetchReq from "/start/ServerJsonFetchReq";
const OtpModule = dynamic(()=>import("/modules/signup/otpModule"),{ssr:false,loading:NavPreloader});

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

const SignUpOTP = ({lang}) => {
    
    return(
        <>
            <Head>
                <title>Okki ID</title>
                <meta property="og:title" content={`Okki ID`} />
                <meta name="description" content={`Welcome to Okki ID`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/signup/email"}} choice="alone" mode="standalone"/>
            <OtpModule lang={lang} />
        </>
    )
};
export default SignUpOTP;