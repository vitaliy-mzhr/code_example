import ROUTES_CONFIG from './routes-config.json';



const initialPageLayout = {
    hideHeader: false,
    hideFooter: false,
    hideRSidebar: true,
    hideLSidebar: true
};

const pageLayoutWithLSidebar = {
    ...initialPageLayout,
    hideLSidebar: false
};

const pageLayoutWithRSidebar = {
    ...initialPageLayout,
    hideRSidebar: false
};

const pageLayoutWithoutFooter = {
    ...initialPageLayout,
    hideFooter: true
};

const pagesLayouts = {
    [ROUTES_CONFIG.INDEX.page]: initialPageLayout,
    [ROUTES_CONFIG.ABOUT_US.page]: initialPageLayout,
    [ROUTES_CONFIG.SIGNIN.page]: pageLayoutWithoutFooter,
    [ROUTES_CONFIG.SIGNUP.page]: pageLayoutWithoutFooter,
    [ROUTES_CONFIG.CATEGORY.page]: pageLayoutWithLSidebar,
    [ROUTES_CONFIG.STYLISTS.page]: pageLayoutWithLSidebar,
    [ROUTES_CONFIG.CATEGORY_COLLECTION.page]: pageLayoutWithLSidebar,
    [ROUTES_CONFIG.STYLIST_COLLECTION.page]: pageLayoutWithLSidebar,
    [ROUTES_CONFIG.CLOTHES_COLLECTION.page]: pageLayoutWithLSidebar,
    [ROUTES_CONFIG.OUTFIT.page]: {...pageLayoutWithRSidebar, hideFooter: true},
    [ROUTES_CONFIG.MY_INFO.page]: pageLayoutWithLSidebar,
    [ROUTES_CONFIG.MY_COLLECTIONS.page]: pageLayoutWithLSidebar,
    [ROUTES_CONFIG.MY_STYLISTS.page]: pageLayoutWithLSidebar,
    [ROUTES_CONFIG.MY_OUTFITS.page]: pageLayoutWithLSidebar,
    [ROUTES_CONFIG.MY_CLOTHES.page]: pageLayoutWithLSidebar
};

export default function(page) {
    const _page = page.replace(/^\//, '');
    return pagesLayouts[_page] || initialPageLayout;
}
