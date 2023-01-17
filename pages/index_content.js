/*jshint esversion: 6 */
import Link from 'next/link';
import Image from 'next/image';
import translate from "/translate/index_translate";
import nav_translate from "/translate/services/all_translate";
import styles from '/styles/index_main.module.css';
  

const IndexContent = ({lang,service}) => {
  const locale = lang;
  const serv = service!==undefined?service:[{}];
  const historyAction = (service) => {
    const history = JSON.parse(localStorage.getItem('historyAction'));
    const action = history?history:[];
    const checkExp = [...action,{name:service,time:Date.now()}];
    const key = 'name';
    const historyResult = [...new Map(checkExp.map(item =>[item[key], item])).values()];
    return localStorage.setItem('historyAction',JSON.stringify(historyResult))
  };
  return(
        <>
        <div className="main block_animation">
          <div className="main_block_row">
            <h1 className="flex_text">{translate['popular'][locale]} <div className="emoji_h1"><Image title={`Microsoft fire emoji (Used for informational purposes only)`} priority src={"/emoji-small/fire.webp"} width={26} height={26} alt="emoji"/></div></h1>
            <p className="sub_content">{translate['popular_subtext'][locale]}</p>
            <div className={styles.main__index_block_row}>
              {serv&&serv.filter(e=>{return e.type === 'services'}).map((e,index)=>
              <Link onClick={()=>historyAction(e.name)} title={nav_translate[e.name][locale]} href={e.location} prefetch={false} key={index+1}>
                <div className={`${styles.main__index_block_row_b} anim_hover`}>
                  <div className={styles.main__index_block}>
                    <div className={styles.main__index_block_pic}>
                      <Image priority title={nav_translate[e.name][locale]} alt={`Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`} width={160} height={160} className={styles.main__index_block_img} src={e.image}/>
                    </div>
                  </div>
                  <span className="head">{nav_translate[e.name][locale]}</span>
                </div>
            </Link>)}
            </div>
          </div>
      </div>
        </>
  )
};
export default IndexContent;