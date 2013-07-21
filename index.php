<?php include 'config.php'; ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <title>Javier Cejudo · Web Developer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
<?php if (ENV == 'dev') : ?>
    <link href="/bower_components/bootstrap/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="/bower_components/bootstrap/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="/css/stylesheets/jcApp.css" rel="stylesheet">
<?php else : ?>
    <link href="/assets/app.css" rel="stylesheet">
<?php endif; ?>
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72"   href="/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed"                 href="/ico/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon"                                href="/ico/favicon.png">
<?php if (ENV == 'dev') : ?>
    <script src="/bower_components/modernizr/modernizr.js"></script>
<?php else : ?>
    <script src="/assets/modernizr.js"></script>
<?php endif; ?>
  </head>

  <body ng-app="JcApp" ng-controller="AppCtrl">
    <div class="page" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="name" content="Javier Cejudo">
      <meta itemprop="jobTitle" content="Web Developer">
      <meta itemprop="honorificPrefix" content="Mr">
      <meta itemprop="name" content="Javier Cejudo">
      <meta itemprop="givenName" content="Javier">
      <meta itemprop="familyName" content="Cejudo">
      <meta itemprop="gender" content="Male">
      <meta itemprop="url" content="http://javiercejudo.com">
      <div class="masthead">
        <div class="row-fluid">
          <div class="span5">
            <ul class="nav nav-pills">
              <li class="active">
                <a href="/">
                  <i class="icon-home"></i>&nbsp;Home
                </a>
              </li>
            </ul>
          </div>
          <div class="span7 top-contact hidden-phone">
            <div class="row-fluid">
              <div class="span7">
                <i class="icon-envelope"></i>
                <a href="mailto:javier@javiercejudo.com" itemprop="email">
                  javier@javiercejudo.com
                </a>
              </div>
              <div class="span5">
                <i class="icon-signal"></i>
                <span itemprop="telephone">(+61) 0432 429 789</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div ng-view>
        <noscript>
        <div class="no-script">
          Please enable JavaScript to navigate through the site. Thanks!
        </div>
        <?php include 'partials/home.html' ?>
        </noscript>
      </div>

      <hr>

      <div class="footer">
        <p>
          &copy; javiercejudo.com 2013 //
          by <a href="https://plus.google.com/107177203146640599248?rel=author">
          Javier Cejudo</a> //
          <a href="https://github.com/javiercejudo/javiercejudo.com">
            View on GitHub
          </a>
        </p>
      </div>
    </div> <!-- /page -->

<?php if (ENV == 'dev') : ?>
    <script src="/bower_components/jquery/jquery.js"></script>
    <script src="/bower_components/angular/angular.js"></script>
    <script src="/bower_components/bootstrap/bootstrap/js/bootstrap.js"></script>
    <script src="/js/JcApp.js"></script>
    <script src="/js/controllers/AppCtrl.js"></script>
    <script src="/js/controllers/HomeCtrl.js"></script>
<?php else : ?>
    <script src="/assets/app.js"></script>
  <?php endif; ?>
  </body>
</html>

