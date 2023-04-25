import { createContext, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import es from "@/translations/es.json";
import en from "@/translations/en.json";

const I18nContext = createContext(); 
const lenguages = { en, es }

export function I18nProvider({ children }){
  const { locale } = useRouter();
  const t = useCallback( ( key, ...args ) => {
    let translation = lenguages[locale][key];
    
    if(!translation){
      return "";
    }
    if(args.length === 0){
      return translation;
    }

    args.forEach((value, idx) =>{
      translation = translation.replace(`\${${idx+1}}`, value)
    });
    return translation;
  }, [locale] );

  return (
    <I18nContext.Provider value={{ t }}>
      { children }
    </I18nContext.Provider>
  )
}

export function useI18n(){
  const context = useContext( I18nContext );
  if(context === undefined){
    throw new Error("useI18n must be used within a I18nProvider");
  }
  return context;
}
