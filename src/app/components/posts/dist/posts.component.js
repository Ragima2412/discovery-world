"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostsComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var _ = require("lodash");
var PostsComponent = /** @class */ (function () {
    function PostsComponent(storageService, postDataService, changeDetectorRef, router, userDataService) {
        this.storageService = storageService;
        this.postDataService = postDataService;
        this.changeDetectorRef = changeDetectorRef;
        this.router = router;
        this.userDataService = userDataService;
        this.title = 'ngx-paging-sample';
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.totalItems = 0;
        this.tableSize = [5, 10, 15, 20];
        this.pagingConfig = {};
        this.destroy$ = new rxjs_1.Subject();
        this.isAuth = false;
        this.user = '';
        this.isLoading = false;
        this.errorMessage = '';
        this.isNoItems = false;
        this.getPosts();
        this.pagingConfig = {
            itemsPerPage: this.itemsPerPage,
            currentPage: this.currentPage,
            totalItems: this.totalItems
        };
    }
    PostsComponent.prototype.ngOnInit = function () {
        this.isLoading = true;
        this.getUser();
        this.getAllUser();
    };
    PostsComponent.prototype.onTableDataChange = function (event) {
        this.pagingConfig.currentPage = event;
        this.getPosts();
    };
    PostsComponent.prototype.onTableSizeChange = function (event) {
        this.pagingConfig.itemsPerPage = event.target.value;
        this.pagingConfig.currentPage = 1;
        this.getPosts();
    };
    PostsComponent.prototype.getPosts = function () {
        var _this = this;
        this.postDataService.posts$
            .pipe(rxjs_1.takeUntil(this.destroy$))
            .subscribe(function (posts) {
            _this.posts = _.cloneDeep(posts);
            _this.isNoItems = _this.posts.length > 0 ? false : true;
            _this.pagingConfig.totalItems = posts.length;
            if (posts.length) {
                _this.isLoading = false;
            }
            _this.changeDetectorRef.markForCheck();
        }, function (error) {
            _this.errorMessage = error;
            _this.isLoading = false;
        });
    };
    PostsComponent.prototype.getUser = function () {
        var _this = this;
        this.storageService.getItem('userData').subscribe(function (val) {
            var userData = JSON.parse(val);
            if (userData) {
                _this.user = _.cloneDeep(userData === null || userData === void 0 ? void 0 : userData.user);
                _this.isAuth = _.cloneDeep(userData === null || userData === void 0 ? void 0 : userData.isAuth);
                _this.changeDetectorRef.markForCheck();
            }
            else {
                _this.isAuth = false;
                _this.user = {};
            }
        });
    };
    PostsComponent.prototype.getAllUser = function () {
        var _this = this;
        this.userDataService.users$.subscribe(function (val) {
            _this.storageService.setItem('allUsers', JSON.stringify(val));
        });
    };
    PostsComponent.prototype.onNewPostClick = function () {
        if (!this.user.id) {
            var popup = document.querySelector('#newPostPopup');
            popup === null || popup === void 0 ? void 0 : popup.classList.toggle('show');
        }
        else {
            this.router.navigate(['/posts/add']);
        }
    };
    PostsComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: 'app-posts',
            templateUrl: './posts.component.html',
            styleUrls: ['./posts.component.scss']
        })
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
