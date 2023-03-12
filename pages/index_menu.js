/*jshint esversion: 6 */

const IndexMenu = ({lang,service,styles,translate,nav_translate,Link,Image}) => {
    const locale =lang,serv = service!==undefined?service:[{}];
    return(
        <div itemScope itemType="https://schema.org/BreadcrumbList" className={`${styles.main__menu_nav} block_animation`}>
            <div className={styles.main__menu_nav_blocks}>
            {serv&&serv.filter(e=>e.type === 'category').map((e,index)=>
                <div itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" key={index+1}>
                <Link title={nav_translate[e.name][locale]} itemID={e.location} itemType="https://schema.org/Thing"  itemScope itemProp="item" href={e.location} prefetch={false}>
                    <div className={`${styles.main__menu_nav_block} anim_hover`}>
                    <div className={`${styles.main__menu_nav_block_image} ${e.image_background}`}>
                        <div className={`${styles.main__menu_nav_block_image_pic}`}>
                        <Image priority title={translate[e.name][locale]} width={36} height={36} src={e.image} alt="icon"/>
                        </div>
                    </div>
                    <span className={styles.nav_header} itemProp="name">{nav_translate[e.name][locale]}</span>
                    </div>
                </Link>
                <meta itemProp="position" content={index+1} />
            </div>
            )}
            </div>
        </div>
    )
};

export default IndexMenu;