/*jshint esversion: 6 */
import Head from "next/head";
import seo from "/translate/health/index_seo";
import dynamic from "next/dynamic";
const CategoryComponent = dynamic(()=>import("@/modules/category/index"));

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const TechIndex = ({lang}) => <CategoryComponent name="tech" lang={lang}/>;

export default TechIndex;

