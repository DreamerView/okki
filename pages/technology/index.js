/*jshint esversion: 6 */

import Image from "next/image";
import Head from "next/head";
import translate from "/translate/constructor/acc/navbar_translate";
import nav_translate from "/translate/services/all_translate";
import seo from "/translate/health/index_seo";
import dynamic from "next/dynamic";
import AppStorePreloader from "/modules/app_store/apps_preloader";
const AppStore =  dynamic(()=>import("/modules/app_store/apps"),{loading: AppStorePreloader});
const AppList =  dynamic(()=>import("/modules/app_store/app_list"),{loading: AppStorePreloader});
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const HealthIndex = ({lang}) => {
    const historyAction = (service) => {
        const history = JSON.parse(localStorage.getItem('historyAction'));
        const action = history?history:[];
        const checkExp = [...action,{name:service,time:Date.now()}];
        const key = 'name';
        const historyResult = [...new Map(checkExp.map(item =>[item[key], item])).values()];
        localStorage.setItem('historyAction',JSON.stringify(historyResult))
    };
    return(
        <>
            <Head>
            <title>{seo['title'][lang]}</title>
                <meta name="keywords" content={seo['keywords'][lang]} />
                <meta name="description" content={seo['description'][lang]} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={seo['title'][lang]} />
                <meta property="og:site_name" content={process.env.authorName} />
                <meta property="og:description" content={seo['description'][lang]} />
                <meta name="twitter:title" content={seo['title'][lang]}/>
                <meta name="twitter:description" content={seo['description'][lang]}/>
                <meta property="og:url" content={process.env.hostName} />
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content={"@"+process.env.siteName}/>
                <meta property="og:image" content={process.env.hostName+"/seo_image/twitter.webp"} />
                <meta name="twitter:image" content={process.env.hostName+"/seo_image/twitter.webp"}/>
                <link rel="image_src" href={process.env.hostName+"/seo_image/twitter.webp"}/>
            </Head>
            <NavbarApp lang={lang} to={{href:"/"}} choice="alone"/>
            <div className="main_app ">
            <div className="main_row">
            <h1 className="flex_text">{nav_translate["tech"][lang]} <div className="emoji_h1"><Image title={'Microsoft laptop emoji (Used for informational purposes only)'} priority src={"/emoji-small/laptop.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate["step0_description"][lang]}</p>
            <AppList lang={lang} category={"category"} search={"tech"} />
            <AppStore category="tech" lang={lang} />
            </div>
            
        </div>
      </>
    );
};

export default HealthIndex;

