angular.module('templates-main', ['partials/404.html', 'partials/cv.html', 'partials/footer.html', 'partials/header.html', 'partials/home.html', 'partials/secretary-problem-standalone.html', 'partials/secretary-problem.html']);

angular.module("partials/404.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/404.html",
    "<div class=\"error-page\">\n" +
    "  <div class=\"error-wrapper row\">\n" +
    "    <p class=\"error-code col-12\">404</p>\n" +
    "    <p class=\"error-message col-12\">Page not found</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <hr>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "      <h4>Since you are here, up for a little game?</h4>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-12\" ng-include=\"'/partials/secretary-problem.html'\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/cv.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/cv.html",
    "<div class=\"cv row ng-cloak\" ng-init=\"initCv()\">\n" +
    "  <div class=\"col-sm-12 col-lg-12\">\n" +
    "    <ul class=\"nav nav-pills lang-selector\">\n" +
    "      <li ng-class=\"{active: cv.params.language == 'english'}\">\n" +
    "        <a href=\"/cv/english\" ng-bind-html=\"cv.data.english.tag\"></a>\n" +
    "      </li>\n" +
    "      <li ng-class=\"{active: cv.params.language == 'spanish'}\">\n" +
    "        <a href=\"/cv/spanish\" ng-bind-html=\"cv.data.spanish.tag\"></a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"well col-sm-12 col-lg-12\">\n" +
    "    <h1 ng-bind-html=\"cvLocal.name\"></h1>\n" +
    "    \n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"contact-details\">\n" +
    "      <p ng-repeat=\"contactDetail in cvLocal.contact\">\n" +
    "        <span ng-bind-html=\"contactDetail.label\"></span>:\n" +
    "        <span ng-bind-html=\"contactDetail.value\"></span>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    \n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"career-objectives\">\n" +
    "      <h3 ng-bind-html=\"cvLocal.career_objectives.label\"></h3>\n" +
    "      <p ng-bind-html=\"cvLocal.career_objectives.value\"></p>\n" +
    "    </div>\n" +
    "    \n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"education\">\n" +
    "      <h3 ng-bind-html=\"cvLocal.education.label\"></h3>\n" +
    "      <ul class=\"education-list\">\n" +
    "        <li ng-repeat=\"education in cvLocal.education.list\"\n" +
    "            ng-bind-html=\"education\"></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    \n" +
    "    <hr>\n" +
    "    \n" +
    "    <div class=\"work-experience\">\n" +
    "      <h3 ng-bind-html=\"cvLocal.work_experience.label\"></h3>\n" +
    "      <ul class=\"job-list\">\n" +
    "        <li ng-repeat=\"job in cvLocal.work_experience.list\">\n" +
    "          <p class=\"job-title\" ng-bind-html=\"job.title\"></p>\n" +
    "          <p class=\"job-dates\" ng-bind-html=\"job.dates\"></p>\n" +
    "          <p class=\"job-description\" ng-bind-html=\"job.description\"></p>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/footer.html",
    "<hr>\n" +
    "\n" +
    "<footer class=\"footer row\">\n" +
    "  <div class=\"col-sm-12 col-lg-12\">\n" +
    "    <p>\n" +
    "      &copy; javiercejudo.com 2013 //\n" +
    "      by <a href=\"https://plus.google.com/107177203146640599248?rel=author\">\n" +
    "      Javier Cejudo</a> //\n" +
    "      <a href=\"https://github.com/javiercejudo/javiercejudo.com\">\n" +
    "        View on GitHub\n" +
    "      </a>\n" +
    "    </p>\n" +
    "  </div>\n" +
    "</footer>\n" +
    "");
}]);

angular.module("partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/header.html",
    "<header class=\"masthead row\">\n" +
    "  <div class=\"col-xs-5\">\n" +
    "    <ul class=\"nav nav-pills\">\n" +
    "      <li ng-class=\"{active: path == '/'}\">\n" +
    "        <a href=\"/\" class=\"home-link\">\n" +
    "          <span class=\"glyphicon glyphicon-home home-icon\"></span>\n" +
    "          <span class=\"home-text\">Home</span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"col-xs-7 top-contact hidden-xs\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-7\">\n" +
    "        <span class=\"glyphicon glyphicon-envelope\"></span>\n" +
    "        <a href=\"mailto:javier@javiercejudo.com\" itemprop=\"email\">\n" +
    "          javier@javiercejudo.com\n" +
    "        </a>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-5\">\n" +
    "        <span class=\"glyphicon glyphicon-phone\"></span>\n" +
    "        <span itemprop=\"telephone\">(+61) 0432 429 789</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</header>\n" +
    "\n" +
    "<hr>\n" +
    "");
}]);

angular.module("partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/home.html",
    "<div class=\"home\" ng-init=\"$root.pageTitle = 'Home'\">\n" +
    "  <div class=\"main-message row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "      <h1 class=\"title\">\n" +
    "        <div class=\"hidden-xs\">\n" +
    "          <span class=\"tags\">&lt;</span>\n" +
    "          Javier Cejudo\n" +
    "          <span class=\"tags\">/&gt;</span>\n" +
    "        </div>\n" +
    "        <div class=\"visible-xs\">\n" +
    "          Javier Cejudo\n" +
    "        </div>\n" +
    "      </h1>\n" +
    "\n" +
    "      <p class=\"lead\">\n" +
    "        I'm a young software engineer wishing to continue my career as a web\n" +
    "        developer where skills in database systems, data processing and\n" +
    "        mathematical training can be used, with special interest in frontend\n" +
    "        development and management systems (e.g. e-commerce, finance).\n" +
    "      </p>\n" +
    "\n" +
    "      <a class=\"btn btn-lg btn-success\" href=\"/cv/english\">\n" +
    "        See my CV in English…\n" +
    "      </a>\n" +
    "      <a class=\"btn btn-default jc-btn-default\" href=\"/cv/spanish\">\n" +
    "        … o ve mi CV en español\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <hr />\n" +
    "\n" +
    "  <div class=\"latest-projects\" id=\"my-latest-projects\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-7\">\n" +
    "        <h3>Latest projects</h3>\n" +
    "        <h4 class=\"title\">\n" +
    "          <a href=\"https://github.com/javiercejudo/javiercejudo.com\">JavierCejudo.com</a>\n" +
    "        </h4>\n" +
    "        <p>\n" +
    "          This website! Built using modern technologies including AngularJs,\n" +
    "          Bootstrap 3, Sass + Compass, Grunt, Bower, Karma, Jasmine...\n" +
    "        </p>\n" +
    "\n" +
    "        <h4 class=\"title\">\n" +
    "          <a href=\"https://github.com/javiercejudo/DejaVideo\">DejaVideo</a>\n" +
    "          <small>\n" +
    "            <a href=\"http://dejavideo.javiercejudo.com\">(live example)</a>\n" +
    "          </small>\n" +
    "        </h4>\n" +
    "        <p>\n" +
    "          A responsive HTML5 + CSS3 video player with directory navigation and\n" +
    "          an easily configurable PHP back end.\n" +
    "        </p>\n" +
    "\n" +
    "        <h4 class=\"title\">\n" +
    "          <a href=\"https://github.com/javiercejudo/Australian-News\">AusNews</a>\n" +
    "        </h4>\n" +
    "        <p>\n" +
    "          A lightweight RSS reader written in PHP that includes advanced features\n" +
    "          like instant search with Google suggestions, infinite scrolling, and\n" +
    "          unobtrusive JavaScript.</p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-sm-5\">\n" +
    "        <h3>Experiments</h3>\n" +
    "        <h4 class=\"title\">\n" +
    "          <a href=\"https://github.com/javiercejudo/javiercejudo.com/blob/master/js/controllers/SecretaryProblemCtrl.js\">\n" +
    "            AngularJs Game</a>\n" +
    "          <small>\n" +
    "            <a href=\"/game\">(play)</a>\n" +
    "          </small>\n" +
    "        </h4>\n" +
    "        <p>\n" +
    "          A little game based on a\n" +
    "          <a href=\"http://en.wikipedia.org/wiki/Secretary_problem\">known mathematical problem</a> about optimal stopping theory.\n" +
    "        </p>\n" +
    "\n" +
    "        <h4 class=\"title\">\n" +
    "          <a href=\"https://github.com/javiercejudo/Flickr-gallery\">\n" +
    "            Flickr Gallery\n" +
    "          </a>\n" +
    "        </h4>\n" +
    "        <p>A simple Flickr gallery to demonstrate the Flickr API.</p>\n" +
    "\n" +
    "        <h4 class=\"title\">\n" +
    "          <a href=\"https://github.com/javiercejudo/pfc\">\n" +
    "            Final Year Project\n" +
    "          </a>\n" +
    "        </h4>\n" +
    "        <p>Code samples and extensive documentation (in Spanish)</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/secretary-problem-standalone.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/secretary-problem-standalone.html",
    "<div class=\"row\">\n" +
    "  <div class=\"col-xs-12\" ng-include=\"'/partials/secretary-problem.html'\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/secretary-problem.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/secretary-problem.html",
    "<div class=\"secretary-problem\"\n" +
    "     ng-controller=\"SecretaryProblemCtrl\"\n" +
    "     ng-init=\"$root.pageTitle = 'Game'; initSecretaryProblem();\">\n" +
    "  <p>\n" +
    "    Click on a briefcase to see its content. If you stop and bet on the one with\n" +
    "    the highest amount of money, you win; otherwise you lose.\n" +
    "    <a href=\"http://en.wikipedia.org/wiki/Secretary_problem\">Read more about this game.</a>\n" +
    "  </p>\n" +
    "  <p class=\"num-items\">\n" +
    "    Number of briefcases:\n" +
    "    <a href=\"/game/2\"   ng-class=\"{current: game.n == 2  }\">2</a>   ·\n" +
    "    <a href=\"/game/3\"   ng-class=\"{current: game.n == 3  }\">3</a>   ·\n" +
    "    <a href=\"/game/5\"   ng-class=\"{current: game.n == 5  }\">5</a>   ·\n" +
    "    <a href=\"/game/10\"  ng-class=\"{current: game.n == 10 }\">10</a>  ·\n" +
    "    <a href=\"/game/20\"  ng-class=\"{current: game.n == 20 }\">20</a>  ·\n" +
    "    <a href=\"/game/50\"  ng-class=\"{current: game.n == 50 }\">50</a>  ·\n" +
    "    <a href=\"/game/100\" ng-class=\"{current: game.n == 100}\">100</a> ·\n" +
    "    <a href=\"/game/256\" ng-class=\"{current: game.n == 256}\">256</a>\n" +
    "  </p>\n" +
    "  <p class=\"visible-xs\">\n" +
    "    Find controls at the bottom.\n" +
    "  </p>\n" +
    "  <ul class=\"list\">\n" +
    "    <li class=\"item\" ng-repeat=\"item in game.items\" ng-click=\"generateItemValue($index)\"\n" +
    "        ng-class=\"{selected: game.itemSelected == $index,\n" +
    "                   max: isMax($index),\n" +
    "                   current: isCurrent($index),\n" +
    "                   rejected: isRejected($index),\n" +
    "                   'non-actionable': isRejected($index)}\">\n" +
    "      <span class=\"icon glyphicon glyphicon-briefcase\"></span>\n" +
    "      <div ng-switch on=\"item\">\n" +
    "        <div ng-switch-when=\"-1\">\n" +
    "          {{game.unknownValue}}\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "          ${{item | number:0}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "  <div>\n" +
    "    <span class=\"btn btn-primary button-select-item\" ng-click=\"selectItem(game.lastItemShown)\"\n" +
    "          ng-class=\"{disabled: !canSelectItem()}\">\n" +
    "      Stop and bet on the current briefcase\n" +
    "    </span>\n" +
    "    <span class=\"btn btn-primary button-next-item\" ng-click=\"showNext()\"\n" +
    "          ng-class=\"{disabled: !canShowNext()}\">\n" +
    "      Show next\n" +
    "    </span>\n" +
    "    <span class=\"btn btn-danger button-new-game\" ng-click=\"initSecretaryProblem()\"\n" +
    "          ng-class=\"{disabled: game.itemSelected == -1 && game.numItemsShown == 0}\">\n" +
    "      New game\n" +
    "    </span>\n" +
    "    <span ng-switch on=\"game.won\" class=\"result\">\n" +
    "      <span ng-switch-when=\"true\">You won :)</span>\n" +
    "      <span ng-switch-when=\"false\">You lost :(</span>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "  <p ng-show=\"game.record.gamesPlayed > 0\">\n" +
    "    Your record with {{game.n}} briefcases:\n" +
    "    {{game.record.gamesWon}}/{{game.record.gamesPlayed}}\n" +
    "    ({{100 * game.record.gamesWon / game.record.gamesPlayed | number:2}}%)\n" +
    "     -\n" +
    "    <a href=\"javascript:;\" ng-click=\"resetRecord()\">Reset</a>\n" +
    "  </p>\n" +
    "</div>\n" +
    "");
}]);
