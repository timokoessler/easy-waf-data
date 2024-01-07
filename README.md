# Easy WAF Data

This repository provides data used by the Web Application Firewall [EasyWAF](https://github.com/timokoessler/easy-waf).

A whitelist of IP address ranges of search engine crawlers and crawlers of other big platforms is scraped every 12 hours by a GitHub Action and stored in this repository. This list is used by the "Fake Crawlers" module of Easy WAF to block fake crawlers. For more information about the WAF visit the [EasyWAF repository](https://github.com/timokoessler/easy-waf).

The authenticity of most crawlers can be determined with a reverse DNS lookup, but an additional IP whitelist increases performance. In addition, the authenticity of some crawlers, such as the Facebook crawler, can only be determined by the IP.

**But why is the IP range list not created locally by EasyWAF itself?** The main reason is that the download of the BGP Routing Table Analysis takes some time, especially with poor internet connections. This effect would be amplified if an application is started multiple times in parallel, for example with Node.js cluster mode. In addition, it is possible to react more quickly to changes in the data sources used without having to update EasyWAF.

**Why is this not a security issue?**
The data is only used for the whitelist of the Fake Crawler module, so adding malicious IPs does not allow WAF bypassing from those IP addresses. A disruption or failure of this data source would currently only cause problems with Facebook crawlers and somewhat reduce the performance of EasyWAF.

## Data sources

### Google

-   Documentation: [Check Googlebot and other Google crawlers](https://support.google.com/webmasters/answer/80553)
-   Direct link to JSON: [Google IP ranges](https://www.gstatic.com/ipranges/goog.json)

### Bing

-   Direct link to JSON: [Bing IP ranges](https://www.bing.com/toolbox/bingbot.json)

### Facebook

-   Documentation: [Facebook Crawler](https://developers.facebook.com/docs/sharing/webmasters/crawler/)
-   IP ranges are scraped from BGP Routing Table Analysis

### Twitter

-   Documentation: [Twitterbot](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/troubleshooting-cards)
-   IP ranges are scraped from BGP Routing Table Analysis

### DuckDuckGo

-   Documentation: [Is DuckDuckBot related to DuckDuckGo?](https://raw.githubusercontent.com/duckduckgo/duckduckgo-help-pages/master/_docs/results/duckduckbot.md)

### Pinterest

-   Documentation: [Pinterest Crawlers](https://help.pinterest.com/en/business/article/pinterest-crawler)

### BGP Routing Table Analysis

-   Website: [BGP Routing Table Analysis](https://thyme.apnic.net/)
-   Direct link to IPv4 ranges: [IPv4 Prefixes](https://thyme.apnic.net/current/data-raw-table)
-   Direct link to IPv6 ranges: [IPv6 Prefixes](https://thyme.apnic.net/current/ipv6-raw-table)

## Contact

If a public GitHub issue or discussion is not the right choice for your concern, you can contact me directly:

-   E-Mail: [info@timokoessler.de](mailto:info@timokoessler.de)
-   My Website: [timokoessler.de](https://timokoessler.de)
