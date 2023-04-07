import dynamic from "next/dynamic";
import all from '@/start/services/subCategory.json';
import AppStorePreloader from "@/modules/app_store/apps_preloader";
const SubAppStore =  dynamic(()=>import("@/modules/app_store/subApps"),{loading: AppStorePreloader});
const SubAppList =  dynamic(()=>import("@/modules/app_store/subAppList"),{loading: AppStorePreloader});

const ShowComponent = ({lang}) => {
    return(all.map((e,index)=>index%2===0?<SubAppList key={index} lang={lang} category={e.name} />:<SubAppStore key={index} lang={lang} category={e.name} />))
};

export default ShowComponent;