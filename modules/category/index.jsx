import dynamic from "next/dynamic";
import Image from "next/image";
import translate from "@/translate/constructor/acc/navbar_translate";
import NavPreloader from "@/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('@/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import AppStorePreloader from "@/modules/app_store/apps_preloader";
const AppStore =  dynamic(()=>import("@/modules/app_store/apps"),{loading: AppStorePreloader});
const AppList =  dynamic(()=>import("@/modules/app_store/app_list"),{loading: AppStorePreloader});
const CategoryList = dynamic(()=>import("@/modules/category/component"),{ssr:false});
import { memo } from "react";
import seo from "@/translate/category_seo/index_translate";
import Head from "next/head";

const CategoryComponent = ({name,lang,service,ux}) => {
    const text = (req,res) => req.find(e=>e.name===res)[lang];
    return(
    <>
        <Head>
            <title>{seo[name]['title'][lang]}</title>
            <meta name="keywords" content={seo[name]['keywords'][lang]} />
            <meta name="description" content={seo[name]['description'][lang]} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={seo[name]['title'][lang]} />
            <meta property="og:site_name" content={process.env.authorName} />
            <meta property="og:description" content={seo[name]['description'][lang]} />
            <meta name="twitter:title" content={seo[name]['title'][lang]}/>
            <meta name="twitter:description" content={seo[name]['description'][lang]}/>
            <meta property="og:url" content={process.env.hostName} />
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content={"@"+process.env.siteName}/>
            <meta property="og:image" content={process.env.hostName+"/seo_image/twitter.webp"} />
            <meta name="twitter:image" content={process.env.hostName+"/seo_image/twitter.webp"}/>
            <link rel="image_src" href={process.env.hostName+"/seo_image/twitter.webp"}/>
        </Head>
        <NavbarApp ux={ux} service={service} lang={lang} to={{href:"/"}} choice="alone"/>
        <div className="main_app ">
            <h1 className="flex_text">{text(service['translate'],name)} <div className="emoji_h1"><Image title={'Microsoft laptop emoji (Used for informational purposes only)'} priority src={`/category/${name}.webp`} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate["step0_description"][lang]}</p>
            <AppList lang={lang} service={service} ux={ux} category={"category"} search={name} />
            <AppStore lang={lang} service={service} ux={ux} category={name} />
            <CategoryList service={service} ux={ux} lang={lang} category={name} />  
        </div>
    </>
    );
};

export default memo(CategoryComponent);