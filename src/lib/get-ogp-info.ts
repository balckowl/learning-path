import { JSDOM } from 'jsdom';

export const getOgpInfo = async (url: string) => {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const html = await response.text();
    const domParser = new JSDOM().window.DOMParser;
    const dom = new domParser().parseFromString(html, 'text/html');

    console.log(dom);

    const ogp = Object.fromEntries(
        [...dom.head.children]
            .filter(
                (element) =>
                    element.tagName === 'META' &&
                    element.getAttribute('property')?.startsWith('og:')
            )
            .map((element) => {
                return [
                    element.getAttribute('property'),
                    element.getAttribute('content')
                ];
            })
    );

    return ogp;
}