/**
 * Simple Node.js HTTP GET request without any dependencies
 */
export async function get(url: string, response: 'json' | 'text') {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) {
        throw new Error(`Request failed. Status: ${res.status} Url: ${url}`);
    }
    if (response === 'json') {
        return await res.json();
    }

    return await res.text();
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
    arr.forEach((e) => {
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
