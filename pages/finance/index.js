/*jshint esversion: 6 */
import Head from "next/head";
import seo from "/translate/finance/index_seo";
import dynamic from "next/dynamic";
const CategoryComponent = dynamic(()=>import("@/modules/category"));

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const FinanceIndex = ({lang}) => {
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
            <CategoryComponent name={"finance"} lang={lang} />
      </>
    );
};

export default FinanceIndex;