import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
const CounterModule = dynamic(()=>import("@/modules/others/counter"),{ssr:false});

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};


const CounterApp = ({lang}) => {
    return(<>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app ">
            <div className="main_block_row">
                <CounterModule/>
            </div>
        </div>
    </>);
};

export default CounterApp;