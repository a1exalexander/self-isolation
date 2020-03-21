const fs = require('fs-extra');

module.exports = function seo(routes = ['/']) {
  const formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const BASE_URL = 'https://self-isolation.now.sh';
  const googleSearchId = 'googlefd73f9d9ab45a589';
  const googleVerify = `google-site-verification: ${googleSearchId}.html`;

  // ROBOTS.txt
  const robotsTxt = `User-agent: *
  Sitemap: ${BASE_URL}/sitemap.xml
  Disallow:`;

  fs.writeFileSync('public/robots.txt', robotsTxt);
  console.log('robots.txt saved!');

  // SITEMAP.XML
  const today = formatDate(new Date());
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(
      path => `<url>
      <loc>${BASE_URL}${path}</loc>
      <lastmod>${today}</lastmod>
    </url>`
    )}
  </urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemapXml);
  console.log('sitemap.xml saved!');

  // GOOGLE's VERIFY HTML
  fs.writeFileSync(`public/${googleSearchId}.html`, googleVerify);
  console.log(`${googleSearchId}.html saved!`);
};
