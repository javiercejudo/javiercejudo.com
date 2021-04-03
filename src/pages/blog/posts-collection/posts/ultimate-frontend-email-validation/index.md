It is common practice to validate emails using complex regular expressions,
but chances are they are all technically wrong. Frontend validation in general
is great for letting users know of issues early, but it cannot come at the cost
of rejecting valid input:

Well, here is my attempt:

```js
(function () {
  'use strict';

  const api = {};

  // element needs to have type="email"
  api.isValidEmail = function (element) {
    // leverage the Constraint Validation API when it is available
    if (typeof element.checkValidity === 'function') {
      return element.checkValidity();
    }

    // otherwise, this is about the only regex
    // that doesn't reject any valid email addresses
    return /@/.test(element.value);
  };
})();
```

Please note that, at the time of writing, the Constraint Validation API has a
willful violation of RFC 5322 with the following explanation:

> [RFC 5322] defines a syntax for e-mail addresses that is simultaneously
> too strict (before the "@" character), too vague (after the "@" character),
> and too lax (allowing comments, whitespace characters, and quoted strings
> in manners unfamiliar to most users) to be of practical use here.

Source: [W3C E-mail state](http://www.w3.org/TR/html5/forms.html#valid-e-mail-address)

That link also provides a regular `expression` that implements the
current specification in case you really want to go down that road:

```
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
```
