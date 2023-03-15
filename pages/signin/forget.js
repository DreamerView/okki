/*jshint esversion: 6 */
/*jshint esversion: 8 */
import dynamic from "next/dynamic";
import ServerJsonFetchReq from "/start/ServerJsonFetchReq";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
const ForgetModule = dynamic(()=>import("/modules/signin/forgetModule"),{ssr:false});

export const getServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control', 'no-store');
    const lang = context.locale;
    const data = await ServerJsonFetchReq({
        method:"GET",
        path:"/verify-user",
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

const FotgetPassword = ({lang}) => {
    
    return (
        <>
            <NavbarApp lang={lang} to={{href:"/signin"}} choice="alone" mode="standalone"/>
            <ForgetModule lang={lang} />
        </>
    )
}
export default FotgetPassword;