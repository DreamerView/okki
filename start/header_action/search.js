/*jshint esversion: 6 */
import { useState,useEffect,useRef,memo } from 'react';
import SearchResult from "/start/services/all.json";
import dynamic from 'next/dynamic';
import translate from "/translate/header_translate";
import all from "@/translate/services/all_translate";
const SearchBlocks = dynamic(()=>import('/start/header_action/searchblocks'),{ssr:false});

const Search = (res) => {
    const locale = res.lang,
    focus = useRef(),
    [list,setList] = useState(),
    [search,setSearch] = useState(''),
    [cancel,setCancel] = useState(false),
    [result,setResult] = useState([]),
    [accept,setAccept] = useState(false);
    useEffect(()=>{
    //   const obj = all;
    //   const result1 = Object.keys(obj);
    //   const result2 = result1.map(e=>Object.keys(obj)).map(e=>obj);
    // console.log(result2);
        setResult(prev=>prev=SearchResult.filter((e)=>{
          if(search === '') return 0;
          // // else if(String(e.key).toLowerCase().includes(String(search).toLowerCase())) return e;
          // else if(String(e.key).toLowerCase().includes(String(search).toLowerCase())) {
            
          // };
        }));
        return () => {
          return 0;
        };
      },[search,focus]);
      useEffect(()=>{
          const handler = () =>{
            return setSearch(prev=>prev=list),
            setCancel(prev=>prev=true),
            setAccept(prev=>prev=true);
          };
          focus.current.addEventListener('focus',handler);
          return () => {
            focus.current!==null&&focus.current.removeEventListener('focus',handler);
          };
      },[focus,list]);
      const RemoveBlur = () => {setAccept(prev=>prev=false),setCancel(prev=>prev=false),setResult(prev=>prev=[]),focus.current.value=""};
      const getList = (e) => {
        return setList(prev=>prev=e),
        focus.current.value = e,
        setAccept(prev=>prev=false),
        setCancel(prev=>prev=false),
        setSearch((prev)=>prev=e);
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
                <div>{result.slice(0,5).map((v,i)=><SearchBlocks item={v} lang={locale} key={i+1} send={getList}/>)}</div>
              </>}
            </div>}
      </>
    )
};
export default memo(Search);