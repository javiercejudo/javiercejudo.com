<?php

/**
 * @var string  $alma  Data to add to the html element regarding Angular, lang...
 * @var closure $build Function with logic on how to include build files
 */

?>
<head>
  <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
  <title data-ng-bind-template="{{pageTitle}} | Javier Cejudo · Web Developer">Javier Cejudo · Web Developer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Javier Cejudo">
  <meta name="description"
        content="I'm a young software engineer wishing to continue my career as a web
                 developer with special interest in frontend development and management
                 systems (e.g. e-commerce, finance) to apply my skills in databases,
                 data processing and mathematical training.">

<?php if (ENV === 'dev') : ?>
  <link href="css/custom-bootstrap.css" rel="stylesheet">
  <link href="css/jcApp.css" rel="stylesheet">
<?php else : ?>
  <link href="<?php echo $build("app", "css") ?>" rel="stylesheet">
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
  <script src="<?php echo $build("top", "js") ?>"></script>
<?php endif ?>
  <![endif]-->
</head>
