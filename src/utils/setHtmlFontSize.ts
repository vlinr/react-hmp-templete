type FontType = {
    maxWidth: number;
    designWidth: number;
    fontSize: number;
}
function setHtmlFontSize(
    params: FontType = {
        maxWidth: 750,
        designWidth: 375,
        fontSize: 14
    }
) {
    setSize(params);
    window.addEventListener('resize', () => {
        setSize(params);
    });
}

export function setSize(params: FontType) {
    if (params.designWidth === 0) {
        throw new Error('designWidth is not zero!');
    }
    const width = window.innerWidth || document.body.clientWidth;
    if (width > params.maxWidth) {
        document.documentElement.style.fontSize =
            (params.maxWidth / params.designWidth) * params.fontSize + 'px';
    } else {
        document.documentElement.style.fontSize =
            (width / params.designWidth) * params.fontSize + 'px';
    }
}

export function getSize() {
    return parseFloat(document.documentElement.style.fontSize.split('px')[0]);
}

export default setHtmlFontSize;
