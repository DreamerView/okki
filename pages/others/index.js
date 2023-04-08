/*jshint esversion: 6 */

import Head from "next/head";
import seo from "@/translate/health/index_seo";
import dynamic from "next/dynamic";
const CategoryComponent = dynamic(()=>import("@/modules/category/index"));
import { loadServices } from '@/translate/services/index';
import { loadUX } from '@/translate/ux/index';

export const getStaticProps = async ({locale}) => {
    const services_list = await loadServices();
    const ux = await loadUX();
    return {props:{lang:locale,service:services_list,ux:ux}};
};

const OthersIndex = ({lang,service,ux}) => <CategoryComponent name="others" lang={lang} service={service} ux={ux} />;

export default OthersIndex;

