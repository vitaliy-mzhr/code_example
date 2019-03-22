export const defaultFilters = {
    activeBrands: [],
    activeSizes: [],
    activePrices: [],
    activeSales: [],
    priceSort: '',
    saleSort: ''
};



export const sortByPrice = (a, b, direction) => {
    const APrice = a.sale_price || a.price || 0;
    const BPrice = b.sale_price || b.price || 0;
    return direction === 'DESC' ? (APrice - BPrice) * -1 : APrice - BPrice;
};



export const sortBySale = (a, b, direction) => {
    const ADiscount = a.discount || (direction === 'DESC' ? -101 : 101);
    const BDiscount = b.discount || (direction === 'DESC' ? -101 : 101);
    return direction === 'DESC' ? (ADiscount - BDiscount) * -1 : ADiscount - BDiscount;
};



export const filterByBrand = (item, activeBrands) => {
    return activeBrands.length > 0 ? (activeBrands.indexOf(item.brand) >= 0) : true;
};



export const filterBySize = (item, activeSizes) => {
    return activeSizes.length > 0 ? activeSizes.some((val) => item.sizes.indexOf(val) >= 0) : true;
};



export const filterByPrice = (item, activePrices) => {
    const price = item.sale_price || item.price;
    const [minPrice, maxPrice] = activePrices;
    return minPrice && maxPrice ? (price && price >= minPrice && price <= maxPrice) : true;
};



export const filterBySale = (item, activeSales) => {
    const discount = item.discount;
    const [minSale, maxSale] = activeSales;
    return minSale && maxSale ? (discount && discount >= minSale && discount <= maxSale) : true;
};



export const getElDimensions = (el) => ({
    top: el.offsetTop,
    left: el.offsetLeft,
    height: el.offsetHeight,
    width: el.offsetWidth
});



export const setImageCoords = (el, x = 0, y = 0, z = 1, transition) => {
    requestAnimationFrame(() => {
        el.style.transition = transition ? transition : '';
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale3d(${z}, ${z}, 1)`;
    });
};



export const getImageOffset = ({width: imgW, height: imgH}, {width: pageW, height: pageH}, mousePos, zoomLevel) => {
    const imageOffset = {x: 0, y: 0};

    if (imgH * zoomLevel > pageH) {
        const diff = imgH * zoomLevel - pageH;
        imageOffset.y = (((diff / 2) / 100) * ((mousePos.yPercent * 2) - 100)) * -1;
    }

    if (imgW * zoomLevel > pageW) {
        const diff = imgW * zoomLevel - pageW;
        imageOffset.x =(((diff / 2) / 100) * ((mousePos.xPercent * 2) - 100)) * -1;
    }

    return imageOffset;
};



export const getZoomMousePosition = (x, y, {left, top, height, width}) => {
    const coords = {
        x: x - left,
        y: y - top,
    };

    coords.xPercent = coords.x / width * 100;
    coords.yPercent = coords.y / height * 100;

    return {...coords};
};
