/*jshint esversion: 6 */
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import text from "/translate/constructor/acc/index_translate";
import nav_translate from "/translate/services/all_translate";
import translate from "/translate/constructor/acc/navbar_translate";
import style from "/styles/constructor/index.module.css";
import AllService from '/start/services/all.json';
import type_translate from "/translate/services/type_translate";
import dynamic from 'next/dynamic';
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
  };

const BusinessIndex = ({lang}) => {
    return(
        <>
            <Head>
                <title>{nav_translate['calculator'][lang]} | Okki.kz</title>
                <meta property="og:title" content={`${nav_translate['calculator'][lang]} | Okki.kz`} />
                <meta name="description" content={text['seo_description'][lang]} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/"}} choice="alone"/>
            <div className="main_app block_animation">
            <h1 className="flex_text">{nav_translate['calculator'][lang]} <div className="emoji_h1"><Image title={'Microsoft fire emoji (Used for informational purposes only)'} priority src={"/emoji-small/fire.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate["step0_description"][lang]}</p>
            <div className={style.main__module_row}>
                {/*  */}
                {AllService.filter(e=>{return e.main === 'calculator'}).map((e,index)=>
                    <Link title={nav_translate[e.name][lang]} href={e.location} prefetch={false} key={index+1}>
                    <div className={`${style.main__module_row_block} anim_hover`}>
                        <div>
                            <div className={`${style.main__module_row_block_img}`}>
                                <Image title={nav_translate[e.name][lang]} alt="service" width={60} height={60} className={style.main__module_row_block_pic} src={e.image}/>
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

export default BusinessIndex;