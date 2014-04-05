<?php

require 'layout/init.php';

/**
 * @var string  $alma  Data to add to the html element regarding Angular, lang...
 * @var closure $build Function with logic on how to include build files
 */

?>
<!DOCTYPE html>
<!--[if lt IE 9]>      <html <?php echo $alma ?> class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html <?php echo $alma ?> class="no-js"> <!--<![endif]-->

<?php require 'layout/head.php' ?>

<body>
  <div class="page ng-cloak" itemscope itemtype="http://schema.org/Person">
    <meta itemprop="name" content="Javier Cejudo">
    <meta itemprop="jobTitle" content="Web Developer">

    <!--[if lt IE 9]>
      <div class="alert alert-danger">
        Your browser is currently not supported. Please
        <a href="http://whatbrowser.org/">update your browser</a>.
      </div>

      <?php require 'partials/home.html' ?>
      <footer class="footer" ><?php require 'partials/footer.html' ?></footer>
    <![endif]-->

    <!--[if gt IE 8]><!-->
    <noscript>
      <div class="alert alert-danger">
        For full functionality of this site it is necessary to enable JavaScript.
        Here are the <a href="http://www.enable-javascript.com/">
        instructions how to enable JavaScript in your web browser</a>.
      </div>

      <header class="masthead"><?php require 'partials/header.html' ?></header>
      <?php require 'partials/home.html' ?>
      <footer class="footer" ><?php require 'partials/footer.html' ?></footer>
    </noscript>

    <header class="masthead" data-ng-include="'partials/header.html'"></header>
    <section data-ng-view class="jc-view-animation"></section>
    <footer class="footer" data-ng-include="'partials/footer.html'"></footer>
    <!--<![endif]-->
  </div>

  <?php require 'layout/foot.php' ?>

</body>
</html>
