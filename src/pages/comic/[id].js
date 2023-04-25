import Head from "next/head";
import fs from "fs/promises";
import Link from "next/link";
import { basename } from "path";
import Image from "next/image"
import Layout from "@/components/Layout";
import { useI18n } from "@/context/i18n";

export default function Comic({ 
  id, 
  title,
  img,
  alt,
  width,
  height,
  hasPrev,
  hasNext
}){
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>xkcd {id}</title>
      </Head>
      <Layout>
        <section className="flex flex-col items-center">
          <h1>{title}</h1>
          <Image src={img} alt={alt} height={height} width={width}/>
          <p className="text-xl">{alt}</p>
        </section>
        <div className="flex justify-between">
          { hasPrev && <Link className="text-xl font-bold" href={ `/comic/${ id - 1 }` }>👈 {t("PREV")}</Link> }
          { hasNext && <Link className="text-xl font-bold" href={ `/comic/${ id + 1 }` }>{t("NEXT")} 👉</Link> }
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths({ locales }){
  const files = await fs.readdir("./src/comics");

  let paths = [];

  locales.forEach( locale => {
    const newPaths = files.map( ( file ) => {
      const id = basename(file, ".json");
      return {
        params: { id }, 
        locale
      }
    })
    paths = paths.concat( newPaths );
  } );

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }){
  const { id } = params;
  const json = await fs.readFile(`./src/comics/${ id }.json`, "utf-8");
  const comic = await JSON.parse(json);

  const prevId = comic.id - 1;
  const nextId = comic.id + 1;

  const [ prevResult, nextResult ] = await Promise.allSettled([
    fs.stat(`./src/comics/${ prevId }.json`),
    fs.stat(`./src/comics/${ nextId }.json`)
  ]);

  const hasPrev = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      hasPrev,
      hasNext
    }
  }
}
