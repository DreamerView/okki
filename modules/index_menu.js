/*jshint esversion: 6 */
import translate from "@/translate/index_translate";
import styles from '@/styles/index_main.module.css';
import nav_translate from "@/translate/services/all_translate";
import Link from "next/link";
import Image from "next/image";
import service from '@/start/services/all.json';


const IndexMenu = ({lang}) => {
    const locale =lang,serv = service!==undefined?service:[{}];
    return(
        <>
            <div itemScope itemType="https://schema.org/BreadcrumbList" className={`${styles!==undefined&&styles.main__menu_nav}`}>
            <div className={styles!==undefined&&styles.main__menu_nav_blocks}>
            {(serv)&&serv.filter(e=>e.type === 'category').map((e,index)=>
                <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" key={index+1}>
                <Link title={nav_translate!==undefined&&nav_translate[e.name][locale]} itemID={e.location} itemType="https://schema.org/Thing"  itemScope itemProp="item" href={e.location} prefetch={false}>
                    <div className={`${styles!==undefined&&styles.main__menu_nav_block} anim_hover`}>
                    <div className={`${styles!==undefined&&styles.main__menu_nav_block_image}`}>
                        <div className={`${styles!==undefined&&styles.main__menu_nav_block_image_pic}`}>
                        <Image priority title={translate!==undefined&&translate[e.name][locale]} width={44} height={44} src={e.image} alt="icon"/>
                        </div>
                    </div>
                    <span className={styles!==undefined&&styles.nav_header} itemProp="name">{nav_translate!==undefined&&nav_translate[e.name][locale]}</span>
                    </div>
                </Link>
                <meta itemProp="position" content={index+1} />
            </div>
            )}
            </div>
        </div>
        </>
    )
};

export default IndexMenu;