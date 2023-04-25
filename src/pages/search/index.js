import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import search from "@/services/search";
import { useI18n } from "@/context/i18n";

export default function Search({ query, results }){
  const { t } = useI18n();
  return (
    <>
      <Head>
        <title>Search for {query}</title>
        <meta name="description"content={`Search results for ${query}`} />
      </Head>
      <Layout>
        <h2>{t("SEARCH_RESULTS_TITLE", results.length, query)}</h2>
        {
          results.map(result => {
             return (<Link legacyBehavior href={`/comic/${result.id}`}>
              <a className="flex flex-row justify-start bg-slate-50 content-center">
                <Image
                  width="50"
                  height="50"
                  className="rounded-full"
                  alt={ result.alt }
                  src={ result.img }
                />
                <div>
                  <h3>{result.title}</h3>
                </div>
              </a>
            </Link>
             )}
        )
        }

      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx){
  const { query } = ctx;
  const { q } = query;

  const results = await search(q, 20);

  return {
    props: {
      query: q || "",
      results
    }
  }
}
