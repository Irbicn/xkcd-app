import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useI18n } from "@/context/i18n";

export default function Header(){
  const [ results, setResults ] = useState([]);
  const searchRef = useRef();
  const router = useRouter();
  const { t } = useI18n();
  
  const { locale, locales } = router;

  const restOfLocales = locales.filter( l => l !== locale );

  
  const viewAll = (e)=>{
    e.preventDefault();
    setResults([]);
    router.push( `/comic/${ result.id }` );
  }

  const handleChange = (  )=>{
    const q = searchRef.current.value;
    fetch(`/api/search?q=${q}`)
      .then(res => res.json())
      .then(searchResults => {
        if(!q){
          return setResults([]);
        }
        setResults(searchResults);
      });
  }

 return (
  <header className="flex justify-between max-w-xl m-auto">
    <h1><Link href="/">xkcd next</Link></h1>
   <nav className="flex items-center">
     <ul className="flex space-x-2">
     <li><Link href="/">{ t("HOME") }</Link></li>
     <li><Link href="/about">{ t("ABOUT") }</Link></li>
       <li><Link href="/" locale={restOfLocales[0]}>{restOfLocales[0]}</Link></li>
      <li>
        <input 
          className="rounded-3xl text-xs border-gray-400 px-2 py-1 border" 
          onChange={ handleChange } 
          ref={searchRef}
        />
        {!!results.length && 
          <div className="relative">
            <ul className="absolute bg-white top-0 left-0 m-0 mt-1 p-1  w-full shadow-xl rounded-lg border-gray-400 border">
              {
                results.map(result => (
                  <li key={result.id}>
                    <a className="block" onClick={viewAll}>{ result.title }</a>
                  </li>
                ))
              }
              <li><Link href={`/search?q=${ searchRef.current.value }`}>{ t("SHOW_ALL") }</Link></li>
            </ul>
          </div>
        }
      </li>
    </ul>
   </nav>
  </header>
 )
}
