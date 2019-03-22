import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';

import { mapRoutineCreators } from '../../actions/actionRoutines';
import { getHomePage } from '../../actions';
import { SITE_CATEGORIES } from '../../config';
import Hero from './Hero';
import HomeCarousel from './HomeCarousel';
import HomeSectionTitle from './HomeSectionTitle';
import HomeUserFlow from './HomeUserFlow';
import HomeBrands from './HomeBrands';
import HomeMedia from './HomeMedia';



class Home extends Component {
    render() {
        const {menu: {items: menuItems}, home} = this.props;
        const topSection = get('sections.top_section', home) || {};
        const userFlow = get('sections.user_flow', home) || {};
        const brands = get('sections.brands', home) || {};
        const media = get('sections.media', home) || {};

        return (
            <div className="home-page">
                <Hero
                    title={topSection.title || ''}
                    desc={topSection.description || ''}
                    images={topSection.images || []}
                />

                {Object.keys(menuItems).length > 0 &&
                    Object.entries(SITE_CATEGORIES).map(([menuId, menuName]) => (
                        <HomeCarousel key={menuId} menuId={menuId} name={menuName} menu={menuItems[menuId]}/>
                    ))
                }

                <section className="home-page__user-flow grid-container">
                    <HomeSectionTitle>{userFlow.title}</HomeSectionTitle>
                    {userFlow.items && <HomeUserFlow items={userFlow.items}/>}
                </section>

                <section className="home-page__brands grid-container">
                    <HomeSectionTitle>{brands.title}</HomeSectionTitle>
                    {brands.images &&
                        <HomeBrands
                            title={brands.subtitle}
                            desc={brands.description}
                            items={brands.images}
                        />
                    }
                </section>

                <section className="home-page__media grid-container">
                    <HomeSectionTitle>{media.title}</HomeSectionTitle>
                    {media.images && <HomeMedia items={media.images}/>}
                </section>
            </div>
        );
    }
}

function mapStateToProps({menu, home}) {
    return {menu, home};
}

export default connect(mapStateToProps, mapRoutineCreators({getHomePage}))(Home);
