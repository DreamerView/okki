import type_translate from "/translate/services/type_translate";

const AppStore = ({serv,style,Link,nav_translate,lang,Image}) =>{
    const group = (items, n) => items.filter(e=>e.type === 'services').reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
      }, []);
    return(
        <div className={style.main__module_row}>
    {serv&&group(serv, 3).map((children,index)=>
        <div key={index} className={style.main__module_row_panel}>
          {children.map((e,index) =>
            <Link title={nav_translate[e.name][lang]} href={e.location} prefetch={false} key={index+1}>
            <div className={`${style.main__module_row_block} anim_hover`}>
                <div>
                    <div className={`${style.main__module_row_block_img}`}>
                        <Image loading='lazy' title={nav_translate[e.name][lang]} alt="service" width={60} height={60} className={style.main__module_row_block_pic} src={e.image} />
                    </div>
                </div>
                <div className={style.main__module_row_block_f}>
                    <span className="head_1">{nav_translate[e.name][lang]}</span>
                    <p className={style.main__module_row_block_f_p}>{type_translate['services'][lang]}</p>
                </div>
            </div>
            </Link>
          )}
        </div>
      )}
      </div>
    )
};
export default AppStore;