/*jslint browser:true*/
/*global angular*/

(function () {
    "use strict";

    var EXPANDED_CONTAINER_HEIGHT = 20,
        COLLAPSED_CONTAINER_HEIGHT = 100;

    function offsetWithin(arr, allocatedSpace) {
        allocatedSpace = (allocatedSpace || COLLAPSED_CONTAINER_HEIGHT);
        arr.forEach(function (currCard, idx, allCards) {
            currCard.css("top", (((idx / allCards.length) * allocatedSpace) + (100 - allocatedSpace)) + "%");
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
            offsetWithin(this.cards);
        },
        unregisterWalletCard: function (card) {
            this.cards.splice(this.cards.indexOf(card), 1);
            offsetWithin(this.cards);
        },
        focus: function (card) {
            var vm = this;
            if (this.focussedCard === card) {
                this.focussedCard = null;
            } else {
                this.focussedCard = card;
            }
            this.$window.requestAnimationFrame(function () {
                vm.render();
            });
        },
        render: function () {
            var cardsClone = this.cards.slice(),
                card = this.focussedCard;

            if (card) {
                cardsClone.splice(this.cards.indexOf(card), 1);
                card.addClass("expanded");
                card.css("top", "");
                offsetWithin(cardsClone, EXPANDED_CONTAINER_HEIGHT);
            } else {
                this.cards.forEach(function (currCard) {
                    currCard.removeClass("expanded");
                });
                offsetWithin(cardsClone);
            }
        }
    };
    WalletCtrl.$inject = [
        "$window"
    ];

    angular.module("hvWallet")
        .controller("hvWalletCtrl", WalletCtrl);
}());