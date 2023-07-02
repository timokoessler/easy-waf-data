# Easy WAF Data
This repository provides data used by the Web Application Firewall [Easy WAF](https://github.com/timokoessler/easy-waf).  

A whitelist of IP address ranges of search engine crawlers and crawlers of other big platforms is scraped every 12 hours by a GitHub Action and stored in this repository. This list is used by the "Fake Crawlers" module of Easy WAF to block fake crawlers. For more information about the WAF visit the [Easy WAF repository](https://github.com/timokoessler/easy-waf).

## Data sources
### Google
- Documentation: [Check Googlebot and other Google crawlers](https://support.google.com/webmasters/answer/80553)
- Direct link to JSON: [Google IP ranges](https://www.gstatic.com/ipranges/goog.json)
### Bing
- Direct link to JSON: [Bing IP ranges](https://www.bing.com/toolbox/bingbot.json)
### Facebook
- Documentation: [Facebook Crawler](https://developers.facebook.com/docs/sharing/webmasters/crawler/)
- IP ranges are scraped from BGP Routing Table Analysis
## Twitter
- Documentation: [Twitterbot](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/troubleshooting-cards)
- IP ranges are scraped from BGP Routing Table Analysis
### DuckDuckGo
- Documentation: [Is DuckDuckBot related to DuckDuckGo?](https://raw.githubusercontent.com/duckduckgo/duckduckgo-help-pages/master/_docs/results/duckduckbot.md)
### Pinterest
- Documentation: [Pinterest Crawlers](https://help.pinterest.com/en/business/article/pinterest-crawler)
### BGP Routing Table Analysis
- Website: [BGP Routing Table Analysis](https://thyme.apnic.net/)
- Direct link to IPv4 ranges: [IPv4 Prefixes](https://thyme.apnic.net/current/data-raw-table)
- Direct link to IPv6 ranges: [IPv6 Prefixes](https://thyme.apnic.net/current/ipv6-raw-table)

## Contact
If a public GitHub issue or discussion is not the right choice for your concern, you can contact me directly:
- E-Mail: [info@timokoessler.de](mailto:info@timokoessler.de)
- Twitter: [@timokoessler](https://twitter.com/timokoessler)