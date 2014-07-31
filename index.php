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
  <?php
  require 'layout/content.php';
  require 'layout/foot.php'
  ?>
</body>
</html>
