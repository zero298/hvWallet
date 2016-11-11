# hvWallet

## About

hvWallet is a simple AngularJS module that provides a responsive card container structure similar to iOS's Wallet and Reminders apps.

## Installation

**Manual:** download [the latest release](https://github.com/zero298/hvWallet/releases).

**Automatic:** Install hvWallet using [Bower](https://bower.io/).</p>

```bash
bower install hv-wallet
```

## Usage

Inclue hvWallet in your code.

```js
<script src="hvWallet.js"></script>
<link rel="stylesheet" href="hvWallet.css">
```

Inject hvWallet as a dependency to your application.

```js
var app = angular.module("myApp", ["hvWallet"]);
```

Create some elements that use hvWallet.

```html
<ul hv-wallet="">
    <li hv-wallet-card="">
        <p>Hello World!</p>
    </li>
</ul>
```

## Demo

See demo on the [hvWallet demo page](https://zero298.github.io/hvWallet/).

## Share

Please feel free to send a pull request.

## License

**The MIT License (MIT)**

Copyright (c) 2016 Stephen K

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.