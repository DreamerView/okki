import dynamic from "next/dynamic";
import all from '@/start/services/subCategory.json';
import AppStorePreloader from "@/modules/app_store/apps_preloader";
const SubAppStore =  dynamic(()=>import("@/modules/app_store/subApps"),{loading: AppStorePreloader});
const SubAppList =  dynamic(()=>import("@/modules/app_store/subAppList"),{loading: AppStorePreloader});

const CategoryList = ({lang,category,service,ux}) => all.filter(e=>e.category===category).map((e,index)=>index%2===0?<SubAppList service={service} ux={ux} key={index} lang={lang} category={e.name} />:<SubAppStore service={service} ux={ux} key={index} lang={lang} category={e.name} />);

export default CategoryList;