If you search for CSS limitations on IE, you will see sites where they state
that IE has a size limitation for CSS files, but in fact that is not the case:

- All style rules after the first 4,095 selectors are not applied. This is limited per sheet, not globally.
- All style tags after the first 31 style tags are not applied.
- On pages that uses the `@import` rule to continously import external style sheets that import other style sheets, style sheets that are more than three levels deep are ignored.

Here is a
[live demo for the first case](http://demos.telerik.com/testcases/4095issues.html).

IE 10 has limitations of the same nature but it'd take a lot more effort to
reach them:

- A sheet may contain up to 65534 rules.
- A document may use up to 4095 stylesheets.
- `@import` nesting is limited to 4095 levels (due to the 4095 stylesheet limit).

If you think you might having issues due to the 4,095 constraint, you can take
your CSS and roughly count the number of selectors following the following
formula,

> Selectors ≈ Braces + Commas

where `Braces` is the number of braces (`{`), and `Commas` is the number of
commas (`,`). The formula is an approximation because there are commas inside
some CSS rules. A better option is to run your stylesheets through
[CSS Stats](http://cssstats.com).

A quick solution is to simply separate the CSS file(s) with problems into
smaller pieces.

There is a
[github project with tests for this](https://github.com/makandra/ie-css-test)
you can check out that confirms that the size is not the issue:

> There are some rumors on the interwebs about IE breaking at a file size around roughly 288 kilobytes.
>
> We generate a CSS file of about 500 kb (when built statically).
>
> Tested with IE 8 and 9, none broke. People were probably just hitting the selector limit.

## References

- [Microsoft Support](http://support.microsoft.com/kb/262161)
- [IEInternals](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx)
