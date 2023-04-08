/*jshint esversion: 6 */
import styles from '@/styles/index_main.module.css';
import Link from "next/link";
import Image from "next/image";

const IndexMenu = ({lang,service}) => {
    const text = (result) => service['translate'].find(e=>e.name===result)[lang];
    return(
        <>
            <div itemScope itemType="https://schema.org/BreadcrumbList" className={`${styles!==undefined&&styles.main__menu_nav}`}>
            <div className={styles!==undefined&&styles.main__menu_nav_blocks}>
            {(service['list'])&&service['list'].filter(e=>e.type === 'category').map((e,index)=>
                <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" key={index+1}>
                <Link title={text(e.name)} itemID={e.location} itemType="https://schema.org/Thing"  itemScope itemProp="item" href={e.location} prefetch={false}>
                    <div className={`${styles!==undefined&&styles.main__menu_nav_block} anim_hover`}>
                    <div className={`${styles!==undefined&&styles.main__menu_nav_block_image}`}>
                        <div className={`${styles!==undefined&&styles.main__menu_nav_block_image_pic}`}>
                        <Image priority title={text(e.name)} width={44} height={44} src={e.image} alt="icon"/>
                        </div>
                    </div>
                    <span className={styles!==undefined&&styles.nav_header} itemProp="name">{text(e.name)}</span>
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