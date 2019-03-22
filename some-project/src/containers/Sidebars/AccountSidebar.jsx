import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'next/router';
import cn from 'classnames';

// Actions
import { mapRoutineCreators } from '../../actions/actionRoutines';
import { logout } from '../../actions';
// Components
import LSHeader from '../../components/LSHeader';
import { SignOutIcon } from '../../components/SVG';
import AvatarModal from '../../containers/Modals/AvatarModal';
import UserLibraryLinks from '../../components/UserLibraryLinks';
// Config
import ROUTES_CONFIG from '../../config/routes-config.json';
// HOC
import withScrollOverObserver from '../../HOC/withScrollOverObserver';
import withClientReady from '../../HOC/withClientReady';
import { withDimensionObserver } from '../../context/Dimension';
import AccountAvatar from '../../components/AccountAvatar';
import AccountMenu from '../../components/AccountMenu';



const headerRef = React.createRef();

class AccountSidebar extends Component {
    state = {
        isModalOpen: false,
        headerTop: 0,
        headerHeight: 0
    };

    getHeaderDimensions() {
        const headerCoords = headerRef.current.getBoundingClientRect();
        this.setState({
            headerTop: headerCoords.top,
            headerHeight: headerCoords.height
        });
    }

    componentDidMount() {
        if (this.props.vw <= 767) {
            this.getHeaderDimensions();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isClientReady && this.props.vw !== prevProps.vw && this.props.vw <= 767) {
            this.getHeaderDimensions();
        }
    }

    logout = () => {
        this.props.logout.trigger();
    };

    openModal = () => {
        this.setState({isModalOpen: true});
    };

    closeModal = () => {
        this.setState({isModalOpen: false});
    };

    render() {
        const { user: { photo, email, first_name, last_name}, isScrolledOver, router, vw, isClientReady } = this.props;
        const { isModalOpen, headerHeight, headerTop } = this.state;

        const nameFromEmail = (email && email.match(/^[A-Z0-9._%+-]+(?=@)/i)[0]) || '';
        const headerTitle = first_name ? `${first_name} ${last_name}` : nameFromEmail;
        const route = router.route.replace(/^\//, '');
        const avatar = photo || '/static/images/default_profile.jpg';
        const isInfoPage = route === ROUTES_CONFIG.MY_INFO.page;
        const isMobile = vw <= 767;
        const isShowTabs = isClientReady && !isInfoPage && isMobile;
        const isShowAvatar = isClientReady && (isInfoPage || !isMobile);
        const libraryNavTop = headerHeight + headerTop;
        const sidebarStyles = isClientReady && isMobile ? {paddingTop: `${!isInfoPage ? (headerHeight + 35 - 16) : (headerHeight - 16)}px`} : {};

        return (
            <Fragment>
                <LSHeader
                    title={headerTitle}
                    subtitle="my account"
                    withBorder={isScrolledOver}
                    showBackBtn={false}
                    className="account-sidebar__header"
                    ref={headerRef}
                />

                { isShowTabs && (
                    <div className="user-library-nav" style={{top: `${libraryNavTop}px`}}>
                        <UserLibraryLinks className="user-library-nav__item" route={route}/>
                    </div>
                )}

                <div
                    className={cn('scrollable with-custom-scroll left-sidebar__content account-sidebar', {'is-library': !isInfoPage})}
                    style={sidebarStyles}
                >
                    <AccountAvatar onClick={this.openModal} img={avatar} isVisible={isShowAvatar}/>
                    <AccountMenu activeRoute={route} isCollapsed={isInfoPage}/>
                </div>

                <div className="left-sidebar__footer">
                    <button className="btn btn__with-icon btn__lg" onClick={this.logout}>
                        <SignOutIcon/> Sign out
                    </button>
                </div>

                {isModalOpen && <AvatarModal onClose={this.closeModal}/>}
            </Fragment>
        );
    }
}

function mapStateToProps({ auth }) {
    return { ...auth };
}

export default compose(
    withRouter,
    withClientReady,
    withDimensionObserver,
    withScrollOverObserver('.ls-header', '.my-info-page', 0.5, 767),
    connect(mapStateToProps, mapRoutineCreators({ logout }))
)(AccountSidebar);
