import path from "path";
import fs from 'fs';
import { JSDOM } from "jsdom";

let svgCache = new Map<string, string>();
const iconsDir = path.join(process.cwd(), 'quartz', 'static', 'icons', 'game-icons');

export function loadEverySVG() {
    try {
        if (fs.existsSync(iconsDir)) {
            const files = fs.readdirSync(iconsDir)
            for (const file of files) {
                svgCache.set(file, fs.readFileSync(path.join(iconsDir, file), 'utf-8'))
            }
        }
    } catch (e) {
        console.error(e);
    }
}

function loadSVG(svgFileName: string) : string | undefined {
    try {
        const iconFile = path.join(iconsDir, svgFileName + '.svg')
        if (fs.existsSync(iconFile) ) {
            const data = fs.readFileSync(iconFile, 'utf-8');
            svgCache.set(svgFileName, data);
            return data;
        }
        else {
            console.error("Failed to find Svg:", svgFileName);
        }
    } catch (e) {
        console.error("Failed to load Svg:", svgFileName, e);
    }
}

export function getSvg(key: string) : string | undefined {
    return svgCache.get(key) ?? loadSVG(key);
}

export function transformSvgToDom(svgText: string | undefined) {
    if (!svgText) {
        return;
    }
    return new JSDOM(svgText, {contentType: 'image/svg+xml'}).window.document.querySelector('svg');
}
