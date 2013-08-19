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
    <meta name="description"
          content="I'm a young software engineer wishing to continue my career as a web
                   developer where skills in database systems, data processing and
                   mathematical training can be used, with special interest in frontend
                   development and management systems (e.g. e-commerce, finance).">
    <meta name="author" content="Javier Cejudo">

<?php if (ENV === 'dev') : ?>
    <link href="/bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <link href="/bower_components/bootstrap-glyphicons/css/bootstrap-glyphicons.css" rel="stylesheet">
    <link href="/css/stylesheets/jcApp.css" rel="stylesheet">
<?php else : ?>
    <link href="/assets/app.css" rel="stylesheet">
<?php endif; ?>

    <!--
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72"   href="/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed"                 href="/ico/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon"                                href="/ico/favicon.png">
    -->

    <script src="/assets/modernizr.js"></script>
  </head>

  <body>
    <div class="page" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="name" content="Javier Cejudo">
      <meta itemprop="jobTitle" content="Web Developer">

      <header>
        <?php include 'partials/header.html' ?>
      </header>

      <section ng-view>
        <noscript>
        <div class="alert alert-danger">
          Please enable JavaScript to navigate through the site. Thanks!
        </div>
        <?php include 'partials/home.html' ?>
        </noscript>
      </section>

      <footer>
        <?php include 'partials/footer.html' ?>
      </footer>
    </div> <!-- /page -->

    <script src="/assets/app.js"></script>
<?php if (ENV === 'live') : ?>
    <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='//www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','<?php echo GA_UA ?>');ga('send','pageview');
    </script>
<?php endif; ?>
  </body>
</html>

