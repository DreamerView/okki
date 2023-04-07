/*jshint esversion: 6 */

import dynamic from "next/dynamic";
const CategoryComponent = dynamic(()=>import("@/modules/category/index"));

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const CalculatorIndex = ({lang}) => <CategoryComponent name={"calculator"} lang={lang}/>;

export default CalculatorIndex;

