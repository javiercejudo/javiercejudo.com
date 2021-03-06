## The concept

> Microdata annotates the DOM with scoped name/value pairs from custom vocabularies.

The vocabulary we are using is [Schema.org](http://schema.org/), which is
recognized by Google, Bing and Yahoo! among others.

## The goal

Help search engines understand the content of a page in a semantic way.

## Basic example

Pay special attention to the attributes `itemscope`, `itemtype` and `itemprop`,
and to the `meta` tags:

```html
<div itemscope itemtype="http://schema.org/Product">
  <meta itemprop="sku" content="123-sku">
  <h1 itemprop="name">
    Product title
  </h1>
  <span class="brand-name" itemprop="brand" itemscope
        itemtype="http://schema.org/Brand">
    <a itemprop="url" href="/brand-1">
      <span itemprop="name">Brand name</span>
    </a>
  </span>
  <span class="star-wrap" itemprop="aggregateRating" itemscope
        itemtype="http://schema.org/AggregateRating">
    <meta itemprop="bestRating" content="5">
    <meta itemprop="ratingValue" content="4">
    <meta  content="2">
    <span class="fa-icon-star"></span>
    <span class="fa-icon-star"></span>
    <span class="fa-icon-star"></span>
    <span class="fa-icon-star"></span>
    <span class="fa-icon-star stop"></span>
    <span>
      (<span class="rating-num stop" itemprop="reviewCount">2</span>)
    </span>
  </span>
  ...
</div>
```

The previous syntax describes a structure like the following:

- **Product** [creates a new scope]
     - *Sku:* 123-sku
     - *Name:* Product name
     - **Brand** [creates a new scope]
          - *URL:* /brand-1
          - *Name:* Brand name
     - **Aggregate rating** [creates a new scope]
          - *Best rating:* 5
          - *Rating value:* 4
          - *Review count:* 2
     - ...

All that information is extracted by search engines and they can use it to
improve their results.

## Things to consider when annotating data

While implementing the rich snippets, one challenge we might come across is
that the data we want to annotate is either not in the DOM or it is not readily
available to be annotated. In other cases, even if the information is readily
available, the vocabulary requires it to be specified in a certain way. Have a
look at the following cases:

```html
<!-- 1. The data is not in the DOM! -->

<meta itemprop="sku" content="123-sku">

<!-- 2. The data cannot be annotated as is! -->

<!--
The rating of a particular product is represented in the DOM
by stars that cannot be annotated.
We need to markup the actual value (★★★★☆ → 4):
-->

<meta itemprop="bestRating" content="5">
<meta itemprop="ratingValue" content="4">

<!--
The date of a review is displayed but it is not
machine friendly (09/07/2013 → 2013-07-09):
-->

<span itemprop="datePublished" content="2013-07-09">09/07/2013</span>

<!-- 3. The data needs to be specified in a certain way! -->

<!--
Stock availability is shown in the DOM as 'In Stock',
but the vocabulary needs it to be specified as follows
-->

<link itemprop="availability" href="http://schema.org/InStock" />
```

The documentation is clear about which properties need to be declared as above
and the options available.

## Things to consider when writing new HTML, applying CSS styles or simply moving things around

### Wrap semantic blocks

To make it easy for new HTML to be annotated, it is good practice to wrap any
piece of information into its own element. A problem that we had when annotating
the product page was that the only common parent of the product information and
its reviews was the `body`, so we needed to wrap all the information in the
product page into its own `div`, which of course created a huge diff in Git.
The same applies to small pieces of information: if you need to display the
brand of a product and the product name, wrap each one into its own element:

```html
<!--Suboptimal  -->
<div class="product-details">
  Brand name - Product name
</div>

<!--Better  -->
<div class="product-details">
  <span>Brand name</span> - <span>Product name</span>
</div>
```

### Apply CSS styles via HTML classes

Continuing with the example above, if we need to apply styling to the brand
name, it is better to do it through classes as this way is more robust than
applying styles through elements.

### Moving things around

As the microdata lives within the HTML, changes in the markup of a page can
easily break pre-existing annotations. To prevent that, if a block containing
microdata needs to be refactored, make sure to use the
[Google Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets)
to check that the microdata is still valid or needs to be rearranged as well
(e.g. maybe a property that belongs to a particular scope has been moved out
of that scope).

## References

- [Getting started with schema.org](http://schema.org/docs/gs.html)
- [Dive Into HTML5: What is microdata?](http://diveintohtml5.info/extensibility.html#what-is-microdata)
- [Living Standard - Microdata](http://www.whatwg.org/specs/web-apps/current-work/multipage/microdata.html#microdata)
- [Google Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets)