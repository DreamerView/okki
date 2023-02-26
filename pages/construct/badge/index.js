/*jshint esversion: 6 */
import style from "/styles/constructor/acc/index.module.css";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import ux from "/translate/ux/action";
import text from "/translate/constructor/acc/index_translate";
import seo from "/translate/constructor/acc/index_seo";
import NavbarApp from '/pages/navbar_app/nav';
import AppShow from "/pages/modules/app";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const Acc = ({lang}) => {
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
        <NavbarApp lang={lang} to={{href:"/construct"}} choice="alone"/>
        <div className={`main_app block_animation`}>
            <div className="main_row">
                <AppShow lang={lang} Image={Image} name={"acc_const"} translate={text['name'][lang]}/>
                <div className='more_information_app_small'><Image width={36} height={36} alt="icon" src="/img/info.svg" /><p>{text["content"][lang]}</p></div>
                <div className={`${style.main__block_menu_select} p-m`}>
                <div className={`${style.main__block_menu_select_block} anim_hover`}>
                <Link title={text['title1'][lang]} href="/construct/badge/logo" prefetch={false}>
                <div className={`${style.main__block_menu_select_block_icon} green_background`}>
                    <div className={style.main__block_menu_select_block_i}>
                        <Image width={30} height={30} className={style.main__block_menu_select_block_icon_img} title="Person icon from Okki.kz" src="/img/person.svg" alt="icon" priority />
                    </div>
                </div>
                <div className={style.main__block_menu_select_main}>
                    <h2>{text['title1'][lang]} </h2>
                </div>
                <div className={style.main__block_menu_select_main}>
                    <p className={style.main__block_menu_select_main_p}>{text['content1'][lang]}</p>
                </div>
                <div className={style.main__block_menu_select_main}>
                    <button className={`${style.main__block_menu_select_main_button} green_background`}>{ux['start'][lang]}</button>
                </div>
                </Link>
                </div>

                <div className={`${style.main__block_menu_select_block} anim_hover`}>
                <Link title={text['title2'][lang]} href="/construct/badge/logo" prefetch={false}>
                <div className={`${style.main__block_menu_select_block_icon} purple_background`}>
                    <div className={style.main__block_menu_select_block_i}>
                        <Image width={30} height={30} className={style.main__block_menu_select_block_icon_img} title="Group icon from Okki.kz" src="/img/group.svg" alt="icon" priority/>
                    </div>
                </div>
                <div className={style.main__block_menu_select_main}>
                    <h2>{text['title2'][lang]}</h2>
                </div>
                <div className={style.main__block_menu_select_main}>
                    <p className={style.main__block_menu_select_main_p}>{text['content2'][lang]}</p>
                </div>
                <div className={style.main__block_menu_select_main}>
                    <button className={`${style.main__block_menu_select_main_button} purple_background`}>{ux['start'][lang]}</button>
                </div>
                </Link>
                </div>

                <div className={`${style.main__block_menu_select_block} anim_hover`}>
                <Link href="/construct/badge/logosd" prefetch={false}>
                <div className={`${style.main__block_menu_select_block_icon} blue_background`}>
                    <div className={style.main__block_menu_select_block_i}>
                        <Image width={30} height={30} className={style.main__block_menu_select_block_icon_img} title="Help icon from Okki.kz" src="/img/help.svg" alt="icon" priority/>
                    </div>
                </div>
                <div className={style.main__block_menu_select_main}>
                    <h2>{text['title3'][lang]}</h2>
                </div>
                <div className={style.main__block_menu_select_main}>
                    <p className={style.main__block_menu_select_main_p}>{text['content3'][lang]}</p>
                </div>
                <div className={style.main__block_menu_select_main}>
                    <button className={`${style.main__block_menu_select_main_button} blue_background`}>{ux['start'][lang]}</button>
                </div>
                </Link>
                </div>

                </div>
            </div>
        </div>
      </>  
    );
}

export default Acc;