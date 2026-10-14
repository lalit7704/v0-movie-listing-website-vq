// Sends every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver and others).
// Run after a deploy: pnpm indexnow   (Google does not use IndexNow; use Search Console for Google.)
const HOST = "onemovie.in";
const KEY = "9d451e20e1549fd4671069c71f15b877"; // must match public/9d451e20e1549fd4671069c71f15b877.txt on the live site

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((res) => {
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  return res.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!urlList.length) throw new Error("No URLs found in sitemap.xml");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
// 200/202 = accepted; 403 = key file not live yet; 422 = URLs don't match the host
console.log(`IndexNow: sent ${urlList.length} URLs, response ${res.status} ${res.statusText}`);
if (!res.ok) process.exitCode = 1;
