<?php require 'config.php'; ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html ng-app="JcApp" ng-controller="AppCtrl" lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html ng-app="JcApp" ng-controller="AppCtrl" lang="en" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html ng-app="JcApp" ng-controller="AppCtrl" lang="en" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html ng-app="JcApp" ng-controller="AppCtrl" lang="en" class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <title>Javier Cejudo · Web Developer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
<?php if (ENV === 'dev') : ?>
    <link href="/bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <link href="/css/stylesheets/jcApp.css" rel="stylesheet">
<?php else : ?>
    <link href="/assets/app.css" rel="stylesheet">
<?php endif; ?>
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72"   href="/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed"                 href="/ico/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon"                                href="/ico/favicon.png">
<?php if (ENV === 'dev') : ?>
    <script src="/bower_components/modernizr/modernizr.js"></script>
<?php else : ?>
    <script src="/assets/modernizr.js"></script>
<?php endif; ?>
  </head>

  <body>
    <div class="page" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="name" content="Javier Cejudo">
      <meta itemprop="jobTitle" content="Web Developer">
      <meta itemprop="honorificPrefix" content="Mr">
      <meta itemprop="name" content="Javier Cejudo">
      <meta itemprop="givenName" content="Javier">
      <meta itemprop="familyName" content="Cejudo">
      <meta itemprop="gender" content="Male">
      <meta itemprop="url" content="http://javiercejudo.com">
      <div class="masthead row">
        <div class="col-sm-5 col-lg-5">
          <ul class="nav nav-pills">
            <li ng-class="{active: path == '/'}">
              <a href="/">
                Home
              </a>
            </li>
          </ul>
        </div>
        <div class="col-sm-7 col-lg-7 top-contact hidden-sm">
          <div class="row">
            <div class="col-sm-7 col-lg-7">
              <a href="mailto:javier@javiercejudo.com" itemprop="email">
                javier@javiercejudo.com
              </a>
            </div>
            <div class="col-sm-5 col-lg-5">
              <span itemprop="telephone">(+61) 0432 429 789</span>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div ng-view>
        <noscript>
        <div class="alert alert-danger">
          Please enable JavaScript to navigate through the site. Thanks!
        </div>
        <?php include 'partials/home.html' ?>
        </noscript>
      </div>

      <hr>

      <div class="footer row">
        <div class="col-sm-12 col-lg-12">
          <p>
            &copy; javiercejudo.com 2013 //
            by <a href="https://plus.google.com/107177203146640599248?rel=author">
            Javier Cejudo</a> //
            <a href="https://github.com/javiercejudo/javiercejudo.com">
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div> <!-- /page -->

<?php if (ENV === 'dev') : ?>
    <!--<script src="/bower_components/jquery/jquery.js"></script>-->
    <script src="/bower_components/angular/angular.js"></script>
    <script src="/bower_components/angular-sanitize/angular-sanitize.js"></script>
    <!--<script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>-->
    <script src="/js/JcApp.js"></script>
    <script src="/js/controllers/AppCtrl.js"></script>
    <script src="/js/controllers/HomeCtrl.js"></script>
    <script src="/js/controllers/CvCtrl.js"></script>
<?php else : ?>
    <script src="/assets/app.js"></script>
<?php endif; ?>
  </body>
</html>

