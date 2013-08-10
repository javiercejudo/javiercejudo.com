<?php require 'config.php'; ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html ng-app="JcApp" ng-controller="AppCtrl" lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html ng-app="JcApp" ng-controller="AppCtrl" lang="en" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html ng-app="JcApp" ng-controller="AppCtrl" lang="en" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html ng-app="JcApp" ng-controller="AppCtrl" lang="en" class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <title ng-bind-template="{{pageTitle}} | Javier Cejudo · Web Developer"></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
<?php if (ENV === 'dev') : ?>
    <link href="/bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <link href="/bower_components/bootstrap-glyphicons/css/bootstrap-glyphicons.css" rel="stylesheet">
    <link href="/css/stylesheets/jcApp.css" rel="stylesheet">
<?php else : ?>
    <link href="/assets/app.css" rel="stylesheet">
<?php endif; ?>
    <!--<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72"   href="/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed"                 href="/ico/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon"                                href="/ico/favicon.png">-->
<?php if (ENV === 'dev') : ?>
    <script src="/bower_components/modernizr/modernizr.js"></script>
<?php else : ?>
    <script src="/assets/modernizr.js"></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-43072086-1', 'javiercejudo.com');
      ga('send', 'pageview');

    </script>
<?php endif; ?>
  </head>

  <body>
    <div class="page" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="name" content="Javier Cejudo">
      <meta itemprop="jobTitle" content="Web Developer">
      
      <header ng-include="'/partials/header.html'"></header>

      <section ng-view>
        <noscript>
        <?php include 'partials/header.html' ?>
        <div class="alert alert-danger">
          Please enable JavaScript to navigate through the site. Thanks!
        </div>
        <?php include 'partials/home.html' ?>
        <?php include 'partials/footer.html' ?>
        </noscript>
      </section>
      
      <footer ng-include="'/partials/footer.html'"></footer>
      
    </div> <!-- /page -->

<?php if (ENV === 'dev') : ?>
    <!--<script src="/bower_components/jquery/jquery.js"></script>-->
    <script src="/bower_components/angular/angular.js"></script>
    <!--<script src="/bower_components/angular-sanitize/angular-sanitize.js"></script>-->
    <!--<script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>-->   
     
    <script src="/js/JcApp.js"></script>
    <script src="/js/AppFilters.js"></script>
    <script src="/js/controllers/AppCtrl.js"></script>
    <script src="/js/controllers/HomeCtrl.js"></script>
    <script src="/js/controllers/CvCtrl.js"></script>
<?php else : ?>
    <script src="/assets/app.js"></script>
<?php endif; ?>
  </body>
</html>

