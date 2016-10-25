/*jslint browser:true unparam:true*/
/*global angular*/

(function () {
    "use strict";

    // Wallet Card Directive
    function WalletCardDirective() {
        return {
            restrict: "EA",
            require: "^hvWallet",
            scope: true,
            link: function (scope, elem, attrs, hvWallet) {
                elem.addClass("hv-wallet-card");

                hvWallet.registerWalletCard(elem);

                elem.on("click", function () {
                    hvWallet.focus(elem);
                });

                elem.on("$destroy", function () {
                    hvWallet.unregisterWalletCard(elem);
                    elem.off("click");
                });
            }
        };
    }

    angular.module("hvWallet")
        .directive("hvWalletCard", WalletCardDirective);
}());