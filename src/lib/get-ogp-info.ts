import { JSDOM } from 'jsdom';

export const getOgpInfo = async (url: string) => {
    // url = "http://abehiroshi.la.coocan.jp/prof/prof.htm"
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const html = await response.text();
    const domParser = new JSDOM().window.DOMParser;
    const dom = new domParser().parseFromString(html, 'text/html');

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

    if (!ogp["og:image"]) ogp["og:image"] = '/gallery-page/no-image.png';
    if (!ogp["og:title"]) ogp["og:title"] = 'タイトル未設定';

    return ogp;
}