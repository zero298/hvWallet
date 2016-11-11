/*jslint browser:true unparam:true*/
/*global angular*/

(function () {
    "use strict";

    // Wallet Directive
    function WalletDirective() {
        return {
            restrict: "EA",
            controller: "hvWalletCtrl",
            link: function (scope, elem) {
                elem.addClass("hv-wallet");
            }
        };
    }

    angular.module("hvWallet")
        .directive("hvWallet", WalletDirective);
}());