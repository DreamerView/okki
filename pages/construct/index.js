/*jshint esversion: 6 */
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import translate from "/translate/constructor/acc/navbar_translate";
import style from "/styles/constructor/index.module.css";
import nav_translate from "/translate/services/all_translate";
import seo from "/translate/constructor/index_seo";
import AllService from '/start/services/all.json';
import dynamic from "next/dynamic";
import AppStorePreloader from "/pages/modules/apps_preloader";
const AppStore =  dynamic(()=>import("/pages/modules/apps"),{loading: AppStorePreloader});
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
const ConstructorIndex = ({lang}) => {
    return(
        <>
            <Head>
            <title>{seo['title'][lang]}</title>
                <meta name="keywords" content={seo['keywords'][lang]} />
                <meta name="description" content={seo['description'][lang]} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={seo['title'][lang]} />
                <meta property="og:site_name" content={process.env.authorNamee} />
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
            <NavbarApp to={{href:"/"}} choice="alone" lang={lang}/>
            <div className="main_app block_animation">
            <h1 className="flex_text">{translate["step0"][lang]} <div className="emoji_h1"><Image title={'Microsoft fire emoji (Used for informational purposes only)'} priority src={"/emoji-small/fire.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate["step0_description"][lang]}</p>
            <AppStore category="constructor" serv={AllService} style={style} Link={Link} nav_translate={nav_translate} lang={lang} Image={Image}/>
        </div>
      </>
    );
};

ConstructorIndex.getInitialProps = async ({locale}) => {
    return { lang:locale };
  };

export default ConstructorIndex;