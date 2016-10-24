/**
 * Framework7 1.4.2
 * Full Featured Mobile HTML Framework For Building iOS & Android Apps
 * 
 * http://www.idangero.us/framework7
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: February 27, 2016
 */
(function () {

    'use strict';
    /*===========================
    Framework 7
    ===========================*/
    window.Framework7 = function (params) {
        // App
        var app = this;
    
        // Version
        app.version = '1.4.2';
    
        // Default Parameters
        app.params = {
            cache: true,
            cacheIgnore: [],
            cacheIgnoreGetParameters: false,
            cacheDuration: 1000 * 60 * 10, // Ten minutes
            preloadPreviousPage: true,
            uniqueHistory: false,
            uniqueHistoryIgnoreGetParameters: false,
            dynamicPageUrl: 'content-{{index}}',
            allowDuplicateUrls: false,
            router: true,
            // Push State
            pushState: false,
            pushStateRoot: undefined,
            pushStateNoAnimation: false,
            pushStateSeparator: '#!/',
            pushStateOnLoad: true,
            // Fast clicks
            fastClicks: true,
            fastClicksDistanceThreshold: 10,
            fastClicksDelayBetweenClicks: 50,
            // Tap Hold
            tapHold: false,
            tapHoldDelay: 750,
            tapHoldPreventClicks: true,
            // Active State
            activeState: true,
            activeStateElements: 'a, button, label, span',
            // Animate Nav Back Icon
            animateNavBackIcon: false,
            // Swipe Back
            swipeBackPage: true,
            swipeBackPageThreshold: 0,
            swipeBackPageActiveArea: 30,
            swipeBackPageAnimateShadow: true,
            swipeBackPageAnimateOpacity: true,
            // Ajax
            ajaxLinks: undefined, // or CSS selector
            // External Links
            externalLinks: '.external', // CSS selector
            // Sortable
            sortable: true,
            // Scroll toolbars
            hideNavbarOnPageScroll: false,
            hideToolbarOnPageScroll: false,
            hideTabbarOnPageScroll: false,
            showBarsOnPageScrollEnd: true,
            showBarsOnPageScrollTop: true,
            // Swipeout
            swipeout: true,
            swipeoutActionsNoFold: false,
            swipeoutNoFollow: false,
            // Smart Select Back link template
            smartSelectOpenIn: 'page', // or 'popup' or 'picker'
            smartSelectBackText: 'Back',
            smartSelectPopupCloseText: 'Close',
            smartSelectPickerCloseText: 'Done',
            smartSelectSearchbar: false,
            smartSelectBackOnSelect: false,
            // Tap Navbar or Statusbar to scroll to top
            scrollTopOnNavbarClick: false,
            scrollTopOnStatusbarClick: false,
            // Panels
            swipePanel: false, // or 'left' or 'right'
            swipePanelActiveArea: 0,
            swipePanelCloseOpposite: true,
            swipePanelOnlyClose: false,
            swipePanelNoFollow: false,
            swipePanelThreshold: 0,
            panelsCloseByOutside: true,
            // Modals
            modalButtonOk: 'OK',
            modalButtonCancel: 'Cancel',
            modalUsernamePlaceholder: 'Username',
            modalPasswordPlaceholder: 'Password',
            modalTitle: 'Framework7',
            modalCloseByOutside: false,
            actionsCloseByOutside: true,
            popupCloseByOutside: true,
            modalPreloaderTitle: 'Loading... ',
            modalStack: true,
            // Lazy Load
            imagesLazyLoadThreshold: 0,
            imagesLazyLoadSequential: true,
            // Name space
            viewClass: 'view',
            viewMainClass: 'view-main',
            viewsClass: 'views',
            // Notifications defaults
            notificationCloseOnClick: false,
            notificationCloseIcon: true,
            notificationCloseButtonText: 'Close',
            // Animate Pages
            animatePages: true,
            // Template7
            templates: {},
            template7Data: {},
            template7Pages: false,
            precompileTemplates: false,
            // Material
            material: false,
            materialPageLoadDelay: 0,
            materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
            materialPreloaderHtml:
                '<span class="preloader-inner">' +
                    '<span class="preloader-inner-gap"></span>' +
                    '<span class="preloader-inner-left">' +
                        '<span class="preloader-inner-half-circle"></span>' +
                    '</span>' +
                    '<span class="preloader-inner-right">' +
                        '<span class="preloader-inner-half-circle"></span>' +
                    '</span>' +
                '</span>',
            materialRipple: true,
            materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a',
            // Auto init
            init: true,
        };
    
        // Extend defaults with parameters
        for (var param in params) {
            app.params[param] = params[param];
        }
    
        // DOM lib
        var $ = Dom7;
    
        // Template7 lib
        var t7 = Template7;
        app._compiledTemplates = {};
    
        // Touch events
        app.touchEvents = {
            start: app.support.touch ? 'touchstart' : 'mousedown',
            move: app.support.touch ? 'touchmove' : 'mousemove',
            end: app.support.touch ? 'touchend' : 'mouseup'
        };
    
        // Link to local storage
        app.ls = window.localStorage;
    
        // RTL
        app.rtl = $('body').css('direction') === 'rtl';
        if (app.rtl) $('html').attr('dir', 'rtl');
    
        // Overwrite statusbar overlay
        if (typeof app.params.statusbarOverlay !== 'undefined') {
            if (app.params.statusbarOverlay) $('html').addClass('with-statusbar-overlay');
            else $('html').removeClass('with-statusbar-overlay');
        }
    
        
    

        /*======================================================
        ************   Views   ************
        ======================================================*/
        app.views = [];
        var View = function (selector, params) {
            var defaults = {
                dynamicNavbar: false,
                domCache: false,
                linksView: undefined,
                reloadPages: false,
                uniqueHistory: app.params.uniqueHistory,
                uniqueHistoryIgnoreGetParameters: app.params.uniqueHistoryIgnoreGetParameters,
                allowDuplicateUrls: app.params.allowDuplicateUrls,
                swipeBackPage: app.params.swipeBackPage,
                swipeBackPageAnimateShadow: app.params.swipeBackPageAnimateShadow,
                swipeBackPageAnimateOpacity: app.params.swipeBackPageAnimateOpacity,
                swipeBackPageActiveArea: app.params.swipeBackPageActiveArea,
                swipeBackPageThreshold: app.params.swipeBackPageThreshold,
                animatePages: app.params.animatePages,
                preloadPreviousPage: app.params.preloadPreviousPage
            };
            var i;
        
            // Params
            params = params || {};
        
            // Disable dynamic navbar for material theme
            if (params.dynamicNavbar && app.params.material) params.dynamicNavbar = false;
        
            // Extend params with defaults
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            // View
            var view = this;
            view.params = params;
        
            // Selector
            view.selector = selector;
        
            // Container
            var container = $(selector);
            view.container = container[0];
        
            // Fix Selector
        
            if (typeof selector !== 'string') {
                // Supposed to be HTMLElement or Dom7
                selector = (container.attr('id') ? '#' + container.attr('id') : '') + (container.attr('class') ? '.' + container.attr('class').replace(/ /g, '.').replace('.active', '') : '');
                view.selector = selector;
            }
        
            // Is main
            view.main = container.hasClass(app.params.viewMainClass);
        
            // Content cache
            view.contentCache = {};
        
            // Pages cache
            view.pagesCache = {};
        
            // Store View in element for easy access
            container[0].f7View = view;
        
            // Pages
            view.pagesContainer = container.find('.pages')[0];
            view.initialPages = [];
            view.initialPagesUrl = [];
            view.initialNavbars = [];
            if (view.params.domCache) {
                var initialPages = container.find('.page');
                for (i = 0; i < initialPages.length; i++) {
                    view.initialPages.push(initialPages[i]);
                    view.initialPagesUrl.push('#' + initialPages.eq(i).attr('data-page'));
                }
                if (view.params.dynamicNavbar) {
                    var initialNavbars = container.find('.navbar-inner');
                    for (i = 0; i < initialNavbars.length; i++) {
                        view.initialNavbars.push(initialNavbars[i]);
                    }
                }
        
            }
        
            view.allowPageChange = true;
        
            // Location
            var docLocation = document.location.href;
        
            // History
            view.history = [];
            var viewURL = docLocation;
            var pushStateSeparator = app.params.pushStateSeparator;
            var pushStateRoot = app.params.pushStateRoot;
            if (app.params.pushState && view.main) {
                if (pushStateRoot) {
                    viewURL = pushStateRoot;
                }
                else {
                    if (viewURL.indexOf(pushStateSeparator) >= 0 && viewURL.indexOf(pushStateSeparator + '#') < 0) viewURL = viewURL.split(pushStateSeparator)[0];
                }
        
            }
        
            // Active Page
            var currentPage, currentPageData;
            if (!view.activePage) {
                currentPage = $(view.pagesContainer).find('.page-on-center');
                if (currentPage.length === 0) {
                    currentPage = $(view.pagesContainer).find('.page:not(.cached)');
                    currentPage = currentPage.eq(currentPage.length - 1);
                }
                if (currentPage.length > 0) {
                    currentPageData = currentPage[0].f7PageData;
                }
            }
        
            // View startup URL
            if (view.params.domCache && currentPage) {
                view.url = container.attr('data-url') || view.params.url || '#' + currentPage.attr('data-page');   
                view.pagesCache[view.url] = currentPage.attr('data-page');
            }
            else view.url = container.attr('data-url') || view.params.url || viewURL;
        
            // Update current page Data
            if (currentPageData) {
                currentPageData.view = view;
                currentPageData.url = view.url;
                if (view.params.domCache && view.params.dynamicNavbar && !currentPageData.navbarInnerContainer) {
                    currentPageData.navbarInnerContainer = view.initialNavbars[view.initialPages.indexOf(currentPageData.container)];
                }
                view.activePage = currentPageData;
                currentPage[0].f7PageData = currentPageData;
            }
        
            // Store to history main view's url
            if (view.url) {
                view.history.push(view.url);
            }
        
            // Touch events
            var isTouched = false,
                isMoved = false,
                touchesStart = {},
                isScrolling,
                activePage = [],
                previousPage = [],
                viewContainerWidth,
                touchesDiff,
                allowViewTouchMove = true,
                touchStartTime,
                activeNavbar = [],
                previousNavbar = [],
                activeNavElements,
                previousNavElements,
                activeNavBackIcon,
                previousNavBackIcon,
                dynamicNavbar,
                pageShadow,
                el;
        
            view.handleTouchStart = function (e) {
                if (!allowViewTouchMove || !view.params.swipeBackPage || isTouched || app.swipeoutOpenedEl || !view.allowPageChange) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                dynamicNavbar = view.params.dynamicNavbar && container.find('.navbar-inner').length > 1;
            };
        
            view.handleTouchMove = function (e) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
                    isTouched = false;
                    return;
                }
                if (!isMoved) {
                    var cancel = false;
                    // Calc values during first move fired
                    viewContainerWidth = container.width();
                    var target = $(e.target);
                    var swipeout = target.hasClass('swipeout') ? target : target.parents('.swipeout');
                    if (swipeout.length > 0) {
                        if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) cancel = true;
                        if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) cancel = true;
                    }
                    activePage = target.is('.page') ? target : target.parents('.page');
                    if (activePage.hasClass('no-swipeback')) cancel = true;
                    previousPage = container.find('.page-on-left:not(.cached)');
                    var notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    if (app.rtl) {
                        notFromBorder = touchesStart.x < container.offset().left - container[0].scrollLeft + viewContainerWidth - view.params.swipeBackPageActiveArea;
                    }
                    else {
                        notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    }
                    if (notFromBorder) cancel = true;
                    if (previousPage.length === 0 || activePage.length === 0) cancel = true;
                    if (cancel) {
                        isTouched = false;
                        return;
                    }
        
                    if (view.params.swipeBackPageAnimateShadow && !app.device.android) {
                        pageShadow = activePage.find('.swipeback-page-shadow');
                        if (pageShadow.length === 0) {
                            pageShadow = $('<div class="swipeback-page-shadow"></div>');
                            activePage.append(pageShadow);
                        }
                    }
        
                    if (dynamicNavbar) {
                        activeNavbar = container.find('.navbar-on-center:not(.cached)');
                        previousNavbar = container.find('.navbar-on-left:not(.cached)');
                        activeNavElements = activeNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        previousNavElements = previousNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        if (app.params.animateNavBackIcon) {
                            activeNavBackIcon = activeNavbar.find('.left.sliding .back .icon');
                            previousNavBackIcon = previousNavbar.find('.left.sliding .back .icon');
                        }
                    }
        
                    // Close/Hide Any Picker
                    if ($('.picker-modal.modal-in').length > 0) {
                        app.closeModal($('.picker-modal.modal-in'));
                    }
                }
                e.f7PreventPanelSwipe = true;
                isMoved = true;
                e.preventDefault();
        
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                // Touches diff
                touchesDiff = (pageX - touchesStart.x - view.params.swipeBackPageThreshold) * inverter;
                if (touchesDiff < 0) touchesDiff = 0;
                var percentage = touchesDiff / viewContainerWidth;
        
                // Swipe Back Callback
                var callbackData = {
                    percentage: percentage,
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (view.params.onSwipeBackMove) {
                    view.params.onSwipeBackMove(callbackData);
                }
                container.trigger('swipeBackMove', callbackData);
        
                // Transform pages
                var activePageTranslate = touchesDiff * inverter;
                var previousPageTranslate = (touchesDiff / 5 - viewContainerWidth / 5) * inverter;
                if (app.device.pixelRatio === 1) {
                    activePageTranslate = Math.round(activePageTranslate);
                    previousPageTranslate = Math.round(previousPageTranslate);
                }
        
                activePage.transform('translate3d(' + activePageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateShadow && !app.device.android) pageShadow[0].style.opacity = 1 - 1 * percentage;
        
                previousPage.transform('translate3d(' + previousPageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateOpacity) previousPage[0].style.opacity = 0.9 + 0.1 * percentage;
        
                // Dynamic Navbars Animation
                if (dynamicNavbar) {
                    var i;
                    for (i = 0; i < activeNavElements.length; i++) {
                        el = $(activeNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = (1 - percentage * 1.3);
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var activeNavTranslate = percentage * el[0].f7NavbarRightOffset;
                            if (app.device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);
                            el.transform('translate3d(' + activeNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
                                    activeNavBackIcon.transform('translate3d(' + -activeNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                    for (i = 0; i < previousNavElements.length; i++) {
                        el = $(previousNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = percentage * 1.3 - 0.3;
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var previousNavTranslate = el[0].f7NavbarLeftOffset * (1 - percentage);
                            if (app.device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);
                            el.transform('translate3d(' + previousNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
                                    previousNavBackIcon.transform('translate3d(' + -previousNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                }
            };
        
            view.handleTouchEnd = function (e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                if (touchesDiff === 0) {
                    $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''});
                    if (dynamicNavbar) {
                        activeNavElements.transform('').css({opacity: ''});
                        previousNavElements.transform('').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.transform('');
                        if (previousNavBackIcon && activeNavBackIcon.length > 0) previousNavBackIcon.transform('');
                    }
                    return;
                }
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var pageChanged = false;
                // Swipe back to previous page
                if (
                        timeDiff < 300 && touchesDiff > 10 ||
                        timeDiff >= 300 && touchesDiff > viewContainerWidth / 2
                    ) {
                    activePage.removeClass('page-on-center').addClass('page-on-right');
                    previousPage.removeClass('page-on-left').addClass('page-on-center');
                    if (dynamicNavbar) {
                        activeNavbar.removeClass('navbar-on-center').addClass('navbar-on-right');
                        previousNavbar.removeClass('navbar-on-left').addClass('navbar-on-center');
                    }
                    pageChanged = true;
                }
                // Reset custom styles
                // Add transitioning class for transition-duration
                $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''}).addClass('page-transitioning');
                if (dynamicNavbar) {
                    activeNavElements.css({opacity: ''})
                    .each(function () {
                        var translate = pageChanged ? this.f7NavbarRightOffset : 0;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
                                activeNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
        
                    }).addClass('page-transitioning');
        
                    previousNavElements.transform('').css({opacity: ''}).each(function () {
                        var translate = pageChanged ? 0 : this.f7NavbarLeftOffset;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && previousNavBackIcon.length > 0) {
                                previousNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
                    }).addClass('page-transitioning');
                }
                allowViewTouchMove = false;
                view.allowPageChange = false;
                // Swipe Back Callback
                var callbackData = {
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (pageChanged) {
                    // Update View's URL
                    var url = view.history[view.history.length - 2];
                    view.url = url;
        
                    // Page before animation callback
                    app.pageBackCallback('before', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                    app.pageAnimCallback('before', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
        
                    if (view.params.onSwipeBackBeforeChange) {
                        view.params.onSwipeBackBeforeChange(callbackData);
                    }
                    container.trigger('swipeBackBeforeChange', callbackData);
                }
                else {
                    if (view.params.onSwipeBackBeforeReset) {
                        view.params.onSwipeBackBeforeReset(callbackData);
                    }
                    container.trigger('swipeBackBeforeReset', callbackData);
                }
        
                activePage.transitionEnd(function () {
                    $([activePage[0], previousPage[0]]).removeClass('page-transitioning');
                    if (dynamicNavbar) {
                        activeNavElements.removeClass('page-transitioning').css({opacity: ''});
                        previousNavElements.removeClass('page-transitioning').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.removeClass('page-transitioning');
                        if (previousNavBackIcon && previousNavBackIcon.length > 0) previousNavBackIcon.removeClass('page-transitioning');
                    }
                    allowViewTouchMove = true;
                    view.allowPageChange = true;
                    if (pageChanged) {
                        if (app.params.pushState && view.main) history.back();
                        // Page after animation callback
                        app.pageBackCallback('after', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.pageAnimCallback('after', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.router.afterBack(view, activePage, previousPage);
        
                        if (view.params.onSwipeBackAfterChange) {
                            view.params.onSwipeBackAfterChange(callbackData);
                        }
                        container.trigger('swipeBackAfterChange', callbackData);
                    }
                    else {
                        if (view.params.onSwipeBackAfterReset) {
                            view.params.onSwipeBackAfterReset(callbackData);
                        }
                        container.trigger('swipeBackAfterReset', callbackData);
                    }
                    if (pageShadow && pageShadow.length > 0) pageShadow.remove();
                });
            };
            view.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                container[action](app.touchEvents.start, view.handleTouchStart);
                container[action](app.touchEvents.move, view.handleTouchMove);
                container[action](app.touchEvents.end, view.handleTouchEnd);
            };
            view.detachEvents = function () {
                view.attachEvents(true);
            };
        
            // Init
            if (view.params.swipeBackPage && !app.params.material) {
                view.attachEvents();
            }
        
            // Add view to app
            app.views.push(view);
            if (view.main) app.mainView = view;
        
            // Router 
            view.router = {
                load: function (options) {
                    return app.router.load(view, options);
                },
                back: function (options) {
                    return app.router.back(view, options);  
                },
                // Shortcuts
                loadPage: function (options) {
                    options = options || {};
                    if (typeof options === 'string') {
                        var url = options;
                        options = {};
                        if (url && url.indexOf('#') === 0 && view.params.domCache) {
                            options.pageName = url.split('#')[1];
                        }
                        else options.url = url;
                    }
                    return app.router.load(view, options);
                },
                loadContent: function (content) {
                    return app.router.load(view, {content: content});
                },
                reloadPage: function (url) {
                    return app.router.load(view, {url: url, reload: true});
                },
                reloadContent: function (content) {
                    return app.router.load(view, {content: content, reload: true});
                },
                reloadPreviousPage: function (url) {
                    return app.router.load(view, {url: url, reloadPrevious: true, reload: true});
                },
                reloadPreviousContent: function (content) {
                    return app.router.load(view, {content: content, reloadPrevious: true, reload: true});
                },
                refreshPage: function () {
                    var options = {
                        url: view.url,
                        reload: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0) {
                        if (view.params.domCache && view.pagesCache[options.url]) {
                            options.pageName = view.pagesCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                        else if (view.contentCache[options.url]) {
                            options.content = view.contentCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                    }
                    return app.router.load(view, options);
                },
                refreshPreviousPage: function () {
                    var options = {
                        url: view.history[view.history.length - 2],
                        reload: true,
                        reloadPrevious: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0 && view.params.domCache && view.pagesCache[options.url]) {
                        options.pageName = view.pagesCache[options.url];
                        options.url = undefined;
                        delete options.url;
                    }
                    return app.router.load(view, options);
                }
            };
        
            // Aliases for temporary backward compatibility
            view.loadPage = view.router.loadPage;
            view.loadContent = view.router.loadContent;
            view.reloadPage = view.router.reloadPage;
            view.reloadContent = view.router.reloadContent;
            view.reloadPreviousPage = view.router.reloadPreviousPage;
            view.reloadPreviousContent = view.router.reloadPreviousContent;
            view.refreshPage = view.router.refreshPage;
            view.refreshPreviousPage = view.router.refreshPreviousPage;
            view.back = view.router.back;
        
            // Bars methods
            view.hideNavbar = function () {
                return app.hideNavbar(container.find('.navbar'));
            };
            view.showNavbar = function () {
                return app.showNavbar(container.find('.navbar'));
            };
            view.hideToolbar = function () {
                return app.hideToolbar(container.find('.toolbar'));
            };
            view.showToolbar = function () {
                return app.showToolbar(container.find('.toolbar'));
            };
        
            // Push State on load
            if (app.params.pushState && app.params.pushStateOnLoad && view.main) {
                var pushStateUrl;
                var pushStateUrlSplit = docLocation.split(pushStateSeparator)[1];
                if (pushStateRoot) {
                    pushStateUrl = docLocation.split(app.params.pushStateRoot + pushStateSeparator)[1];
                }
                else if (pushStateSeparator && docLocation.indexOf(pushStateSeparator) >= 0 && docLocation.indexOf(pushStateSeparator + '#') < 0) {
                    pushStateUrl = pushStateUrlSplit;
                }
                var pushStateAnimatePages = app.params.pushStateNoAnimation ? false : undefined;
                var historyState = history.state;
                if (pushStateUrl) {
                    if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && view.initialPagesUrl.indexOf(pushStateUrl) >= 0) {
                        app.router.load(view, {pageName: pushStateUrl.replace('#',''), animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else app.router.load(view, {url: pushStateUrl, animatePages: pushStateAnimatePages, pushState: false});
                }
                else if (view.params.domCache && docLocation.indexOf(pushStateSeparator + '#') >= 0) {
                    if (historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateSeparator && pushStateUrlSplit.indexOf('#') === 0) {
                        if (view.initialPagesUrl.indexOf(pushStateUrlSplit)) {
                            app.router.load(view, {pageName: pushStateUrlSplit.replace('#', ''), animatePages: pushStateAnimatePages, pushState: false});
                        }
                    }
                }
            }
        
            // Destroy
            view.destroy = function () {
                view.detachEvents();
                view = undefined;
            };
        
            // Plugin hook
            app.pluginHook('addView', view);
        
            // Return view
            return view;
        };
        
        app.addView = function (selector, params) {
            return new View(selector, params);
        };
        
        app.getCurrentView = function (index) {
            var popoverView = $('.popover.modal-in .view');
            var popupView = $('.popup.modal-in .view');
            var panelView = $('.panel.active .view');
            var appViews = $('.views');
            // Find active view as tab
            var appView = appViews.children('.view');
            // Propably in tabs or split view
            if (appView.length > 1) {
                if (appView.hasClass('tab')) {
                    // Tabs
                    appView = appViews.children('.view.active');
                }
                else {
                    // Split View, leave appView intact
                }
            }
            if (popoverView.length > 0 && popoverView[0].f7View) return popoverView[0].f7View;
            if (popupView.length > 0 && popupView[0].f7View) return popupView[0].f7View;
            if (panelView.length > 0 && panelView[0].f7View) return panelView[0].f7View;
            if (appView.length > 0) {
                if (appView.length === 1 && appView[0].f7View) return appView[0].f7View;
                if (appView.length > 1) {
                    var currentViews = [];
                    for (var i = 0; i < appView.length; i++) {
                        if (appView[i].f7View) currentViews.push(appView[i].f7View);
                    }
                    if (currentViews.length > 0 && typeof index !== 'undefined') return currentViews[index];
                    if (currentViews.length > 1) return currentViews;
                    if (currentViews.length === 1) return currentViews[0];
                    return undefined;
                }
            }
            return undefined;
        };
        
        

        /*======================================================
        ************   Modals   ************
        ======================================================*/
        var _modalTemplateTempDiv = document.createElement('div');
        app.modalStack = [];
        app.modalStackClearQueue = function () {
            if (app.modalStack.length) {
                (app.modalStack.shift())();
            }
        };
        app.modal = function (params) {
            params = params || {};
            var modalHTML = '';
            if (app.params.modalTemplate) {
                if (!app._compiledTemplates.modal) app._compiledTemplates.modal = t7.compile(app.params.modalTemplate);
                modalHTML = app._compiledTemplates.modal(params);
            }
            else {
                var buttonsHTML = '';
                if (params.buttons && params.buttons.length > 0) {
                    for (var i = 0; i < params.buttons.length; i++) {
                        buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
                    }
                }
                var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
                var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
                var afterTextHTML = params.afterText ? params.afterText : '';
                var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
                var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical': '';
                var modalButtonsHTML = params.buttons && params.buttons.length > 0 ? '<div class="modal-buttons modal-buttons-' + params.buttons.length + ' ' + verticalButtons + '">' + buttonsHTML + '</div>' : '';
                modalHTML = '<div class="modal ' + noButtons + ' ' + (params.cssClass || '') + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div>' + modalButtonsHTML + '</div>';
            }
        
            _modalTemplateTempDiv.innerHTML = modalHTML;
        
            var modal = $(_modalTemplateTempDiv).children();
        
            $('body').append(modal[0]);
        
            // Add events on buttons
            modal.find('.modal-button').each(function (index, el) {
                $(el).on('click', function (e) {
                    if (params.buttons[index].close !== false) app.closeModal(modal);
                    if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
                    if (params.onClick) params.onClick(modal, index);
                });
            });
            app.openModal(modal);
            return modal[0];
        };
        app.alert = function (text, title, callbackOk) {
            if (typeof title === 'function') {
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [ {text: app.params.modalButtonOk, bold: true, onClick: callbackOk} ]
            });
        };
        app.confirm = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [
                    {text: app.params.modalButtonCancel, onClick: callbackCancel},
                    {text: app.params.modalButtonOk, bold: true, onClick: callbackOk}
                ]
            });
        };
        app.prompt = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    if (index === 0 && callbackCancel) callbackCancel($(modal).find('.modal-text-input').val());
                    if (index === 1 && callbackOk) callbackOk($(modal).find('.modal-text-input').val());
                }
            });
        };
        app.modalLogin = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field modal-input-double"><input type="text" name="modal-username" placeholder="' + app.params.modalUsernamePlaceholder + '" class="modal-text-input"></div><div class="input-field modal-input-double"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    var username = $(modal).find('.modal-text-input[name="modal-username"]').val();
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(username, password);
                    if (index === 1 && callbackOk) callbackOk(username, password);
                }
            });
        };
        app.modalPassword = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(password);
                    if (index === 1 && callbackOk) callbackOk(password);
                }
            });
        };
        app.showPreloader = function (title) {
            return app.modal({
                title: title || app.params.modalPreloaderTitle,
                text: '<div class="preloader">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</div>',
                cssClass: 'modal-preloader'
            });
        };
        app.hidePreloader = function () {
            app.closeModal('.modal.modal-in');
        };
        app.showIndicator = function () {
            $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</span></div>');
        };
        app.hideIndicator = function () {
            $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
        };
        // Action Sheet
        app.actions = function (target, params) {
            var toPopover = false, modal, groupSelector, buttonSelector;
            if (arguments.length === 1) {
                // Actions
                params = target;
            }
            else {
                // Popover
                if (app.device.ios) {
                    if (app.device.ipad) toPopover = true;
                }
                else {
                    if ($(window).width() >= 768) toPopover = true;
                }
            }
            params = params || [];
        
            if (params.length > 0 && !$.isArray(params[0])) {
                params = [params];
            }
            var modalHTML;
            if (toPopover) {
                var actionsToPopoverTemplate = app.params.modalActionsToPopoverTemplate ||
                    '<div class="popover actions-popover">' +
                      '<div class="popover-inner">' +
                        '{{#each this}}' +
                        '<div class="list-block">' +
                          '<ul>' +
                            '{{#each this}}' +
                            '{{#if label}}' +
                            '<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>' +
                            '{{else}}' +
                            '<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}} {{#if disabled}}disabled{{/if}}">{{text}}</a></li>' +
                            '{{/if}}' +
                            '{{/each}}' +
                          '</ul>' +
                        '</div>' +
                        '{{/each}}' +
                      '</div>' +
                    '</div>';
                if (!app._compiledTemplates.actionsToPopover) {
                    app._compiledTemplates.actionsToPopover = t7.compile(actionsToPopoverTemplate);
                }
                var popoverHTML = app._compiledTemplates.actionsToPopover(params);
                modal = $(app.popover(popoverHTML, target, true));
                groupSelector = '.list-block ul';
                buttonSelector = '.list-button';
            }
            else {
                if (app.params.modalActionsTemplate) {
                    if (!app._compiledTemplates.actions) app._compiledTemplates.actions = t7.compile(app.params.modalActionsTemplate);
                    modalHTML = app._compiledTemplates.actions(params);
                }
                else {
                    var buttonsHTML = '';
                    for (var i = 0; i < params.length; i++) {
                        for (var j = 0; j < params[i].length; j++) {
                            if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
                            var button = params[i][j];
                            var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
                            if (button.bold) buttonClass += ' actions-modal-button-bold';
                            if (button.color) buttonClass += ' color-' + button.color;
                            if (button.bg) buttonClass += ' bg-' + button.bg;
                            if (button.disabled) buttonClass += ' disabled';
                            buttonsHTML += '<div class="' + buttonClass + '">' + button.text + '</div>';
                            if (j === params[i].length - 1) buttonsHTML += '</div>';
                        }
                    }
                    modalHTML = '<div class="actions-modal">' + buttonsHTML + '</div>';
                }
                _modalTemplateTempDiv.innerHTML = modalHTML;
                modal = $(_modalTemplateTempDiv).children();
                $('body').append(modal[0]);
                groupSelector = '.actions-modal-group';
                buttonSelector = '.actions-modal-button';
            }
        
            var groups = modal.find(groupSelector);
            groups.each(function (index, el) {
                var groupIndex = index;
                $(el).children().each(function (index, el) {
                    var buttonIndex = index;
                    var buttonParams = params[groupIndex][buttonIndex];
                    var clickTarget;
                    if (!toPopover && $(el).is(buttonSelector)) clickTarget = $(el);
                    if (toPopover && $(el).find(buttonSelector).length > 0) clickTarget = $(el).find(buttonSelector);
        
                    if (clickTarget) {
                        clickTarget.on('click', function (e) {
                            if (buttonParams.close !== false) app.closeModal(modal);
                            if (buttonParams.onClick) buttonParams.onClick(modal, e);
                        });
                    }
                });
            });
            if (!toPopover) app.openModal(modal);
            return modal[0];
        };
        app.popover = function (modal, target, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal.trim();
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    $('body').append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            target = $(target);
            if (modal.length === 0 || target.length === 0) return false;
            if (modal.parents('body').length === 0) {
                if (removeOnClose) modal.addClass('remove-on-close');
                $('body').append(modal[0]);
            }
            if (modal.find('.popover-angle').length === 0 && !app.params.material) {
                modal.append('<div class="popover-angle"></div>');
            }
            modal.show();
        
            var material = app.params.material;
        
            function sizePopover() {
                modal.css({left: '', top: ''});
                var modalWidth =  modal.width();
                var modalHeight =  modal.height(); // 13 - height of angle
                var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;
                if (!material) {
                    modalAngle = modal.find('.popover-angle');
                    modalAngleSize = modalAngle.width() / 2;
                    modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});
                }
                else {
                    modal.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({left: '', top: ''});
                }
        
                var targetWidth = target.outerWidth();
                var targetHeight = target.outerHeight();
                var targetOffset = target.offset();
                var targetParentPage = target.parents('.page');
                if (targetParentPage.length > 0) {
                    targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
                }
        
                var windowHeight = $(window).height();
                var windowWidth = $(window).width();
        
                var modalTop = 0;
                var modalLeft = 0;
                var diff = 0;
                // Top Position
                var modalPosition = material ? 'bottom' : 'top';
                if (material) {
                    if (modalHeight < windowHeight - targetOffset.top - targetHeight) {
                        // On bottom
                        modalPosition = 'bottom';
                        modalTop = targetOffset.top;
                    }
                    else if (modalHeight < targetOffset.top) {
                        // On top
                        modalTop = targetOffset.top - modalHeight + targetHeight;
                        modalPosition = 'top';
                    }
                    else {
                        // On middle
                        modalPosition = 'bottom';
                        modalTop = targetOffset.top;
                    }
        
                    if (modalTop <= 0) {
                        modalTop = 8;
                    }
                    else if (modalTop + modalHeight >= windowHeight) {
                        modalTop = windowHeight - modalHeight - 8;
                    }
        
                    // Horizontal Position
                    modalLeft = targetOffset.left;
                    if (modalLeft + modalWidth >= windowWidth - 8) {
                        modalLeft = targetOffset.left + targetWidth - modalWidth - 8;
                    }
                    if (modalLeft < 8) {
                        modalLeft = 8;
                    }
                    if (modalPosition === 'top') {
                        modal.addClass('popover-on-top');
                    }
                    if (modalPosition === 'bottom') {
                        modal.addClass('popover-on-bottom');
                    }
                    if (target.hasClass('floating-button-to-popover') && !modal.hasClass('modal-in')) {
                        modal.addClass('popover-floating-button');
                        var diffX = (modalLeft + modalWidth / 2) - (targetOffset.left + targetWidth / 2),
                            diffY = (modalTop + modalHeight / 2) - (targetOffset.top + targetHeight / 2);
                        target
                            .addClass('floating-button-to-popover-in')
                            .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0)')
                            .transitionEnd(function (e) {
                                if (!target.hasClass('floating-button-to-popover-in')) return;
                                target
                                    .addClass('floating-button-to-popover-scale')
                                    .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0) scale(' + (modalWidth/targetWidth) + ', ' + (modalHeight/targetHeight) + ')');
                            });
        
                        modal.once('close', function () {
                            target
                                .removeClass('floating-button-to-popover-in floating-button-to-popover-scale')
                                .addClass('floating-button-to-popover-out')
                                .transform('')
                                .transitionEnd(function (e) {
                                    target.removeClass('floating-button-to-popover-out');
                                });
                        });
                        modal.once('closed', function () {
                            modal.removeClass('popover-floating-button');
                        });
                    }
        
                }
                else {
                    if ((modalHeight + modalAngleSize) < targetOffset.top) {
                        // On top
                        modalTop = targetOffset.top - modalHeight - modalAngleSize;
                    }
                    else if ((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight) {
                        // On bottom
                        modalPosition = 'bottom';
                        modalTop = targetOffset.top + targetHeight + modalAngleSize;
                    }
                    else {
                        // On middle
                        modalPosition = 'middle';
                        modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
                        diff = modalTop;
                        if (modalTop <= 0) {
                            modalTop = 5;
                        }
                        else if (modalTop + modalHeight >= windowHeight) {
                            modalTop = windowHeight - modalHeight - 5;
                        }
                        diff = diff - modalTop;
                    }
        
                    // Horizontal Position
                    if (modalPosition === 'top' || modalPosition === 'bottom') {
                        modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
                        diff = modalLeft;
                        if (modalLeft < 5) modalLeft = 5;
                        if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
                        if (modalPosition === 'top') {
                            modalAngle.addClass('on-bottom');
                        }
                        if (modalPosition === 'bottom') {
                            modalAngle.addClass('on-top');
                        }
                        diff = diff - modalLeft;
                        modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
                        modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
                        modalAngle.css({left: modalAngleLeft + 'px'});
        
                    }
                    else if (modalPosition === 'middle') {
                        modalLeft = targetOffset.left - modalWidth - modalAngleSize;
                        modalAngle.addClass('on-right');
                        if (modalLeft < 5 || (modalLeft + modalWidth > windowWidth)) {
                            if (modalLeft < 5) modalLeft = targetOffset.left + targetWidth + modalAngleSize;
                            if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
                            modalAngle.removeClass('on-right').addClass('on-left');
                        }
                        modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
                        modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
                        modalAngle.css({top: modalAngleTop + 'px'});
                    }
                }
        
        
                // Apply Styles
                modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
            }
        
            sizePopover();
        
            $(window).on('resize', sizePopover);
        
            modal.on('close', function () {
                $(window).off('resize', sizePopover);
            });
        
            app.openModal(modal);
            return modal[0];
        };
        app.popup = function (modal, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal.trim();
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    $('body').append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            if (modal.length === 0) return false;
            if (modal.parents('body').length === 0) {
                if (removeOnClose) modal.addClass('remove-on-close');
                $('body').append(modal[0]);
            }
            modal.show();
        
            app.openModal(modal);
            return modal[0];
        };
        app.pickerModal = function (modal, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                modal = $(modal);
                if (modal.length > 0) {
                    if (removeOnClose) modal.addClass('remove-on-close');
                    $('body').append(modal[0]);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            if (modal.length === 0) return false;
            if (modal.parents('body').length === 0) {
                if (removeOnClose) modal.addClass('remove-on-close');
                $('body').append(modal[0]);
            }
            if ($('.picker-modal.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
                app.closeModal('.picker-modal.modal-in:not(.modal-out)');
            }
            modal.show();
            app.openModal(modal);
            return modal[0];
        };
        app.loginScreen = function (modal) {
            if (!modal) modal = '.login-screen';
            modal = $(modal);
            if (modal.length === 0) return false;
            if ($('.login-screen.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
                app.closeModal('.login-screen.modal-in:not(.modal-out)');
            }
            modal.show();
            
            app.openModal(modal);
            return modal[0];
        };
        app.openModal = function (modal) {
            modal = $(modal);
            var isModal = modal.hasClass('modal');
            if ($('.modal.modal-in:not(.modal-out)').length && app.params.modalStack && isModal) {
                app.modalStack.push(function () {
                    app.openModal(modal);
                });
                return;
            }
            // do nothing if this modal already shown
            if (true === modal.data('f7-modal-shown')) {
                return;
            }
            modal.data('f7-modal-shown', true);
            modal.once('close', function() {
               modal.removeData('f7-modal-shown');
            });
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
            if (isModal) {
                modal.show();
                modal.css({
                    marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
                });
            }
        
            var overlay;
            if (!isLoginScreen && !isPickerModal) {
                if ($('.modal-overlay').length === 0 && !isPopup) {
                    $('body').append('<div class="modal-overlay"></div>');
                }
                if ($('.popup-overlay').length === 0 && isPopup) {
                    $('body').append('<div class="popup-overlay"></div>');
                }
                overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            }
            if (app.params.material && isPickerModal) {
                if (modal.hasClass('picker-calendar')) {
                    if ($('.picker-modal-overlay').length === 0 && !isPopup) {
                        $('body').append('<div class="picker-modal-overlay"></div>');
                    }
                    overlay = $('.picker-modal-overlay');
                }
            }
        
            //Make sure that styles are applied, trigger relayout;
            var clientLeft = modal[0].clientLeft;
        
            // Trugger open event
            modal.trigger('open');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').addClass('with-picker-modal');
            }
        
            // Init Pages and Navbars in modal
            if (modal.find('.' + app.params.viewClass).length > 0) {
                modal.find('.page').each(function () {
                    app.initPageWithCallback(this);
                });
                modal.find('.navbar').each(function () {
                    app.initNavbarWithCallback(this); 
                });
            }
        
            // Classes for transition in
            if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
            if (app.params.material && isPickerModal && overlay) overlay.addClass('modal-overlay-visible');
            modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
                if (modal.hasClass('modal-out')) modal.trigger('closed');
                else modal.trigger('opened');
            });
            return true;
        };
        app.closeModal = function (modal) {
            modal = $(modal || '.modal-in');
            if (typeof modal !== 'undefined' && modal.length === 0) {
                return;
            }
            var isModal = modal.hasClass('modal');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
        
            var removeOnClose = modal.hasClass('remove-on-close');
        
            var overlay;
            
            if (isPopup) overlay = $('.popup-overlay');
            else {
                if (isPickerModal && app.params.material) overlay = $('.picker-modal-overlay');
                else if (!isPickerModal) overlay = $('.modal-overlay');
            }
        
            if (isPopup){
                if (modal.length === $('.popup.modal-in').length) {
                    overlay.removeClass('modal-overlay-visible');
                }
            }
            else if (overlay && overlay.length > 0) {
                overlay.removeClass('modal-overlay-visible');
            }
        
            modal.trigger('close');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').removeClass('with-picker-modal');
                $('body').addClass('picker-modal-closing');
            }
        
            if (!(isPopover && !app.params.material)) {
                modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
                    if (modal.hasClass('modal-out')) modal.trigger('closed');
                    else {
                        modal.trigger('opened');
                        if (isPopover) return;
                    }
        
                    if (isPickerModal) {
                        $('body').removeClass('picker-modal-closing');
                    }
                    if (isPopup || isLoginScreen || isPickerModal || isPopover) {
                        modal.removeClass('modal-out').hide();
                        if (removeOnClose && modal.length > 0) {
                            modal.remove();
                        }
                    }
                    else {
                        modal.remove();
                    }
                });
                if (isModal && app.params.modalStack) {
                    app.modalStackClearQueue();
                }
            }
            else {
                modal.removeClass('modal-in modal-out').trigger('closed').hide();
                if (removeOnClose) {
                    modal.remove();
                }
            }
            return true;
        };
        
        

        /* ===============================================================================
        ************   Infinite Scroll   ************
        =============================================================================== */
        function handleInfiniteScroll() {
            /*jshint validthis:true */
            var inf = $(this);
            var scrollTop = inf[0].scrollTop;
            var scrollHeight = inf[0].scrollHeight;
            var height = inf[0].offsetHeight;
            var distance = inf[0].getAttribute('data-distance');
            var virtualListContainer = inf.find('.virtual-list');
            var virtualList;
            var onTop = inf.hasClass('infinite-scroll-top');
            if (!distance) distance = 50;
            if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
                distance = parseInt(distance, 10) / 100 * height;
            }
            if (distance > height) distance = height;
            if (onTop) {
                if (scrollTop < distance) {
                    inf.trigger('infinite');
                }
            }
            else {
                if (scrollTop + height >= scrollHeight - distance) {
                    if (virtualListContainer.length > 0) {
                        virtualList = virtualListContainer[0].f7VirtualList;
                        if (virtualList && !virtualList.reachEnd) return;
                    }
                    inf.trigger('infinite');
                }
            }
        
        }
        app.attachInfiniteScroll = function (infiniteContent) {
            $(infiniteContent).on('scroll', handleInfiniteScroll);
        };
        app.detachInfiniteScroll = function (infiniteContent) {
            $(infiniteContent).off('scroll', handleInfiniteScroll);
        };
        
        app.initPageInfiniteScroll = function (pageContainer) {
            pageContainer = $(pageContainer);
            var infiniteContent = pageContainer.find('.infinite-scroll');
            if (infiniteContent.length === 0) return;
            app.attachInfiniteScroll(infiniteContent);
            function detachEvents() {
                app.detachInfiniteScroll(infiniteContent);
                pageContainer.off('pageBeforeRemove', detachEvents);
            }
            pageContainer.on('pageBeforeRemove', detachEvents);
        };

        /*=============================================================
        ************   Hide/show Toolbar/Navbar on scroll   ************
        =============================================================*/
        app.initPageScrollToolbars = function (pageContainer) {
            pageContainer = $(pageContainer);
            var scrollContent = pageContainer.find('.page-content');
            if (scrollContent.length === 0) return;
            var hideNavbar = (app.params.hideNavbarOnPageScroll || scrollContent.hasClass('hide-navbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-navbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
            var hideToolbar = (app.params.hideToolbarOnPageScroll || scrollContent.hasClass('hide-toolbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll')) && !(scrollContent.hasClass('keep-toolbar-on-scroll') || scrollContent.hasClass('keep-bars-on-scroll'));
            var hideTabbar = (app.params.hideTabbarOnPageScroll || scrollContent.hasClass('hide-tabbar-on-scroll')) && !(scrollContent.hasClass('keep-tabbar-on-scroll'));
        
            if (!(hideNavbar || hideToolbar || hideTabbar)) return;
            
            var viewContainer = scrollContent.parents('.' + app.params.viewClass);
            if (viewContainer.length === 0) return;
        
            var navbar = viewContainer.find('.navbar'), 
                toolbar = viewContainer.find('.toolbar'), 
                tabbar;
            if (hideTabbar) {
                tabbar = viewContainer.find('.tabbar');
                if (tabbar.length === 0) tabbar = viewContainer.parents('.' + app.params.viewsClass).find('.tabbar');
            }
        
            var hasNavbar = navbar.length > 0,
                hasToolbar = toolbar.length > 0,
                hasTabbar = tabbar && tabbar.length > 0;
        
            var previousScroll, currentScroll;
                previousScroll = currentScroll = scrollContent[0].scrollTop;
        
            var scrollHeight, offsetHeight, reachEnd, action, navbarHidden, toolbarHidden, tabbarHidden;
        
            var toolbarHeight = (hasToolbar && hideToolbar) ? toolbar[0].offsetHeight : 0;
            var tabbarHeight = (hasTabbar && hideTabbar) ? tabbar[0].offsetHeight : 0;
            var bottomBarHeight = tabbarHeight || toolbarHeight;
        
            function handleScroll(e) {
                if (pageContainer.hasClass('page-on-left')) return;
                currentScroll = scrollContent[0].scrollTop;
                scrollHeight = scrollContent[0].scrollHeight;
                offsetHeight = scrollContent[0].offsetHeight;
                reachEnd =  currentScroll + offsetHeight >= scrollHeight - bottomBarHeight;
                navbarHidden = navbar.hasClass('navbar-hidden');
                toolbarHidden = toolbar.hasClass('toolbar-hidden');
                tabbarHidden = tabbar && tabbar.hasClass('toolbar-hidden');
        
                if (reachEnd) {
                    if (app.params.showBarsOnPageScrollEnd) {
                        action = 'show';
                    }
                }
                else if (previousScroll > currentScroll) {
                    if (app.params.showBarsOnPageScrollTop || currentScroll <= 44) {
                        action = 'show';
                    }
                    else {
                        action = 'hide';
                    }
                }
                else {
                    if (currentScroll > 44) {
                        action = 'hide';
                    }
                    else {
                        action = 'show';
                    }
                }
        
                if (action === 'show') {
                    if (hasNavbar && hideNavbar && navbarHidden) {
                        app.showNavbar(navbar);
                        pageContainer.removeClass('no-navbar-by-scroll'); 
                        navbarHidden = false;
                    }
                    if (hasToolbar && hideToolbar && toolbarHidden) {
                        app.showToolbar(toolbar);
                        pageContainer.removeClass('no-toolbar-by-scroll'); 
                        toolbarHidden = false;
                    }
                    if (hasTabbar && hideTabbar && tabbarHidden) {
                        app.showToolbar(tabbar);
                        pageContainer.removeClass('no-tabbar-by-scroll'); 
                        tabbarHidden = false;
                    }
                }
                else {
                    if (hasNavbar && hideNavbar && !navbarHidden) {
                        app.hideNavbar(navbar);
                        pageContainer.addClass('no-navbar-by-scroll'); 
                        navbarHidden = true;
                    }
                    if (hasToolbar && hideToolbar && !toolbarHidden) {
                        app.hideToolbar(toolbar);
                        pageContainer.addClass('no-toolbar-by-scroll'); 
                        toolbarHidden = true;
                    }
                    if (hasTabbar && hideTabbar && !tabbarHidden) {
                        app.hideToolbar(tabbar);
                        pageContainer.addClass('no-tabbar-by-scroll'); 
                        tabbarHidden = true;
                    }
                }
                    
                previousScroll = currentScroll;
            }
            scrollContent.on('scroll', handleScroll);
            scrollContent[0].f7ScrollToolbarsHandler = handleScroll;
        };
        app.destroyScrollToolbars = function (pageContainer) {
            pageContainer = $(pageContainer);
            var scrollContent = pageContainer.find('.page-content');
            if (scrollContent.length === 0) return;
            var handler = scrollContent[0].f7ScrollToolbarsHandler;
            if (!handler) return;
            scrollContent.off('scroll', scrollContent[0].f7ScrollToolbarsHandler);
        };

        /*======================================================
        ************   Material Tabbar   ************
        ======================================================*/
        app.materialTabbarSetHighlight = function (tabbar, activeLink) {
            tabbar = $(tabbar);
            activeLink = activeLink || tabbar.find('.tab-link.active');
        
            var tabLinkWidth, highlightTranslate;
            if (tabbar.hasClass('tabbar-scrollable')) {
                tabLinkWidth = activeLink[0].offsetWidth + 'px';
                highlightTranslate = (app.rtl ? - activeLink[0].offsetLeft: activeLink[0].offsetLeft) + 'px';
            }
            else {
                tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100 + '%';
                highlightTranslate = (app.rtl ? - activeLink.index(): activeLink.index()) * 100 + '%';
            }
        
            tabbar.find('.tab-link-highlight')
                .css({width: tabLinkWidth})
                .transform('translate3d(' + highlightTranslate + ',0,0)');
        };
        app.initPageMaterialTabbar = function (pageContainer) {
            pageContainer = $(pageContainer);
            var tabbar = $(pageContainer).find('.tabbar');
        
            function tabbarSetHighlight() {
                app.materialTabbarSetHighlight(tabbar);
            }
            if (tabbar.length > 0) {
                if (tabbar.find('.tab-link-highlight').length === 0) {
                    tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                }
        
                tabbarSetHighlight();
                $(window).on('resize', tabbarSetHighlight);
                pageContainer.once('pageBeforeRemove', function () {
                    $(window).off('resize', tabbarSetHighlight);
                });
            }
        };

        /* ===============================================================================
        ************   Tabs   ************
        =============================================================================== */
        app.showTab = function (tab, tabLink, force) {
            var newTab = $(tab);
            if (arguments.length === 2) {
                if (typeof tabLink === 'boolean') {
                    force = tabLink;
                }
            }
            if (newTab.length === 0) return false;
            if (newTab.hasClass('active')) {
                if (force) newTab.trigger('show');
                return false;
            }
            var tabs = newTab.parent('.tabs');
            if (tabs.length === 0) return false;
        
            // Return swipeouts in hidden tabs
            app.allowSwipeout = true;
        
            // Animated tabs
            var isAnimatedTabs = tabs.parent().hasClass('tabs-animated-wrap');
            if (isAnimatedTabs) {
                var tabTranslate = (app.rtl ? newTab.index() : -newTab.index()) * 100;
                tabs.transform('translate3d(' + tabTranslate + '%,0,0)');
            }
        
            // Swipeable tabs
            var isSwipeableTabs = tabs.parent().hasClass('tabs-swipeable-wrap'), swiper;
            if (isSwipeableTabs) {
                swiper = tabs.parent()[0].swiper;
                if (swiper.activeIndex !== newTab.index()) swiper.slideTo(newTab.index(), undefined, false);
            }
        
            // Remove active class from old tabs
            var oldTab = tabs.children('.tab.active').removeClass('active');
            // Add active class to new tab
            newTab.addClass('active');
            // Trigger 'show' event on new tab
            newTab.trigger('show');
        
            // Update navbars in new tab
            if (!isAnimatedTabs && !isSwipeableTabs && newTab.find('.navbar').length > 0) {
                // Find tab's view
                var viewContainer;
                if (newTab.hasClass(app.params.viewClass)) viewContainer = newTab[0];
                else viewContainer = newTab.parents('.' + app.params.viewClass)[0];
                app.sizeNavbars(viewContainer);
            }
        
            // Find related link for new tab
            if (tabLink) tabLink = $(tabLink);
            else {
                // Search by id
                if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');
                else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
                // Search by data-tab
                if (!tabLink || tabLink && tabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (newTab.is($(this).attr('data-tab'))) tabLink = $(this);
                    });
                }
            }
            if (tabLink.length === 0) return;
        
            // Find related link for old tab
            var oldTabLink;
            if (oldTab && oldTab.length > 0) {
                // Search by id
                var oldTabId = oldTab.attr('id');
                if (oldTabId) oldTabLink = $('.tab-link[href="#' + oldTabId + '"]');
                // Search by data-tab
                if (!oldTabLink || oldTabLink && oldTabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (oldTab.is($(this).attr('data-tab'))) oldTabLink = $(this);
                    });
                }
            }
        
            // Update links' classes
            if (tabLink && tabLink.length > 0) {
                tabLink.addClass('active');
                // Material Highlight
                if (app.params.material) {
                    var tabbar = tabLink.parents('.tabbar');
                    if (tabbar.length > 0) {
                        if (tabbar.find('.tab-link-highlight').length === 0) {
                            tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                        }
                        app.materialTabbarSetHighlight(tabbar, tabLink);
                    }
                }
            }
            if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');
        
            return true;
        };

        /*===============================================================================
        ************   Accordion   ************
        ===============================================================================*/
        app.accordionToggle = function (item) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('accordion-item-expanded')) app.accordionClose(item);
            else app.accordionOpen(item);
        };
        app.accordionOpen = function (item) {
            item = $(item);
            var list = item.parents('.accordion-list').eq(0);
            var content = item.children('.accordion-item-content');
            if (content.length === 0) content = item.find('.accordion-item-content');
            var expandedItem = list.length > 0 && item.parent().children('.accordion-item-expanded');
            if (expandedItem.length > 0) {
                app.accordionClose(expandedItem);
            }
            content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
                if (item.hasClass('accordion-item-expanded')) {
                    content.transition(0);
                    content.css('height', 'auto');
                    var clientLeft = content[0].clientLeft;
                    content.transition('');
                    item.trigger('opened');
                }
                else {
                    content.css('height', '');
                    item.trigger('closed');
                }
            });
            item.trigger('open');
            item.addClass('accordion-item-expanded');
        };
        app.accordionClose = function (item) {
            item = $(item);
            var content = item.children('.accordion-item-content');
            if (content.length === 0) content = item.find('.accordion-item-content');
            item.removeClass('accordion-item-expanded');
            content.transition(0);
            content.css('height', content[0].scrollHeight + 'px');
            // Relayout
            var clientLeft = content[0].clientLeft;
            // Close
            content.transition('');
            content.css('height', '').transitionEnd(function () {
                if (item.hasClass('accordion-item-expanded')) {
                    content.transition(0);
                    content.css('height', 'auto');
                    var clientLeft = content[0].clientLeft;
                    content.transition('');
                    item.trigger('opened');
                }
                else {
                    content.css('height', '');
                    item.trigger('closed');
                }
            });
            item.trigger('close');
        };

        /*===============================================================================
        ************   Fast Clicks   ************
        ************   Inspired by https://github.com/ftlabs/fastclick   ************
        ===============================================================================*/
        app.initFastClicks = function () {
            if (app.params.activeState) {
                $('html').addClass('watch-active-state');
            }
            if (app.device.ios && app.device.webView) {
                // Strange hack required for iOS 8 webview to work on inputs
                window.addEventListener('touchstart', function () {});
            }
        
            var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent, lastClickTime, isMoved, tapHoldFired, tapHoldTimeout;
            var activableElement, activeTimeout, needsFastClick, needsFastClickTimeOut;
            var rippleWave, rippleTarget, rippleTransform, rippleTimeout;
            function findActivableElement(el) {
                var target = $(el);
                var parents = target.parents(app.params.activeStateElements);
                var activable;
                if (target.is(app.params.activeStateElements)) {
                    activable = target;
                }
                if (parents.length > 0) {
                    activable = activable ? activable.add(parents) : parents;
                }
                return activable ? activable : target;
            }
            function isInsideScrollableView(el) {
                var pageContent = el.parents('.page-content, .panel');
        
                if (pageContent.length === 0) {
                    return false;
                }
        
                // This event handler covers the "tap to stop scrolling".
                if (pageContent.prop('scrollHandlerSet') !== 'yes') {
                    pageContent.on('scroll', function() {
                      clearTimeout(activeTimeout);
                      clearTimeout(rippleTimeout);
                    });
                    pageContent.prop('scrollHandlerSet', 'yes');
                }
        
                return true;
            }
            function addActive() {
                if (!activableElement) return;
                activableElement.addClass('active-state');
            }
            function removeActive(el) {
                if (!activableElement) return;
                activableElement.removeClass('active-state');
                activableElement = null;
            }
            function isFormElement(el) {
                var nodes = ('input select textarea label').split(' ');
                if (el.nodeName && nodes.indexOf(el.nodeName.toLowerCase()) >= 0) return true;
                return false;
            }
            function androidNeedsBlur(el) {
                var noBlur = ('button input textarea select').split(' ');
                if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
                    if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            function targetNeedsFastClick(el) {
                var $el = $(el);
                if (el.nodeName.toLowerCase() === 'input' && el.type === 'file') return false;
                if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) return false;
                return true;
            }
            function targetNeedsFocus(el) {
                if (document.activeElement === el) {
                    return false;
                }
                var tag = el.nodeName.toLowerCase();
                var skipInputs = ('button checkbox file image radio submit').split(' ');
                if (el.disabled || el.readOnly) return false;
                if (tag === 'textarea') return true;
                if (tag === 'select') {
                    if (app.device.android) return false;
                    else return true;
                }
                if (tag === 'input' && skipInputs.indexOf(el.type) < 0) return true;
            }
            function targetNeedsPrevent(el) {
                el = $(el);
                var prevent = true;
                if (el.is('label') || el.parents('label').length > 0) {
                    if (app.device.android) {
                        prevent = false;
                    }
                    else if (app.device.ios && el.is('input')) {
                        prevent = true;
                    }
                    else prevent = false;
                }
                return prevent;
            }
        
            // Mouse Handlers
            function handleMouseDown (e) {
                findActivableElement(e.target).addClass('active-state');
                if ('which' in e && e.which === 3) {
                    setTimeout(function () {
                        $('.active-state').removeClass('active-state');
                    }, 0);
                }
                if (app.params.material && app.params.materialRipple) {
                    touchStartX = e.pageX;
                    touchStartY = e.pageY;
                    rippleTouchStart(e.target, e.pageX, e.pageY);
                }
            }
            function handleMouseMove (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchMove();
                }
            }
            function handleMouseUp (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            // Material Touch Ripple Effect
            function findRippleElement(el) {
                var needsRipple = app.params.materialRippleElements;
                var $el = $(el);
                if ($el.is(needsRipple)) {
                    if ($el.hasClass('no-ripple')) {
                        return false;
                    }
                    return $el;
                }
                else if ($el.parents(needsRipple).length > 0) {
                    var rippleParent = $el.parents(needsRipple).eq(0);
                    if (rippleParent.hasClass('no-ripple')) {
                        return false;
                    }
                    return rippleParent;
                }
                else return false;
            }
            function createRipple(x, y, el) {
                var box = el[0].getBoundingClientRect();
                var center = {
                    x: x - box.left,
                    y: y - box.top
                },
                    height = box.height,
                    width = box.width;
                var diameter = Math.max(Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48);
        
                rippleWave = $(
                    '<div class="ripple-wave" style="width: ' + diameter + 'px; height: '+diameter+'px; margin-top:-'+diameter/2+'px; margin-left:-'+diameter/2+'px; left:'+center.x+'px; top:'+center.y+'px;"></div>'
                );
                el.prepend(rippleWave);
                var clientLeft = rippleWave[0].clientLeft;
                rippleTransform = 'translate3d('+(-center.x + width/2)+'px, '+(-center.y + height/2)+'px, 0) scale(1)';
                rippleWave.transform(rippleTransform);
            }
        
            function removeRipple() {
                if (!rippleWave) return;
                var toRemove = rippleWave;
        
                var removeTimeout = setTimeout(function () {
                    toRemove.remove();
                }, 400);
        
                rippleWave
                    .addClass('ripple-wave-fill')
                    .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
                    .transitionEnd(function () {
                        clearTimeout(removeTimeout);
        
                        var rippleWave = $(this)
                            .addClass('ripple-wave-out')
                            .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));
        
                        removeTimeout = setTimeout(function () {
                            rippleWave.remove();
                        }, 700);
        
                        setTimeout(function () {
                            rippleWave.transitionEnd(function(){
                                clearTimeout(removeTimeout);
                                $(this).remove();
                            });
                        }, 0);
                    });
        
                rippleWave = rippleTarget = undefined;
            }
        
            function rippleTouchStart (el, x, y) {
                rippleTarget = findRippleElement(el);
                if (!rippleTarget || rippleTarget.length === 0) {
                    rippleTarget = undefined;
                    return;
                }
                if (!isInsideScrollableView(rippleTarget)) {
                    createRipple(touchStartX, touchStartY, rippleTarget);
                }
                else {
                    rippleTimeout = setTimeout(function () {
                        createRipple(touchStartX, touchStartY, rippleTarget);
                    }, 80);
                }
            }
            function rippleTouchMove() {
                clearTimeout(rippleTimeout);
                removeRipple();
            }
            function rippleTouchEnd() {
                if (rippleWave) {
                    removeRipple();
                }
                else if (rippleTarget && !isMoved) {
                    clearTimeout(rippleTimeout);
                    createRipple(touchStartX, touchStartY, rippleTarget);
                    setTimeout(removeRipple, 0);
                }
                else {
                    removeRipple();
                }
            }
        
            // Send Click
            function sendClick(e) {
                var touch = e.changedTouches[0];
                var evt = document.createEvent('MouseEvents');
                var eventType = 'click';
                if (app.device.android && targetElement.nodeName.toLowerCase() === 'select') {
                    eventType = 'mousedown';
                }
                evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
                evt.forwardedTouchEvent = true;
                targetElement.dispatchEvent(evt);
            }
        
            // Touch Handlers
            function handleTouchStart(e) {
                isMoved = false;
                tapHoldFired = false;
                if (e.targetTouches.length > 1) {
                    if (activableElement) removeActive();
                    return true;
                }
                if (e.touches.length > 1 && activableElement) {
                    removeActive();
                }
                if (app.params.tapHold) {
                    if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
                    tapHoldTimeout = setTimeout(function () {
                        if (e && e.touches && e.touches.length > 1) return;
                        tapHoldFired = true;
                        e.preventDefault();
                        $(e.target).trigger('taphold');
                    }, app.params.tapHoldDelay);
                }
                if (needsFastClickTimeOut) clearTimeout(needsFastClickTimeOut);
                needsFastClick = targetNeedsFastClick(e.target);
        
                if (!needsFastClick) {
                    trackClick = false;
                    return true;
                }
                if (app.device.ios) {
                    var selection = window.getSelection();
                    if (selection.rangeCount && selection.focusNode !== document.body && (!selection.isCollapsed || document.activeElement === selection.focusNode)) {
                        activeSelection = true;
                        return true;
                    }
                    else {
                        activeSelection = false;
                    }
                }
                if (app.device.android)  {
                    if (androidNeedsBlur(e.target)) {
                        document.activeElement.blur();
                    }
                }
        
                trackClick = true;
                targetElement = e.target;
                touchStartTime = (new Date()).getTime();
                touchStartX = e.targetTouches[0].pageX;
                touchStartY = e.targetTouches[0].pageY;
        
                // Detect scroll parent
                if (app.device.ios) {
                    scrollParent = undefined;
                    $(targetElement).parents().each(function () {
                        var parent = this;
                        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
                            scrollParent = parent;
                            scrollParent.f7ScrollTop = scrollParent.scrollTop;
                        }
                    });
                }
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    e.preventDefault();
                }
        
                if (app.params.activeState) {
                    activableElement = findActivableElement(targetElement);
                    // If it's inside a scrollable view, we don't trigger active-state yet,
                    // because it can be a scroll instead. Based on the link:
                    // http://labnote.beedesk.com/click-scroll-and-pseudo-active-on-mobile-webk
                    if (!isInsideScrollableView(activableElement)) {
                        addActive();
                    } else {
                        activeTimeout = setTimeout(addActive, 80);
                    }
                }
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchStart(targetElement, touchStartX, touchStartY);
                }
            }
            function handleTouchMove(e) {
                if (!trackClick) return;
                var _isMoved = false;
                var distance = app.params.fastClicksDistanceThreshold;
                if (distance) {
                    var pageX = e.targetTouches[0].pageX;
                    var pageY = e.targetTouches[0].pageY;
                    if (Math.abs(pageX - touchStartX) > distance ||  Math.abs(pageY - touchStartY) > distance) {
                        _isMoved = true;
                    }
                }
                else {
                    _isMoved = true;
                }
                if (_isMoved) {
                    trackClick = false;
                    targetElement = null;
                    isMoved = true;
                    if (app.params.tapHold) {
                        clearTimeout(tapHoldTimeout);
                    }
        			if (app.params.activeState) {
        				clearTimeout(activeTimeout);
        				removeActive();
        			}
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchMove();
                    }
                }
            }
            function handleTouchEnd(e) {
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
        
                if (!trackClick) {
                    if (!activeSelection && needsFastClick) {
                        if (!(app.device.android && !e.cancelable)) {
                            e.preventDefault();
                        }
                    }
                    return true;
                }
        
                if (document.activeElement === e.target) {
                    if (app.params.activeState) removeActive();
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchEnd();
                    }
                    return true;
                }
        
                if (!activeSelection) {
                    e.preventDefault();
                }
        
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    setTimeout(removeActive, 0);
                    return true;
                }
        
                lastClickTime = e.timeStamp;
        
                trackClick = false;
        
                if (app.device.ios && scrollParent) {
                    if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
                        return false;
                    }
                }
        
                // Add active-state here because, in a very fast tap, the timeout didn't
                // have the chance to execute. Removing active-state in a timeout gives
                // the chance to the animation execute.
                if (app.params.activeState) {
                    addActive();
                    setTimeout(removeActive, 0);
                }
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
        
                // Trigger focus when required
                if (targetNeedsFocus(targetElement)) {
                    if (app.device.ios && app.device.webView) {
                        if ((event.timeStamp - touchStartTime) > 159) {
                            targetElement = null;
                            return false;
                        }
                        targetElement.focus();
                        return false;
                    }
                    else {
                        targetElement.focus();
                    }
                }
        
                // Blur active elements
                if (document.activeElement && targetElement !== document.activeElement && document.activeElement !== document.body && targetElement.nodeName.toLowerCase() !== 'label') {
                    document.activeElement.blur();
                }
        
                // Send click
                e.preventDefault();
                sendClick(e);
                return false;
            }
            function handleTouchCancel(e) {
                trackClick = false;
                targetElement = null;
        
                // Remove Active State
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
                if (app.params.activeState) {
                    removeActive();
                }
        
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            function handleClick(e) {
                var allowClick = false;
        
                if (trackClick) {
                    targetElement = null;
                    trackClick = false;
                    return true;
                }
                if (e.target.type === 'submit' && e.detail === 0) {
                    return true;
                }
                if (!targetElement) {
                    if (!isFormElement(e.target)) {
                        allowClick =  true;
                    }
                }
                if (!needsFastClick) {
                    allowClick = true;
                }
                if (document.activeElement === targetElement) {
                    allowClick =  true;
                }
                if (e.forwardedTouchEvent) {
                    allowClick =  true;
                }
                if (!e.cancelable) {
                    allowClick =  true;
                }
                if (app.params.tapHold && app.params.tapHoldPreventClicks && tapHoldFired) {
                    allowClick = false;
                }
                if (!allowClick) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    if (targetElement) {
                        if (targetNeedsPrevent(targetElement) || isMoved) {
                            e.preventDefault();
                        }
                    }
                    else {
                        e.preventDefault();
                    }
                    targetElement = null;
                }
                needsFastClickTimeOut = setTimeout(function () {
                    needsFastClick = false;
                }, (app.device.ios || app.device.androidChrome ? 100 : 400));
        
                if (app.params.tapHold) {
                    tapHoldTimeout = setTimeout(function () {
                        tapHoldFired = false;
                    }, (app.device.ios || app.device.androidChrome ? 100 : 400));
                }
        
                return allowClick;
            }
            if (app.support.touch) {
                document.addEventListener('click', handleClick, true);
        
                document.addEventListener('touchstart', handleTouchStart);
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
                document.addEventListener('touchcancel', handleTouchCancel);
            }
            else {
                if (app.params.activeState) {
                    document.addEventListener('mousedown', handleMouseDown);
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                }
            }
            if (app.params.material && app.params.materialRipple) {
                document.addEventListener('contextmenu', function (e) {
                    if (activableElement) removeActive();
                    rippleTouchEnd();
                });
            }
        
        };
        

        /*===============================================================================
        ************   Handle clicks and make them fast (on tap);   ************
        ===============================================================================*/
        app.initClickEvents = function () {
            function handleScrollTop(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var target = $(e.target);
                var isLink = clicked[0].nodeName.toLowerCase() === 'a' ||
                             clicked.parents('a').length > 0 ||
                             target[0].nodeName.toLowerCase() === 'a' ||
                             target.parents('a').length > 0;
        
                if (isLink) return;
                var pageContent, page;
                if (app.params.scrollTopOnNavbarClick && clicked.is('.navbar .center')) {
                    // Find active page
                    var navbar = clicked.parents('.navbar');
        
                    // Static Layout
                    pageContent = navbar.parents('.page-content');
        
                    if (pageContent.length === 0) {
                        // Fixed Layout
                        if (navbar.parents('.page').length > 0) {
                            pageContent = navbar.parents('.page').find('.page-content');
                        }
                        // Through Layout
                        if (pageContent.length === 0) {
                            if (navbar.nextAll('.pages').length > 0) {
                                pageContent = navbar.nextAll('.pages').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                            }
                        }
                    }
                }
                if (app.params.scrollTopOnStatusbarClick && clicked.is('.statusbar-overlay')) {
                    if ($('.popup.modal-in').length > 0) {
                        // Check for opened popup
                        pageContent = $('.popup.modal-in').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.panel.active').length > 0) {
                        // Check for opened panel
                        pageContent = $('.panel.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.views > .view.active').length > 0) {
                        // View in tab bar app layout
                        pageContent = $('.views > .view.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else {
                        // Usual case
                        pageContent = $('.views').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                }
        
                if (pageContent && pageContent.length > 0) {
                    // Check for tab
                    if (pageContent.hasClass('tab')) {
                        pageContent = pageContent.parent('.tabs').children('.page-content.active');
                    }
                    if (pageContent.length > 0) pageContent.scrollTop(0, 300);
                }
            }
            function handleClicks(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var url = clicked.attr('href');
                var isLink = clicked[0].nodeName.toLowerCase() === 'a';
        
                // Check if link is external
                if (isLink) {
                    if (clicked.is(app.params.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
                        if(url && clicked.attr('target') === '_system') {
                            e.preventDefault();
                            window.open(url, '_system');
                        }
                        return;
                    }
                }
        
                // Collect Clicked data- attributes
                var clickedData = clicked.dataset();
        
                // Smart Select
                if (clicked.hasClass('smart-select')) {
                    if (app.smartSelectOpen) app.smartSelectOpen(clicked);
                }
        
                // Open Panel
                if (clicked.hasClass('open-panel')) {
                    if ($('.panel').length === 1) {
                        if ($('.panel').hasClass('panel-left')) app.openPanel('left');
                        else app.openPanel('right');
                    }
                    else {
                        if (clickedData.panel === 'right') app.openPanel('right');
                        else app.openPanel('left');
                    }
                }
                // Close Panel
                if (clicked.hasClass('close-panel')) {
                    app.closePanel();
                }
        
                if (clicked.hasClass('panel-overlay') && app.params.panelsCloseByOutside) {
                    app.closePanel();
                }
                // Popover
                if (clicked.hasClass('open-popover')) {
                    var popover;
                    if (clickedData.popover) {
                        popover = clickedData.popover;
                    }
                    else popover = '.popover';
                    app.popover(popover, clicked);
                }
                if (clicked.hasClass('close-popover')) {
                    app.closeModal('.popover.modal-in');
                }
                // Popup
                var popup;
                if (clicked.hasClass('open-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup';
                    app.popup(popup);
                }
                if (clicked.hasClass('close-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup.modal-in';
                    app.closeModal(popup);
                }
                // Login Screen
                var loginScreen;
                if (clicked.hasClass('open-login-screen')) {
                    if (clickedData.loginScreen) {
                        loginScreen = clickedData.loginScreen;
                    }
                    else loginScreen = '.login-screen';
                    app.loginScreen(loginScreen);
                }
                if (clicked.hasClass('close-login-screen')) {
                    app.closeModal('.login-screen.modal-in');
                }
                // Close Modal
                if (clicked.hasClass('modal-overlay')) {
                    if ($('.modal.modal-in').length > 0 && app.params.modalCloseByOutside)
                        app.closeModal('.modal.modal-in');
                    if ($('.actions-modal.modal-in').length > 0 && app.params.actionsCloseByOutside)
                        app.closeModal('.actions-modal.modal-in');
        
                    if ($('.popover.modal-in').length > 0) app.closeModal('.popover.modal-in');
                }
                if (clicked.hasClass('popup-overlay')) {
                    if ($('.popup.modal-in').length > 0 && app.params.popupCloseByOutside)
                        app.closeModal('.popup.modal-in');
                }
                if (clicked.hasClass('picker-modal-overlay')) {
                    if ($('.picker-modal.modal-in').length > 0)
                        app.closeModal('.picker-modal.modal-in');
                }
        
                // Picker
                if (clicked.hasClass('close-picker')) {
                    var pickerToClose = $('.picker-modal.modal-in');
                    if (pickerToClose.length > 0) {
                        app.closeModal(pickerToClose);
                    }
                    else {
                        pickerToClose = $('.popover.modal-in .picker-modal');
                        if (pickerToClose.length > 0) {
                            app.closeModal(pickerToClose.parents('.popover'));
                        }
                    }
                }
                if (clicked.hasClass('open-picker')) {
                    var pickerToOpen;
                    if (clickedData.picker) {
                        pickerToOpen = clickedData.picker;
                    }
                    else pickerToOpen = '.picker-modal';
                    app.pickerModal(pickerToOpen, clicked);
                }
        
                // Tabs
                var isTabLink;
                if (clicked.hasClass('tab-link')) {
                    isTabLink = true;
                    app.showTab(clickedData.tab || clicked.attr('href'), clicked);
                }
                // Swipeout Close
                if (clicked.hasClass('swipeout-close')) {
                    app.swipeoutClose(clicked.parents('.swipeout-opened'));
                }
                // Swipeout Delete
                if (clicked.hasClass('swipeout-delete')) {
                    if (clickedData.confirm) {
                        var text = clickedData.confirm;
                        var title = clickedData.confirmTitle;
                        if (title) {
                            app.confirm(text, title, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                        else {
                            app.confirm(text, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                    }
                    else {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    }
        
                }
                // Sortable
                if (clicked.hasClass('toggle-sortable')) {
                    app.sortableToggle(clickedData.sortable);
                }
                if (clicked.hasClass('open-sortable')) {
                    app.sortableOpen(clickedData.sortable);
                }
                if (clicked.hasClass('close-sortable')) {
                    app.sortableClose(clickedData.sortable);
                }
                // Accordion
                if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
                    var accordionItem = clicked.parent('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('li');
                    app.accordionToggle(accordionItem);
                }
        
                // Speed Dial
                if (app.params.material) {
                    if (clicked.hasClass('floating-button') && clicked.parent().hasClass('speed-dial')) {
                        clicked.parent().toggleClass('speed-dial-opened');
                    }
                    if (clicked.hasClass('close-speed-dial')) {
                        $('.speed-dial-opened').removeClass('speed-dial-opened');
                    }
                }
        
                // Load Page
                if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks) || !isLink || !app.params.router) {
                    return;
                }
                if (isLink) {
                    e.preventDefault();
                }
        
                var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
                var template = clickedData.template;
                if (validUrl || clicked.hasClass('back') || template) {
                    var view;
                    if (clickedData.view) {
                        view = $(clickedData.view)[0].f7View;
                    }
                    else {
                        view = clicked.parents('.' + app.params.viewClass)[0] && clicked.parents('.' + app.params.viewClass)[0].f7View;
                        if (view && view.params.linksView) {
                            if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
                            else if (view.params.linksView instanceof View) view = view.params.linksView;
                        }
                    }
                    if (!view) {
                        if (app.mainView) view = app.mainView;
                    }
                    if (!view) return;
        
                    var pageName;
                    if (!template) {
                        if (url.indexOf('#') === 0 && url !== '#')  {
                            if (view.params.domCache) {
                                pageName = url.split('#')[1];
                            }
                            else return;
                        }
                        if (url === '#' && !clicked.hasClass('back')) return;
                    }
                    else {
                        url = undefined;
                    }
        
                    var animatePages;
                    if (typeof clickedData.animatePages !== 'undefined') {
                        animatePages = clickedData.animatePages;
                    }
                    else {
                        if (clicked.hasClass('with-animation')) animatePages = true;
                        if (clicked.hasClass('no-animation')) animatePages = false;
                    }
        
                    var options = {
                        animatePages: animatePages,
                        ignoreCache: clickedData.ignoreCache,
                        force: clickedData.force,
                        reload: clickedData.reload,
                        reloadPrevious: clickedData.reloadPrevious,
                        pageName: pageName,
                        pushState: clickedData.pushState,
                        url: url
                    };
        
                    if (app.params.template7Pages) {
                        options.contextName = clickedData.contextName;
                        var context = clickedData.context;
                        if (context) {
                            options.context = JSON.parse(context);
                        }
                    }
                    if (template && template in t7.templates) {
                        options.template = t7.templates[template];
                    }
        
                    if (clicked.hasClass('back')) view.router.back(options);
                    else view.router.load(options);
                }
            }
            $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .swipeout-close, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle, .close-picker, .picker-modal-overlay', handleClicks);
            if (app.params.scrollTopOnNavbarClick || app.params.scrollTopOnStatusbarClick) {
                $(document).on('click', '.statusbar-overlay, .navbar .center', handleScrollTop);
            }
        
            // Prevent scrolling on overlays
            function preventScrolling(e) {
                e.preventDefault();
            }
            if (app.support.touch && !app.device.android) {
                $(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-overlay, .modal-overlay, .preloader-indicator-overlay, .popup-overlay, .searchbar-overlay', preventScrolling);
            }
        };
        

        /*======================================================
        ************   App Resize Actions   ************
        ======================================================*/
        // Prevent iPad horizontal body scrolling when soft keyboard is opened
        function _fixIpadBodyScrolLeft() {
            if (app.device.ipad) {
                document.body.scrollLeft = 0;
                setTimeout(function () {
                    document.body.scrollLeft = 0;
                }, 0);
            }
        }
        app.initResize = function () {
            $(window).on('resize', app.resize);
            $(window).on('orientationchange', app.orientationchange);
        };
        app.resize = function () {
            if (app.sizeNavbars) app.sizeNavbars();
            _fixIpadBodyScrolLeft();
            
        };
        app.orientationchange = function () {
            if (app.device && app.device.minimalUi) {
                if (window.orientation === 90 || window.orientation === -90) document.body.scrollTop = 0;
            }
            _fixIpadBodyScrolLeft();
        };
        

        /*===============================================================================
        ************   Store and parse forms data   ************
        ===============================================================================*/
        app.formsData = {};
        app.formStoreData = function (formId, formJSON) {
            // Store form data in app.formsData
            app.formsData[formId] = formJSON;
        
            // Store form data in local storage also
            app.ls['f7form-' + formId] = JSON.stringify(formJSON);
        };
        app.formDeleteData = function (formId) {
            // Delete form data from app.formsData
            if (app.formsData[formId]) {
                app.formsData[formId] = '';
                delete app.formsData[formId];
            }
        
            // Delete form data from local storage also
            if (app.ls['f7form-' + formId]) {
                app.ls['f7form-' + formId] = '';
                app.ls.removeItem('f7form-' + formId);
            }
        };
        app.formGetData = function (formId) {
            // First of all check in local storage
            if (app.ls['f7form-' + formId]) {
                return JSON.parse(app.ls['f7form-' + formId]);
            }
            // Try to get it from formsData obj
            else if (app.formsData[formId]) return app.formsData[formId];
        };
        app.formToJSON = function (form) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Form data
            var formData = {};
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.prop('multiple')) {
                    skipNames.push(name);
                    formData[name] = [];
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (this.selected) formData[name].push(this.value);
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            formData[name] = [];
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name].push(this.value);
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name] = this.value;
                            });
                            break;
                        default :
                            formData[name] = input.val();
                            break;
                    }
                }
                    
            });
            form.trigger('formToJSON', {formData: formData});
        
            return formData;
        };
        app.formFromJSON = function (form, formData) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
        
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (!formData[name]) return;
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.prop('multiple')) {
                    skipNames.push(name);
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (formData[name].indexOf(this.value) >= 0) this.selected = true;
                        else this.selected = false;
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name].indexOf(this.value) >= 0) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name] === this.value) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        default :
                            input.val(formData[name]);
                            break;
                    }
                }
                    
            });
            form.trigger('formFromJSON', {formData: formData});
        };
        app.initFormsStorage = function (pageContainer) {
            pageContainer = $(pageContainer);
            var forms = pageContainer.find('form.store-data');
            if (forms.length === 0) return;
            
            // Parse forms data and fill form if there is such data
            forms.each(function () {
                var id = this.getAttribute('id');
                if (!id) return;
                var formData = app.formGetData(id);
                if (formData) app.formFromJSON(this, formData);
            });
            // Update forms data on inputs change
            function storeForm() {
                /*jshint validthis:true */
                var form = $(this);
                var formId = form[0].id;
                if (!formId) return;
                var formJSON = app.formToJSON(form);
                if (!formJSON) return;
                app.formStoreData(formId, formJSON);
                form.trigger('store', {data: formJSON});
            }
            forms.on('change submit', storeForm);
        
            // Detach Listeners
            function pageBeforeRemove() {
                forms.off('change submit', storeForm);
                pageContainer.off('pageBeforeRemove', pageBeforeRemove);
            }
            pageContainer.on('pageBeforeRemove', pageBeforeRemove);
        };

        /*===============================================================================
        ************   Ajax submit for forms   ************
        ===============================================================================*/
        // Ajax submit on forms
        $(document).on('submit change', 'form.ajax-submit, form.ajax-submit-onchange', function (e) {
            var form = $(this);
            if (e.type === 'change' && !form.hasClass('ajax-submit-onchange')) return;
            if (e.type === 'submit') e.preventDefault();
            
            var method = form.attr('method') || 'GET';
            var contentType = form.prop('enctype') || form.attr('enctype');
        
            var url = form.attr('action');
            if (!url) return;
        
            var data;
            if (method === 'POST') data = new FormData(form[0]);
            else data = $.serializeObject(app.formToJSON(form[0]));
        
            var xhr = $.ajax({
                method: method,
                url: url,
                contentType: contentType,
                data: data,
                beforeSend: function (xhr) {
                    form.trigger('beforeSubmit', {data:data, xhr: xhr});
                },
                error: function (xhr) {
                    form.trigger('submitError', {data:data, xhr: xhr});  
                },
                success: function (data) {
                    form.trigger('submitted', {data: data, xhr: xhr});
                }
            });
        });
        
        

        /*===============================================================================
        ************   Resizable textarea   ************
        ===============================================================================*/
        app.resizeTextarea = function (textarea) {
            textarea = $(textarea);
            if (!textarea.hasClass('resizable')) {
                return;
            }
            textarea.css({'height': ''});
            var height = textarea[0].offsetHeight;
            var diff = height - textarea[0].clientHeight;
            var scrollHeight = textarea[0].scrollHeight;
        
            if (scrollHeight + diff > height) {
                var newAreaHeight = scrollHeight + diff;
                textarea.css('height', newAreaHeight + 'px');
            }
        };
        app.resizableTextarea = function (textarea) {
            textarea = $(textarea);
            if (textarea.length === 0) return;
            var textareaTimeout;
            function handleTextarea() {
                clearTimeout(textareaTimeout);
                textareaTimeout = setTimeout(function () {
                    app.resizeTextarea(textarea);
                }, 0);
            }
            textarea[0].f7DestroyResizableTextarea = function () {
                textarea.off('change keydown keypress keyup paste cut', handleTextarea);
            };
            return textarea.on('change keydown keypress keyup paste cut', handleTextarea);
        };
        app.destroyResizableTextarea = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length > 0 && pageContainer.is('textarea') && pageContainer[0].f7DestroyResizableTextarea) {
                pageContainer[0].f7DestroyResizableTextarea();
            }
            else if (pageContainer.length > 0) {
                pageContainer.find('textarea.resiable').each(function () {
                    var textarea = this;
                    if (textarea.f7DestroyResizableTextarea) {
                        textarea.f7DestroyResizableTextarea ();
                    }
                });
            }
        };
        app.initPageResizableTextarea = function (pageContainer) {
            pageContainer = $(pageContainer);
            var textareas = pageContainer.find('textarea.resizable');
            textareas.each(function () {
                app.resizableTextarea(this);
            });
        };

        /*======================================================
        ************   Material Text Inputs   ************
        ======================================================*/
        app.initPageMaterialInputs = function (pageContainer) {
            pageContainer = $(pageContainer);
            var textareas = pageContainer.find('textarea.resizable');
            pageContainer.find('.item-input').each(function () {
                var itemInput = $(this);
                var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
                itemInput.find('input, select, textarea').each(function () {
                    var input = $(this);
                    if (notInputs.indexOf(input.attr('type')) < 0) {
                        itemInput.addClass('item-input-field');
                        if (input.val().trim() !== '') {
                            input.parents('.item-input, .input-field').add(input.parents('.item-inner')).addClass('not-empty-state');
                        }
                    }
                });
                if (itemInput.parents('.input-item, .inputs-list').length > 0) return;
                itemInput.parents('.list-block').eq(0).addClass('inputs-list');
            });
        };
        /*======================================================
        ************   Material Focus Inputs   ************
        ======================================================*/
        app.initMaterialWatchInputs = function () {
            var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
            function addFocusState(e) {
                /*jshint validthis:true*/
                var i = $(this);
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                els.addClass('focus-state');
            }
            function removeFocusState(e) {
                /*jshint validthis:true*/
                var i = $(this), value = i.val();
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                els.removeClass('focus-state');
                if (value && value.trim() !== '') {
                    els.addClass('not-empty-state');
                }
                else {
                    els.removeClass('not-empty-state');
                }
            }
            function watchChangeState(e) {
                /*jshint validthis:true*/
                var i = $(this), value = i.val();
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                if (value && value.trim() !== '') {
                    els.addClass('not-empty-state');
                }
                else {
                    els.removeClass('not-empty-state');
                }
            }
            $(document).on('change', '.item-input input, .item-input select, .item-input textarea, input, textarea, select', watchChangeState, true);
            $(document).on('focus', '.item-input input, .item-input select, .item-input textarea, input, textarea, select', addFocusState, true);
            $(document).on('blur', '.item-input input, .item-input select, .item-input textarea, input, textarea, select', removeFocusState, true);
        };

        /*======================================================
        ************   Handle Browser's History   ************
        ======================================================*/
        app.pushStateQueue = [];
        app.pushStateClearQueue = function () {
            if (app.pushStateQueue.length === 0) return;
            var queue = app.pushStateQueue.pop();
            var animatePages;
            if (app.params.pushStateNoAnimation === true) animatePages = false;
            if (queue.action === 'back') {
                app.router.back(queue.view, {animatePages: animatePages});
            }
            if (queue.action === 'loadPage') {
                app.router.load(queue.view, {url: queue.stateUrl, animatePages: animatePages, pushState: false});
            }
            if (queue.action === 'loadContent') {
                app.router.load(queue.view, {content: queue.stateContent, animatePages: animatePages, pushState: false});
            }
            if (queue.action === 'loadPageName') {
                app.router.load(queue.view, {pageName: queue.statePageName, url: queue.stateUrl, animatePages: animatePages, pushState: false});
            }
        };
        
        app.initPushState = function () {
            var blockPopstate = true;
            $(window).on('load', function () {
                setTimeout(function () {
                    blockPopstate = false;
                }, 0);
            });
        
            if (document.readyState && document.readyState === 'complete') {
                blockPopstate = false;
            }
        
            function handlePopState(e) {
                if (blockPopstate) return;
                var mainView = app.mainView;
                if (!mainView) return;
                var state = e.state;
                if (!state) {
                    state = {
                        viewIndex: app.views.indexOf(mainView),
                        url : mainView.history[0]
                    };
                }
                if (state.viewIndex < 0) return;
                var view = app.views[state.viewIndex];
                var stateUrl = state && state.url || undefined;
                var stateContent = state && state.content || undefined;
                var statePageName = state && state.pageName || undefined;
                var animatePages;
        
                if (app.params.pushStateNoAnimation === true) animatePages = false;
        
                if (stateUrl !== view.url) {
                    if (view.history.indexOf(stateUrl) >= 0) {
                        // Go Back
                        if (view.allowPageChange) {
                            app.router.back(view, {url:undefined, animatePages: animatePages, pushState: false, preloadOnly:false});
                        }
                        else {
                            app.pushStateQueue.push({
                                action: 'back',
                                view: view
                            });
                        }
                    }
                    else if (stateContent) {
                        // Load Page
                        if (view.allowPageChange) {
                            app.router.load(view, {content:stateContent, animatePages: animatePages, pushState: false});
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadContent',
                                stateContent: stateContent,
                                view: view
                            });
                        }
        
                    }
                    else if (statePageName) {
                        // Load Page by page name with Dom Cache
                        if (view.allowPageChange) {
                            app.router.load(view, {pageName:statePageName, url: stateUrl, animatePages: animatePages, pushState: false});
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadPageName',
                                statePageName: statePageName,
                                view: view
                            });
                        }
                    }
                    else  {
                        // Load Page
                        if (view.allowPageChange) {
                            app.router.load(view, {url:stateUrl, animatePages: animatePages, pushState: false});
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadPage',
                                stateUrl: stateUrl,
                                view: view
                            });
                        }
                    }
                }
            }
            $(window).on('popstate', handlePopState);
        };
        

        /*===========================
        Framework7 Swiper Additions
        ===========================*/
        app.swiper = function (container, params) {
            return new Swiper(container, params);
        };
        app.initPageSwiper = function (pageContainer) {
            pageContainer = $(pageContainer);
            var swipers = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
            if (swipers.length === 0) return;
            function destroySwiperOnRemove(slider) {
                function destroySwiper() {
                    slider.destroy();
                    pageContainer.off('pageBeforeRemove', destroySwiper);
                }
                pageContainer.on('pageBeforeRemove', destroySwiper);
            }
            swipers.each(function () {
                var swiper = $(this);
                if (swiper.hasClass('tabs-swipeable-wrap')) {
                    swiper.addClass('swiper-container').children('.tabs').addClass('swiper-wrapper').children('.tab').addClass('swiper-slide');
                }
                var params;
                if (swiper.data('swiper')) {
                    params = JSON.parse(swiper.data('swiper'));
                }
                else {
                    params = swiper.dataset();
                }
                if (swiper.hasClass('tabs-swipeable-wrap')) {
                    params.onSlideChangeStart = function (s) {
                        app.showTab(s.slides.eq(s.activeIndex));
                    };
                }
                var _slider = app.swiper(swiper[0], params);
                destroySwiperOnRemove(_slider);
            });
        };
        app.reinitPageSwiper = function (pageContainer) {
            pageContainer = $(pageContainer);
            var sliders = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
            if (sliders.length === 0) return;
            for (var i = 0; i < sliders.length; i++) {
                var sliderInstance = sliders[0].swiper;
                if (sliderInstance) {
                    sliderInstance.update(true);
                }
            }
        };
        

        /*======================================================
        ************   Photo Browser   ************
        ======================================================*/
        var PhotoBrowser = function (params) {
            var pb = this, i;
        
            var defaults = {
                photos : [],
                initialSlide: 0,
                spaceBetween: 20,
                speed: 300,
                zoom: true,
                maxZoom: 3,
                minZoom: 1,
                exposition: true,
                expositionHideCaptions: false,
                type: 'standalone',
                navbar: true,
                toolbar: true,
                theme: 'light',
                swipeToClose: true,
                backLinkText: 'Close',
                ofText: 'of',
                loop: false,
                lazyLoading: false,
                lazyLoadingInPrevNext: false,
                lazyLoadingOnTransitionStart: false,
                material: app.params.material,
                materialPreloaderSvg: app.params.materialPreloaderSvg,
                materialPreloaderHtml: app.params.materialPreloaderHtml,
                /*
                Callbacks:
                onLazyImageLoad(pb, slide, img)
                onLazyImageReady(pb, slide, img)
                onOpen(pb)
                onClose(pb)
                onTransitionStart(swiper)
                onTransitionEnd(swiper)
                onSlideChangeStart(swiper)
                onSlideChangeEnd(swiper)
                onTap(swiper, e)
                onClick(swiper, e)
                onDoubleTap(swiper, e)
                onSwipeToClose(pb)
                */
            };
            
            params = params || {};
            if (!params.backLinkText && app.params.material) defaults.backLinkText = '';
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
        
            pb.params = params;
            pb.params.iconsColorClass = pb.params.iconsColor ? 'color-' + pb.params.iconsColor : (pb.params.theme === 'dark' ? 'color-white' : '');
            pb.params.preloaderColorClass = pb.params.theme === 'dark' ? 'preloader-white' : '';
        
            // Templates
            var photoTemplate = pb.params.photoTemplate || 
                '<div class="photo-browser-slide swiper-slide">' +
                    '<span class="photo-browser-zoom-container">' +
                        '<img src="{{js "this.url || this"}}">' +
                    '</span>' +
                '</div>';
            var photoLazyTemplate = pb.params.lazyPhotoTemplate ||
                '<div class="photo-browser-slide photo-browser-slide-lazy swiper-slide">' +
                    '<div class="preloader {{@root.preloaderColorClass}}">{{#if @root.material}}{{@root.materialPreloaderHtml}}{{/if}}</div>' +
                    '<span class="photo-browser-zoom-container">' +
                        '<img data-src="{{js "this.url || this"}}" class="swiper-lazy">' +
                    '</span>' +
                '</div>';
            var objectTemplate = pb.params.objectTemplate ||
                '<div class="photo-browser-slide photo-browser-object-slide swiper-slide">{{js "this.html || this"}}</div>';
            var captionTemplate = pb.params.captionTemplate ||
                '<div class="photo-browser-caption" data-caption-index="{{@index}}">' +
                    '{{caption}}' +
                '</div>';
            var navbarTemplate = pb.params.navbarTemplate ||
                '<div class="navbar">' +
                    '<div class="navbar-inner">' +
                        '<div class="left sliding">' +
                            '<a href="#" class="link close-popup photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">' +
                                '<i class="icon icon-back {{iconsColorClass}}"></i>' +
                                '{{#if backLinkText}}<span>{{backLinkText}}</span>{{/if}}' +
                            '</a>' +
                        '</div>' +
                        '<div class="center sliding">' +
                            '<span class="photo-browser-current"></span> ' +
                            '<span class="photo-browser-of">{{ofText}}</span> ' +
                            '<span class="photo-browser-total"></span>' +
                        '</div>' +
                        '<div class="right"></div>' +
                    '</div>' +
                '</div>';
            var toolbarTemplate = pb.params.toolbarTemplate ||
                '<div class="toolbar tabbar">' +
                    '<div class="toolbar-inner">' +
                        '<a href="#" class="link photo-browser-prev">' +
                            '<i class="icon icon-prev {{iconsColorClass}}"></i>' +
                        '</a>' +
                        '<a href="#" class="link photo-browser-next">' +
                            '<i class="icon icon-next {{iconsColorClass}}"></i>' +
                        '</a>' +
                    '</div>' +
                '</div>';
        
            var htmlTemplate = t7.compile('<div class="photo-browser photo-browser-{{theme}}">' +
                    '<div class="view navbar-fixed toolbar-fixed">' +
                        '{{#unless material}}{{#if navbar}}' +
                        navbarTemplate +
                        '{{/if}}{{/unless}}' +
                        '<div class="page no-toolbar {{#unless navbar}}no-navbar{{/unless}} toolbar-fixed navbar-fixed" data-page="photo-browser-slides">' +
                            '{{#if material}}{{#if navbar}}' +
                            navbarTemplate +
                            '{{/if}}{{/if}}' +
                            '{{#if toolbar}}' +
                            toolbarTemplate +
                            '{{/if}}' +
                            '<div class="photo-browser-captions photo-browser-captions-{{js "this.captionsTheme || this.theme"}}">' +
                                '{{#each photos}}{{#if caption}}' +
                                captionTemplate +
                                '{{/if}}{{/each}}' +
                            '</div>' +
                            '<div class="photo-browser-swiper-container swiper-container">' +
                                '<div class="photo-browser-swiper-wrapper swiper-wrapper">' +
                                    '{{#each photos}}' +
                                    '{{#js_compare "this.html || ((typeof this === \'string\' || this instanceof String) && (this.indexOf(\'<\') >= 0 || this.indexOf(\'>\') >= 0))"}}' +
                                        objectTemplate +
                                    '{{else}}' +
                                        '{{#if @root.lazyLoading}}' +
                                        photoLazyTemplate +
                                        '{{else}}' +
                                        photoTemplate +
                                        '{{/if}}' +
                                    '{{/js_compare}}' +
                                    '{{/each}}' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>')(pb.params);
        
            pb.activeIndex = pb.params.initialSlide;
            pb.openIndex = pb.activeIndex;
            pb.opened = false;
        
            pb.open = function (index) {
                if (typeof index === 'undefined') index = pb.activeIndex;
                index = parseInt(index, 10);
                if (pb.opened && pb.swiper) {
                    pb.swiper.slideTo(index);
                    return;
                }
                pb.opened = true;
                pb.openIndex = index;
                if (pb.params.type === 'standalone') {
                    $('body').append(htmlTemplate);
                }
                if (pb.params.type === 'popup') {
                    pb.popup = app.popup('<div class="popup photo-browser-popup">' + htmlTemplate + '</div>');
                    $(pb.popup).on('closed', pb.onPopupClose);
                }
                if (pb.params.type === 'page') {
                    $(document).on('pageBeforeInit', pb.onPageBeforeInit);
                    $(document).on('pageBeforeRemove', pb.onPageBeforeRemove);
                    if (!pb.params.view) pb.params.view = app.mainView;
                    pb.params.view.loadContent(htmlTemplate);
                    return;
                }
                pb.layout(pb.openIndex);
                if (pb.params.onOpen) {
                    pb.params.onOpen(pb);
                }
        
            };
            pb.close = function () {
                pb.opened = false;
                if (!pb.swiperContainer || pb.swiperContainer.length === 0) {
                    return;
                }
                if (pb.params.onClose) {
                    pb.params.onClose(pb);
                }
                // Detach events
                pb.attachEvents(true);
                // Delete from DOM
                if (pb.params.type === 'standalone') {
                    pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').animationEnd(function () {
                        pb.container.remove();
                    });
                }
                // Destroy slider
                pb.swiper.destroy();
                // Delete references
                pb.swiper = pb.swiperContainer = pb.swiperWrapper = pb.slides = gestureSlide = gestureImg = gestureImgWrap = undefined;
            };
        
            pb.onPopupClose = function (e) {
                pb.close();
                $(pb.popup).off('pageBeforeInit', pb.onPopupClose);
            };
            pb.onPageBeforeInit = function (e) {
                if (e.detail.page.name === 'photo-browser-slides') {
                    pb.layout(pb.openIndex);
                }
                $(document).off('pageBeforeInit', pb.onPageBeforeInit);
            };
            pb.onPageBeforeRemove = function (e) {
                if (e.detail.page.name === 'photo-browser-slides') {
                    pb.close();
                }
                $(document).off('pageBeforeRemove', pb.onPageBeforeRemove);
            };
        
            pb.onSliderTransitionStart = function (swiper) {
                pb.activeIndex = swiper.activeIndex;
        
                var current = swiper.activeIndex + 1;
                var total = swiper.slides.length;
                if (pb.params.loop) {
                    total = total - 2;
                    current = current - swiper.loopedSlides;
                    if (current < 1) current = total + current;
                    if (current > total) current = current - total;
                }
                pb.container.find('.photo-browser-current').text(current);
                pb.container.find('.photo-browser-total').text(total);
        
                $('.photo-browser-prev, .photo-browser-next').removeClass('photo-browser-link-inactive');
                
                if (swiper.isBeginning && !pb.params.loop) {
                    $('.photo-browser-prev').addClass('photo-browser-link-inactive');
                }
                if (swiper.isEnd && !pb.params.loop) {
                    $('.photo-browser-next').addClass('photo-browser-link-inactive');
                }
        
                // Update captions
                if (pb.captions.length > 0) {
                    pb.captionsContainer.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
                    var captionIndex = pb.params.loop ? swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index') : pb.activeIndex;
                    pb.captionsContainer.find('[data-caption-index="' + captionIndex + '"]').addClass('photo-browser-caption-active');
                }
        
        
                // Stop Video
                var previousSlideVideo = swiper.slides.eq(swiper.previousIndex).find('video');
                if (previousSlideVideo.length > 0) {
                    if ('pause' in previousSlideVideo[0]) previousSlideVideo[0].pause();
                }
                // Callback
                if (pb.params.onTransitionStart) pb.params.onTransitionStart(swiper);
            };
            pb.onSliderTransitionEnd = function (swiper) {
                // Reset zoom
                if (pb.params.zoom && gestureSlide && swiper.previousIndex !== swiper.activeIndex) {
                    gestureImg.transform('translate3d(0,0,0) scale(1)');
                    gestureImgWrap.transform('translate3d(0,0,0)');
                    gestureSlide = gestureImg = gestureImgWrap = undefined;
                    scale = currentScale = 1;
                }
                if (pb.params.onTransitionEnd) pb.params.onTransitionEnd(swiper);
            };
            
            pb.layout = function (index) {
                if (pb.params.type === 'page') {
                    pb.container = $('.photo-browser-swiper-container').parents('.view');
                }
                else {
                    pb.container = $('.photo-browser');
                }
                if (pb.params.type === 'standalone') {
                    pb.container.addClass('photo-browser-in');
                    app.sizeNavbars(pb.container);
                }
                pb.swiperContainer = pb.container.find('.photo-browser-swiper-container');
                pb.swiperWrapper = pb.container.find('.photo-browser-swiper-wrapper');
                pb.slides = pb.container.find('.photo-browser-slide');
                pb.captionsContainer = pb.container.find('.photo-browser-captions');
                pb.captions = pb.container.find('.photo-browser-caption');
                
                var sliderSettings = {
                    nextButton: pb.params.nextButton || '.photo-browser-next',
                    prevButton: pb.params.prevButton || '.photo-browser-prev',
                    indexButton: pb.params.indexButton,
                    initialSlide: index,
                    spaceBetween: pb.params.spaceBetween,
                    speed: pb.params.speed,
                    loop: pb.params.loop,
                    lazyLoading: pb.params.lazyLoading,
                    lazyLoadingInPrevNext: pb.params.lazyLoadingInPrevNext,
                    lazyLoadingOnTransitionStart: pb.params.lazyLoadingOnTransitionStart,
                    preloadImages: pb.params.lazyLoading ? false : true,
                    onTap: function (swiper, e) {
                        if (pb.params.onTap) pb.params.onTap(swiper, e);
                    },
                    onClick: function (swiper, e) {
                        if (pb.params.exposition) pb.toggleExposition();
                        if (pb.params.onClick) pb.params.onClick(swiper, e);
                    },
                    onDoubleTap: function (swiper, e) {
                        pb.toggleZoom(e);
                        if (pb.params.onDoubleTap) pb.params.onDoubleTap(swiper, e);
                    },
                    onTransitionStart: function (swiper) {
                        pb.onSliderTransitionStart(swiper);
                    },
                    onTransitionEnd: function (swiper) {
                        pb.onSliderTransitionEnd(swiper);  
                    },
                    onSlideChangeStart: pb.params.onSlideChangeStart,
                    onSlideChangeEnd: pb.params.onSlideChangeEnd,
                    onLazyImageLoad: function (swiper, slide, img) {
                        if (pb.params.onLazyImageLoad) pb.params.onLazyImageLoad(pb, slide, img);
                    },
                    onLazyImageReady: function (swiper, slide, img) {
                        $(slide).removeClass('photo-browser-slide-lazy');
                        if (pb.params.onLazyImageReady) pb.params.onLazyImageReady(pb, slide, img);
                    }
                };
        
                if (pb.params.swipeToClose && pb.params.type !== 'page') {
                    sliderSettings.onTouchStart = pb.swipeCloseTouchStart;
                    sliderSettings.onTouchMoveOpposite = pb.swipeCloseTouchMove;
                    sliderSettings.onTouchEnd = pb.swipeCloseTouchEnd;
                }
        
                pb.swiper = app.swiper(pb.swiperContainer, sliderSettings);
                if (index === 0) {
                    pb.onSliderTransitionStart(pb.swiper);
                }
                pb.attachEvents();
            };
            pb.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                // Slide between photos
        
                if (pb.params.zoom) {
                    var target = pb.params.loop ? pb.swiper.slides : pb.slides;
                    // Scale image
                    target[action]('gesturestart', pb.onSlideGestureStart);
                    target[action]('gesturechange', pb.onSlideGestureChange);
                    target[action]('gestureend', pb.onSlideGestureEnd);
        
                    // Move image
                    target[action](app.touchEvents.start, pb.onSlideTouchStart);
                    target[action](app.touchEvents.move, pb.onSlideTouchMove);
                    target[action](app.touchEvents.end, pb.onSlideTouchEnd);
                }
                pb.container.find('.photo-browser-close-link')[action]('click', pb.close);
            };
        
            var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, animating = false, currentTranslate;
            var allowClick = true;
        
            // Expose
            pb.exposed = false;
            pb.toggleExposition = function () {
                if (pb.container) pb.container.toggleClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.toggleClass('photo-browser-captions-exposed');
                pb.exposed = !pb.exposed;
            };
            pb.enableExposition = function () {
                if (pb.container) pb.container.addClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.addClass('photo-browser-captions-exposed');
                pb.exposed = true;
            };
            pb.disableExposition = function () {
                if (pb.container) pb.container.removeClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.removeClass('photo-browser-captions-exposed');
                pb.exposed = false;
            };
            
            // Gestures
            var gestureSlide, gestureImg, gestureImgWrap, scale = 1, currentScale = 1, isScaling = false;
            pb.onSlideGestureStart = function (e) {
                if (!gestureSlide || !gestureSlide.length) {
                    gestureSlide = $(this);
                    if (gestureSlide.length === 0) gestureSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
                    gestureImg = gestureSlide.find('img, svg, canvas');
                    gestureImgWrap = gestureImg.parent('.photo-browser-zoom-container');
                    if (gestureImgWrap.length === 0) {
                        gestureImg = undefined;
                        return;
                    }
                }
                gestureImg.transition(0);
                isScaling = true;
            };
            pb.onSlideGestureChange = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                scale = e.scale * currentScale;
                if (scale > pb.params.maxZoom) {
                    scale = pb.params.maxZoom - 1 + Math.pow((scale - pb.params.maxZoom + 1), 0.5);
                }
                if (scale < pb.params.minZoom) {
                    scale =  pb.params.minZoom + 1 - Math.pow((pb.params.minZoom - scale + 1), 0.5);
                }
                gestureImg.transform('translate3d(0,0,0) scale(' + scale + ')');
            };
            pb.onSlideGestureEnd = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                scale = Math.max(Math.min(scale, pb.params.maxZoom), pb.params.minZoom);
                gestureImg.transition(pb.params.speed).transform('translate3d(0,0,0) scale(' + scale + ')');
                currentScale = scale;
                isScaling = false;
                if (scale === 1) gestureSlide = undefined;
            };
            pb.toggleZoom = function (e) {
                if (!gestureSlide) {
                    gestureSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
                    gestureImg = gestureSlide.find('img, svg, canvas');
                    gestureImgWrap = gestureImg.parent('.photo-browser-zoom-container');
                }
                if (!gestureImg || gestureImg.length === 0) return;
                
                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY;
        
                if (typeof imageTouchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                }
                else {
                    touchX = imageTouchesStart.x;
                    touchY = imageTouchesStart.y;
                }
                
                if (scale && scale !== 1) {
                    // Zoom Out
                    scale = currentScale = 1;
                    gestureImgWrap.transition(300).transform('translate3d(0,0,0)');
                    gestureImg.transition(300).transform('translate3d(0,0,0) scale(1)');
                    gestureSlide = undefined;
                }
                else {
                    // Zoom In
                    scale = currentScale = pb.params.maxZoom;
                    if (e) {
                        offsetX = pb.container.offset().left;
                        offsetY = pb.container.offset().top;
                        diffX = offsetX + pb.container[0].offsetWidth/2 - touchX;
                        diffY = offsetY + pb.container[0].offsetHeight/2 - touchY;
        
                        imageWidth = gestureImg[0].offsetWidth;
                        imageHeight = gestureImg[0].offsetHeight;
                        scaledWidth = imageWidth * scale;
                        scaledHeight = imageHeight * scale;
        
                        translateMinX = Math.min((pb.swiper.width / 2 - scaledWidth / 2), 0);
                        translateMinY = Math.min((pb.swiper.height / 2 - scaledHeight / 2), 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;
        
                        translateX = diffX * scale;
                        translateY = diffY * scale;
                        
                        if (translateX < translateMinX) {
                            translateX =  translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }
                        
                        if (translateY < translateMinY) {
                            translateY =  translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    }
                    else {
                        translateX = 0;
                        translateY = 0;
                    }
                    gestureImgWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    gestureImg.transition(300).transform('translate3d(0,0,0) scale(' + scale + ')');
                }
            };
        
            var imageIsTouched, imageIsMoved, imageCurrentX, imageCurrentY, imageMinX, imageMinY, imageMaxX, imageMaxY, imageWidth, imageHeight, imageTouchesStart = {}, imageTouchesCurrent = {}, imageStartX, imageStartY, velocityPrevPositionX, velocityPrevTime, velocityX, velocityPrevPositionY, velocityY;
        
            pb.onSlideTouchStart = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                if (imageIsTouched) return;
                if (app.device.os === 'android') e.preventDefault();
                imageIsTouched = true;
                imageTouchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                imageTouchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            };
            pb.onSlideTouchMove = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                pb.swiper.allowClick = false;
                if (!imageIsTouched || !gestureSlide) return;
        
                if (!imageIsMoved) {
                    imageWidth = gestureImg[0].offsetWidth;
                    imageHeight = gestureImg[0].offsetHeight;
                    imageStartX = $.getTranslate(gestureImgWrap[0], 'x') || 0;
                    imageStartY = $.getTranslate(gestureImgWrap[0], 'y') || 0;
                    gestureImgWrap.transition(0);
                }
                // Define if we need image drag
                var scaledWidth = imageWidth * scale;
                var scaledHeight = imageHeight * scale;
        
                if (scaledWidth < pb.swiper.width && scaledHeight < pb.swiper.height) return;
        
                imageMinX = Math.min((pb.swiper.width / 2 - scaledWidth / 2), 0);
                imageMaxX = -imageMinX;
                imageMinY = Math.min((pb.swiper.height / 2 - scaledHeight / 2), 0);
                imageMaxY = -imageMinY;
                
                imageTouchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                imageTouchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (!imageIsMoved && !isScaling) {
                    if (
                        (Math.floor(imageMinX) === Math.floor(imageStartX) && imageTouchesCurrent.x < imageTouchesStart.x) ||
                        (Math.floor(imageMaxX) === Math.floor(imageStartX) && imageTouchesCurrent.x > imageTouchesStart.x)
                        ) {
                        imageIsTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
                imageIsMoved = true;
                imageCurrentX = imageTouchesCurrent.x - imageTouchesStart.x + imageStartX;
                imageCurrentY = imageTouchesCurrent.y - imageTouchesStart.y + imageStartY;
                
                if (imageCurrentX < imageMinX) {
                    imageCurrentX =  imageMinX + 1 - Math.pow((imageMinX - imageCurrentX + 1), 0.8);
                }
                if (imageCurrentX > imageMaxX) {
                    imageCurrentX = imageMaxX - 1 + Math.pow((imageCurrentX - imageMaxX + 1), 0.8);
                }
                
                if (imageCurrentY < imageMinY) {
                    imageCurrentY =  imageMinY + 1 - Math.pow((imageMinY - imageCurrentY + 1), 0.8);
                }
                if (imageCurrentY > imageMaxY) {
                    imageCurrentY = imageMaxY - 1 + Math.pow((imageCurrentY - imageMaxY + 1), 0.8);
                }
        
                //Velocity
                if (!velocityPrevPositionX) velocityPrevPositionX = imageTouchesCurrent.x;
                if (!velocityPrevPositionY) velocityPrevPositionY = imageTouchesCurrent.y;
                if (!velocityPrevTime) velocityPrevTime = Date.now();
                velocityX = (imageTouchesCurrent.x - velocityPrevPositionX) / (Date.now() - velocityPrevTime) / 2;
                velocityY = (imageTouchesCurrent.y - velocityPrevPositionY) / (Date.now() - velocityPrevTime) / 2;
                if (Math.abs(imageTouchesCurrent.x - velocityPrevPositionX) < 2) velocityX = 0;
                if (Math.abs(imageTouchesCurrent.y - velocityPrevPositionY) < 2) velocityY = 0;
                velocityPrevPositionX = imageTouchesCurrent.x;
                velocityPrevPositionY = imageTouchesCurrent.y;
                velocityPrevTime = Date.now();
        
                gestureImgWrap.transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
            };
            pb.onSlideTouchEnd = function (e) {
                if (!gestureImg || gestureImg.length === 0) return;
                if (!imageIsTouched || !imageIsMoved) {
                    imageIsTouched = false;
                    imageIsMoved = false;
                    return;
                }
                imageIsTouched = false;
                imageIsMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = velocityX * momentumDurationX;
                var newPositionX = imageCurrentX + momentumDistanceX;
                var momentumDistanceY = velocityY * momentumDurationY;
                var newPositionY = imageCurrentY + momentumDistanceY;
        
                //Fix duration
                if (velocityX !== 0) momentumDurationX = Math.abs((newPositionX - imageCurrentX) / velocityX);
                if (velocityY !== 0) momentumDurationY = Math.abs((newPositionY - imageCurrentY) / velocityY);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        
                imageCurrentX = newPositionX;
                imageCurrentY = newPositionY;
        
                // Define if we need image drag
                var scaledWidth = imageWidth * scale;
                var scaledHeight = imageHeight * scale;
                imageMinX = Math.min((pb.swiper.width / 2 - scaledWidth / 2), 0);
                imageMaxX = -imageMinX;
                imageMinY = Math.min((pb.swiper.height / 2 - scaledHeight / 2), 0);
                imageMaxY = -imageMinY;
                imageCurrentX = Math.max(Math.min(imageCurrentX, imageMaxX), imageMinX);
                imageCurrentY = Math.max(Math.min(imageCurrentY, imageMaxY), imageMinY);
        
                gestureImgWrap.transition(momentumDuration).transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
            };
        
            // Swipe Up To Close
            var swipeToCloseIsTouched = false;
            var allowSwipeToClose = true;
            var swipeToCloseDiff, swipeToCloseStart, swipeToCloseCurrent, swipeToCloseStarted = false, swipeToCloseActiveSlide, swipeToCloseTimeStart;
            pb.swipeCloseTouchStart = function (swiper, e) {
                if (!allowSwipeToClose) return;
                swipeToCloseIsTouched = true;
            };
            pb.swipeCloseTouchMove = function (swiper, e) {
                if (!swipeToCloseIsTouched) return;
                if (!swipeToCloseStarted) {
                    swipeToCloseStarted = true;
                    swipeToCloseStart = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    swipeToCloseActiveSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
                    swipeToCloseTimeStart = (new Date()).getTime();
                }
                e.preventDefault();
                swipeToCloseCurrent = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                swipeToCloseDiff = swipeToCloseStart - swipeToCloseCurrent;
                var opacity = 1 - Math.abs(swipeToCloseDiff) / 300;
                swipeToCloseActiveSlide.transform('translate3d(0,' + (-swipeToCloseDiff) + 'px,0)');
                pb.swiper.container.css('opacity', opacity).transition(0);
            };
            pb.swipeCloseTouchEnd = function (swiper, e) {
                swipeToCloseIsTouched = false;
                if (!swipeToCloseStarted) {
                    swipeToCloseStarted = false;
                    return;
                }
                swipeToCloseStarted = false;
                allowSwipeToClose = false;
                var diff = Math.abs(swipeToCloseDiff);
                var timeDiff = (new Date()).getTime() - swipeToCloseTimeStart;
                if ((timeDiff < 300 && diff > 20) || (timeDiff >= 300 && diff > 100)) {
                    setTimeout(function () {
                        if (pb.params.type === 'standalone') {
                            pb.close();
                        }
                        if (pb.params.type === 'popup') {
                            app.closeModal(pb.popup);
                        }
                        if (pb.params.onSwipeToClose) {
                            pb.params.onSwipeToClose(pb);
                        }
                        allowSwipeToClose = true;
                    }, 0);
                    return;
                }
                if (diff !== 0) {
                    swipeToCloseActiveSlide.addClass('transitioning').transitionEnd(function () {
                        allowSwipeToClose = true;
                        swipeToCloseActiveSlide.removeClass('transitioning');
                    });
                }
                else {
                    allowSwipeToClose = true;
                }
                pb.swiper.container.css('opacity', '').transition('');
                swipeToCloseActiveSlide.transform('');
            };
        
            return pb;
        };
        
        app.photoBrowser = function (params) {
            return new PhotoBrowser(params);
        };
        

        /*===============================================================================
        ************   Autocomplete   ************
        ===============================================================================*/
        var Autocomplete = function (params) {
            var a = this;
        
            // Params
            var defaults = {
                // Standalone Options
                /*
                opener: undefined,
                */
                popupCloseText: 'Close',
                backText: 'Back',
                searchbarPlaceholderText: 'Search...',
                searchbarCancelText: 'Cancel',
                openIn: 'page',
                backOnSelect: false,
                notFoundText: 'Nothing found',
                /*
                pageTitle: undefined,
                */
        
                // Handle Data
                /*
                source: undefined,
                limit: undefined,
                */
                valueProperty: 'id',
                textProperty: 'text',
        
                // Dropdown Options
                /*
                dropdownPlaceholderText: 'Type anything...',
                */
                updateInputValueOnSelect: true,
                expandInput: false,
        
                // Preloader
                preloaderColor: false,
                preloader: false,
        
                // Templates
                /*
                itemTemplate: undefined,
                navbarTemplate: undefined,
                dropdownTemplate: undefined
                dropdownItemTemplate: undefined,
                dropdownPlaceholderTemplate: undefined
                */
        
                // Color themes
                /*
                navbarTheme: undefined,
                formTheme: undefined,
                */
        
                // Callbacks
                /*
                onChange: function (a, value) - for not dropdown
                onOpen: function (a)
                onClose: function (a)
                */
            };
        
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            a.params = params;
        
            // Opener Link & View
            if (a.params.opener) {
                a.opener = $(a.params.opener);
            }
            var view = a.params.view;
            if (!a.params.view && a.opener && a.opener.length) {
                // Find related view
                view = a.opener.parents('.' + app.params.viewClass);
                if (view.length === 0) return;
                view = view[0].f7View;
            }
        
            // Input
            if (a.params.input) {
                a.input = $(a.params.input);
                if (a.input.length === 0 && a.params.openIn === 'dropdown') return;
            }
        
            // Array with selected items
            a.value = a.params.value || [];
        
            // ID & Inputs
            a.id = (new Date()).getTime();
            a.inputType = a.params.multiple ? 'checkbox' : 'radio';
            a.inputName = a.inputType + '-' + a.id;
        
            // Is Material
            var material = app.params.material;
        
            // Back On Select
            var backOnSelect = a.params.backOnSelect;
        
            if (a.params.openIn !== 'dropdown') {
                // Item Template
                a.itemTemplate = t7.compile(a.params.itemTemplate ||
                    '<li>' +
                        '<label class="label-{{inputType}} item-content">' +
                            '<input type="{{inputType}}" name="{{inputName}}" value="{{value}}" {{#if selected}}checked{{/if}}>' +
                            '{{#if material}}' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-form-{{inputType}}"></i>' +
                                '</div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">{{text}}</div>' +
                                '</div>' +
                            '{{else}}' +
                                '{{#if checkbox}}' +
                                '<div class="item-media">' +
                                    '<i class="icon icon-form-checkbox"></i>' +
                                '</div>' +
                                '{{/if}}' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">{{text}}</div>' +
                                '</div>' +
                            '{{/if}}' +
                        '</label>' +
                    '</li>'
                );
                // Page Layout
                var pageTitle = a.params.pageTitle || '';
                if (!pageTitle && a.opener && a.opener.length) {
                    pageTitle = a.opener.find('.item-title').text();
                }
                var pageName = 'autocomplete-' + a.inputName;
        
                var navbarTheme = a.params.navbarTheme,
                    formTheme = a.params.formTheme;
        
                // Navbar HTML
                var navbarHTML;
                var noNavbar = '', noToolbar = '', navbarLayout;
        
                a.navbarTemplate = t7.compile(a.params.navbarTemplate ||
                    '<div class="navbar {{#if navbarTheme}}theme-{{navbarTheme}}{{/if}}">' +
                        '<div class="navbar-inner">' +
                            '<div class="left sliding">' +
                                '{{#if material}}' +
                                '<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}} icon-only"><i class="icon icon-back"></i></a>' +
                                '{{else}}' +
                                '<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}}">' +
                                    '<i class="icon icon-back"></i>' +
                                    '{{#if inPopup}}' +
                                    '<span>{{popupCloseText}}</span>' +
                                    '{{else}}' +
                                    '<span>{{backText}}</span>' +
                                    '{{/if}}' +
                                '</a>' +
                                '{{/if}}' +
                            '</div>' +
                            '<div class="center sliding">{{pageTitle}}</div>' +
                            '{{#if preloader}}' +
                            '<div class="right">' +
                                '<div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}"></div>' +
                            '</div>' +
                            '{{/if}}' +
                        '</div>' +
                    '</div>'
                );
                navbarHTML = a.navbarTemplate({
                    pageTitle: pageTitle,
                    backText: a.params.backText,
                    popupCloseText: a.params.popupCloseText,
                    openIn: a.params.openIn,
                    navbarTheme: navbarTheme,
                    inPopup: a.params.openIn === 'popup',
                    inPage: a.params.openIn === 'page',
                    material: material,
                    preloader: a.params.preloader,
                    preloaderColor: a.params.preloaderColor,
                });
        
                // Determine navbar layout type - static/fixed/through
                if (a.params.openIn === 'page') {
                    navbarLayout = 'static';
                    if (a.opener) {
                        if (a.opener.parents('.navbar-through').length > 0) navbarLayout = 'through';
                        if (a.opener.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
                        noToolbar = a.opener.parents('.page').hasClass('no-toolbar') ? 'no-toolbar' : '';
                        noNavbar  = a.opener.parents('.page').hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
                    }
                    else if (view.container) {
                        if ($(view.container).hasClass('navbar-through') || $(view.container).find('.navbar-through').length > 0) navbarLayout = 'through';
                        if ($(view.container).hasClass('navbar-fixed') || $(view.container).find('.navbar-fixed').length > 0) navbarLayout = 'fixed';
                        noToolbar = $(view.activePage.container).hasClass('no-toolbar') ? 'no-toolbar' : '';
                        noNavbar  = $(view.activePage.container).hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
                    }
                }
                else {
                    navbarLayout = 'fixed';
                }
                var searchbarHTML =
                    '<form class="searchbar">' +
                        '<div class="searchbar-input">' +
                            '<input type="search" placeholder="' + a.params.searchbarPlaceholderText + '">' +
                            '<a href="#" class="searchbar-clear"></a>' +
                        '</div>' +
                        (material ? '' : '<a href="#" class="searchbar-cancel">' + a.params.searchbarCancelText + '</a>') +
                    '</form>' +
                    '<div class="searchbar-overlay"></div>';
                var pageHTML =
                    (navbarLayout === 'through' ? navbarHTML : '') +
                    '<div class="pages">' +
                        '<div data-page="' + pageName + '" class="page autocomplete-page ' + noNavbar + ' ' + noToolbar + '">' +
                            (navbarLayout === 'fixed' ? navbarHTML : '') +
                            searchbarHTML +
                            '<div class="page-content">' +
                                (navbarLayout === 'static' ? navbarHTML : '') +
                                '<div class="list-block autocomplete-found autocomplete-list-' + a.id + ' ' + (formTheme ? 'theme-' + formTheme : '') + '">' +
                                    '<ul></ul>' +
                                '</div>' +
                                '<div class="list-block autocomplete-not-found">' +
                                    '<ul><li class="item-content"><div class="item-inner"><div class="item-title">' + a.params.notFoundText + '</div></div></li></ul>' +
                                '</div>' +
                                '<div class="list-block autocomplete-values">' +
                                    '<ul></ul>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            }
            else {
                a.dropdownItemTemplate = t7.compile(a.params.dropdownItemTemplate ||
                    '<li>' +
                        '<label class="{{#unless placeholder}}label-radio{{/unless}} item-content" data-value="{{value}}">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{text}}</div>' +
                            '</div>' +
                        '</label>' +
                    '</li>'
                );
                a.dropdownPlaceholderTemplate = t7.compile(a.params.dropdownPlaceholderTemplate ||
                    '<li class="autocomplete-dropdown-placeholder">' +
                        '<div class="item-content">' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{text}}</div>' +
                            '</div>' +
                        '</label>' +
                    '</li>'
                );
                a.dropdownTemplate = t7.compile(a.params.dropdownTemplate ||
                    '<div class="autocomplete-dropdown">' +
                        '<div class="autocomplete-dropdown-inner">' +
                            '<div class="list-block">' +
                                '<ul></ul>' +
                            '</div>' +
                        '</div>' +
                        '{{#if preloader}}' +
                        '<div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}">{{#if material}}{{materialPreloaderHtml}}{{/if}}</div>' +
                        '{{/if}}' +
                    '</div>'
                );
            }
        
            // Define popup
            a.popup = undefined;
        
            // Define Dropdown
            a.dropdown = undefined;
        
            // Handle Input Value Change
            function handleInputValue (e) {
                var query = a.input.val();
                if (a.params.source) {
                    a.params.source(a, query, function (items) {
                        var itemsHTML = '';
                        var limit = a.params.limit ? Math.min(a.params.limit, items.length) : items.length;
                        a.items = items;
                        var i, j;
                        var regExp = new RegExp('('+query+')', 'i');
                        for (i = 0; i < limit; i++) {
                            var itemValue = typeof items[i] === 'object' ? items[i][a.params.valueProperty] : items[i];
                            itemsHTML += a.dropdownItemTemplate({
                                value: itemValue,
                                text: (typeof items[i] !== 'object' ? items[i] : items[i][a.params.textProperty]).replace(regExp, '<b>$1</b>')
                            });
                        }
                        if (itemsHTML === '' && query === '' && a.params.dropdownPlaceholderText) {
                            itemsHTML += a.dropdownPlaceholderTemplate({
                                text: a.params.dropdownPlaceholderText,
                            });
                        }
                        a.dropdown.find('ul').html(itemsHTML);
                    });
                }
            }
            // Handle Drop Down Click
            function handleDropdownClick (e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var clickedItem;
                for (var i = 0; i < a.items.length; i++) {
                    var itemValue = typeof a.items[i] === 'object' ? a.items[i][a.params.valueProperty] : a.items[i];
                    var value = clicked.attr('data-value');
                    if (itemValue === value || itemValue * 1 === value * 1) {
                        clickedItem = a.items[i];
                    }
                }
                if (a.params.updateInputValueOnSelect) {
                    a.input.val(typeof clickedItem === 'object' ? clickedItem[a.params.textProperty] : clickedItem);
                    a.input.trigger('input change');
                }
        
                if (a.params.onChange) {
                    a.params.onChange(a, clickedItem);
                }
        
                a.close();
            }
        
            // Handle HTML Click to close Dropdown
            function closeOnHTMLClick (e) {
                var target = $(e.target);
                if (!(target.is(a.input[0]) || a.dropdown && target.parents(a.dropdown[0]).length > 0)) {
                    a.close();
                }
            }
        
            a.positionDropDown = function () {
                var listBlock = a.input.parents('.list-block'),
                    pageContent = a.input.parents('.page-content'),
                    paddingTop = parseInt(pageContent.css('padding-top'), 10),
                    paddingBottom = parseInt(pageContent.css('padding-top'), 10),
                    inputOffset = a.input.offset(),
                    listBlockOffset = listBlock.length > 0 ? listBlock.offset() : 0,
                    maxHeight = pageContent[0].scrollHeight - paddingBottom - (inputOffset.top + pageContent[0].scrollTop) - a.input[0].offsetHeight;
        
                a.dropdown.css({
                    left: (listBlock.length > 0 ? listBlockOffset.left : inputOffset.left) + 'px',
                    top: inputOffset.top + pageContent[0].scrollTop + a.input[0].offsetHeight + 'px',
                    width: (listBlock.length > 0 ? listBlock[0].offsetWidth : a.input[0].offsetWidth) + 'px'
                });
                a.dropdown.children('.autocomplete-dropdown-inner').css({
                    maxHeight: maxHeight + 'px',
                    paddingLeft: listBlock.length > 0 && !a.params.expandInput ? inputOffset.left - (material ? 16 : 15) + 'px' : ''
                });
            };
        
            // Event Listeners on new page
            a.pageInit = function (e) {
                var page = e.detail.page;
                a.page = $(page.container);
                a.pageData = page;
                if (page.name !== pageName) {
                    return;
                }
                var container = $(page.container);
                // Init Search Bar
                var searchbar = app.searchbar(container.find('.searchbar'), {
                    customSearch: true,
                    onSearch: function (searchbar, data) {
                        if (data.query.length === 0 && searchbar.active) {
                            searchbar.overlay.addClass('searchbar-overlay-active');
                        }
                        else {
                            searchbar.overlay.removeClass('searchbar-overlay-active');
                        }
        
                        var i, j, k;
        
                        if (a.params.source) {
                            a.params.source(a, data.query, function(items) {
                                var itemsHTML = '';
                                var limit = a.params.limit ? Math.min(a.params.limit, items.length) : items.length;
                                a.items = items;
                                for (i = 0; i < limit; i++) {
                                    var selected = false;
                                    var itemValue = typeof items[i] === 'object' ? items[i][a.params.valueProperty] : items[i];
                                    for (j = 0; j < a.value.length; j++) {
                                        var aValue = typeof a.value[j] === 'object' ? a.value[j][a.params.valueProperty] : a.value[j];
                                        if (aValue === itemValue || aValue * 1 === itemValue * 1) selected = true;
                                    }
                                    itemsHTML += a.itemTemplate({
                                        value: itemValue,
                                        text: typeof items[i] !== 'object' ? items[i] : items[i][a.params.textProperty],
                                        inputType: a.inputType,
                                        id: a.id,
                                        inputName: a.inputName,
                                        selected: selected,
                                        checkbox: a.inputType === 'checkbox',
                                        material: material
                                    });
                                }
                                container.find('.autocomplete-found ul').html(itemsHTML);
                                if (items.length === 0) {
                                    if (data.query.length !== 0) {
                                        container.find('.autocomplete-not-found').show();
                                        container.find('.autocomplete-found, .autocomplete-values').hide();
                                    }
                                    else {
                                        container.find('.autocomplete-values').show();
                                        container.find('.autocomplete-found, .autocomplete-not-found').hide();
                                    }
                                }
                                else {
                                    container.find('.autocomplete-found').show();
                                    container.find('.autocomplete-not-found, .autocomplete-values').hide();
                                }
                            });
                        }
                    }
                });
        
                // Save searchbar instance
                a.searchbar = searchbar;
        
                // Update values
                function updateValues() {
                    var valuesHTML = '';
                    var i;
                    for (i = 0; i < a.value.length; i++) {
        
                        valuesHTML += a.itemTemplate({
                            value: typeof a.value[i] === 'object' ? a.value[i][a.params.valueProperty] : a.value[i],
                            text: typeof a.value[i] === 'object' ? a.value[i][a.params.textProperty]: a.value[i],
                            inputType: a.inputType,
                            id: a.id,
                            inputName: a.inputName + '-checked',
                            checkbox: a.inputType === 'checkbox',
                            material: material,
                            selected: true
                        });
                    }
                    container.find('.autocomplete-values ul').html(valuesHTML);
                }
        
                // Handle Inputs
                container.on('change', 'input[type="radio"], input[type="checkbox"]', function () {
                    var i;
                    var input = this;
                    var value = input.value;
                    var text = $(input).parents('li').find('.item-title').text();
                    var isValues = $(input).parents('.autocomplete-values').length > 0;
                    var item, itemValue, aValue;
                    if (isValues) {
                        if (a.inputType === 'checkbox' && !input.checked) {
                            for (i = 0; i < a.value.length; i++) {
                                aValue = typeof a.value[i] === 'string' ? a.value[i] : a.value[i][a.params.valueProperty];
                                if (aValue === value || aValue * 1 === value * 1) {
                                    a.value.splice(i, 1);
                                }
                            }
                            updateValues();
                            if (a.params.onChange) a.params.onChange(a, a.value);
                        }
                        return;
                    }
        
                    // Find Related Item
                    for (i = 0; i < a.items.length; i++) {
                        itemValue = typeof a.items[i] === 'string' ? a.items[i] : a.items[i][a.params.valueProperty];
                        if (itemValue === value || itemValue * 1 === value * 1) item = a.items[i];
                    }
                    // Update Selected Value
                    if (a.inputType === 'radio') {
                        a.value = [item];
                    }
                    else {
                        if (input.checked) {
                            a.value.push(item);
                        }
                        else {
                            for (i = 0; i < a.value.length; i++) {
                                aValue = typeof a.value[i] === 'string' ? a.value[i] : a.value[i][a.params.valueProperty];
                                if (aValue === value || aValue * 1 === value * 1) {
                                    a.value.splice(i, 1);
                                }
                            }
                        }
                    }
        
                    // Update Values Block
                    updateValues();
        
                    // On Select Callback
                    if ((a.inputType === 'radio' && input.checked || a.inputType === 'checkbox') && a.params.onChange ) {
                        a.params.onChange(a, a.value);
                    }
                    if (backOnSelect && a.inputType === 'radio') {
                        if (a.params.openIn === 'popup') app.closeModal(a.popup);
                        else view.router.back();
                    }
                });
        
                // Update Values On Page Init
                updateValues();
        
                if (a.params.onOpen) a.params.onOpen(a);
            };
        
            // Show Hide Preloader
            a.showPreloader = function () {
                if (a.params.openIn === 'dropdown') {
                    if (a.dropdown) a.dropdown.find('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
                }
                else $('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
            };
        
            a.hidePreloader = function () {
                if (a.params.openIn === 'dropdown') {
                    if (a.dropdown) a.dropdown.find('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
                }
                else $('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
            };
        
            // Open Autocomplete Page/Popup
            a.open = function () {
                if (a.opened) return;
                a.opened = true;
                if (a.params.openIn === 'dropdown') {
                    if (!a.dropdown) {
                        a.dropdown = $(a.dropdownTemplate({
                            preloader: a.params.preloader,
                            preloaderColor: a.params.preloaderColor,
                            material: material,
                            materialPreloaderHtml: app.params.materialPreloaderHtml
                        }));
                        a.dropdown.on('click', 'label', handleDropdownClick);
        
                    }
                    var listBlock = a.input.parents('.list-block');
                    if (listBlock.length && a.input.parents('.item-content').length > 0 && a.params.expandInput) {
                        a.input.parents('.item-content').addClass('item-content-dropdown-expand');
                    }
                    a.positionDropDown();
                    a.input.parents('.page-content').append(a.dropdown);
                    a.dropdown.addClass('autocomplete-dropdown-in');
                    a.input.trigger('input');
                    $(window).on('resize', a.positionDropDown);
                    if (a.params.onOpen) a.params.onOpen(a);
                }
                else {
                    $(document).once('pageInit', '.autocomplete-page', a.pageInit);
                    if (a.params.openIn === 'popup') {
                        a.popup = app.popup(
                            '<div class="popup autocomplete-popup autocomplete-popup-' + a.inputName + '">' +
                                '<div class="view navbar-fixed">' +
                                    pageHTML +
                                '</div>' +
                            '</div>'
                            );
                        a.popup = $(a.popup);
                        a.popup.once('closed', function () {
                            a.popup = undefined;
                            a.opened = false;
                            if (a.params.onClose) a.params.onClose(a);
                        });
                    }
                    else {
                        view.router.load({
                            content: pageHTML
                        });
                        $(document).once('pageBack', '.autocomplete-page', function () {
                            a.opened = false;
                            if (a.params.onClose) a.params.onClose(a);
                        });
                    }
                }
            };
            a.close = function (e) {
                if (!a.opened) return;
                if (a.params.openIn === 'dropdown') {
                    if (e && e.type === 'blur' && a.dropdown.find('label.active-state').length > 0) return;
                    a.dropdown.removeClass('autocomplete-dropdown-in').remove();
                    a.input.parents('.item-content-dropdown-expand').removeClass('item-content-dropdown-expand');
                    a.opened = false;
                    $(window).off('resize', a.positionDropDown);
                    if (a.params.onClose) a.params.onClose(a);
                }
                if (a.params.openIn === 'popup') {
                    if (a.popup) app.closeModal(a.popup);
                }
            };
        
            // Init Events
            a.initEvents = function (detach) {
                var method = detach ? 'off' : 'on';
                if (a.params.openIn !== 'dropdown' && a.opener) {
                    a.opener[method]('click', a.open);
                }
                if (a.params.openIn === 'dropdown' && a.input) {
                    a.input[method]('focus', a.open);
                    a.input[method]('input', handleInputValue);
                    if (app.device.android) {
                        $('html')[method]('click', closeOnHTMLClick);
                    }
                    else {
                        a.input[method]('blur', a.close);
                    }
                }
                if (detach && a.dropdown) {
                    a.dropdown = null;
                }
            };
        
            // Init/Destroy Methods
            a.init = function () {
                a.initEvents();
            };
            a.destroy = function () {
                a.initEvents(true);
                a = null;
            };
        
            // Init
            a.init();
        
            return a;
        };
        app.autocomplete = function (params) {
            return new Autocomplete(params);
        };

        /*======================================================
        ************   Picker   ************
        ======================================================*/
        var Picker = function (params) {
            var p = this;
            var defaults = {
                updateValuesOnMomentum: false,
                updateValuesOnTouchmove: true,
                rotateEffect: false,
                momentumRatio: 7,
                freeMode: false,
                // Common settings
                closeByOutsideClick: true,
                scrollToInput: true,
                inputReadOnly: true,
                convertToPopover: true,
                onlyInPopover: false,
                toolbar: true,
                toolbarCloseText: 'Done',
                toolbarTemplate: 
                    '<div class="toolbar">' +
                        '<div class="toolbar-inner">' +
                            '<div class="left"></div>' +
                            '<div class="right">' +
                                '<a href="#" class="link close-picker">{{closeText}}</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            p.params = params;
            p.cols = [];
            p.initialized = false;
            
            // Inline flag
            p.inline = p.params.container ? true : false;
        
            // 3D Transforms origin bug, only on safari
            var originBug = app.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !app.device.android;
        
            // Should be converted to popover
            function isPopover() {
                var toPopover = false;
                if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
                if (!p.inline && p.params.input) {
                    if (p.params.onlyInPopover) toPopover = true;
                    else {
                        if (app.device.ios) {
                            toPopover = app.device.ipad ? true : false;
                        }
                        else {
                            if ($(window).width() >= 768) toPopover = true;
                        }
                    }
                } 
                return toPopover; 
            }
            function inPopover() {
                if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
                else return false;
            }
        
            // Value
            p.setValue = function (arrValues, transition) {
                var valueIndex = 0;
                if (p.cols.length === 0) {
                    p.value = arrValues;
                    p.updateValue(arrValues);
                    return;
                }
                for (var i = 0; i < p.cols.length; i++) {
                    if (p.cols[i] && !p.cols[i].divider) {
                        p.cols[i].setValue(arrValues[valueIndex], transition);
                        valueIndex++;
                    }
                }
            };
            p.updateValue = function (forceValues) {
                var newValue = forceValues || [];
                var newDisplayValue = [];
                for (var i = 0; i < p.cols.length; i++) {
                    if (!p.cols[i].divider) {
                        newValue.push(p.cols[i].value);
                        newDisplayValue.push(p.cols[i].displayValue);
                    }
                }
                if (newValue.indexOf(undefined) >= 0) {
                    return;
                }
                p.value = newValue;
                p.displayValue = newDisplayValue;
                if (p.params.onChange) {
                    p.params.onChange(p, p.value, p.displayValue);
                }
                if (p.input && p.input.length > 0) {
                    $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
                    $(p.input).trigger('change');
                }
            };
        
            // Columns Handlers
            p.initPickerCol = function (colElement, updateItems) {
                var colContainer = $(colElement);
                var colIndex = colContainer.index();
                var col = p.cols[colIndex];
                if (col.divider) return;
                col.container = colContainer;
                col.wrapper = col.container.find('.picker-items-col-wrapper');
                col.items = col.wrapper.find('.picker-item');
                
                var i, j;
                var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
                col.replaceValues = function (values, displayValues) {
                    col.destroyEvents();
                    col.values = values;
                    col.displayValues = displayValues;
                    var newItemsHTML = p.columnHTML(col, true);
                    col.wrapper.html(newItemsHTML);
                    col.items = col.wrapper.find('.picker-item');
                    col.calcSize();
                    col.setValue(col.values[0], 0, true);
                    col.initEvents();
                };
                col.calcSize = function () {
                    if (p.params.rotateEffect) {
                        col.container.removeClass('picker-items-col-absolute');
                        if (!col.width) col.container.css({width:''});
                    }
                    var colWidth, colHeight;
                    colWidth = 0;
                    colHeight = col.container[0].offsetHeight;
                    wrapperHeight = col.wrapper[0].offsetHeight;
                    itemHeight = col.items[0].offsetHeight;
                    itemsHeight = itemHeight * col.items.length;
                    minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
                    maxTranslate = colHeight / 2 - itemHeight / 2;    
                    if (col.width) {
                        colWidth = col.width;
                        if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                        col.container.css({width: colWidth});
                    }
                    if (p.params.rotateEffect) {
                        if (!col.width) {
                            col.items.each(function () {
                                var item = $(this);
                                item.css({width:'auto'});
                                colWidth = Math.max(colWidth, item[0].offsetWidth);
                                item.css({width:''});
                            });
                            col.container.css({width: (colWidth + 2) + 'px'});
                        }
                        col.container.addClass('picker-items-col-absolute');
                    }
                };
                col.calcSize();
                
                col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);
        
        
                var activeIndex = 0;
                var animationFrameId;
        
                // Set Value Function
                col.setValue = function (newValue, transition, valueCallbacks) {
                    if (typeof transition === 'undefined') transition = '';
                    var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
                    if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                        return;
                    }
                    var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
                    // Update wrapper
                    col.wrapper.transition(transition);
                    col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
                        
                    // Watch items
                    if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
                        $.cancelAnimationFrame(animationFrameId);
                        col.wrapper.transitionEnd(function(){
                            $.cancelAnimationFrame(animationFrameId);
                        });
                        updateDuringScroll();
                    }
        
                    // Update items
                    col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
                };
        
                col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
                    if (typeof translate === 'undefined') {
                        translate = $.getTranslate(col.wrapper[0], 'y');
                    }
                    if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
                    if (activeIndex < 0) activeIndex = 0;
                    if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
                    var previousActiveIndex = col.activeIndex;
                    col.activeIndex = activeIndex;
                    col.wrapper.find('.picker-selected').removeClass('picker-selected');
        
                    col.items.transition(transition);
                    
                    var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
                        
                    // Set 3D rotate effect
                    if (p.params.rotateEffect) {
                        var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
                        
                        col.items.each(function () {
                            var item = $(this);
                            var itemOffsetTop = item.index() * itemHeight;
                            var translateOffset = maxTranslate - translate;
                            var itemOffset = itemOffsetTop - translateOffset;
                            var percentage = itemOffset / itemHeight;
        
                            var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
                            
                            var angle = (-18*percentage);
                            if (angle > 180) angle = 180;
                            if (angle < -180) angle = -180;
                            // Far class
                            if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
                            else item.removeClass('picker-item-far');
                            // Set transform
                            item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
                        });
                    }
        
                    if (valueCallbacks || typeof valueCallbacks === 'undefined') {
                        // Update values
                        col.value = selectedItem.attr('data-picker-value');
                        col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                        // On change callback
                        if (previousActiveIndex !== activeIndex) {
                            if (col.onChange) {
                                col.onChange(p, col.value, col.displayValue);
                            }
                            p.updateValue();
                        }
                    }
                };
        
                function updateDuringScroll() {
                    animationFrameId = $.requestAnimationFrame(function () {
                        col.updateItems(undefined, undefined, 0);
                        updateDuringScroll();
                    });
                }
        
                // Update items on init
                if (updateItems) col.updateItems(0, maxTranslate, 0);
        
                var allowItemClick = true;
                var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
                function handleTouchStart (e) {
                    if (isMoved || isTouched) return;
                    e.preventDefault();
                    isTouched = true;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = (new Date()).getTime();
                    
                    allowItemClick = true;
                    startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                }
                function handleTouchMove (e) {
                    if (!isTouched) return;
                    e.preventDefault();
                    allowItemClick = false;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (!isMoved) {
                        // First move
                        $.cancelAnimationFrame(animationFrameId);
                        isMoved = true;
                        startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                        col.wrapper.transition(0);
                    }
                    e.preventDefault();
        
                    var diff = touchCurrentY - touchStartY;
                    currentTranslate = startTranslate + diff;
                    returnTo = undefined;
        
                    // Normalize translate
                    if (currentTranslate < minTranslate) {
                        currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                        returnTo = 'min';
                    }
                    if (currentTranslate > maxTranslate) {
                        currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                        returnTo = 'max';
                    }
                    // Transform wrapper
                    col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');
        
                    // Update items
                    col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);
                    
                    // Calc velocity
                    velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
                    velocityTime = (new Date()).getTime();
                    prevTranslate = currentTranslate;
                }
                function handleTouchEnd (e) {
                    if (!isTouched || !isMoved) {
                        isTouched = isMoved = false;
                        return;
                    }
                    isTouched = isMoved = false;
                    col.wrapper.transition('');
                    if (returnTo) {
                        if (returnTo === 'min') {
                            col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                        }
                        else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
                    }
                    touchEndTime = new Date().getTime();
                    var velocity, newTranslate;
                    if (touchEndTime - touchStartTime > 300) {
                        newTranslate = currentTranslate;
                    }
                    else {
                        velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                        newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
                    }
        
                    newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);
        
                    // Active Index
                    var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);
        
                    // Normalize translate
                    if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;
        
                    // Transform wrapper
                    col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');
        
                    // Update items
                    col.updateItems(activeIndex, newTranslate, '', true);
        
                    // Watch items
                    if (p.params.updateValuesOnMomentum) {
                        updateDuringScroll();
                        col.wrapper.transitionEnd(function(){
                            $.cancelAnimationFrame(animationFrameId);
                        });
                    }
        
                    // Allow click
                    setTimeout(function () {
                        allowItemClick = true;
                    }, 100);
                }
        
                function handleClick(e) {
                    if (!allowItemClick) return;
                    $.cancelAnimationFrame(animationFrameId);
                    /*jshint validthis:true */
                    var value = $(this).attr('data-picker-value');
                    col.setValue(value);
                }
        
                col.initEvents = function (detach) {
                    var method = detach ? 'off' : 'on';
                    col.container[method](app.touchEvents.start, handleTouchStart);
                    col.container[method](app.touchEvents.move, handleTouchMove);
                    col.container[method](app.touchEvents.end, handleTouchEnd);
                    col.items[method]('click', handleClick);
                };
                col.destroyEvents = function () {
                    col.initEvents(true);
                };
        
                col.container[0].f7DestroyPickerCol = function () {
                    col.destroyEvents();
                };
        
                col.initEvents();
        
            };
            p.destroyPickerCol = function (colContainer) {
                colContainer = $(colContainer);
                if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
            };
            // Resize cols
            function resizeCols() {
                if (!p.opened) return;
                for (var i = 0; i < p.cols.length; i++) {
                    if (!p.cols[i].divider) {
                        p.cols[i].calcSize();
                        p.cols[i].setValue(p.cols[i].value, 0, false);
                    }
                }
            }
            $(window).on('resize', resizeCols);
        
            // HTML Layout
            p.columnHTML = function (col, onlyItems) {
                var columnItemsHTML = '';
                var columnHTML = '';
                if (col.divider) {
                    columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
                }
                else {
                    for (var j = 0; j < col.values.length; j++) {
                        columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
                    }
                    columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
                }
                return onlyItems ? columnItemsHTML : columnHTML;
            };
            p.layout = function () {
                var pickerHTML = '';
                var pickerClass = '';
                var i;
                p.cols = [];
                var colsHTML = '';
                for (i = 0; i < p.params.cols.length; i++) {
                    var col = p.params.cols[i];
                    colsHTML += p.columnHTML(p.params.cols[i]);
                    p.cols.push(col);
                }
                pickerClass = 'picker-modal picker-columns ' + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '');
                pickerHTML =
                    '<div class="' + (pickerClass) + '">' +
                        (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') +
                        '<div class="picker-modal-inner picker-items">' +
                            colsHTML +
                            '<div class="picker-center-highlight"></div>' +
                        '</div>' +
                    '</div>';
                    
                p.pickerHTML = pickerHTML;    
            };
        
            // Input Events
            function openOnInput(e) {
                e.preventDefault();
                if (p.opened) return;
                p.open();
                if (p.params.scrollToInput && !isPopover()) {
                    var pageContent = p.input.parents('.page-content');
                    if (pageContent.length === 0) return;
        
                    var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                        paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                        pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                        pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                        newPaddingBottom;
                    var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
                    if (inputTop > pageHeight) {
                        var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                        if (scrollTop + pageHeight > pageScrollHeight) {
                            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                            if (pageHeight === pageScrollHeight) {
                                newPaddingBottom = p.container.height();
                            }
                            pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                        }
                        pageContent.scrollTop(scrollTop, 300);
                    }
                }
            }
            function closeOnHTMLClick(e) {
                if (inPopover()) return;
                if (p.input && p.input.length > 0) {
                    debugger;
                    if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
                }
                else {
                    if ($(e.target).parents('.picker-modal').length === 0) p.close();   
                }
            }
        
            if (p.params.input) {
                p.input = $(p.params.input);
                if (p.input.length > 0) {
                    if (p.params.inputReadOnly) p.input.prop('readOnly', true);
                    if (!p.inline) {
                        p.input.on('click', openOnInput);    
                    }
                    if (p.params.inputReadOnly) {
                        p.input.on('focus mousedown', function (e) {
                            e.preventDefault();
                        });
                    }
                }
                    
            }
            
            if (!p.inline && p.params.closeByOutsideClick) $('html').on('click', closeOnHTMLClick);
        
            // Open
            function onPickerClose() {
                p.opened = false;
                if (p.input && p.input.length > 0) {
                    p.input.parents('.page-content').css({'padding-bottom': ''});
                    if (app.params.material) p.input.trigger('blur');
                }
                if (p.params.onClose) p.params.onClose(p);
        
                // Destroy events
                p.container.find('.picker-items-col').each(function () {
                    p.destroyPickerCol(this);
                });
            }
        
            p.opened = false;
            p.open = function () {
                var toPopover = isPopover();
        
                if (!p.opened) {
        
                    // Layout
                    p.layout();
        
                    // Append
                    if (toPopover) {
                        p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                        p.popover = app.popover(p.pickerHTML, p.params.input, true);
                        p.container = $(p.popover).find('.picker-modal');
                        $(p.popover).on('close', function () {
                            onPickerClose();
                        });
                    }
                    else if (p.inline) {
                        p.container = $(p.pickerHTML);
                        p.container.addClass('picker-modal-inline');
                        $(p.params.container).append(p.container);
                    }
                    else {
                        p.container = $(app.pickerModal(p.pickerHTML));
                        $(p.container)
                        .on('close', function () {
                            onPickerClose();
                        });
                    }
        
                    // Store picker instance
                    p.container[0].f7Picker = p;
        
                    // Init Events
                    p.container.find('.picker-items-col').each(function () {
                        var updateItems = true;
                        if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
                        p.initPickerCol(this, updateItems);
                    });
                    
                    // Set value
                    if (!p.initialized) {
                        if (p.value) p.setValue(p.value, 0);
                        else if (p.params.value) {
                            p.setValue(p.params.value, 0);
                        }
                    }
                    else {
                        if (p.value) p.setValue(p.value, 0);
                    }
        
                    // Material Focus
                    if (p.input && p.input.length > 0 && app.params.material) {
                        p.input.trigger('focus');
                    }
                }
        
                // Set flag
                p.opened = true;
                p.initialized = true;
        
                if (p.params.onOpen) p.params.onOpen(p);
            };
        
            // Close
            p.close = function () {
                if (!p.opened || p.inline) return;
                if (inPopover()) {
                    app.closeModal(p.popover);
                    return;
                }
                else {
                    app.closeModal(p.container);
                    return;
                }
            };
        
            // Destroy
            p.destroy = function () {
                p.close();
                if (p.params.input && p.input.length > 0) {
                    p.input.off('click focus', openOnInput);
                }
                $('html').off('click', closeOnHTMLClick);
                $(window).off('resize', resizeCols);
            };
        
            if (p.inline) {
                p.open();
            }
            else {
                if (!p.initialized && p.params.value) p.setValue(p.params.value);
            }
        
            return p;
        };
        app.picker = function (params) {
            return new Picker(params);
        };

        /*======================================================
        ************   Calendar   ************
        ======================================================*/
        var Calendar = function (params) {
            var p = this;
            var defaults = {
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                firstDay: 1, // First day of the week, Monday
                weekendDays: [0, 6], // Sunday and Saturday
                multiple: false,
                rangePicker: false,
                dateFormat: 'yyyy-mm-dd',
                direction: 'horizontal', // or 'vertical'
                minDate: null,
                maxDate: null,
                disabled: null, // dates range of disabled days
                events: null, // dates range of days with events
                rangesClasses: null, //array with custom classes date ranges
                touchMove: true,
                animate: true,
                closeOnSelect: false,
                monthPicker: true,
                monthPickerTemplate:
                    '<div class="picker-calendar-month-picker">' +
                        '<a href="#" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a>' +
                        '<span class="current-month-value"></span>' +
                        '<a href="#" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a>' +
                    '</div>',
                yearPicker: true,
                yearPickerTemplate:
                    '<div class="picker-calendar-year-picker">' +
                        '<a href="#" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a>' +
                        '<span class="current-year-value"></span>' +
                        '<a href="#" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a>' +
                    '</div>',
                weekHeader: true,
                // Common settings
                closeByOutsideClick: true,
                scrollToInput: true,
                inputReadOnly: true,
                convertToPopover: true,
                onlyInPopover: false,
                toolbar: true,
                toolbarCloseText: 'Done',
                headerPlaceholder: 'Select date',
                header: app.params.material,
                footer: app.params.material,
                toolbarTemplate:
                    '<div class="toolbar">' +
                        '<div class="toolbar-inner">' +
                            '{{monthPicker}}' +
                            '{{yearPicker}}' +
                        '</div>' +
                    '</div>',
                headerTemplate:
                    '<div class="picker-header">' +
                        '<div class="picker-calendar-selected-date">{{placeholder}}</div>' +
                    '</div>',
                footerTemplate:
                    '<div class="picker-footer">' +
                        '<a href="#" class="button close-picker">{{closeText}}</a>' +
                    '</div>',
        
                /* Callbacks
                onMonthAdd
                onChange
                onOpen
                onClose
                onDayClick
                onMonthYearChangeStart
                onMonthYearChangeEnd
                */
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            p.params = params;
            p.initialized = false;
        
            // Inline flag
            p.inline = p.params.container ? true : false;
        
            // Is horizontal
            p.isH = p.params.direction === 'horizontal';
        
            // RTL inverter
            var inverter = p.isH ? (app.rtl ? -1 : 1) : 1;
        
            // Animating flag
            p.animating = false;
        
            // Should be converted to popover
            function isPopover() {
                var toPopover = false;
                if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
                if (!p.inline && p.params.input) {
                    if (p.params.onlyInPopover) toPopover = true;
                    else {
                        if (app.device.ios) {
                            toPopover = app.device.ipad ? true : false;
                        }
                        else {
                            if ($(window).width() >= 768) toPopover = true;
                        }
                    }
                }
                return toPopover;
            }
            function inPopover() {
                if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
                else return false;
            }
        
            // Format date
            function formatDate(date) {
                date = new Date(date);
                var year = date.getFullYear();
                var month = date.getMonth();
                var month1 = month + 1;
                var day = date.getDate();
                var weekDay = date.getDay();
        
                return p.params.dateFormat
                    .replace(/yyyy/g, year)
                    .replace(/yy/g, (year + '').substring(2))
                    .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
                    .replace(/m(\W+)/g, month1 + '$1')
                    .replace(/MM/g, p.params.monthNames[month])
                    .replace(/M(\W+)/g, p.params.monthNamesShort[month] + '$1')
                    .replace(/dd/g, day < 10 ? '0' + day : day)
                    .replace(/d(\W+)/g, day + '$1')
                    .replace(/DD/g, p.params.dayNames[weekDay])
                    .replace(/D(\W+)/g, p.params.dayNamesShort[weekDay] + '$1');
            }
        
        
            // Value
            p.addValue = function (value) {
                if (p.params.multiple) {
                    if (!p.value) p.value = [];
                    var inValuesIndex;
                    for (var i = 0; i < p.value.length; i++) {
                        if (new Date(value).getTime() === new Date(p.value[i]).getTime()) {
                            inValuesIndex = i;
                        }
                    }
                    if (typeof inValuesIndex === 'undefined') {
                        p.value.push(value);
                    }
                    else {
                        p.value.splice(inValuesIndex, 1);
                    }
                    p.updateValue();
                }
                else if (p.params.rangePicker) {
                    if (!p.value) p.value = [];
                    if (p.value.length === 2 || p.value.length === 0) {
                        p.value = [];
                    }
                    if (p.value[0] !== value) p.value.push(value);
                    else p.value = [];
                    p.value.sort(function (a,b) {
                        return a - b;
                    });
                    p.updateValue();
                }
                else {
                    p.value = [value];
                    p.updateValue();
                }
            };
            p.setValue = function (arrValues) {
                p.value = arrValues;
                p.updateValue();
            };
            p.updateValue = function (onlyHeader) {
                var i, inputValue;
                if (p.container && p.container.length > 0) {
                    p.wrapper.find('.picker-calendar-day-selected').removeClass('picker-calendar-day-selected');
                    var valueDate;
                    if (p.params.rangePicker && p.value.length === 2) {
                        for (i = p.value[0]; i <= p.value[1]; i += 24*60*60*1000) {
                            valueDate = new Date(i);
                            p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
                        }
                    }
                    else {
                        for (i = 0; i < p.value.length; i++) {
                            valueDate = new Date(p.value[i]);
                            p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
                        }
                    }
                }
        
                if (p.params.onChange) {
                    p.params.onChange(p, p.value);
                }
                if ((p.input && p.input.length > 0) || (app.params.material && p.params.header)) {
                    if (p.params.formatValue) inputValue = p.params.formatValue(p, p.value);
                    else {
                        inputValue = [];
                        for (i = 0; i < p.value.length; i++) {
                            inputValue.push(formatDate(p.value[i]));
                        }
                        inputValue = inputValue.join(p.params.rangePicker ? ' - ' : ', ');
                    }
                    if (app.params.material && p.params.header && p.container && p.container.length > 0) {
                        p.container.find('.picker-calendar-selected-date').text(inputValue);
                    }
                    if (p.input && p.input.length > 0 && !onlyHeader) {
                        $(p.input).val(inputValue);
                        $(p.input).trigger('change');
                    }
        
                }
            };
        
            // Columns Handlers
            p.initCalendarEvents = function () {
                var col;
                var allowItemClick = true;
                var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;
                function handleTouchStart (e) {
                    if (isMoved || isTouched) return;
                    // e.preventDefault();
                    isTouched = true;
                    touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                    touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = (new Date()).getTime();
                    percentage = 0;
                    allowItemClick = true;
                    isScrolling = undefined;
                    startTranslate = currentTranslate = p.monthsTranslate;
                }
                function handleTouchMove (e) {
                    if (!isTouched) return;
        
                    touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    if (typeof isScrolling === 'undefined') {
                        isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
                    }
                    if (p.isH && isScrolling) {
                        isTouched = false;
                        return;
                    }
                    e.preventDefault();
                    if (p.animating) {
                        isTouched = false;
                        return;
                    }
                    allowItemClick = false;
                    if (!isMoved) {
                        // First move
                        isMoved = true;
                        wrapperWidth = p.wrapper[0].offsetWidth;
                        wrapperHeight = p.wrapper[0].offsetHeight;
                        p.wrapper.transition(0);
                    }
                    e.preventDefault();
        
                    touchesDiff = p.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
                    percentage = touchesDiff/(p.isH ? wrapperWidth : wrapperHeight);
                    currentTranslate = (p.monthsTranslate * inverter + percentage) * 100;
        
                    // Transform wrapper
                    p.wrapper.transform('translate3d(' + (p.isH ? currentTranslate : 0) + '%, ' + (p.isH ? 0 : currentTranslate) + '%, 0)');
        
                }
                function handleTouchEnd (e) {
                    if (!isTouched || !isMoved) {
                        isTouched = isMoved = false;
                        return;
                    }
                    isTouched = isMoved = false;
        
                    touchEndTime = new Date().getTime();
                    if (touchEndTime - touchStartTime < 300) {
                        if (Math.abs(touchesDiff) < 10) {
                            p.resetMonth();
                        }
                        else if (touchesDiff >= 10) {
                            if (app.rtl) p.nextMonth();
                            else p.prevMonth();
                        }
                        else {
                            if (app.rtl) p.prevMonth();
                            else p.nextMonth();
                        }
                    }
                    else {
                        if (percentage <= -0.5) {
                            if (app.rtl) p.prevMonth();
                            else p.nextMonth();
                        }
                        else if (percentage >= 0.5) {
                            if (app.rtl) p.nextMonth();
                            else p.prevMonth();
                        }
                        else {
                            p.resetMonth();
                        }
                    }
        
                    // Allow click
                    setTimeout(function () {
                        allowItemClick = true;
                    }, 100);
                }
        
                function handleDayClick(e) {
                    if (!allowItemClick) return;
                    var day = $(e.target).parents('.picker-calendar-day');
                    if (day.length === 0 && $(e.target).hasClass('picker-calendar-day')) {
                        day = $(e.target);
                    }
                    if (day.length === 0) return;
                    if (day.hasClass('picker-calendar-day-selected') && !(p.params.multiple || p.params.rangePicker)) return;
                    if (day.hasClass('picker-calendar-day-disabled')) return;
                    if (!p.params.rangePicker) {
                        if (day.hasClass('picker-calendar-day-next')) p.nextMonth();
                        if (day.hasClass('picker-calendar-day-prev')) p.prevMonth();
                    }
                    var dateYear = day.attr('data-year');
                    var dateMonth = day.attr('data-month');
                    var dateDay = day.attr('data-day');
                    if (p.params.onDayClick) {
                        p.params.onDayClick(p, day[0], dateYear, dateMonth, dateDay);
                    }
                    p.addValue(new Date(dateYear, dateMonth, dateDay).getTime());
                    if (p.params.closeOnSelect) {
                        if (p.params.rangePicker && p.value.length === 2 || !p.params.rangePicker) p.close();
                    }
                }
        
                p.container.find('.picker-calendar-prev-month').on('click', p.prevMonth);
                p.container.find('.picker-calendar-next-month').on('click', p.nextMonth);
                p.container.find('.picker-calendar-prev-year').on('click', p.prevYear);
                p.container.find('.picker-calendar-next-year').on('click', p.nextYear);
                p.wrapper.on('click', handleDayClick);
                if (p.params.touchMove) {
                    p.wrapper.on(app.touchEvents.start, handleTouchStart);
                    p.wrapper.on(app.touchEvents.move, handleTouchMove);
                    p.wrapper.on(app.touchEvents.end, handleTouchEnd);
                }
        
                p.container[0].f7DestroyCalendarEvents = function () {
                    p.container.find('.picker-calendar-prev-month').off('click', p.prevMonth);
                    p.container.find('.picker-calendar-next-month').off('click', p.nextMonth);
                    p.container.find('.picker-calendar-prev-year').off('click', p.prevYear);
                    p.container.find('.picker-calendar-next-year').off('click', p.nextYear);
                    p.wrapper.off('click', handleDayClick);
                    if (p.params.touchMove) {
                        p.wrapper.off(app.touchEvents.start, handleTouchStart);
                        p.wrapper.off(app.touchEvents.move, handleTouchMove);
                        p.wrapper.off(app.touchEvents.end, handleTouchEnd);
                    }
                };
        
        
            };
            p.destroyCalendarEvents = function (colContainer) {
                if ('f7DestroyCalendarEvents' in p.container[0]) p.container[0].f7DestroyCalendarEvents();
            };
        
            // Scan Dates Range
            p.dateInRange = function (dayDate, range) {
                var match = false;
                var i;
                if (!range) return false;
                if ($.isArray(range)) {
                    for (i = 0; i < range.length; i ++) {
                        if (range[i].from || range[i].to) {
                            if (range[i].from && range[i].to) {
                                if ((dayDate <= new Date(range[i].to).getTime()) && (dayDate >= new Date(range[i].from).getTime())) {
                                    match = true;
                                }
                            }
                            else if (range[i].from) {
                                if (dayDate >= new Date(range[i].from).getTime()) {
                                    match = true;
                                }
                            }
                            else if (range[i].to) {
                                if (dayDate <= new Date(range[i].to).getTime()) {
                                    match = true;
                                }
                            }
                        } else if (dayDate === new Date(range[i]).getTime()) {
                            match = true;
                        }
                    }
                }
                else if (range.from || range.to) {
                    if (range.from && range.to) {
                        if ((dayDate <= new Date(range.to).getTime()) && (dayDate >= new Date(range.from).getTime())) {
                            match = true;
                        }
                    }
                    else if (range.from) {
                        if (dayDate >= new Date(range.from).getTime()) {
                            match = true;
                        }
                    }
                    else if (range.to) {
                        if (dayDate <= new Date(range.to).getTime()) {
                            match = true;
                        }
                    }
                }
                else if (typeof range === 'function') {
                    match = range(new Date(dayDate));
                }
                return match;
            };
            // Calendar Methods
            p.daysInMonth = function (date) {
                var d = new Date(date);
                return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
            };
            p.monthHTML = function (date, offset) {
                date = new Date(date);
                var year = date.getFullYear(),
                    month = date.getMonth(),
                    day = date.getDate();
                if (offset === 'next') {
                    if (month === 11) date = new Date(year + 1, 0);
                    else date = new Date(year, month + 1, 1);
                }
                if (offset === 'prev') {
                    if (month === 0) date = new Date(year - 1, 11);
                    else date = new Date(year, month - 1, 1);
                }
                if (offset === 'next' || offset === 'prev') {
                    month = date.getMonth();
                    year = date.getFullYear();
                }
                var daysInPrevMonth = p.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
                    daysInMonth = p.daysInMonth(date),
                    firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
                if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;
        
                var dayDate, currentValues = [], i, j, k,
                    rows = 6, cols = 7,
                    monthHTML = '',
                    dayIndex = 0 + (p.params.firstDay - 1),
                    today = new Date().setHours(0,0,0,0),
                    minDate = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
                    maxDate = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null,
                    disabled,
                    hasEvent;
        
                if (p.value && p.value.length) {
                    for (i = 0; i < p.value.length; i++) {
                        currentValues.push(new Date(p.value[i]).setHours(0,0,0,0));
                    }
                }
        
                for (i = 1; i <= rows; i++) {
                    var rowHTML = '';
                    var row = i;
                    for (j = 1; j <= cols; j++) {
                        var col = j;
                        dayIndex ++;
                        var dayNumber = dayIndex - firstDayOfMonthIndex;
                        var weekDayIndex = (col - 1 + p.params.firstDay > 6) ? (col - 1 - 7 + p.params.firstDay) : (col - 1 + p.params.firstDay);
                        var addClass = '';
                        if (dayNumber < 0) {
                            dayNumber = daysInPrevMonth + dayNumber + 1;
                            addClass += ' picker-calendar-day-prev';
                            dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
                        }
                        else {
                            dayNumber = dayNumber + 1;
                            if (dayNumber > daysInMonth) {
                                dayNumber = dayNumber - daysInMonth;
                                addClass += ' picker-calendar-day-next';
                                dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
                            }
                            else {
                                dayDate = new Date(year, month, dayNumber).getTime();
                            }
                        }
                        // Today
                        if (dayDate === today) addClass += ' picker-calendar-day-today';
                        // Selected
                        if (p.params.rangePicker && currentValues.length === 2) {
                            if (dayDate >= currentValues[0] && dayDate <= currentValues[1]) addClass += ' picker-calendar-day-selected';
                        }
                        else {
                            if (currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
                        }
                        // Weekend
                        if (p.params.weekendDays.indexOf(weekDayIndex) >= 0) {
                            addClass += ' picker-calendar-day-weekend';
                        }
                        // Has Events
                        hasEvent = false;
                        if (p.params.events) {
                            if (p.dateInRange(dayDate, p.params.events)) {
                                hasEvent = true;
                            }
                        }
                        if (hasEvent) {
                            addClass += ' picker-calendar-day-has-events';
                        }
                        // Custom Ranges
                        if (p.params.rangesClasses) {
                            for (k = 0; k < p.params.rangesClasses.length; k++) {
                                if (p.dateInRange(dayDate, p.params.rangesClasses[k].range)) {
                                    addClass += ' ' + p.params.rangesClasses[k].cssClass;
                                }
                            }
                        }
                        // Disabled
                        disabled = false;
                        if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                            disabled = true;
                        }
                        if (p.params.disabled) {
                            if (p.dateInRange(dayDate, p.params.disabled)) {
                                disabled = true;
                            }
                        }
                        if (disabled) {
                            addClass += ' picker-calendar-day-disabled';
                        }
        
        
                        dayDate = new Date(dayDate);
                        var dayYear = dayDate.getFullYear();
                        var dayMonth = dayDate.getMonth();
                        rowHTML += '<div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="picker-calendar-day' + (addClass) + '" data-date="' + (dayYear + '-' + dayMonth + '-' + dayNumber) + '"><span>'+dayNumber+'</span></div>';
                    }
                    monthHTML += '<div class="picker-calendar-row">' + rowHTML + '</div>';
                }
                monthHTML = '<div class="picker-calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHTML + '</div>';
                return monthHTML;
            };
            p.animating = false;
            p.updateCurrentMonthYear = function (dir) {
                if (typeof dir === 'undefined') {
                    p.currentMonth = parseInt(p.months.eq(1).attr('data-month'), 10);
                    p.currentYear = parseInt(p.months.eq(1).attr('data-year'), 10);
                }
                else {
                    p.currentMonth = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-month'), 10);
                    p.currentYear = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-year'), 10);
                }
                p.container.find('.current-month-value').text(p.params.monthNames[p.currentMonth]);
                p.container.find('.current-year-value').text(p.currentYear);
        
            };
            p.onMonthChangeStart = function (dir) {
                p.updateCurrentMonthYear(dir);
                p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
                var currentIndex = dir === 'next' ? p.months.length - 1 : 0;
        
                p.months.eq(currentIndex).addClass('picker-calendar-month-current');
                p.months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'picker-calendar-month-prev' : 'picker-calendar-month-next');
        
                if (p.params.onMonthYearChangeStart) {
                    p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth);
                }
            };
            p.onMonthChangeEnd = function (dir, rebuildBoth) {
                p.animating = false;
                var nextMonthHTML, prevMonthHTML, newMonthHTML;
                p.wrapper.find('.picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)').remove();
        
                if (typeof dir === 'undefined') {
                    dir = 'next';
                    rebuildBoth = true;
                }
                if (!rebuildBoth) {
                    newMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), dir);
                }
                else {
                    p.wrapper.find('.picker-calendar-month-next, .picker-calendar-month-prev').remove();
                    prevMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'prev');
                    nextMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'next');
                }
                if (dir === 'next' || rebuildBoth) {
                    p.wrapper.append(newMonthHTML || nextMonthHTML);
                }
                if (dir === 'prev' || rebuildBoth) {
                    p.wrapper.prepend(newMonthHTML || prevMonthHTML);
                }
                p.months = p.wrapper.find('.picker-calendar-month');
                p.setMonthsTranslate(p.monthsTranslate);
                if (p.params.onMonthAdd) {
                    p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
                }
                if (p.params.onMonthYearChangeEnd) {
                    p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth);
                }
            };
            p.setMonthsTranslate = function (translate) {
                translate = translate || p.monthsTranslate || 0;
                if (typeof p.monthsTranslate === 'undefined') p.monthsTranslate = translate;
                p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
                var prevMonthTranslate = -(translate + 1) * 100 * inverter;
                var currentMonthTranslate = -translate * 100 * inverter;
                var nextMonthTranslate = -(translate - 1) * 100 * inverter;
                p.months.eq(0).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
                p.months.eq(1).transform('translate3d(' + (p.isH ? currentMonthTranslate : 0) + '%, ' + (p.isH ? 0 : currentMonthTranslate) + '%, 0)').addClass('picker-calendar-month-current');
                p.months.eq(2).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
            };
            p.nextMonth = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var nextMonth = parseInt(p.months.eq(p.months.length - 1).attr('data-month'), 10);
                var nextYear = parseInt(p.months.eq(p.months.length - 1).attr('data-year'), 10);
                var nextDate = new Date(nextYear, nextMonth);
                var nextDateTime = nextDate.getTime();
                var transitionEndCallback = p.animating ? false : true;
                if (p.params.maxDate) {
                    if (nextDateTime > new Date(p.params.maxDate).getTime()) {
                        return p.resetMonth();
                    }
                }
                p.monthsTranslate --;
                if (nextMonth === p.currentMonth) {
                    var nextMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
                    var nextMonthHTML = $(p.monthHTML(nextDateTime, 'next')).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
                    p.wrapper.append(nextMonthHTML[0]);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    if (p.params.onMonthAdd) {
                        p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0]);
                    }
                }
                p.animating = true;
                p.onMonthChangeStart('next');
                var translate = (p.monthsTranslate * 100) * inverter;
        
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd('next');
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd('next');
                }
            };
            p.prevMonth = function (transition) {
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var prevMonth = parseInt(p.months.eq(0).attr('data-month'), 10);
                var prevYear = parseInt(p.months.eq(0).attr('data-year'), 10);
                var prevDate = new Date(prevYear, prevMonth + 1, -1);
                var prevDateTime = prevDate.getTime();
                var transitionEndCallback = p.animating ? false : true;
                if (p.params.minDate) {
                    if (prevDateTime < new Date(p.params.minDate).getTime()) {
                        return p.resetMonth();
                    }
                }
                p.monthsTranslate ++;
                if (prevMonth === p.currentMonth) {
                    var prevMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
                    var prevMonthHTML = $(p.monthHTML(prevDateTime, 'prev')).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
                    p.wrapper.prepend(prevMonthHTML[0]);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    if (p.params.onMonthAdd) {
                        p.params.onMonthAdd(p, p.months.eq(0)[0]);
                    }
                }
                p.animating = true;
                p.onMonthChangeStart('prev');
                var translate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
                if (transitionEndCallback) {
                    p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd('prev');
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd('prev');
                }
            };
            p.resetMonth = function (transition) {
                if (typeof transition === 'undefined') transition = '';
                var translate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
            };
            p.setYearMonth = function (year, month, transition) {
                if (typeof year === 'undefined') year = p.currentYear;
                if (typeof month === 'undefined') month = p.currentMonth;
                if (typeof transition === 'undefined' || typeof transition === 'object') {
                    transition = '';
                    if (!p.params.animate) transition = 0;
                }
                var targetDate;
                if (year < p.currentYear) {
                    targetDate = new Date(year, month + 1, -1).getTime();
                }
                else {
                    targetDate = new Date(year, month).getTime();
                }
                if (p.params.maxDate && targetDate > new Date(p.params.maxDate).getTime()) {
                    return false;
                }
                if (p.params.minDate && targetDate < new Date(p.params.minDate).getTime()) {
                    return false;
                }
                var currentDate = new Date(p.currentYear, p.currentMonth).getTime();
                var dir = targetDate > currentDate ? 'next' : 'prev';
                var newMonthHTML = p.monthHTML(new Date(year, month));
                p.monthsTranslate = p.monthsTranslate || 0;
                var prevTranslate = p.monthsTranslate;
                var monthTranslate, wrapperTranslate;
                var transitionEndCallback = p.animating ? false : true;
                if (targetDate > currentDate) {
                    // To next
                    p.monthsTranslate --;
                    if (!p.animating) p.months.eq(p.months.length - 1).remove();
                    p.wrapper.append(newMonthHTML);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    monthTranslate = -(prevTranslate - 1) * 100 * inverter;
                    p.months.eq(p.months.length - 1).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
                }
                else {
                    // To prev
                    p.monthsTranslate ++;
                    if (!p.animating) p.months.eq(0).remove();
                    p.wrapper.prepend(newMonthHTML);
                    p.months = p.wrapper.find('.picker-calendar-month');
                    monthTranslate = -(prevTranslate + 1) * 100 * inverter;
                    p.months.eq(0).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
                }
                if (p.params.onMonthAdd) {
                    p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
                }
                p.animating = true;
                p.onMonthChangeStart(dir);
                wrapperTranslate = (p.monthsTranslate * 100) * inverter;
                p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? wrapperTranslate : 0) + '%, ' + (p.isH ? 0 : wrapperTranslate) + '%, 0)');
                if (transitionEndCallback) {
                   p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd(dir, true);
                    });
                }
                if (!p.params.animate) {
                    p.onMonthChangeEnd(dir);
                }
            };
            p.nextYear = function () {
                p.setYearMonth(p.currentYear + 1);
            };
            p.prevYear = function () {
                p.setYearMonth(p.currentYear - 1);
            };
        
        
            // HTML Layout
            p.layout = function () {
                var pickerHTML = '';
                var pickerClass = '';
                var i;
        
                var layoutDate = p.value && p.value.length ? p.value[0] : new Date().setHours(0,0,0,0);
                var prevMonthHTML = p.monthHTML(layoutDate, 'prev');
                var currentMonthHTML = p.monthHTML(layoutDate);
                var nextMonthHTML = p.monthHTML(layoutDate, 'next');
                var monthsHTML = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (prevMonthHTML + currentMonthHTML + nextMonthHTML) + '</div></div>';
                // Week days header
                var weekHeaderHTML = '';
                if (p.params.weekHeader) {
                    for (i = 0; i < 7; i++) {
                        var weekDayIndex = (i + p.params.firstDay > 6) ? (i - 7 + p.params.firstDay) : (i + p.params.firstDay);
                        var dayName = p.params.dayNamesShort[weekDayIndex];
                        weekHeaderHTML += '<div class="picker-calendar-week-day ' + ((p.params.weekendDays.indexOf(weekDayIndex) >= 0) ? 'picker-calendar-week-day-weekend' : '') + '"> ' + dayName + '</div>';
        
                    }
                    weekHeaderHTML = '<div class="picker-calendar-week-days">' + weekHeaderHTML + '</div>';
                }
                pickerClass = 'picker-modal picker-calendar' +
                            (p.params.rangePicker ? ' picker-calendar-range' : '') +
                            (p.params.cssClass ? ' ' + p.params.cssClass : '');
                var toolbarHTML = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
                if (p.params.toolbar) {
                    toolbarHTML = p.params.toolbarTemplate
                        .replace(/{{closeText}}/g, p.params.toolbarCloseText)
                        .replace(/{{monthPicker}}/g, (p.params.monthPicker ? p.params.monthPickerTemplate : ''))
                        .replace(/{{yearPicker}}/g, (p.params.yearPicker ? p.params.yearPickerTemplate : ''));
                }
                var headerHTML = p.params.header ? p.params.headerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{placeholder}}/g, p.params.headerPlaceholder) : '';
                var footerHTML = p.params.footer ? p.params.footerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
        
                pickerHTML =
                    '<div class="' + (pickerClass) + '">' +
                        headerHTML +
                        footerHTML +
                        toolbarHTML +
                        '<div class="picker-modal-inner">' +
                            weekHeaderHTML +
                            monthsHTML +
                        '</div>' +
                    '</div>';
        
        
                p.pickerHTML = pickerHTML;
            };
        
            // Input Events
            function openOnInput(e) {
                e.preventDefault();
                if (p.opened) return;
                p.open();
                if (p.params.scrollToInput && !isPopover() && !app.params.material) {
                    var pageContent = p.input.parents('.page-content');
                    if (pageContent.length === 0) return;
        
                    var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                        paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                        pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                        pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                        newPaddingBottom;
        
                    var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
                    if (inputTop > pageHeight) {
                        var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                        if (scrollTop + pageHeight > pageScrollHeight) {
                            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                            if (pageHeight === pageScrollHeight) {
                                newPaddingBottom = p.container.height();
                            }
                            pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                        }
                        pageContent.scrollTop(scrollTop, 300);
                    }
                }
            }
            function closeOnHTMLClick(e) {
                debugger;
                if (inPopover()) return;
                if (p.input && p.input.length > 0) {
                    debugger;
                    if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
                }
                else {
                    if ($(e.target).parents('.picker-modal').length === 0) p.close();
                }
            }
        
            if (p.params.input) {
                p.input = $(p.params.input);
                if (p.input.length > 0) {
                    if (p.params.inputReadOnly) p.input.prop('readOnly', true);
                    if (!p.inline) {
                        p.input.on('click', openOnInput);
                    }
                    if (p.params.inputReadOnly) {
                        p.input.on('focus mousedown', function (e) {
                            e.preventDefault();
                        });
                    }
                }
        
            }
        
            if (!p.inline && p.params.closeByOutsideClick) $('html').on('click', closeOnHTMLClick);
        
            // Open
            function onPickerClose() {
                p.opened = false;
                if (p.input && p.input.length > 0) {
                    p.input.parents('.page-content').css({'padding-bottom': ''});
                    if (app.params.material) p.input.trigger('blur');
                }
                if (p.params.onClose) p.params.onClose(p);
        
                // Destroy events
                p.destroyCalendarEvents();
            }
        
            p.opened = false;
            p.open = function () {
                var toPopover = isPopover();
                var updateValue = false;
                if (!p.opened) {
                    // Set date value
                    if (!p.value) {
                        if (p.params.value) {
                            p.value = p.params.value;
                            updateValue = true;
                        }
                    }
        
                    // Layout
                    p.layout();
        
                    // Append
                    if (toPopover) {
                        p.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                        p.popover = app.popover(p.pickerHTML, p.params.input, true);
                        p.container = $(p.popover).find('.picker-modal');
                        $(p.popover).on('close', function () {
                            onPickerClose();
                        });
                    }
                    else if (p.inline) {
                        p.container = $(p.pickerHTML);
                        p.container.addClass('picker-modal-inline');
                        $(p.params.container).append(p.container);
                    }
                    else {
                        p.container = $(app.pickerModal(p.pickerHTML));
                        $(p.container)
                        .on('close', function () {
                            onPickerClose();
                        });
                    }
        
                    // Store calendar instance
                    p.container[0].f7Calendar = p;
                    p.wrapper = p.container.find('.picker-calendar-months-wrapper');
        
                    // Months
                    p.months = p.wrapper.find('.picker-calendar-month');
        
                    // Update current month and year
                    p.updateCurrentMonthYear();
        
                    // Set initial translate
                    p.monthsTranslate = 0;
                    p.setMonthsTranslate();
        
                    // Init events
                    p.initCalendarEvents();
        
                    // Update input value
                    if (updateValue) p.updateValue();
                    else if (app.params.material && p.value) p.updateValue(true);
        
                    // Material Focus
                    if (p.input && p.input.length > 0 && app.params.material) {
                        p.input.trigger('focus');
                    }
        
                }
        
                // Set flag
                p.opened = true;
                p.initialized = true;
                if (p.params.onMonthAdd) {
                    p.months.each(function () {
                        p.params.onMonthAdd(p, this);
                    });
                }
                if (p.params.onOpen) p.params.onOpen(p);
            };
        
            // Close
            p.close = function () {
                if (!p.opened || p.inline) return;
                if (inPopover()) {
                    app.closeModal(p.popover);
                    return;
                }
                else {
                    app.closeModal(p.container);
                    return;
                }
            };
        
            // Destroy
            p.destroy = function () {
                p.close();
                if (p.params.input && p.input.length > 0) {
                    p.input.off('click focus', openOnInput);
                }
                $('html').off('click', closeOnHTMLClick);
            };
        
            if (p.inline) {
                p.open();
            }
            else {
                if (!p.initialized && p.params.value) p.setValue(p.params.value);
            }
        
            return p;
        };
        app.calendar = function (params) {
            return new Calendar(params);
        };
        

        /*======================================================
        ************   Notifications   ************
        ======================================================*/
        var _tempNotificationElement;
        app.addNotification = function (params) {
            if (!params) return;
            
            if (typeof params.media === 'undefined') params.media = app.params.notificationMedia;
            if (typeof params.title === 'undefined') params.title = app.params.notificationTitle;
            if (typeof params.subtitle === 'undefined') params.subtitle = app.params.notificationSubtitle;
            if (typeof params.closeIcon === 'undefined') params.closeIcon = app.params.notificationCloseIcon;
            if (typeof params.hold === 'undefined') params.hold = app.params.notificationHold;
            if (typeof params.closeOnClick === 'undefined') params.closeOnClick = app.params.notificationCloseOnClick;
            if (typeof params.button === 'undefined') params.button = app.params.notificationCloseButtonText && {
                text: app.params.notificationCloseButtonText,
                close: true
            };
        
            if (!_tempNotificationElement) _tempNotificationElement = document.createElement('div');
        
            params.material = app.params.material;
        
            var container = $('.notifications');
            if (container.length === 0) {
                $('body').append('<div class="notifications list-block' + (params.material ? '' : ' media-list') + '"><ul></ul></div>');
                container = $('.notifications');
            }
            var list = container.children('ul');
            
            var notificationTemplate = app.params.notificationTemplate || 
                '{{#if custom}}' +
                '<li>{{custom}}</li>' +
                '{{else}}' +
                '<li class="notification-item notification-hidden">' +
                    '<div class="item-content">' +
                        '{{#if material}}' +
                            '<div class="item-inner">' +
                                '<div class="item-title">{{js "this.message || this.title || this.subtitle"}}</div>' +
                                '{{#if ../button}}{{#button}}' +
                                '<div class="item-after">' +
                                    '<a href="#" class="button {{#if color}}color-{{color}}{{/if}} {{#js_compare "this.close !== false"}}close-notification{{/js_compare}}">{{text}}</a>' +
                                '</div>' +
                                '{{/button}}{{/if}}' +
                            '</div>' +
                        '{{else}}' +
                            '{{#if media}}' +
                            '<div class="item-media">{{media}}</div>' +
                            '{{/if}}' +
                            '<div class="item-inner">' +
                                '<div class="item-title-row">' +
                                    '{{#if title}}' +
                                    '<div class="item-title">{{title}}</div>' +
                                    '{{/if}}' +
                                    '{{#if closeIcon}}' +
                                    '<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>' +
                                    '{{/if}}' +
                                '</div>' +
                                '{{#if subtitle}}' +
                                '<div class="item-subtitle">{{subtitle}}</div>' +
                                '{{/if}}' +
                                '{{#if message}}' +
                                '<div class="item-text">{{message}}</div>' +
                                '</div>' +
                            '{{/if}}' +
                        '{{/if}}' +
                    '</div>' +
                '</li>' +
                '{{/if}}';
            if (!app._compiledTemplates.notification) {
                app._compiledTemplates.notification = t7.compile(notificationTemplate);
            }
            _tempNotificationElement.innerHTML = app._compiledTemplates.notification(params);
        
            var item = $(_tempNotificationElement).children();
        
            item.on('click', function (e) {
                var close = false;
                var target = $(e.target);
                if (params.material && target.hasClass('button')) {
                    if (params.button && params.button.onClick) params.button.onClick.call(target[0], e, item[0]);
                }
                if (target.is('.close-notification') || $(e.target).parents('.close-notification').length > 0) {
                    close = true;
                }
                else {
                    if (params.onClick) params.onClick(e, item[0]);
                    if (params.closeOnClick) close = true;
                }
                if (close) app.closeNotification(item[0]);
            });
            if (params.onClose) {
                item.data('f7NotificationOnClose', function () {
                    params.onClose(item[0]);
                });
            }
            if (params.additionalClass) {
                item.addClass(params.additionalClass);
            }
            if (params.hold) {
                setTimeout(function () {
                    if (item.length > 0) app.closeNotification(item[0]);
                }, params.hold);
            }
        
            list[params.material ? 'append' : 'prepend'](item[0]);
            container.show();
        
            var itemHeight = item.outerHeight(), clientLeft;
            if (params.material) {
                container.transform('translate3d(0, '+itemHeight+'px, 0)');
                container.transition(0);
        
                clientLeft = item[0].clientLeft;
        
                container.transform('translate3d(0, 0, 0)');
                container.transition('');
            }
            else {
                item.css('marginTop', -itemHeight + 'px');
                item.transition(0);
        
                clientLeft = item[0].clientLeft;
        
                item.transition('');
                item.css('marginTop', '0px');
            }
        
            container.transform('translate3d(0, 0,0)');
            item.removeClass('notification-hidden');
        
            return item[0];
        };
        app.closeNotification = function (item) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('notification-item-removing')) return;
            var container = $('.notifications');
        
            var itemHeight = item.outerHeight();
            item.css('height', itemHeight + 'px').transition(0).addClass('notification-item-removing');
            var clientLeft = item[0].clientLeft;
        
            item.css('height', '0px').transition('');
            if (item.data('f7NotificationOnClose')) item.data('f7NotificationOnClose')();
        
            if (container.find('.notification-item:not(.notification-item-removing)').length === 0) {
                container.transform('');
            }
        
            item.addClass('notification-hidden').transitionEnd(function () {
                item.remove();
                if (container.find('.notification-item').length === 0) {
                    container.hide();
                }
            });
        };

        /*===========================
        Compile Template7 Templates On App Init
        ===========================*/
        app.initTemplate7Templates = function () {
            if (!window.Template7) return;
            Template7.templates = Template7.templates || app.params.templates || {};
            Template7.data = Template7.data || app.params.template7Data || {};
            Template7.cache = Template7.cache || {};
        
            app.templates = Template7.templates;
            app.template7Data = Template7.data;
            app.template7Cache = Template7.cache;
        
            // Precompile templates on app init
            if (!app.params.precompileTemplates) return;
            $('script[type="text/template7"]').each(function () {
                var id = $(this).attr('id');
                if (!id) return;
                Template7.templates[id] = Template7.compile($(this).html());
            });
        };
        

        /*=======================================
        ************   Plugins API   ************
        =======================================*/
        var _plugins = [];
        app.initPlugins = function () {
            // Initialize plugins
            for (var plugin in app.plugins) {
                var p = app.plugins[plugin](app, app.params[plugin]);
                if (p) _plugins.push(p);
            }
        };
        // Plugin Hooks
        app.pluginHook = function (hook) {
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].hooks && hook in _plugins[i].hooks) {
                    _plugins[i].hooks[hook](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        // Prevented by plugin
        app.pluginPrevent = function (action) {
            var prevent = false;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].prevents && action in _plugins[i].prevents) {
                    if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) prevent = true;
                }
            }
            return prevent;
        };
        // Preprocess content by plugin
        app.pluginProcess = function (process, data) {
            var processed = data;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].preprocess && process in _plugins[i].preprocess) {
                    processed = _plugins[i].preprocess[process](data, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                }
            }
            return processed;
        };
        
        

        /*======================================================
        ************   App Init   ************
        ======================================================*/
        app.init = function () {
            // Compile Template7 templates on app load
            if (app.initTemplate7Templates) app.initTemplate7Templates();
            
            // Init Plugins
            if (app.initPlugins) app.initPlugins();
            
            // Init Device
            if (app.getDeviceInfo) app.getDeviceInfo();
            
            // Init Click events
            if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
            if (app.initClickEvents) app.initClickEvents();
        
            // Init each page callbacks
            $('.page:not(.cached)').each(function () {
                app.initPageWithCallback(this);
            });
        
            // Init each navbar callbacks
            $('.navbar:not(.cached)').each(function () {
                app.initNavbarWithCallback(this); 
            });
            
            // Init resize events
            if (app.initResize) app.initResize();
        
            // Init push state
            if (app.initPushState && app.params.pushState) app.initPushState();
        
            // Init Live Swipeouts events
            if (app.initSwipeout && app.params.swipeout) app.initSwipeout();
        
            // Init Live Sortable events
            if (app.initSortable && app.params.sortable) app.initSortable();
        
            // Init Live Swipe Panels
            if (app.initSwipePanels && (app.params.swipePanel || app.params.swipePanelOnlyClose)) app.initSwipePanels();
            
            // Init Material Inputs
            if (app.params.material && app.initMaterialWatchInputs) app.initMaterialWatchInputs();
            
            // App Init callback
            if (app.params.onAppInit) app.params.onAppInit();
        
            // Plugin app init hook
            app.pluginHook('appInit');
        };
        if (app.params.init) app.init();
        

        //Return instance        
        return app;
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html;
                    selector = html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = html;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };

        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            prop: function (props, value) {
                if (arguments.length === 1 && typeof props === 'string') {
                    // Get prop
                    if (this[0]) return this[0][props];
                    else return undefined;
                }
                else {
                    // Set props
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i][props] = value;
                        }
                        else {
                            // Object
                            for (var propName in props) {
                                this[i][propName] = props[propName];
                            }
                        }
                    }
                    return this;
                }
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) {
                            return this[0].dom7ElementDataStorage[key];
                        }
                        else {
                            var dataKey = this[0].getAttribute('data-' + key);    
                            if (dataKey) {
                                return dataKey;
                            }
                            else return undefined;
                        }
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            removeData: function(key) {
                for (var i = 0; i < this.length; i++) {
                    var el = this[i];
                    if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
                        el.dom7ElementDataStorage[key] = null;
                        delete el.dom7ElementDataStorage[key];
                    }
                }
            },
            dataset: function () {
                var el = this[0];
                if (el) {
                    var dataset = {};
                    if (el.dataset) {
                        for (var dataKey in el.dataset) {
                            dataset[dataKey] = el.dataset[dataKey];
                        }
                    }
                    else {
                        for (var i = 0; i < el.attributes.length; i++) {
                            var attr = el.attributes[i];
                            if (attr.name.indexOf('data-') >= 0) {
                                dataset[$.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                            }
                        }
                    }
                    for (var key in dataset) {
                        if (dataset[key] === 'false') dataset[key] = false;
                        else if (dataset[key] === 'true') dataset[key] = true;
                        else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] = dataset[key] * 1;
                    }
                    return dataset;
                }
                else return undefined;
            },
            val: function (value) {
                if (typeof value === 'undefined') {
                    if (this[0]) return this[0].value;
                    else return undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].value = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
        
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    listener = arguments[1];
                    capture = arguments[2];
                    targetSelector = false;
                }
                function proxy(e) {
                    listener.call(e.target, e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                return dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        var evt;
                        try {
                            evt = new CustomEvent(events[i], {detail: eventData, bubbles: true, cancelable: true});
                        }
                        catch (e) {
                            evt = document.createEvent('Event');
                            evt.initEvent(events[i], true, true);
                            evt.detail = eventData;
                        }
                        this[j].dispatchEvent(evt);
                    }
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            animationEnd: function (callback) {
                var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    callback(e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));    
                    }
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins) {
                        var styles = this.styles();
                        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));    
                    }
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            hide: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'none';
                }
                return this;
            },
            show: function () {
                for (var i = 0; i < this.length; i++) {
                    this[i].style.display = 'block';
                }
                return this;
            },
            styles: function () {
                var i, styles;
                if (this[0]) return window.getComputedStyle(this[0], null);
                else return undefined;
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
        
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            filter: function (callback) {
                var matchedItems = [];
                var dom = this;
                for (var i = 0; i < dom.length; i++) {
                    if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
                }
                return new Dom7(matchedItems);
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0] || typeof selector === 'undefined') return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
        
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
        
            },
            indexOf: function (el) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === el) return i;
                }
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            appendTo: function (parent) {
                $(parent).append(this);
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            prependTo: function (parent) {
                $(parent).prepend(this);
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode !== null) {
                        if (selector) {
                            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                        }
                        else {
                           parents.push(this[i].parentNode);
                        }
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            closest: function (selector) {
                var closest = this;
                if (typeof selector === 'undefined') {
                    return new Dom7([]);
                }
                if (!closest.is(selector)) {
                    closest = closest.parents(selector).eq(0);
                }
                return closest;
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
        
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            detach: function () {
                return this.remove();
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        
        // Shortcuts
        (function () {
            var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
            var notTrigger = ('resize scroll').split(' ');
            function createMethod(name) {
                Dom7.prototype[name] = function (targetSelector, listener, capture) {
                    var i;
                    if (typeof targetSelector === 'undefined') {
                        for (i = 0; i < this.length; i++) {
                            if (notTrigger.indexOf(name) < 0) {
                                if (name in this[i]) this[i][name]();
                                else {
                                    $(this[i]).trigger(name);
                                }
                            }
                        }
                        return this;
                    }
                    else {
                        return this.on(name, targetSelector, listener, capture);
                    }
                };
            }
            for (var i = 0; i < shortcuts.length; i++) {
                createMethod(shortcuts[i]);
            }
        })();
        

        // Global Ajax Setup
        var globalAjaxOptions = {};
        $.ajaxSetup = function (options) {
            if (options.type) options.method = options.type;
            $.each(options, function (optionName, optionValue) {
                globalAjaxOptions[optionName]  = optionValue;
            });
        };
        
        // Ajax
        var _jsonpRequests = 0;
        $.ajax = function (options) {
            var defaults = {
                method: 'GET',
                data: false,
                async: true,
                cache: true,
                user: '',
                password: '',
                headers: {},
                xhrFields: {},
                statusCode: {},
                processData: true,
                dataType: 'text',
                contentType: 'application/x-www-form-urlencoded',
                timeout: 0
            };
            var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];
        
        
            //For jQuery guys
            if (options.type) options.method = options.type;
        
            // Merge global and defaults
            $.each(globalAjaxOptions, function (globalOptionName, globalOptionValue) {
                if (callbacks.indexOf(globalOptionName) < 0) defaults[globalOptionName] = globalOptionValue;
            });
        
            // Function to run XHR callbacks and events
            function fireAjaxCallback (eventName, eventData, callbackName) {
                var a = arguments;
                if (eventName) $(document).trigger(eventName, eventData);
                if (callbackName) {
                    // Global callback
                    if (callbackName in globalAjaxOptions) globalAjaxOptions[callbackName](a[3], a[4], a[5], a[6]);
                    // Options callback
                    if (options[callbackName]) options[callbackName](a[3], a[4], a[5], a[6]);
                }
            }
        
            // Merge options and defaults
            $.each(defaults, function (prop, defaultValue) {
                if (!(prop in options)) options[prop] = defaultValue;
            });
        
            // Default URL
            if (!options.url) {
                options.url = window.location.toString();
            }
            // Parameters Prefix
            var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';
        
            // UC method
            var _method = options.method.toUpperCase();
            // Data to modify GET URL
            if ((_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') && options.data) {
                var stringData;
                if (typeof options.data === 'string') {
                    // Should be key=value string
                    if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];
                    else stringData = options.data;
                }
                else {
                    // Should be key=value object
                    stringData = $.serializeObject(options.data);
                }
                if (stringData.length) {
                    options.url += paramsPrefix + stringData;
                    if (paramsPrefix === '?') paramsPrefix = '&';
                }
            }
            // JSONP
            if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
        
                var callbackName = 'f7jsonp_' + Date.now() + (_jsonpRequests++);
                var abortTimeout;
                var callbackSplit = options.url.split('callback=');
                var requestUrl = callbackSplit[0] + 'callback=' + callbackName;
                if (callbackSplit[1].indexOf('&') >= 0) {
                    var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
                    if (addVars.length > 0) requestUrl += '&' + addVars;
                }
        
                // Create script
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.onerror = function() {
                    clearTimeout(abortTimeout);
                    fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
                };
                script.src = requestUrl;
        
                // Handler
                window[callbackName] = function (data) {
                    clearTimeout(abortTimeout);
                    fireAjaxCallback(undefined, undefined, 'success', data);
                    script.parentNode.removeChild(script);
                    script = null;
                    delete window[callbackName];
                };
                document.querySelector('head').appendChild(script);
        
                if (options.timeout > 0) {
                    abortTimeout = setTimeout(function () {
                        script.parentNode.removeChild(script);
                        script = null;
                        fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
                    }, options.timeout);
                }
        
                return;
            }
        
            // Cache for GET/HEAD requests
            if (_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') {
                if (options.cache === false) {
                    options.url += (paramsPrefix + '_nocache=' + Date.now());
                }
            }
        
            // Create XHR
            var xhr = new XMLHttpRequest();
        
            // Save Request URL
            xhr.requestUrl = options.url;
            xhr.requestParameters = options;
        
            // Open XHR
            xhr.open(_method, options.url, options.async, options.user, options.password);
        
            // Create POST Data
            var postData = null;
        
            if ((_method === 'POST' || _method === 'PUT' || _method === 'PATCH') && options.data) {
                if (options.processData) {
                    var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
                    // Post Data
                    if (postDataInstances.indexOf(options.data.constructor) >= 0) {
                        postData = options.data;
                    }
                    else {
                        // POST Headers
                        var boundary = '---------------------------' + Date.now().toString(16);
        
                        if (options.contentType === 'multipart\/form-data') {
                            xhr.setRequestHeader('Content-Type', 'multipart\/form-data; boundary=' + boundary);
                        }
                        else {
                            xhr.setRequestHeader('Content-Type', options.contentType);
                        }
                        postData = '';
                        var _data = $.serializeObject(options.data);
                        if (options.contentType === 'multipart\/form-data') {
                            boundary = '---------------------------' + Date.now().toString(16);
                            _data = _data.split('&');
                            var _newData = [];
                            for (var i = 0; i < _data.length; i++) {
                                _newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
                            }
                            postData = '--' + boundary + '\r\n' + _newData.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
                        }
                        else {
                            postData = options.contentType === 'application/x-www-form-urlencoded' ? _data : _data.replace(/&/g, '\r\n');
                        }
                    }
                }
                else {
                    postData = options.data;
                }
        
            }
        
            // Additional headers
            if (options.headers) {
                $.each(options.headers, function (headerName, headerCallback) {
                    xhr.setRequestHeader(headerName, headerCallback);
                });
            }
        
            // Check for crossDomain
            if (typeof options.crossDomain === 'undefined') {
                options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
            }
        
            if (!options.crossDomain) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
        
            if (options.xhrFields) {
                $.each(options.xhrFields, function (fieldName, fieldValue) {
                    xhr[fieldName] = fieldValue;
                });
            }
        
            var xhrTimeout;
            // Handle XHR
            xhr.onload = function (e) {
                if (xhrTimeout) clearTimeout(xhrTimeout);
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                    var responseData;
                    if (options.dataType === 'json') {
                        try {
                            responseData = JSON.parse(xhr.responseText);
                            fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                        }
                        catch (err) {
                            fireAjaxCallback('ajaxError', {xhr: xhr, parseerror: true}, 'error', xhr, 'parseerror');
                        }
                    }
                    else {
                        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
                        fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                    }
                }
                else {
                    fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
                }
                if (options.statusCode) {
                    if (globalAjaxOptions.statusCode && globalAjaxOptions.statusCode[xhr.status]) globalAjaxOptions.statusCode[xhr.status](xhr);
                    if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
                }
                fireAjaxCallback('ajaxComplete', {xhr: xhr}, 'complete', xhr, xhr.status);
            };
        
            xhr.onerror = function (e) {
                if (xhrTimeout) clearTimeout(xhrTimeout);
                fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
            };
        
            // Ajax start callback
            fireAjaxCallback('ajaxStart', {xhr: xhr}, 'start', xhr);
            fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);
        
        
            // Send XHR
            xhr.send(postData);
        
            // Timeout
            if (options.timeout > 0) {
                xhr.onabort = function () {
                    if (xhrTimeout) clearTimeout(xhrTimeout);
                };
                xhrTimeout = setTimeout(function () {
                    xhr.abort();
                    fireAjaxCallback('ajaxError', {xhr: xhr, timeout: true}, 'error', xhr, 'timeout');
                    fireAjaxCallback('ajaxComplete', {xhr: xhr, timeout: true}, 'complete', xhr, 'timeout');
                }, options.timeout);
            }
        
            // Return XHR object
            return xhr;
        };
        // Shrotcuts
        (function () {
            var methods = ('get post getJSON').split(' ');
            function createMethod(method) {
                $[method] = function (url, data, success) {
                    return $.ajax({
                        url: url,
                        method: method === 'post' ? 'POST' : 'GET',
                        data: typeof data === 'function' ? undefined : data,
                        success: typeof data === 'function' ? data : success,
                        dataType: method === 'getJSON' ? 'json' : undefined
                    });
                };
            }
            for (var i = 0; i < methods.length; i++) {
                createMethod(methods[i]);
            }
        })();
        

        // DOM Library Utilites
        $.parseUrlQuery = function (url) {
            var query = {}, i, params, param;
            if (url.indexOf('?') >= 0) url = url.split('?')[1];
            else return query;
            params = url.split('&');
            for (i = 0; i < params.length; i++) {
                param = params[i].split('=');
                query[param[0]] = param[1];
            }
            return query;
        };
        $.isArray = function (arr) {
            if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
            else return false;
        };
        $.each = function (obj, callback) {
            if (typeof obj !== 'object') return;
            if (!callback) return;
            var i, prop;
            if ($.isArray(obj) || obj instanceof Dom7) {
                // Array
                for (i = 0; i < obj.length; i++) {
                    callback(i, obj[i]);
                }
            }
            else {
                // Object
                for (prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        callback(prop, obj[prop]);
                    }
                }
            }
        };
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
        $.serializeObject = $.param = function (obj, parents) {
            if (typeof obj === 'string') return obj;
            var resultArray = [];
            var separator = '&';
            parents = parents || [];
            var newParents;
            function var_name(name) {
                if (parents.length > 0) {
                    var _parents = '';
                    for (var j = 0; j < parents.length; j++) {
                        if (j === 0) _parents += parents[j];
                        else _parents += '[' + encodeURIComponent(parents[j]) + ']';
                    }
                    return _parents + '[' + encodeURIComponent(name) + ']';
                }
                else {
                    return encodeURIComponent(name);
                }
            }
            function var_value(value) {
                return encodeURIComponent(value);
            }
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var toPush;
                    if ($.isArray(obj[prop])) {
                        toPush = [];
                        for (var i = 0; i < obj[prop].length; i ++) {
                            if (!$.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
                                newParents = parents.slice();
                                newParents.push(prop);
                                newParents.push(i + '');
                                toPush.push($.serializeObject(obj[prop][i], newParents));
                            }
                            else {
                                toPush.push(var_name(prop) + '[]=' + var_value(obj[prop][i]));
                            }
                            
                        }
                        if (toPush.length > 0) resultArray.push(toPush.join(separator));
                    }
                    else if (typeof obj[prop] === 'object') {
                        // Object, convert to named array
                        newParents = parents.slice();
                        newParents.push(prop);
                        toPush = $.serializeObject(obj[prop], newParents);
                        if (toPush !== '') resultArray.push(toPush);
                    }
                    else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
                        // Should be string or plain value
                        resultArray.push(var_name(prop) + '=' + var_value(obj[prop]));
                    }
                }
            }
            return resultArray.join(separator);
        };
        $.toCamelCase = function (string) {
            return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
                return group1.toUpperCase();
            });
        };
        $.dataset = function (el) {
            return $(el).dataset();
        };
        $.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            
            return curTransform || 0;
        };
        
        $.requestAnimationFrame = function (callback) {
            if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
            else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
            else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
            else {
                return window.setTimeout(callback, 1000 / 60);
            }
        };
        $.cancelAnimationFrame = function (id) {
            if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
            else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
            else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
            else {
                return window.clearTimeout(id);
            }  
        };
        $.supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        
        // Link to prototype
        $.fn = Dom7.prototype;
        
        // Plugins
        $.fn.scrollTo = function (left, top, duration, easing, callback) {
            if (arguments.length === 4 && typeof easing === 'function') {
                callback = easing;
                easing = undefined;
            }
            return this.each(function () {
                var el = this;
                var currentTop, currentLeft, maxTop, maxLeft, newTop, newLeft, scrollTop, scrollLeft;
                var animateTop = top > 0 || top === 0;
                var animateLeft = left > 0 || left === 0;
                if (typeof easing === 'undefined') {
                    easing = 'swing';
                }
                if (animateTop) {
                    currentTop = el.scrollTop;
                    if (!duration) {
                        el.scrollTop = top;
                    }
                }
                if (animateLeft) {
                    currentLeft = el.scrollLeft;
                    if (!duration) {
                        el.scrollLeft = left;
                    }
                }
                if (!duration) return;
                if (animateTop) {
                    maxTop = el.scrollHeight - el.offsetHeight;
                    newTop = Math.max(Math.min(top, maxTop), 0);
                }
                if (animateLeft) {
                    maxLeft = el.scrollWidth - el.offsetWidth;
                    newLeft = Math.max(Math.min(left, maxLeft), 0);
                }
                var startTime = null;
                if (animateTop && newTop === currentTop) animateTop = false;
                if (animateLeft && newLeft === currentLeft) animateLeft = false;
                function render(time) {
                    if (time === undefined) {
                        time = new Date().getTime();
                    }
                    if (startTime === null) {
                        startTime = time;
                    }
                    var doneLeft, doneTop, done;
                    var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                    var easeProgress = easing === 'linear' ? progress : (0.5 - Math.cos( progress * Math.PI ) / 2);
                    if (animateTop) scrollTop = currentTop + (easeProgress * (newTop - currentTop));
                    if (animateLeft) scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft));
                    if (animateTop && newTop > currentTop && scrollTop >= newTop)  {
                        el.scrollTop = newTop;
                        done = true;
                    }
                    if (animateTop && newTop < currentTop && scrollTop <= newTop)  {
                        el.scrollTop = newTop;
                        done = true;
                    }
        
                    if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft)  {
                        el.scrollLeft = newLeft;
                        done = true;
                    }
                    if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft)  {
                        el.scrollLeft = newLeft;
                        done = true;
                    }
        
                    if (done) {
                        if (callback) callback();
                        return;
                    }
                    if (animateTop) el.scrollTop = scrollTop;
                    if (animateLeft) el.scrollLeft = scrollLeft;
                    $.requestAnimationFrame(render);
                }
                $.requestAnimationFrame(render);
            });
        };
        $.fn.scrollTop = function (top, duration, easing, callback) {
            if (arguments.length === 3 && typeof easing === 'function') {
                callback = easing;
                easing = undefined;
            }
            var dom = this;
            if (typeof top === 'undefined') {
                if (dom.length > 0) return dom[0].scrollTop;
                else return null;
            }
            return dom.scrollTo(undefined, top, duration, easing, callback);
        };
        $.fn.scrollLeft = function (left, duration, easing, callback) {
            if (arguments.length === 3 && typeof easing === 'function') {
                callback = easing;
                easing = undefined;
            }
            var dom = this;
            if (typeof left === 'undefined') {
                if (dom.length > 0) return dom[0].scrollLeft;
                else return null;
            }
            return dom.scrollTo(left, undefined, duration, easing, callback);
        };

        return $;
    })();
    
    // Export Dom7 to Framework7
    Framework7.$ = Dom7;
    
    // Export to local scope
    var $ = Dom7;
    
    // Export to Window
    window.Dom7 = Dom7;
    

    /*===========================
    Features Support Detection
    ===========================*/
    Framework7.prototype.support = (function () {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
        };
    
        // Export object
        return support;
    })();
    

    /*===========================
    Device/OS Detection
    ===========================*/
    Framework7.prototype.device = (function () {
        var device = {};
        var ua = navigator.userAgent;
        var $ = Dom7;
    
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    
        device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
        
        // Android
        if (android) {
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
        }
        if (ipad || iphone || ipod) {
            device.os = 'ios';
            device.ios = true;
        }
        // iOS
        if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        }
        if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        }
        if (ipod) {
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        }
        // iOS 8+ changed UA
        if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
            if (device.osVersion.split('.')[0] === '10') {
                device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            }
        }
    
        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
            
        // Minimal UI
        if (device.os && device.os === 'ios') {
            var osVersionArr = device.osVersion.split('.');
            device.minimalUi = !device.webView &&
                                (ipod || iphone) &&
                                (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                                $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
        }
    
        // Check for status bar and fullscreen app mode
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        device.statusBar = false;
        if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
            device.statusBar = true;
        }
        else {
            device.statusBar = false;
        }
    
        // Classes
        var classNames = [];
    
        // Pixel Ratio
        device.pixelRatio = window.devicePixelRatio || 1;
        classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
        if (device.pixelRatio >= 2) {
            classNames.push('retina');
        }
    
        // OS classes
        if (device.os) {
            classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
            if (device.os === 'ios') {
                var major = parseInt(device.osVersion.split('.')[0], 10);
                for (var i = major - 1; i >= 6; i--) {
                    classNames.push('ios-gt-' + i);
                }
            }
            
        }
        // Status bar classes
        if (device.statusBar) {
            classNames.push('with-statusbar-overlay');
        }
        else {
            $('html').removeClass('with-statusbar-overlay');
        }
    
        // Add html classes
        if (classNames.length > 0) $('html').addClass(classNames.join(' '));
    
        // Export object
        return device;
    })();
    

    /*===========================
    Plugins prototype
    ===========================*/
    Framework7.prototype.plugins = {};
    

    /*===========================
    Template7 Template engine
    ===========================*/
    window.Template7 = (function () {
        function isArray(arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        }
        function isObject(obj) {
            return obj instanceof Object;
        }
        function isFunction(func) {
            return typeof func === 'function';
        }
        var cache = {};
        function helperToSlices(string) {
            var helperParts = string.replace(/[{}#}]/g, '').split(' ');
            var slices = [];
            var shiftIndex, i, j;
            for (i = 0; i < helperParts.length; i++) {
                var part = helperParts[i];
                if (i === 0) slices.push(part);
                else {
                    if (part.indexOf('"') === 0) {
                        // Plain String
                        if (part.match(/"/g).length === 2) {
                            // One word string
                            slices.push(part);
                        }
                        else {
                            // Find closed Index
                            shiftIndex = 0;
                            for (j = i + 1; j < helperParts.length; j++) {
                                part += ' ' + helperParts[j];
                                if (helperParts[j].indexOf('"') >= 0) {
                                    shiftIndex = j;
                                    slices.push(part);
                                    break;
                                }
                            }
                            if (shiftIndex) i = shiftIndex;
                        }
                    }
                    else {
                        if (part.indexOf('=') > 0) {
                            // Hash
                            var hashParts = part.split('=');
                            var hashName = hashParts[0];
                            var hashContent = hashParts[1];
                            if (hashContent.match(/"/g).length !== 2) {
                                shiftIndex = 0;
                                for (j = i + 1; j < helperParts.length; j++) {
                                    hashContent += ' ' + helperParts[j];
                                    if (helperParts[j].indexOf('"') >= 0) {
                                        shiftIndex = j;
                                        break;
                                    }
                                }
                                if (shiftIndex) i = shiftIndex;
                            }
                            var hash = [hashName, hashContent.replace(/"/g,'')];
                            slices.push(hash);
                        }
                        else {
                            // Plain variable
                            slices.push(part);
                        }
                    }
                }
            }
            return slices;
        }
        function stringToBlocks(string) {
            var blocks = [], i, j, k;
            if (!string) return [];
            var _blocks = string.split(/({{[^{^}]*}})/);
            for (i = 0; i < _blocks.length; i++) {
                var block = _blocks[i];
                if (block === '') continue;
                if (block.indexOf('{{') < 0) {
                    blocks.push({
                        type: 'plain',
                        content: block
                    });
                }
                else {
                    if (block.indexOf('{/') >= 0) {
                        continue;
                    }
                    if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
                        // Simple variable
                        blocks.push({
                            type: 'variable',
                            contextName: block.replace(/[{}]/g, '')
                        });
                        continue;
                    }
                    // Helpers
                    var helperSlices = helperToSlices(block);
                    var helperName = helperSlices[0];
                    var isPartial = helperName === '>';
                    var helperContext = [];
                    var helperHash = {};
                    for (j = 1; j < helperSlices.length; j++) {
                        var slice = helperSlices[j];
                        if (isArray(slice)) {
                            // Hash
                            helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
                        }
                        else {
                            helperContext.push(slice);
                        }
                    }
                    
                    if (block.indexOf('{#') >= 0) {
                        // Condition/Helper
                        var helperStartIndex = i;
                        var helperContent = '';
                        var elseContent = '';
                        var toSkip = 0;
                        var shiftIndex;
                        var foundClosed = false, foundElse = false, foundClosedElse = false, depth = 0;
                        for (j = i + 1; j < _blocks.length; j++) {
                            if (_blocks[j].indexOf('{{#') >= 0) {
                                depth ++;
                            }
                            if (_blocks[j].indexOf('{{/') >= 0) {
                                depth --;
                            }
                            if (_blocks[j].indexOf('{{#' + helperName) >= 0) {
                                helperContent += _blocks[j];
                                if (foundElse) elseContent += _blocks[j];
                                toSkip ++;
                            }
                            else if (_blocks[j].indexOf('{{/' + helperName) >= 0) {
                                if (toSkip > 0) {
                                    toSkip--;
                                    helperContent += _blocks[j];
                                    if (foundElse) elseContent += _blocks[j];
                                }
                                else {
                                    shiftIndex = j;
                                    foundClosed = true;
                                    break;
                                }
                            }
                            else if (_blocks[j].indexOf('else') >= 0 && depth === 0) {
                                foundElse = true;
                            }
                            else {
                                if (!foundElse) helperContent += _blocks[j];
                                if (foundElse) elseContent += _blocks[j];
                            }
    
                        }
                        if (foundClosed) {
                            if (shiftIndex) i = shiftIndex;
                            blocks.push({
                                type: 'helper',
                                helperName: helperName,
                                contextName: helperContext,
                                content: helperContent,
                                inverseContent: elseContent,
                                hash: helperHash
                            });
                        }
                    }
                    else if (block.indexOf(' ') > 0) {
                        if (isPartial) {
                            helperName = '_partial';
                            if (helperContext[0]) helperContext[0] = '"' + helperContext[0].replace(/"|'/g, '') + '"';
                        }
                        blocks.push({
                            type: 'helper',
                            helperName: helperName,
                            contextName: helperContext,
                            hash: helperHash
                        });
                    }
                }
            }
            return blocks;
        }
        var Template7 = function (template) {
            var t = this;
            t.template = template;
            
            function getCompileFn(block, depth) {
                if (block.content) return compile(block.content, depth);
                else return function () {return ''; };
            }
            function getCompileInverse(block, depth) {
                if (block.inverseContent) return compile(block.inverseContent, depth);
                else return function () {return ''; };
            }
            function getCompileVar(name, ctx) {
                var variable, parts, levelsUp = 0, initialCtx = ctx;
                if (name.indexOf('../') === 0) {
                    levelsUp = name.split('../').length - 1;
                    var newDepth = ctx.split('_')[1] - levelsUp;
                    ctx = 'ctx_' + (newDepth >= 1 ? newDepth : 1);
                    parts = name.split('../')[levelsUp].split('.');
                }
                else if (name.indexOf('@global') === 0) {
                    ctx = 'Template7.global';
                    parts = name.split('@global.')[1].split('.');
                }
                else if (name.indexOf('@root') === 0) {
                    ctx = 'root';
                    parts = name.split('@root.')[1].split('.');
                }
                else {
                    parts = name.split('.');
                }
                variable = ctx;
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    if (part.indexOf('@') === 0) {
                        if (i > 0) {
                            variable += '[(data && data.' + part.replace('@', '') + ')]';
                        }
                        else {
                            variable = '(data && data.' + name.replace('@', '') + ')';
                        }
                    }
                    else {
                        if (isFinite(part)) {
                            variable += '[' + part + ']';
                        }
                        else {
                            if (part.indexOf('this') === 0) {
                                variable = part.replace('this', ctx);
                            }
                            else {
                                variable += '.' + part;       
                            }
                        }
                    }
                }
    
                return variable;
            }
            function getCompiledArguments(contextArray, ctx) {
                var arr = [];
                for (var i = 0; i < contextArray.length; i++) {
                    if (contextArray[i].indexOf('"') === 0) arr.push(contextArray[i]);
                    else {
                        arr.push(getCompileVar(contextArray[i], ctx));
                    }
                }
    
                return arr.join(', ');
            }
            function compile(template, depth) {
                depth = depth || 1;
                template = template || t.template;
                if (typeof template !== 'string') {
                    throw new Error('Template7: Template must be a string');
                }
                var blocks = stringToBlocks(template);
                if (blocks.length === 0) {
                    return function () { return ''; };
                }
                var ctx = 'ctx_' + depth;
                var resultString = '';
                if (depth === 1) {
                    resultString += '(function (' + ctx + ', data, root) {\n';
                }
                else {
                    resultString += '(function (' + ctx + ', data) {\n';
                }
                if (depth === 1) {
                    resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
                    resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
                    resultString += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
                    resultString += 'root = root || ctx_1 || {};\n';
                }
                resultString += 'var r = \'\';\n';
                var i, j, context;
                for (i = 0; i < blocks.length; i++) {
                    var block = blocks[i];
                    // Plain block
                    if (block.type === 'plain') {
                        resultString += 'r +=\'' + (block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
                        continue;
                    }
                    var variable, compiledArguments;
                    // Variable block
                    if (block.type === 'variable') {
                        variable = getCompileVar(block.contextName, ctx);
                        resultString += 'r += c(' + variable + ', ' + ctx + ');';
                    }
                    // Helpers block
                    if (block.type === 'helper') {
                        if (block.helperName in t.helpers) {
                            compiledArguments = getCompiledArguments(block.contextName, ctx);
                            
                            resultString += 'r += (Template7.helpers.' + block.helperName + ').call(' + ctx + ', ' + (compiledArguments && (compiledArguments + ', ')) +'{hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth + 1) + ', inverse: ' + getCompileInverse(block, depth + 1) + ', root: root});';
                            
                        }
                        else {
                            if (block.contextName.length > 0) {
                                throw new Error('Template7: Missing helper: "' + block.helperName + '"');
                            }
                            else {
                                variable = getCompileVar(block.helperName, ctx);
                                resultString += 'if (' + variable + ') {';
                                resultString += 'if (isArray(' + variable + ')) {';
                                resultString += 'r += (Template7.helpers.each).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: root});';
                                resultString += '}else {';
                                resultString += 'r += (Template7.helpers.with).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: root});';
                                resultString += '}}';
                            }
                        }
                    }
                }
                resultString += '\nreturn r;})';
                return eval.call(window, resultString);
            }
            t.compile = function (template) {
                if (!t.compiled) {
                    t.compiled = compile(template);
                }
                return t.compiled;
            };
        };
        Template7.prototype = {
            options: {},
            partials: {},
            helpers: {
                '_partial' : function (partialName, options) {
                    var p = Template7.prototype.partials[partialName];
                    if (!p || (p && !p.template)) return '';
                    if (!p.compiled) {
                        p.compiled = t7.compile(p.template);
                    }
                    var ctx = this;
                    for (var hashName in options.hash) {
                        ctx[hashName] = options.hash[hashName];
                    }
                    return p.compiled(ctx, options.data, options.root);
                },
                'escape': function (context, options) {
                    if (typeof context !== 'string') {
                        throw new Error('Template7: Passed context to "escape" helper should be a string');
                    }
                    return context
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;');
                },
                'if': function (context, options) {
                    if (isFunction(context)) { context = context.call(this); }
                    if (context) {
                        return options.fn(this, options.data);
                    }
                    else {
                        return options.inverse(this, options.data);
                    }
                },
                'unless': function (context, options) {
                    if (isFunction(context)) { context = context.call(this); }
                    if (!context) {
                        return options.fn(this, options.data);
                    }
                    else {
                        return options.inverse(this, options.data);
                    }
                },
                'each': function (context, options) {
                    var ret = '', i = 0;
                    if (isFunction(context)) { context = context.call(this); }
                    if (isArray(context)) {
                        if (options.hash.reverse) {
                            context = context.reverse();
                        }
                        for (i = 0; i < context.length; i++) {
                            ret += options.fn(context[i], {first: i === 0, last: i === context.length - 1, index: i});
                        }
                        if (options.hash.reverse) {
                            context = context.reverse();
                        }
                    }
                    else {
                        for (var key in context) {
                            i++;
                            ret += options.fn(context[key], {key: key});
                        }
                    }
                    if (i > 0) return ret;
                    else return options.inverse(this);
                },
                'with': function (context, options) {
                    if (isFunction(context)) { context = context.call(this); }
                    return options.fn(context);
                },
                'join': function (context, options) {
                    if (isFunction(context)) { context = context.call(this); }
                    return context.join(options.hash.delimiter || options.hash.delimeter);
                },
                'js': function (expression, options) {
                    var func;
                    if (expression.indexOf('return')>=0) {
                        func = '(function(){'+expression+'})';
                    }
                    else {
                        func = '(function(){return ('+expression+')})';
                    }
                    return eval.call(this, func).call(this);
                },
                'js_compare': function (expression, options) {
                    var func;
                    if (expression.indexOf('return')>=0) {
                        func = '(function(){'+expression+'})';
                    }
                    else {
                        func = '(function(){return ('+expression+')})';
                    }
                    var condition = eval.call(this, func).call(this);
                    if (condition) {
                        return options.fn(this, options.data);
                    }
                    else {
                        return options.inverse(this, options.data);   
                    }
                }
            }
        };
        var t7 = function (template, data) {
            if (arguments.length === 2) {
                var instance = new Template7(template);
                var rendered = instance.compile()(data);
                instance = null;
                return (rendered);
            }
            else return new Template7(template);
        };
        t7.registerHelper = function (name, fn) {
            Template7.prototype.helpers[name] = fn;
        };
        t7.unregisterHelper = function (name) {
            Template7.prototype.helpers[name] = undefined;  
            delete Template7.prototype.helpers[name];
        };
        t7.registerPartial = function (name, template) {
            Template7.prototype.partials[name] = {template: template};
        };
        t7.unregisterPartial = function (name, template) {
            if (Template7.prototype.partials[name]) {
                Template7.prototype.partials[name] = undefined;
                delete Template7.prototype.partials[name];
            }
        };
        
        t7.compile = function (template, options) {
            var instance = new Template7(template, options);
            return instance.compile();
        };
        
        t7.options = Template7.prototype.options;
        t7.helpers = Template7.prototype.helpers;
        t7.partials = Template7.prototype.partials;
        return t7;
    })();

})();

//# sourceMappingURL=framework7.js.map
