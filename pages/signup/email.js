/*jshint esversion: 6 */
/*jshint esversion: 8 */
import Head from "next/head";
import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import ServerJsonFetchReq from "/start/ServerJsonFetchReq";
const EmailModule = dynamic(()=>import("/modules/signup/emailModule"),{ssr:false,loading:NavPreloader});

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

const SignUpEmail = ({lang}) => {
    return(
        <>
            <Head>
                <title>Okki ID</title>
                <meta property="og:title" content={`Okki ID`} />
                <meta name="description" content={`Welcome to Okki ID`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/signup/surname"}} choice="alone" mode="standalone"/>
            <EmailModule lang={lang} />
        </>
    )
};
export default SignUpEmail;