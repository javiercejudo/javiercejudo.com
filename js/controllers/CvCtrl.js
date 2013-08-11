/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'CvCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', '$filter',
      function ($rootScope, $scope, $routeParams, $location, $filter) {
        $scope.cv = {
          params: $routeParams,
          languages: ['english', 'spanish'],
          data: {
            english: {
              name: "Javier Cejudo",
              tag: "CV in English",
              contact: [
                {
                  label: "<span class='glyphicon glyphicon-envelope vertical-middle'></span> Email",
                  value: "<a href='mailto:javier@javiercejudo.com'>javier@javiercejudo.com</a>"
                },
                {
                  label: "<span class='glyphicon glyphicon-link vertical-middle'></span> GitHub",
                  value: "<a href='https://github.com/javiercejudo'>github.com/javiercejudo</a>"
                },
                {
                  label: "<span class='glyphicon glyphicon-phone vertical-middle'></span> Phone",
                  value: "(+61) 0432 429 789"
                }
              ],
              career_objectives: {
                label: "Career Objectives",
                value: "Wish to continue career as a software engineer where skills in database systems, data processing and mathematical training can be used, with special interest in management systems (e.g. finance, e-commerce) and frontend development."
              },
              education: {
                label: "Education",
                list: [
                  "Technical Engineer in Administrative Data Processing, University of La Rioja, 2011.",
                  "Exchange Undergraduate, University of Technology Sydney, 2009.",
                  "Degree in Mathematics, University of La Rioja (Withdrawn in good standing.)",
                  "International Baccalaureate Diploma, 2006."
                ]
              },
              work_experience: {
                label: "Work Experience",
                list: [
                  {
                    title: "Web developer at <a href='http://www.zanui.com.au'>Zanui.com.au</a>",
                    dates: "January 2013 - Present",
                    description: "Participate in the front end and back end development of their online site including a built from scratch mobile version using AngularJS and Symfony 2. Developed their order tracking page which has consistently been in the top 10 visited pages of the site."
                  },
                  {
                    title: "Web developer at <a href='http://www.jig.es/'>JIG Internet Consulting S.L.</a>",
                    dates: "April 2012 - October 2012",
                    description: "Participated in a number of projects working on front end (including rich animations) and back end development. Created a custom SOAP client in PHP to generate dynamic cacheable listings on demand."
                  },
                  {
                    title: "Developer & Innovation Consultant at <a href='http://www.ingenieriaeinnovacion.com/index.php?idioma=en'>Ingeniería e Innovación S.L.</a>",
                    dates: "May 2010 - March 2012",
                    description: "Developed a human resource management tool for R&D projects in PHP and MySQL that managed information of more than 50 client companies and saved the company up to 10 hours per project."
                  }
                ]
              }
            },
            spanish: {
              name: "Javier Cejudo",
              tag: "CV en español",
              contact: [
                {
                  label: "<span class='glyphicon glyphicon-envelope vertical-middle'></span> Correo electrónico",
                  value: "<a href='mailto:javier@javiercejudo.com'>javier@javiercejudo.com</a>"
                },
                {
                  label: "<span class='glyphicon glyphicon-link vertical-middle'></span> GitHub",
                  value: "<a href='https://github.com/javiercejudo'>github.com/javiercejudo</a>"
                },
                {
                  label: "<span class='glyphicon glyphicon-phone vertical-middle'></span> Teléfono",
                  value: "(+61) 0432 429 789"
                }
              ],
              career_objectives: {
                label: "Objetivos profesionales",
                value: "Busco continuar mi carrera como desarrollador en un puesto que requiera habilidades relacionadas con sistemas de bases de datos, procesamiento de información y entrenamiento matemático, con especial interés en sistemas de gestión (por ejemplo: finanzas, comercio electrónico, etc.)."
              },
              education: {
                label: "Educación",
                list: [
                  "Ingeniería Técnica en Informática de Gestión, Universidad de La Rioja, 2006-2011.",
                  "Intercambio de pregrado, Universidad Tecnológica de Sydney (UTS), 2009.",
                  "Primer Ciclo de Licenciatura de Matemáticas, Universidad de La Rioja, 2006-2010.",
                  "Diploma del Bachillerato Internacional, IES Sagasta, 2004-2006."
                ]
              },
              work_experience: {
                label: "Experiencia laboral",
                list: [
                  {
                    title: "Desarrollador web en <a href='http://www.zanui.com.au'>Zanui.com.au</a>",
                    dates: "Enero 2013 - Presente",
                    description: "Participo en el desarrollo front end y back end del sitio web, incluyendo la versión móvil, creada desde cero con AngularJS y Symfony 2. Desarrollé su sistema de seguimiento de pedidos, que se ha consolidado entre las 10 páginas con más visitantes únicos de la web."
                  },
                  {
                    title: "Desarrollador de software en <a href='http://www.jig.es/'>JIG Internet Consulting S.L.</a>",
                    dates: "Abril 2010 - Octubre 2012",
                    description: "Participación en varios proyectos de compañías líderes en diversos sectores. Creación de un cliente SOAP en PHP para generar listados cacehables bajo demanda y del front end de una tienda electrónica en JavaScript + jQuery con animaciones complejas y soporte para drag & drop."
                  },
                  {
                    title: "Técnico de I+D en <a href='http://www.ingenieriaeinnovacion.com/index.php?idioma=es'>Ingeniería e Innovación S.L.</a>",
                    dates: "Mayo 2010 - Marzo 2012",
                    description: "Desarrollo de una herramienta de apoyo para la gestión de recursos humanos en el desarrollo de proyectos de I+D en PHP-MySQL que actualmente gestiona información de más de 60 clientes y ha ahorrado a la empresa hasta 10 horas de tareas de bajo valor añadido por proyecto."
                  }
                ]
              }
            }
          },
          language: null
        };
        
        $scope.cvLan = null;

        $scope.initCv = function () {
          $scope.setLanguage();
        };
        
        $scope.setLanguage = function () {
          var
            cv = $scope.cv,
            params = cv.params,
            languages = cv.languages;

          cv.language = params.language;

          if (params.language && languages.indexOf(params.language) !== -1) {
            $rootScope.pageTitle = 'CV: ' + $filter('jcCapitalise')(params.language);
            $scope.cvLocal = cv.data[params.language];
            return;
          }

          $location.path('/cv/english');
          $location.replace();
        };
      }]
  );

}(angular));

