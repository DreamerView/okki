/*jshint esversion: 6 */
import Head from "next/head";
import dynamic from "next/dynamic";
import seo from "@/translate/seo_index";
const IndexMenu = dynamic(()=>import('@/modules/index_menu'));
const IndexContent = dynamic(()=>import('@/modules/index_content'));
import { loadServices } from '@/translate/services/index';
import { loadUX } from '@/translate/ux/index';

export const getStaticProps = async ({locale}) => {
  const services_list = await loadServices();
  const ux = await loadUX();
  return {props:{lang:locale,services_list:services_list,ux:ux}};
};

const Home = ({lang,services_list,ux}) => {
  return(
    <>
      <Head>
        <title>{seo['title'][lang]}</title>
        <meta name="keywords" content={seo['keywords'][lang]} />
        <meta name="description" content={seo['desc'][lang]} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seo['title'][lang]} />
        <meta property="og:site_name" content={process.env.siteName} />
        <meta property="og:description" content={seo['desc'][lang]} />
        <meta name="twitter:title" content={seo['title'][lang]}/>
        <meta name="twitter:description" content={seo['desc'][lang]}/>
        <meta property="og:url" content={process.env.hostName} />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content={"@"+process.env.siteName}/>
        <meta property="og:image" content={process.env.hostName+"/seo_image/twitter.webp"} />
        <meta name="twitter:image" content={process.env.hostName+"/seo_image/twitter.webp"}/>
        <link rel="image_src" href={process.env.hostName+"/seo_image/twitter.webp"}/>
      </Head>
      <IndexMenu lang={lang} service={services_list} />
      <IndexContent lang={lang} service={services_list} ux={ux} />
    </>
  )
};

export default Home;
