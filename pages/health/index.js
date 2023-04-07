/*jshint esversion: 6 */
import dynamic from "next/dynamic";
const CategoryComponent =  dynamic(()=>import("@/modules/category/index"));

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const HealthIndex = ({lang}) => <CategoryComponent name="health" lang={lang} />;

export default HealthIndex;