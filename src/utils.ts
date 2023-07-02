import https from 'node:https';

/**
 * Simple Node.js HTTP GET request without any dependencies
 */
export function httpGET(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(url, { timeout: 5000 }, res => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('error', reject);
            res.on('end', () => {
                const { statusCode } = res;
                if (typeof statusCode !== 'number') {
                    reject(new Error('Invalid status code'));
                    return;
                }
                const validResponse = statusCode >= 200 && statusCode <= 299;
                if (validResponse) {
                    resolve(data);
                    return;
                }
                reject(new Error(`Request failed. Status: ${statusCode} Url: ${url}`));
            });
        }).on('error', reject).end();
    });
}

/**
 * Parses the ip list from Google and Bing and returns an array
 */
export function parsePrefixList(arr: unknown) {
    const list: string[] = [];
    if (!Array.isArray(arr)) {
        console.error('parsePrefixList: arr is not an array');
        return list;
    }
    arr.forEach(e => {
        if (typeof e.ipv4Prefix === 'string') {
            e.ipv4Prefix = e.ipv4Prefix.replaceAll('\u200b', ''); //Some Bing ip addresses contain the unicode character "Zero Width Space" (200B).
            list.push(e.ipv4Prefix);
            return;
        }
        if (typeof e.ipv6Prefix === 'string') {
            e.ipv6Prefix = e.ipv6Prefix.replaceAll('\u200b', ''); //Some Bing ip addresses contain the unicode character "Zero Width Space" (200B).
            list.push(e.ipv6Prefix);
        }
    });
    return list;
}