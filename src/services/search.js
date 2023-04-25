const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.APPID || "" , process.env.APPKEY || "");
const index = client.initIndex('comics');

const cache = {}

export default async function search( query, count = 6 ){
  if(cache[query])return cache[query];

  const { hits } = await index.search(query, {
    attributesToRetrieve: [ "id", "title", "alt", "img" ],
    hitsPerPage: count
  } );

  cache[query] = hits;

  return hits;
}
