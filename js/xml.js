angular.module('comments', ['xml', 'iso.directives'])
.config(function ($httpProvider) {
      $httpProvider.interceptors.push('xmlHttpInterceptor');
    })
.controller('BlogsCtrl', BlogsController)
.service('BlogsService', BlogsService)
.directive('showMore',showMoreDirective)
.filter('subString',subStringFilter)
.constant('ApiBasePath', 'xmlComments.xml')
.filter('trusted',
   function($sce) {
     return function(ss) {
       return $sce.trustAsHtml(ss)
     };
   }
);

function showMoreDirective() {
  return {
      restrict: 'AE',
      replace: true,
      scope: {
          text: '=',
          limit:'='
      },
      template: '<div style="white-space: pre-wrap;"><p ng-show="largeText"><span ng-bind-html="text | subString :0 :end|trusted"> {{text | subString :0 :end  }}</span><span ng-show="isShowMore">...</span> <div ng-click="showMore();reLayout()" ng-show="isShowMore" class="morelink">Read More</div><div class="showless morelink" ng-click="showLess();reLayout()" ng-hide="isShowMore">Read Less </div></p><p ng-hide="largeText">{{ text }}</p></div> ',
      link: function(scope, iElement, iAttrs) {
          scope.end = scope.limit;
          if (scope.text.length > scope.limit) {
            scope.isShowMore = true;
            scope.largeText = true;
          } else {
            var Element = iElement.context.childNodes[2];
            var IeElement = iElement;
            IeElement.addClass('ie-removeItem');
            Element.remove();
          }
          if (scope.text.length <= scope.limit) {
              scope.largeText = false;
          };
          scope.showMore = function() {
              scope.end = scope.text.length;
              scope.isShowMore = false;
              
          };
          scope.showLess = function() {
              scope.end = scope.limit;
              scope.isShowMore = true;
              
          };
          scope.reLayout = function(){
            scope.$emit("iso-method", {name:"layout",params:null});
            scope.$emit("iso-option", {itemSelector: ".grid-item"});
          }
      }
  };
}

function subStringFilter() {
    return function(str, start, end) {
        if (str != undefined) {
            return str.substr(start, end);
        }
    }
    return function (text, target, otherProp) {
        return text.replace("the","NO")
    };

}

BlogsController.$inject = ['$scope','BlogsService'];
function BlogsController($scope, BlogsService){
  var commentList = this;
  var promise = BlogsService.getBlogs();
  promise.then(function(response){
    commentList.comments = response;
      console.log(commentList.comments);
  })
  .catch(function (error) {
    console.log('Noooooo, an error occurred', error);
  }); 
  $scope.limitComments = 12;
  $scope.loadMore = function(){
    var increment = $scope.limitComments + 3;
    console.log (commentList.comments.length );
    $scope.limitComments = increment > commentList.comments.length ? commentList.comments.length : increment;
    
  }
  $scope.clearSearch = function(){
    $scope.searchBox = "";
  }
};

BlogsService.$inject = ['$http', 'ApiBasePath'];
function BlogsService($http, ApiBasePath){
  var service = this;
  service.getBlogs = function(){
    return $http({
      method: "GET",
      url: ApiBasePath
    }).then(function(result){
        var comments = result.data.blogs.blog;
        return comments;
    });
  }
}

