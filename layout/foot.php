<?php

/**
 * @var string  $alma  Data to add to the html element regarding Angular, lang...
 * @var closure $build Function with logic on how to include build files
 */

?>
<script>var ENV = '<?php echo ENV ?>';</script>

<?php if (ENV === 'dev') : ?>
  <script src='bower_components/firebase/firebase.js'></script>
  <!-- <script src="bower_components/modernizr/modernizr.js"></script> -->
  <script src="bower_components/jquery/dist/jquery.js"></script>

  <script src="node_modules/angular/angular.js"></script>
  <script src="node_modules/angular-route/angular-route.js"></script>
  <script src="node_modules/angular-sanitize/angular-sanitize.js"></script>
  <script src="node_modules/angular-touch/angular-touch.js"></script>
  <script src="node_modules/angular-animate/angular-animate.js"></script>

  <script src="bower_components/angularfire/dist/angularfire.js"></script>
  <script src="bower_components/ngstorage/ngStorage.js"></script>

  <script src="partials/templates.js"></script>

  <script src="bower_components/bootstrap/js/collapse.js"></script>
  <script src="bower_components/bootstrap/js/transition.js"></script>

  <script src="js/config.js"></script>

  <script src="js/JcApp.js"></script>

  <script src="js/AppDirectives.js"></script>
  <script src="js/AppFilters.js"></script>

  <script src="js/controllers/AppCtrl.js"></script>
  <script src="js/controllers/HomeCtrl.js"></script>
  <script src="js/controllers/CvCtrl.js"></script>
  <script src="js/controllers/SecretaryProblemCtrl.js"></script>
<?php else : ?>
  <script src="<?php echo $build("bottom", "js") ?>"></script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-43072086-1', 'www.javiercejudo.com');
  </script>
<?php endif ?>
