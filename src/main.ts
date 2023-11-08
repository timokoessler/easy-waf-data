import { httpGET, parsePrefixList } from './utils.js';
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import ora from 'ora';

(async () => {
    const ipList: string[] = [];

    const start = Date.now();
    const directory = 'data/crawler-ips'; // Without trailing slash

    if (!existsSync(directory)) {
        try {
            mkdirSync(directory, { recursive: true });
        } catch (err) {
            console.error(`Exception while creating directory ${directory}: ${(err as Error).message}`);
            process.exit(1);
        }
    }

    // Google
    const googleSpinner = ora('Updating Google IP list').start();
    try {
        const result = await httpGET('https://www.gstatic.com/ipranges/goog.json');
        const json = JSON.parse(result);
        const googleIPs = parsePrefixList(json.prefixes);
        ipList.push(...googleIPs);
        writeFileSync(directory + '/google.json', JSON.stringify(googleIPs));
        googleSpinner.succeed(`Saved ${googleIPs.length} Google IP ranges`);
    } catch (err) {
        googleSpinner.fail('Exception while updating Google ip whitelist: ' + (err as Error).message);
    }

    // Bing
    const bingSpinner = ora('Updating Bing IP list').start();
    try {
        const result = await httpGET('https://www.bing.com/toolbox/bingbot.json');
        const json = JSON.parse(result);
        const bingIPs = parsePrefixList(json.prefixes);
        ipList.push(...bingIPs);
        writeFileSync(directory + '/bing.json', JSON.stringify(bingIPs));
        bingSpinner.succeed(`Saved ${bingIPs.length} Bing IP ranges`);
    } catch (err) {
        bingSpinner.fail('Exception while updating Bing ip whitelist: ' + (err as Error).message);
    }

    // DuckDuckGo
    // https://raw.githubusercontent.com/duckduckgo/duckduckgo-help-pages/master/_docs/results/duckduckbot.md
    const duckduckgoSpinner = ora('Updating DuckDuckGo IP list').start();
    try {
        const duckduckgoIPs = [
            '20.191.45.212',
            '40.88.21.235',
            '40.76.173.151',
            '40.76.163.7',
            '20.185.79.47',
            '52.142.26.175',
            '20.185.79.15',
            '52.142.24.149',
            '40.76.162.208',
            '40.76.163.23',
            '40.76.162.191',
            '40.76.162.247',
        ];
        ipList.push(...duckduckgoIPs);
        writeFileSync(directory + '/duckduckgo.json', JSON.stringify(duckduckgoIPs));
        duckduckgoSpinner.succeed(`Saved ${duckduckgoIPs.length} DuckDuckGo IP ranges`);
    } catch (err) {
        duckduckgoSpinner.fail('Exception while updating DuckDuckGo ip whitelist: ' + (err as Error).message);
    }

    // Pinterest
    // https://help.pinterest.com/en/business/article/pinterest-crawler
    const pinterestSpinner = ora('Updating Pinterest IP list').start();
    try {
        const pinterestIPs = ['54.236.1.0/24'];
        ipList.push(...pinterestIPs);
        writeFileSync(directory + '/pinterest.json', JSON.stringify(pinterestIPs));
        pinterestSpinner.succeed(`Saved ${pinterestIPs.length} Pinterest IP ranges`);
    } catch (err) {
        pinterestSpinner.fail('Exception while updating Pinterest ip whitelist: ' + (err as Error).message);
    }

    // Facebook / Meta
    // https://developers.facebook.com/docs/sharing/webmasters/crawler/
    const facebookIPs: string[] = [];
    const facebookASN = '32934';

    // Twitter
    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/troubleshooting-cards
    const twitterIPs: string[] = [];
    const twitterASN = '13414';

    const ipV4ASNSpinner = ora('Downloading all IPv4 prefixes and their origin ASNs').start();
    try {
        const asnsIPResult = await httpGET('https://thyme.apnic.net/current/data-raw-table');
        const asnsIPv4 = asnsIPResult.split('\n');
        for (const line of asnsIPv4) {
            const parts = line.split(/\s(.*)/);
            if (!Array.isArray(parts) || parts.length < 2) continue;
            const asn = parts[1].trim();
            const ip = parts[0].trim();
            if (asn === facebookASN) {
                facebookIPs.push(ip);
            } else if (asn === twitterASN) {
                twitterIPs.push(ip);
            }
        }
        ipV4ASNSpinner.succeed(`Saved ${facebookIPs.length} Facebook and ${twitterIPs.length} Twitter IPv4 ranges`);
    } catch (err) {
        ipV4ASNSpinner.fail('Exception while downloading IPv4 origin ASNs: ' + (err as Error).message);
    }

    const ipV6ASNSpinner = ora('Downloading all IPv6 prefixes and their origin ASNs').start();
    try {
        const asnsIPResult = await httpGET('https://thyme.apnic.net/current/ipv6-raw-table');
        const asnsIPv6 = asnsIPResult.split('\n');
        for (const line of asnsIPv6) {
            const parts = line.split(/\s(.*)/);
            if (!Array.isArray(parts) || parts.length < 2) continue;
            const asn = parts[1].trim();
            const ip = parts[0].trim();
            if (asn === facebookASN) {
                facebookIPs.push(ip);
            } else if (asn === twitterASN) {
                twitterIPs.push(ip);
            }
        }
        ipV6ASNSpinner.succeed(`Saved ${facebookIPs.length} Facebook and ${twitterIPs.length} Twitter IPv6 ranges`);
    } catch (err) {
        ipV6ASNSpinner.fail('Exception while downloading IPv6 origin ASNs: ' + (err as Error).message);
    }

    const savingSpinner = ora('Saving').start();
    if (facebookIPs.length) {
        ipList.push(...facebookIPs);
        writeFileSync(directory + '/facebook.json', JSON.stringify(facebookIPs));
    } else {
        console.error('Facebook IPs not found in origin ASNs. Trying to read old from file.');
        if (existsSync(directory + '/facebook.json')) {
            try {
                const facebookIPs = JSON.parse(readFileSync(directory + '/facebook.json').toString());
                ipList.push(...facebookIPs);
            } catch (err) {
                console.error('Exception while reading facebook.json: ' + (err as Error).message);
            }
        }
    }
    if (twitterIPs.length) {
        ipList.push(...twitterIPs);
        writeFileSync(directory + '/twitter.json', JSON.stringify(twitterIPs));
    } else {
        console.error('Twitter IPs not found in origin ASNs. Trying to read old from file.');
        if (existsSync(directory + '/twitter.json')) {
            try {
                const twitterIPs = JSON.parse(readFileSync(directory + '/twitter.json').toString());
                ipList.push(...twitterIPs);
            } catch (err) {
                console.error('Exception while reading twitter.json: ' + (err as Error).message);
            }
        }
    }

    writeFileSync(directory + '/all.json', JSON.stringify(ipList));

    savingSpinner.succeed(`Retrieved ${ipList.length} IP ranges in ${((Date.now() - start) / 1000).toFixed(1)} seconds`);
})();
