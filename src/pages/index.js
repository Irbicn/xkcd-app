import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import fs from "fs/promises";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useI18n } from "@/context/i18n";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ latestComics }) {
  const { t } = useI18n();
  const router = useRouter();
  const redirect = (id)=> ()=>{
    router.push("/comic/"+id)
  }
  return (
    <>
      <Head>
        <meta name="description" content="" />
      </Head>
      <Layout>
        <h2>{t("LATEST_COMICS")}</h2>
        <section className="grid-cols-2 grid gap-2">
        {
          latestComics.map(comic => (
                <div
                  className="cursor-pointer" 
                  onClick={redirect(comic.id)}
                  key={comic.id}
                >
                  <p>{comic.title}</p>
                  <Image src={comic.img} width={comic.width} height={comic.height} 
                    alt={comic.alt}
                  />
                </div>
          ))
        }
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps(){
  const files = await fs.readdir("./src/comics");
  const lastComics = files.slice(-8, files.length);

  const promisesReadFiles = lastComics.map(async (file)=>{
    const content = await fs.readFile(`./src/comics/${file}`);
    return JSON.parse(content);
  })
  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props:{
      latestComics
    },
    revalidate: 1
  }
}
