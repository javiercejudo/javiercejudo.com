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
              contact : [
                {
                  label: "Email",
                  value: "javier@javiercejudo.com"
                },
                {
                  label: "Phone",
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
                    title: "January 2013 - Present, Web developer at Zanui.com.au",
                    description: "Participate in the front end and back end development of their online site including a built from scratch mobile version using AngularJS and Symfony 2. Developed their order tracking page which has consistently been in the top 10 visited pages of the site."
                  },
                  {
                    title: "April 2012 - October 2012, Web developer at JIG Internet Consulting S.L.",
                    description: "Participated in a number of projects working on front end (including rich animations) and back end development. Created a custom SOAP client in PHP to generate dynamic cacheable listings on demand."
                  },
                  {
                    title: "May 2010 - March 2012, Developer & Innovation Consultant at Ingeniería e Innovación S.L.",
                    description: "Developed a human resource management tool for R&D projects in PHP and MySQL that managed information of more than 50 client companies and saved the company up to 10 hours per project."
                  }
                ]
              }
            },
            spanish: {
              contact: [
                {
                  label: "Correo electrónico",
                  value: "javier@javiercejudo.com"
                },
                {
                  label: "Teléfono",
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
                    title: "Enero 2013 - Presente, Desarrollador web en Zanui.com.au",
                    description: "Participo en el desarrollo front end y back end del sitio web, incluyendo la versión móvil, creada desde cero con AngularJS y Symfony 2. Desarrollé su sistema de seguimiento de pedidos, que se ha consolidado entre las 10 páginas con más visitantes únicos de la web."
                  },
                  {
                    title: "Abril 2010 - Octubre 2012, Desarrollador de software en Get App Spain, S.L.",
                    description: "Participación en varios proyectos de compañías líderes en diversos sectores. Creación de un cliente SOAP en PHP para generar listados cacehables bajo demanda y del front end de una tienda electrónica en JavaScript + jQuery con animaciones complejas y soporte para drag & drop."
                  },
                  {
                    title: "Mayo 2010 - Marzo 2012, Técnico de I+D en A&B Ingeniería e Innovación, S.L.",
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

