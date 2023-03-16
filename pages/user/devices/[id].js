/*jshint esversion: 6 */
/*jshint esversion: 9 */
import ServerJsonFetchReq from '/start/ServerJsonFetchReq';
import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
const DevicesModule = dynamic(()=>import('/modules/user/devicesModule'),{ssr:false});
import ux from "/translate/user/index_translate";
import Head from 'next/head';

export const getServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control', 'no-store');
    const id = context.params.id;
    const locale = context.locale;
    console.time("devices finished");
    const path = "/get-devices";
    const data = await ServerJsonFetchReq({
        method:"GET",
        path:path,
        cookie:context.req.headers.cookie,
        server:context,
        auth:"yes"
    });
    console.timeEnd("devices finished");
    if(data.result==='redirect') {
        return {
            redirect: {
                permanent: false,
                destination: '/signin',
            },
            props: {}
        }; 
    } 
    return {
        props: { getId: id,data:data,lang:locale}
    }; 
    
};

const UserInterface = ({getId,data,lang}) => {
    const titleHead = `${ux['devices'][lang]} | Okki.kz`;
    console.log(DevicesModule);
    return(
    <>
        <Head>
                <title>{titleHead}</title>
        </Head>
        <NavbarApp lang={lang} to={{href:"/user"}} choice="alone" mode="standalone"/>
        <DevicesModule ux={ux} getId={getId} data={data} lang={lang} />
    </>
    );
};

export default UserInterface;