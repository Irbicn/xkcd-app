import search from "@/services/search";

export default async function handler( req, res ){
  const results = await search( req.query.q );
  return res.json( results );
}
