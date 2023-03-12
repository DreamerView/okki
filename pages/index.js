/*jshint esversion: 6 */
import Head from "next/head";
import dynamic from "next/dynamic";
import seo from "/translate/seo_index";
import AllService from '/start/services/all.json';
import styles from '/styles/index_main.module.css';
import style from "/styles/constructor/index.module.css";
import translate from "/translate/index_translate";
import nav_translate from "/translate/services/all_translate";
import Link from "next/link";
import Image from "next/image";
const IndexMenu = dynamic(()=>import('/pages/index_menu'));
const IndexContent = dynamic(()=>import('/pages/index_content'));

const Home = ({locale}) => {
  return(
    <>
      <Head>
        <title>{seo['title'][locale]}</title>
        <meta name="keywords" content={seo['keywords'][locale]} />
        <meta name="description" content={seo['desc'][locale]} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seo['title'][locale]} />
        <meta property="og:site_name" content={process.env.siteName} />
        <meta property="og:description" content={seo['desc'][locale]} />
        <meta name="twitter:title" content={seo['title'][locale]}/>
        <meta name="twitter:description" content={seo['desc'][locale]}/>
        <meta property="og:url" content={process.env.hostName} />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content={"@"+process.env.siteName}/>
        <meta property="og:image" content={process.env.hostName+"/seo_image/twitter.webp"} />
        <meta name="twitter:image" content={process.env.hostName+"/seo_image/twitter.webp"}/>
        <link rel="image_src" href={process.env.hostName+"/seo_image/twitter.webp"}/>
      </Head>
      <IndexMenu locale={locale} service={AllService} styles={styles} translate={translate} nav_translate={nav_translate} Link={Link} Image={Image}/>
      <IndexContent locale={locale} service={AllService} style={style} styles={styles} translate={translate} nav_translate={nav_translate} Link={Link} Image={Image}/>
    </>
  )
};

Home.getInitialProps = async ({locale}) => {
  return { locale };
};

export default Home;
