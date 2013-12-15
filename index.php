<?php

header('Content-Type: text/html; charset=utf-8');

define('ENV', (getenv('ENV') !== false) ? getenv('ENV') : 'live');

$assetsMapFile = '';
$assetsMap     = '';

$almaArray = array(
    'angular' => 'data-ng-app="JcApp" data-ng-controller="AppCtrl"',
    'lang'    => 'lang="en"'
);

if (ENV === 'live') {
    $almaArray['manifest'] = 'manifest="manifest.appcache"';

    $assetsMapFile = file_get_contents('assets.map.json');
    $assetsMap     = json_decode($assetsMapFile, true);
}

$alma = implode(' ', $almaArray);

?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html <?php echo $alma ?> class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html <?php echo $alma ?> class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html <?php echo $alma ?> class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html <?php echo $alma ?> class="no-js"> <!--<![endif]-->
  <head>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <title data-ng-bind-template="{{pageTitle}} | Javier Cejudo · Web Developer">Javier Cejudo · Web Developer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
          content="I'm a young software engineer wishing to continue my career as a web
                   developer with special interest in frontend development and management
                   systems (e.g. e-commerce, finance) to apply my skills in databases,
                   data processing and mathematical training.">
    <meta name="author" content="Javier Cejudo">

<?php if (ENV === 'dev') : ?>
    <link href="css/stylesheets/custom-bootstrap.css" rel="stylesheet">
    <link href="css/stylesheets/jcApp.css" rel="stylesheet">
<?php else : ?>
    <link href="assets/<?php echo $assetsMap['app.css'] ?>" rel="stylesheet">
<?php endif ?>

    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72"   href="ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed"                 href="ico/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon"                                href="ico/favicon.png">

    <!--[if lt IE 9]>
<?php if (ENV === 'dev') : ?>
      <script src="bower_components/html5shiv/dist/html5shiv.js"></script>
      <script src="bower_components/respond/dest/respond.src.js"></script>
<?php else : ?>
      <script src="assets/<?php echo $assetsMap['top.js'] ?>"></script>
<?php endif ?>
    <![endif]-->
  </head>

  <body>
    <div class="page ng-cloak" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="name" content="Javier Cejudo">
      <meta itemprop="jobTitle" content="Web Developer">

      <!--[if lt IE 8]>
        <div class="alert alert-danger">
            Your browser is currently not supported. Please
            <a href="http://whatbrowser.org/">update your browser</a>.
        </div>

        <?php include 'partials/home.html' ?>
        <footer class="footer" ><?php include 'partials/footer.html' ?></footer>
      <![endif]-->

      <!--[if gt IE 7]><!-->
      <!--[if IE 8]>
      <div class="alert alert-danger">
        For full functionality of this site you need to
        <a href="http://whatbrowser.org/">update your browser</a>.
      </div>
      <![endif]-->

      <noscript>
        <div class="alert alert-danger">
          For full functionality of this site it is necessary to enable JavaScript.
          Here are the <a href="http://www.enable-javascript.com/">
          instructions how to enable JavaScript in your web browser</a>.
        </div>

        <header class="masthead"><?php include 'partials/header.html' ?></header>
        <?php include 'partials/home.html' ?>
        <footer class="footer" ><?php include 'partials/footer.html' ?></footer>
      </noscript>

      <header class="masthead" data-ng-include="'partials/header.html'"></header>
      <section data-ng-view></section>
      <footer class="footer" data-ng-include="'partials/footer.html'"></footer>
      <!--<![endif]-->

      </div> <!-- /page -->

    <script>var ENV = '<?php echo ENV ?>';</script>

<?php if (ENV === 'dev') : ?>
    <script src='vendor/firebase/firebase.js'></script>
    <script src="bower_components/modernizr/modernizr.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
    <script src="bower_components/angular-touch/angular-touch.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angularfire/angularfire.js"></script>
    <script src="bower_components/ngstorage/ngStorage.js"></script>

    <script src="partials/templates.js"></script>

    <script src="js/config.js"></script>
    <script src="js/JcApp.js"></script>
    <script src="js/AppDirectives.js"></script>
    <script src="js/AppFilters.js"></script>
    <script src="js/controllers/AppCtrl.js"></script>
    <script src="js/controllers/HomeCtrl.js"></script>
    <script src="js/controllers/CvCtrl.js"></script>
    <script src="js/controllers/SecretaryProblemCtrl.js"></script>
<?php else : ?>
    <script src="assets/<?php echo $assetsMap['firebase.js'] ?>"></script>
    <script src="assets/<?php echo $assetsMap['app.js'] ?>"></script>
    <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='//www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','UA-43072086-1');
    </script>
<?php endif ?>
  </body>
</html>
