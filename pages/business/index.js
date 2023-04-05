/*jshint esversion: 6 */
import dynamic from "next/dynamic";
import Image from "next/image";
import Head from "next/head";
import translate from "/translate/constructor/acc/navbar_translate";
import nav_translate from "/translate/services/all_translate";
import seo from "/translate/business/index_seo";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import AppStorePreloader from "/modules/app_store/apps_preloader";
const AppStore =  dynamic(()=>import("/modules/app_store/apps"),{loading: AppStorePreloader});
const AppList =  dynamic(()=>import("/modules/app_store/app_list"),{loading: AppStorePreloader});

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
  };

const BusinessIndex = ({lang}) => {
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
            <h1 className="flex_text">{nav_translate['business'][lang]} <div className="emoji_h1"><Image title={'Microsoft briefcase emoji (Used for informational purposes only)'} priority src={"/emoji-small/briefcase.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate["step0_description"][lang]}</p>
            <AppList lang={lang} category={"category"} search={"business"} />
            <AppStore category="business" lang={lang} />
        </div>
      </>
    );
};

export default BusinessIndex;