/*jshint esversion: 6 */
import dynamic from "next/dynamic";
const CategoryComponent = dynamic(()=>import("@/modules/category"));

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const FinanceIndex = ({lang}) => <CategoryComponent name={"finance"} lang={lang} />;

export default FinanceIndex;