'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">pet-project-shop documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link" >AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthenticationModule-3808280d5c7035a52cbcb9a16fd0b32ec279b891ae8ca15c69858a4b7c2135ee0ae266ede083891b6bbcf1610e91b19c76249289483e261f2e009d00635c9fe1"' : 'data-target="#xs-controllers-links-module-AuthenticationModule-3808280d5c7035a52cbcb9a16fd0b32ec279b891ae8ca15c69858a4b7c2135ee0ae266ede083891b6bbcf1610e91b19c76249289483e261f2e009d00635c9fe1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthenticationModule-3808280d5c7035a52cbcb9a16fd0b32ec279b891ae8ca15c69858a4b7c2135ee0ae266ede083891b6bbcf1610e91b19c76249289483e261f2e009d00635c9fe1"' :
                                            'id="xs-controllers-links-module-AuthenticationModule-3808280d5c7035a52cbcb9a16fd0b32ec279b891ae8ca15c69858a4b7c2135ee0ae266ede083891b6bbcf1610e91b19c76249289483e261f2e009d00635c9fe1"' }>
                                            <li class="link">
                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TwoFactorAuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthenticationModule-3808280d5c7035a52cbcb9a16fd0b32ec279b891ae8ca15c69858a4b7c2135ee0ae266ede083891b6bbcf1610e91b19c76249289483e261f2e009d00635c9fe1"' : 'data-target="#xs-injectables-links-module-AuthenticationModule-3808280d5c7035a52cbcb9a16fd0b32ec279b891ae8ca15c69858a4b7c2135ee0ae266ede083891b6bbcf1610e91b19c76249289483e261f2e009d00635c9fe1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthenticationModule-3808280d5c7035a52cbcb9a16fd0b32ec279b891ae8ca15c69858a4b7c2135ee0ae266ede083891b6bbcf1610e91b19c76249289483e261f2e009d00635c9fe1"' :
                                        'id="xs-injectables-links-module-AuthenticationModule-3808280d5c7035a52cbcb9a16fd0b32ec279b891ae8ca15c69858a4b7c2135ee0ae266ede083891b6bbcf1610e91b19c76249289483e261f2e009d00635c9fe1"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshTokenStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtTwoFactorStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtTwoFactorStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TwoFactorAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthenticationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CompaniesModule-9f89da4bf8f862715321f3a0b6a3b46053ad9e386ddddb77576c178f1f45eb8319825eafe099d8d71728a4c26a0ce73fb4f7dff6bc23d4ac16e2bb084cf51d39"' : 'data-target="#xs-controllers-links-module-CompaniesModule-9f89da4bf8f862715321f3a0b6a3b46053ad9e386ddddb77576c178f1f45eb8319825eafe099d8d71728a4c26a0ce73fb4f7dff6bc23d4ac16e2bb084cf51d39"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-9f89da4bf8f862715321f3a0b6a3b46053ad9e386ddddb77576c178f1f45eb8319825eafe099d8d71728a4c26a0ce73fb4f7dff6bc23d4ac16e2bb084cf51d39"' :
                                            'id="xs-controllers-links-module-CompaniesModule-9f89da4bf8f862715321f3a0b6a3b46053ad9e386ddddb77576c178f1f45eb8319825eafe099d8d71728a4c26a0ce73fb4f7dff6bc23d4ac16e2bb084cf51d39"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CompaniesModule-9f89da4bf8f862715321f3a0b6a3b46053ad9e386ddddb77576c178f1f45eb8319825eafe099d8d71728a4c26a0ce73fb4f7dff6bc23d4ac16e2bb084cf51d39"' : 'data-target="#xs-injectables-links-module-CompaniesModule-9f89da4bf8f862715321f3a0b6a3b46053ad9e386ddddb77576c178f1f45eb8319825eafe099d8d71728a4c26a0ce73fb4f7dff6bc23d4ac16e2bb084cf51d39"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-9f89da4bf8f862715321f3a0b6a3b46053ad9e386ddddb77576c178f1f45eb8319825eafe099d8d71728a4c26a0ce73fb4f7dff6bc23d4ac16e2bb084cf51d39"' :
                                        'id="xs-injectables-links-module-CompaniesModule-9f89da4bf8f862715321f3a0b6a3b46053ad9e386ddddb77576c178f1f45eb8319825eafe099d8d71728a4c26a0ce73fb4f7dff6bc23d4ac16e2bb084cf51d39"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailConfirmationModule.html" data-type="entity-link" >EmailConfirmationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EmailConfirmationModule-ead55656a0674d5a9975130af69c77a366430802ec6fdfbeb1351f1265a627f66690d1ac4a07e7807145bd8a42c0f7af0403d71eba7abbc8993346f65c981351"' : 'data-target="#xs-controllers-links-module-EmailConfirmationModule-ead55656a0674d5a9975130af69c77a366430802ec6fdfbeb1351f1265a627f66690d1ac4a07e7807145bd8a42c0f7af0403d71eba7abbc8993346f65c981351"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailConfirmationModule-ead55656a0674d5a9975130af69c77a366430802ec6fdfbeb1351f1265a627f66690d1ac4a07e7807145bd8a42c0f7af0403d71eba7abbc8993346f65c981351"' :
                                            'id="xs-controllers-links-module-EmailConfirmationModule-ead55656a0674d5a9975130af69c77a366430802ec6fdfbeb1351f1265a627f66690d1ac4a07e7807145bd8a42c0f7af0403d71eba7abbc8993346f65c981351"' }>
                                            <li class="link">
                                                <a href="controllers/EmailConfirmationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailConfirmationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailConfirmationModule-ead55656a0674d5a9975130af69c77a366430802ec6fdfbeb1351f1265a627f66690d1ac4a07e7807145bd8a42c0f7af0403d71eba7abbc8993346f65c981351"' : 'data-target="#xs-injectables-links-module-EmailConfirmationModule-ead55656a0674d5a9975130af69c77a366430802ec6fdfbeb1351f1265a627f66690d1ac4a07e7807145bd8a42c0f7af0403d71eba7abbc8993346f65c981351"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailConfirmationModule-ead55656a0674d5a9975130af69c77a366430802ec6fdfbeb1351f1265a627f66690d1ac4a07e7807145bd8a42c0f7af0403d71eba7abbc8993346f65c981351"' :
                                        'id="xs-injectables-links-module-EmailConfirmationModule-ead55656a0674d5a9975130af69c77a366430802ec6fdfbeb1351f1265a627f66690d1ac4a07e7807145bd8a42c0f7af0403d71eba7abbc8993346f65c981351"' }>
                                        <li class="link">
                                            <a href="injectables/EmailConfirmationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailConfirmationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailModule-70408790ab81ea4eab9be304a33f33aca880b8a97fb63821f2994d766b37d7e536b30048fc6d599e1e9c15aa4134f9225ca3ac73baa85ffd99d2068ef2265836"' : 'data-target="#xs-injectables-links-module-EmailModule-70408790ab81ea4eab9be304a33f33aca880b8a97fb63821f2994d766b37d7e536b30048fc6d599e1e9c15aa4134f9225ca3ac73baa85ffd99d2068ef2265836"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-70408790ab81ea4eab9be304a33f33aca880b8a97fb63821f2994d766b37d7e536b30048fc6d599e1e9c15aa4134f9225ca3ac73baa85ffd99d2068ef2265836"' :
                                        'id="xs-injectables-links-module-EmailModule-70408790ab81ea4eab9be304a33f33aca880b8a97fb63821f2994d766b37d7e536b30048fc6d599e1e9c15aa4134f9225ca3ac73baa85ffd99d2068ef2265836"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ManagersModule.html" data-type="entity-link" >ManagersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ManagersModule-64c5c6fe4466bf7b551d549cf9d8d84445228e3c1ef2f310247756c57c4c7f11cd607627fa3a61068ede1487188a66ee884380d65b21e111e1db206bc099c7d5"' : 'data-target="#xs-controllers-links-module-ManagersModule-64c5c6fe4466bf7b551d549cf9d8d84445228e3c1ef2f310247756c57c4c7f11cd607627fa3a61068ede1487188a66ee884380d65b21e111e1db206bc099c7d5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ManagersModule-64c5c6fe4466bf7b551d549cf9d8d84445228e3c1ef2f310247756c57c4c7f11cd607627fa3a61068ede1487188a66ee884380d65b21e111e1db206bc099c7d5"' :
                                            'id="xs-controllers-links-module-ManagersModule-64c5c6fe4466bf7b551d549cf9d8d84445228e3c1ef2f310247756c57c4c7f11cd607627fa3a61068ede1487188a66ee884380d65b21e111e1db206bc099c7d5"' }>
                                            <li class="link">
                                                <a href="controllers/ManagersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ManagersModule-64c5c6fe4466bf7b551d549cf9d8d84445228e3c1ef2f310247756c57c4c7f11cd607627fa3a61068ede1487188a66ee884380d65b21e111e1db206bc099c7d5"' : 'data-target="#xs-injectables-links-module-ManagersModule-64c5c6fe4466bf7b551d549cf9d8d84445228e3c1ef2f310247756c57c4c7f11cd607627fa3a61068ede1487188a66ee884380d65b21e111e1db206bc099c7d5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ManagersModule-64c5c6fe4466bf7b551d549cf9d8d84445228e3c1ef2f310247756c57c4c7f11cd607627fa3a61068ede1487188a66ee884380d65b21e111e1db206bc099c7d5"' :
                                        'id="xs-injectables-links-module-ManagersModule-64c5c6fe4466bf7b551d549cf9d8d84445228e3c1ef2f310247756c57c4c7f11cd607627fa3a61068ede1487188a66ee884380d65b21e111e1db206bc099c7d5"' }>
                                        <li class="link">
                                            <a href="injectables/ManagersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PricesModule.html" data-type="entity-link" >PricesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PricesModule-3835fc8b2672e8fe3c0898d9fb4c5794521c1a78ba1174721fd2c84b7d7a5de4d78721fa0d5ac27fa6e1f10378ccfed26f631e30dfd4ab1e0b520231bc3e9edb"' : 'data-target="#xs-controllers-links-module-PricesModule-3835fc8b2672e8fe3c0898d9fb4c5794521c1a78ba1174721fd2c84b7d7a5de4d78721fa0d5ac27fa6e1f10378ccfed26f631e30dfd4ab1e0b520231bc3e9edb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PricesModule-3835fc8b2672e8fe3c0898d9fb4c5794521c1a78ba1174721fd2c84b7d7a5de4d78721fa0d5ac27fa6e1f10378ccfed26f631e30dfd4ab1e0b520231bc3e9edb"' :
                                            'id="xs-controllers-links-module-PricesModule-3835fc8b2672e8fe3c0898d9fb4c5794521c1a78ba1174721fd2c84b7d7a5de4d78721fa0d5ac27fa6e1f10378ccfed26f631e30dfd4ab1e0b520231bc3e9edb"' }>
                                            <li class="link">
                                                <a href="controllers/PricesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PricesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PricesModule-3835fc8b2672e8fe3c0898d9fb4c5794521c1a78ba1174721fd2c84b7d7a5de4d78721fa0d5ac27fa6e1f10378ccfed26f631e30dfd4ab1e0b520231bc3e9edb"' : 'data-target="#xs-injectables-links-module-PricesModule-3835fc8b2672e8fe3c0898d9fb4c5794521c1a78ba1174721fd2c84b7d7a5de4d78721fa0d5ac27fa6e1f10378ccfed26f631e30dfd4ab1e0b520231bc3e9edb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PricesModule-3835fc8b2672e8fe3c0898d9fb4c5794521c1a78ba1174721fd2c84b7d7a5de4d78721fa0d5ac27fa6e1f10378ccfed26f631e30dfd4ab1e0b520231bc3e9edb"' :
                                        'id="xs-injectables-links-module-PricesModule-3835fc8b2672e8fe3c0898d9fb4c5794521c1a78ba1174721fd2c84b7d7a5de4d78721fa0d5ac27fa6e1f10378ccfed26f631e30dfd4ab1e0b520231bc3e9edb"' }>
                                        <li class="link">
                                            <a href="injectables/PricesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PricesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-814e28dd9397159a0791349c1b1e358456d2949ce983708648e6d1d12e77f00810ba907b165ec7eb50858331982924cf33109e1ac420c0a6ae8dd38e18087c43"' : 'data-target="#xs-controllers-links-module-ProductsModule-814e28dd9397159a0791349c1b1e358456d2949ce983708648e6d1d12e77f00810ba907b165ec7eb50858331982924cf33109e1ac420c0a6ae8dd38e18087c43"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-814e28dd9397159a0791349c1b1e358456d2949ce983708648e6d1d12e77f00810ba907b165ec7eb50858331982924cf33109e1ac420c0a6ae8dd38e18087c43"' :
                                            'id="xs-controllers-links-module-ProductsModule-814e28dd9397159a0791349c1b1e358456d2949ce983708648e6d1d12e77f00810ba907b165ec7eb50858331982924cf33109e1ac420c0a6ae8dd38e18087c43"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductsModule-814e28dd9397159a0791349c1b1e358456d2949ce983708648e6d1d12e77f00810ba907b165ec7eb50858331982924cf33109e1ac420c0a6ae8dd38e18087c43"' : 'data-target="#xs-injectables-links-module-ProductsModule-814e28dd9397159a0791349c1b1e358456d2949ce983708648e6d1d12e77f00810ba907b165ec7eb50858331982924cf33109e1ac420c0a6ae8dd38e18087c43"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-814e28dd9397159a0791349c1b1e358456d2949ce983708648e6d1d12e77f00810ba907b165ec7eb50858331982924cf33109e1ac420c0a6ae8dd38e18087c43"' :
                                        'id="xs-injectables-links-module-ProductsModule-814e28dd9397159a0791349c1b1e358456d2949ce983708648e6d1d12e77f00810ba907b165ec7eb50858331982924cf33109e1ac420c0a6ae8dd38e18087c43"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsSearchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsSearchService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link" >SearchModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SentryModule.html" data-type="entity-link" >SentryModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SentryModule-1ce89b26d445c1fcc153ac262172fc9830b653ff039283c39eb26415622ed4efe4743239ff1ddd443ea69e30260162e6cff988ac8b6f527bbebe72fe6fa53877"' : 'data-target="#xs-injectables-links-module-SentryModule-1ce89b26d445c1fcc153ac262172fc9830b653ff039283c39eb26415622ed4efe4743239ff1ddd443ea69e30260162e6cff988ac8b6f527bbebe72fe6fa53877"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SentryModule-1ce89b26d445c1fcc153ac262172fc9830b653ff039283c39eb26415622ed4efe4743239ff1ddd443ea69e30260162e6cff988ac8b6f527bbebe72fe6fa53877"' :
                                        'id="xs-injectables-links-module-SentryModule-1ce89b26d445c1fcc153ac262172fc9830b653ff039283c39eb26415622ed4efe4743239ff1ddd443ea69e30260162e6cff988ac8b6f527bbebe72fe6fa53877"' }>
                                        <li class="link">
                                            <a href="injectables/SentryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SentryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-f6049469eae9b243821c546a79413d05d3046300d93fe0a88f975e79506be3062b9064c199bcbf361cf9e406e1b8d263fff46138e9b4a3b863472a060341a73e"' : 'data-target="#xs-controllers-links-module-UsersModule-f6049469eae9b243821c546a79413d05d3046300d93fe0a88f975e79506be3062b9064c199bcbf361cf9e406e1b8d263fff46138e9b4a3b863472a060341a73e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-f6049469eae9b243821c546a79413d05d3046300d93fe0a88f975e79506be3062b9064c199bcbf361cf9e406e1b8d263fff46138e9b4a3b863472a060341a73e"' :
                                            'id="xs-controllers-links-module-UsersModule-f6049469eae9b243821c546a79413d05d3046300d93fe0a88f975e79506be3062b9064c199bcbf361cf9e406e1b8d263fff46138e9b4a3b863472a060341a73e"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-f6049469eae9b243821c546a79413d05d3046300d93fe0a88f975e79506be3062b9064c199bcbf361cf9e406e1b8d263fff46138e9b4a3b863472a060341a73e"' : 'data-target="#xs-injectables-links-module-UsersModule-f6049469eae9b243821c546a79413d05d3046300d93fe0a88f975e79506be3062b9064c199bcbf361cf9e406e1b8d263fff46138e9b4a3b863472a060341a73e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-f6049469eae9b243821c546a79413d05d3046300d93fe0a88f975e79506be3062b9064c199bcbf361cf9e406e1b8d263fff46138e9b4a3b863472a060341a73e"' :
                                        'id="xs-injectables-links-module-UsersModule-f6049469eae9b243821c546a79413d05d3046300d93fe0a88f975e79506be3062b9064c199bcbf361cf9e406e1b8d263fff46138e9b4a3b863472a060341a73e"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthenticationController.html" data-type="entity-link" >AuthenticationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailConfirmationController.html" data-type="entity-link" >EmailConfirmationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ManagersController.html" data-type="entity-link" >ManagersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PricesController.html" data-type="entity-link" >PricesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TwoFactorAuthenticationController.html" data-type="entity-link" >TwoFactorAuthenticationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/CategoriesEntity.html" data-type="entity-link" >CategoriesEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/CompaniesEntity.html" data-type="entity-link" >CompaniesEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ManagersEntity.html" data-type="entity-link" >ManagersEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OrdersEntity.html" data-type="entity-link" >OrdersEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PricesEntity.html" data-type="entity-link" >PricesEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProductsEntity.html" data-type="entity-link" >ProductsEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UsersEntity.html" data-type="entity-link" >UsersEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddCompanyToUserDto.html" data-type="entity-link" >AddCompanyToUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddManagerToUserDto.html" data-type="entity-link" >AddManagerToUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfirmEmailDto.html" data-type="entity-link" >ConfirmEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManagerDto.html" data-type="entity-link" >CreateManagerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePriceDto.html" data-type="entity-link" >CreatePriceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomPasswordLengthConstraint.html" data-type="entity-link" >CustomPasswordLengthConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditProductDto.html" data-type="entity-link" >EditProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailValidationConstraint.html" data-type="entity-link" >EmailValidationConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploadDto.html" data-type="entity-link" >FileUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HelperFileLoader.html" data-type="entity-link" >HelperFileLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsManagerAlreadyExistConstraint.html" data-type="entity-link" >IsManagerAlreadyExistConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsNumberConstraint.html" data-type="entity-link" >IsNumberConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsUserAlreadyExistConstraint.html" data-type="entity-link" >IsUserAlreadyExistConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/NumberValidationConstraint.html" data-type="entity-link" >NumberValidationConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link" >PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhoneValidationConstraint.html" data-type="entity-link" >PhoneValidationConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/StringValidationConstraint.html" data-type="entity-link" >StringValidationConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/TwoFactorAuthenticationCodeDto.html" data-type="entity-link" >TwoFactorAuthenticationCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateManagerDto.html" data-type="entity-link" >UpdateManagerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewAuthFilter.html" data-type="entity-link" >ViewAuthFilter</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomValidationPipe.html" data-type="entity-link" >CustomValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailConfirmationService.html" data-type="entity-link" >EmailConfirmationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpCacheInterceptor.html" data-type="entity-link" >HttpCacheInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthenticationGuard.html" data-type="entity-link" >JwtAuthenticationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshTokenStrategy.html" data-type="entity-link" >JwtRefreshTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtTwoFactorGuard.html" data-type="entity-link" >JwtTwoFactorGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtTwoFactorStrategy.html" data-type="entity-link" >JwtTwoFactorStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthenticationGuard.html" data-type="entity-link" >LocalAuthenticationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManagersService.html" data-type="entity-link" >ManagersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PricesService.html" data-type="entity-link" >PricesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsSearchService.html" data-type="entity-link" >ProductsSearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SentryInterceptor.html" data-type="entity-link" >SentryInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SentryService.html" data-type="entity-link" >SentryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TwoFactorAuthenticationService.html" data-type="entity-link" >TwoFactorAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/EmailConfirmationGuard.html" data-type="entity-link" >EmailConfirmationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CustomHttpExceptionResponse.html" data-type="entity-link" >CustomHttpExceptionResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HttpExceptionResponse.html" data-type="entity-link" >HttpExceptionResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I2faGenerate.html" data-type="entity-link" >I2faGenerate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICookiesFromJwt.html" data-type="entity-link" >ICookiesFromJwt</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileFormatForDownload.html" data-type="entity-link" >IFileFormatForDownload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQrCodeStream.html" data-type="entity-link" >IQrCodeStream</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRenderTemplate.html" data-type="entity-link" >IRenderTemplate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRequestWithUser.html" data-type="entity-link" >IRequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITokenPayload.html" data-type="entity-link" >ITokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IValidationResultAsfunction.html" data-type="entity-link" >IValidationResultAsfunction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IVerificationTokenPayload.html" data-type="entity-link" >IVerificationTokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductSearchBody.html" data-type="entity-link" >ProductSearchBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductSearchResult.html" data-type="entity-link" >ProductSearchResult</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});