/*jshint esversion: 6 */
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import translate from "/translate/constructor/acc/navbar_translate";
import style from "/styles/constructor/index.module.css";
import nav_translate from "/translate/services/all_translate";
import type_translate from "/translate/services/type_translate";
import seo from "/translate/constructor/index_seo";
import AllService from '/start/services/all.json';
import NavbarApp from '/pages/navbar_app/nav';

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
            <div className={style.main__module_row}>
                {/*  */}
                {AllService.filter(e=>{return e.category === 'constructor'}).map((e,index)=>
                    <Link title={nav_translate[e.name][lang]} href={e.location} prefetch={false} key={index+1}>
                    <div className={`${style.main__module_row_block} anim_hover`}>
                        <div>
                            <div className={`${style.main__module_row_block_img}`}>
                                <Image loading='lazy' title={nav_translate[e.name][lang]} alt="service" width={60} height={60} className={style.main__module_row_block_pic} src={e.image} />
                            </div>
                        </div>
                        <div className={style.main__module_row_block_f}>
                            <span className="head_1">{nav_translate[e.name][lang]}</span>
                            <p className={style.main__module_row_block_f_p}>{type_translate['services'][lang]}</p>
                        </div>
                    </div>
                    </Link>
                    )}
                {/*  */}
            </div>
        </div>
      </>
    );
};

ConstructorIndex.getInitialProps = async ({locale}) => {
    return { lang:locale };
  };

export default ConstructorIndex;