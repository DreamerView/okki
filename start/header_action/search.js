/*jshint esversion: 6 */
import { useState,useEffect,useRef,memo } from 'react';
import SearchResult from "/start/services/all.json";
import dynamic from 'next/dynamic';
import translate from "/translate/header_translate";
import { useRouter } from 'next/router';
const SearchBlocks = dynamic(()=>import('/start/header_action/searchblocks'),{ssr:false});

const Search = (res) => {
    const router = useRouter(); 
    const {locale} = router;
    const focus = useRef();
    const [list,setList] = useState();
    const [search,setSearch] = useState('');
    const [cancel,setCancel] = useState(false);
    const [result,setResult] = useState([]);
    const [accept,setAccept] = useState(false);
    useEffect(()=>{
        setResult(prev=>prev=SearchResult.filter((e)=>{
          if(search === '') return 0;
          else if(String(e.key).toLowerCase().includes(String(search).toLowerCase())) return e;
        }));
        return () => {
          return 0;
        };
      },[search,focus]);
      useEffect(()=>{
        console.log(list)
          const handler = () =>{
            setSearch(prev=>prev=list);
            setCancel(prev=>prev=true);
            return setAccept(prev=>prev=true);
          };
          focus.current.addEventListener('focus',handler);
          return () => {
            focus.current.removeEventListener('focus',handler);
          };
      },[focus,list]);
      const RemoveBlur = () => {setAccept(prev=>prev=false);setCancel(prev=>prev=false);setResult(prev=>prev=[]);focus.current.value=""};
      const getList = (e) => {
        console.log('rendered')
        setList(prev=>prev=e);
        focus.current.value = e;
        setAccept(prev=>prev=false);
        setCancel(prev=>prev=false);
        return setSearch((prev)=>prev=e);
      };
    return (
      <>
        <div className='search_action_block'>
            <input aria-haspopup="false" autoCapitalize="off" autoComplete="off" autoCorrect="off" role="combobox" spellCheck="false"  ref={focus} placeholder={res.text} title={res.text} className="header__search_input" onChange={(e)=>setSearch(e.target.value)}  type="text" />
                {cancel===true&&<button onClick={()=>RemoveBlur()} className='search_action_block_cancel'>Отмена</button>}
          </div>
          {accept!==false&&
          <div className='header__search_blocks'>
              {result.length===0?
                <p>{translate['search_not'][locale]}</p>:
              <>
                <p>{translate['search_found'][locale]}</p>
                <div>{result.slice(0,5).map((v,i)=><SearchBlocks item={v} key={i+1} send={getList}/>)}</div>
              </>}
            </div>}
      </>
    )
};
export default memo(Search);