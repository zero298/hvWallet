/*jslint browser:true*/
/*global angular*/

(function () {
    "use strict";

    var EXPANDED_CONTAINER_HEIGHT = 20,
        COLLAPSED_CONTAINER_HEIGHT = 100;

    function offsetWithin(arr, allocatedSpace) {
        var curr = 0,
            offsetSpace,
            increment;
        allocatedSpace = (allocatedSpace || COLLAPSED_CONTAINER_HEIGHT);
        offsetSpace = (100 - allocatedSpace);
        increment = ((1 / arr.length) * allocatedSpace);
        arr.forEach(function (currCard, idx, allCards) {
            currCard.css("top", (curr + offsetSpace) + "%");
            curr += increment;
        });
    }

    // Wallet Controller
    function WalletCtrl($window) {
        this.$window = $window;
        this.cards = [];
    }
    WalletCtrl.prototype = {
        registerWalletCard: function (card) {
            this.cards.push(card);
            this.render();
        },
        unregisterWalletCard: function (card) {
            this.cards.splice(this.cards.indexOf(card), 1);
            this.focus(card);
        },
        focus: function (card) {
            this.focussedCard = (this.focussedCard === card ? null : card);
            this.render();
        },
        render: function () {
            var cards = this.cards,
                cardsClone = this.cards.slice(),
                focussedCard = this.focussedCard;

            function realRender() {
                if (focussedCard) {
                    cardsClone.splice(cards.indexOf(focussedCard), 1);
                    focussedCard.addClass("expanded");
                    focussedCard.css("top", "");
                    offsetWithin(cardsClone, EXPANDED_CONTAINER_HEIGHT);
                } else {
                    cards.forEach(function (currCard) {
                        currCard[0].scrollTop = 0;
                        currCard.removeClass("expanded");
                    });
                    offsetWithin(cardsClone);
                }
            }

            this.$window.requestAnimationFrame(realRender);
        }
    };
    WalletCtrl.$inject = [
        "$window"
    ];

    angular.module("hvWallet")
        .controller("hvWalletCtrl", WalletCtrl);
}());