define([
    './module'
], function (module) {
    'use strict';
    
    module.controller('MainCtrl', function ($scope, $http, $location) {
        $scope.log = function (message) {
            console.log(message);
        };
        
        $scope.showEvent = function (eventID) {
            $location.path('/' + eventID);
        };
        
        $scope.backgroundColor = 'white';
        $scope.textColor = '#333';
        
        $scope.$on('setBackgroundColor', function (event, backgroundColor, textColor) {
            $scope.backgroundColor = backgroundColor;
            $scope.textColor = textColor;
        });
        
        $scope.timelineData = [
    {
        "title": "Education",
        "content": [
            {
                "id": "ntnu",
                "type": "period",
                "startAt": "2012-08-15",
                "title": "Master in Computer Science",
                "subtitle": "NTNU",
                "textColor": "#07539E",
                "backgroundColor": "#F7FBFF",
                "normalTextColor": "#333",
                "logo": {
                    "image": "data/logos/ntnu.png",
                    "width": 60,
                    "height": 60,
                    "link": "http://ntnu.no"
                }
            },
            {
                "id": "hit2",
                "type": "period",
                "endAt": "2012-06-15",
                "startAt": "2011-08-15",
                "title": "Individual Courses in Computer Science",
                "subtitle": "Telemark University College",
                "textColor": "#BE333C",
                "backgroundColor": "#FFFCFD",
                "normalTextColor": "#333",
                "logo": {
                    "image": "data/logos/hit.png",
                    "width": 150,
                    "height": 50,
                    "link": "http://hit.no"
                }
            },
            {
                "id": "hit",
                "type": "period",
                "endAt": "2011-06-15",
                "startAt": "2008-08-15",
                "title": "Bachelor in Computer Science and Industrial Automation",
                "subtitle": "Telemark University College",
                "textColor": "#BE333C",
                "backgroundColor": "#FFFCFD",
                "normalTextColor": "#333",
                "logo": {
                    "image": "data/logos/hit.png",
                    "width": 150,
                    "height": 50,
                    "link": "http://hit.no"
                }
            },
            {
                "id": "gand-vgs",
                "type": "period",
                "endAt": "2006-06-15",
                "startAt": "2003-08-15",
                "title": "Vocational Education in Automation",
                "subtitle": "Gand VGS",
                "textColor": "black",
                "backgroundColor": "white",
                "normalTextColor": "black"
            }
        ]
    },
    {
        "title": "Work",
        "content": [
            {
                "id": "bekk",
                "type": "period",
                "endAt": "2013-08-16",
                "startAt": "2013-06-17",
                "title": "System Developer",
                "subtitle": "Bekk Consulting AS",
                "textColor": "white",
                "backgroundColor": "#404041",
                "normalTextColor": "#DDD",
                "logo": {
                    "image": "data/logos/bekk.png",
                    "width": 150,
                    "height": 54,
                    "link": "http://bekk.no"
                }
            },
            {
                "id": "schneider-electric4",
                "type": "period",
                "endAt": "2012-08-01",
                "startAt": "2011-08-15",
                "title": "Service Engineer",
                "subtitle": "Schneider Electric",
                "textColor": "#189446",
                "backgroundColor": "#F7FFFA",
                "normalTextColor": "#333",
                "logo": {
                    "image": "data/logos/schneider-electric.png",
                    "width": 130,
                    "height": 40,
                    "link": "http://schneider-electric.no"
                }
            },
            {
                "id": "schneider-electric3",
                "type": "period",
                "endAt": "2010-08-15",
                "startAt": "2010-06-15",
                "title": "Test Engineer",
                "subtitle": "Schneider Electric",
                "textColor": "#189446",
                "backgroundColor": "#F7FFFA",
                "normalTextColor": "#333",
                "logo": {
                    "image": "data/logos/schneider-electric.png",
                    "width": 130,
                    "height": 40,
                    "link": "http://schneider-electric.no"
                }
            },
            {
                "id": "schneider-electric2",
                "type": "period",
                "endAt": "2009-08-15",
                "startAt": "2009-06-15",
                "title": "Service Engineer",
                "subtitle": "Schneider Electric",
                "textColor": "#189446",
                "backgroundColor": "#F7FFFA",
                "normalTextColor": "#333",
                "logo": {
                    "image": "data/logos/schneider-electric.png",
                    "width": 130,
                    "height": 40,
                    "link": "http://schneider-electric.no"
                }
            },
            {
                "id": "schneider-electric",
                "type": "period",
                "endAt": "2008-08-15",
                "startAt": "2006-08-01",
                "title": "Service Engineer",
                "subtitle": "Schneider Electric",
                "textColor": "#189446",
                "backgroundColor": "#F7FFFA",
                "normalTextColor": "#333",
                "logo": {
                    "image": "data/logos/schneider-electric.png",
                    "width": 130,
                    "height": 40,
                    "link": "http://schneider-electric.no"
                }
            }
        ]
    },
    {
        "title": "Voluntary Work",
        "content": [
            {
                "id": "studentmediene-i-trondheim-as",
                "type": "period",
                "startAt": "2012-09-01",
                "title": "Application Developer",
                "subtitle": "Studentmediene i Trondheim AS",
                "textColor": "#3597D3",
                "backgroundColor": "#F7FCFF",
                "normalTextColor": "#333",
                "logo": {
                    "image": "data/logos/smit.png",
                    "width": 70,
                    "height": 70,
                    "link": "http://studentmediene.no"
                }
            }
        ]
    },
    {
        "title": "Projects",
        "content": [
            {
                "id": "mattilbud",
                "type": "milestone",
                "date": "2013-11-08",
                "title": "Mattilbud",
                "iconImage": "data/icons/mattilbud.png",
                "textColor": "black",
                "backgroundColor": "white",
                "normalTextColor": "black",
                "technologies": [
                    "obj-c",
                    "php"
                ],
                "productPageLink": "http://mattilbud.com",
                "appStoreLink": "http://itunes.com/apps/mattilbud"
            },
            {
                "id": "barteguiden",
                "type": "milestone",
                "date": "2013-09-16",
                "title": "Barteguiden",
                "iconImage": "data/icons/barteguiden.png",
                "textColor": "#1798C3",
                "backgroundColor": "#F7FDFF",
                "normalTextColor": "#333",
                "technologies": [
                    "obj-c",
                    "nodejs"
                ],
                "productPageLink": "http://barteguiden.no",
                "appStoreLink": "http://itunes.com/apps/barteguiden",
                "sourceCodeLink": "http://github.com/dusken/Kulturkalender-iOS"
            },
            {
                "id": "tineapp",
                "type": "milestone",
                "date": "2013-05-06",
                "title": "TineApp",
                "iconImage": "data/icons/tineapp.png",
                "textColor": "#DD1D3F",
                "backgroundColor": "#FFFCFD",
                "normalTextColor": "#333",
                "technologies": [
                    "html",
                    "css",
                    "javascript",
                    "php",
                    "mysql"
                ]
            },
            {
                "id": "blogapp",
                "type": "milestone",
                "date": "2012-05-01",
                "title": "BlogApp",
                "iconImage": "data/icons/blogapp.png",
                "textColor": "#2A2A2A",
                "backgroundColor": "#F6F6F6",
                "normalTextColor": "#333",
                "technologies": [
                    "html",
                    "css",
                    "javascript",
                    "mysql",
                    "php"
                ],
                "previewLink": "http://christian.rasmussen.io/portfolio/blogapp/preview",
                "sourceCodeLink": "http://github.com/chrrasmussen/BlogApp"
            },
            {
                "id": "friendlyloan",
                "type": "milestone",
                "date": "2012-02-01",
                "title": "FriendlyLoan",
                "iconImage": "data/icons/friendlyloan.png",
                "textColor": "#E0DA38",
                "backgroundColor": "#FCFBDE",
                "normalTextColor": "#333",
                "technologies": [
                    "obj-c"
                ],
                "productPageLink": "http://friendlyloan.rasmussen.io",
                "appStoreLink": "http://itunes.com/apps/friendlyloan",
                "description": "FriendlyLoan helps you remember when, where and why you borrowed or lent money.\n\nEasily add new loans, settle debt with any friends and view the full history of loans.\n\nSupports English and Norwegian localization."
            },
            {
                "id": "global-bms-builder",
                "type": "milestone",
                "date": "2011-06-01",
                "title": "Global BMS Builder",
                "iconImage": "data/icons/global-bms-builder.png",
                "textColor": "#18A554",
                "backgroundColor": "#F7FFFB",
                "normalTextColor": "#333",
                "technologies": [
                    "obj-c",
                    "couchdb"
                ],
                "videoLink": "data/videos/global_bms_builder_demo.mp4"
            },
            {
                "id": "sudoku-app",
                "type": "milestone",
                "date": "2011-05-01",
                "title": "SudokuApp",
                "iconImage": "data/icons/sudoku-app.png",
                "textColor": "black",
                "backgroundColor": "#C8D1DA",
                "normalTextColor": "#333",
                "technologies": [
                    "c#"
                ],
                "sourceCodeLink": "http://github.com/chrrasmussen/SudokuApplication",
                "description": "SudokuApplication was developed by students attending Telemark University College, as a 6. semester project in the subject Object-oriented programming, spring 2011. Students participating in this project were: Christian Rasmussen, Erik Barsøe and Henrik Hopen."
            },
            {
                "id": "tac-vista-for-iphone",
                "type": "milestone",
                "date": "2009-06-01",
                "title": "TAC Vista for iPhone",
                "iconImage": "data/icons/tac-vista-for-iphone.png",
                "textColor": "#8C3341",
                "backgroundColor": "#FFFCFD",
                "normalTextColor": "#333",
                "technologies": [
                    "obj-c",
                    "vb.net"
                ],
                "videoLink": "data/videos/tac_vista_for_iphone_demo.mp4"
            },
            {
                "id": "f1-project",
                "type": "milestone",
                "date": "2008-12-01",
                "title": "F1 project",
                "iconImage": "data/icons/f1-project.png",
                "textColor": "#4773B2",
                "backgroundColor": "#F7FBFF",
                "normalTextColor": "#333",
                "technologies": [
                    "html",
                    "css",
                    "javascript",
                    "php"
                ],
                "previewLink": "http://christian.rasmussen.io/portfolio/f1/preview"
            },
            {
                "id": "ifknorge",
                "type": "milestone",
                "date": "2005-10-28",
                "title": "IFK Norge",
                "iconImage": "data/icons/ifknorge.png",
                "textColor": "#F6DB00",
                "backgroundColor": "#f7faff",
                "normalTextColor": "#333",
                "technologies": [
                    "html",
                    "css",
                    "php",
                    "mysql"
                ],
                "previewLink": "http://christian.rasmussen.io/portfolio/ifknorge/preview"
            }
        ]
    }
];
        
//        $scope.timelineData = [];
//        $http.get('data/en.json').success(function (data) {
//            $scope.timelineData = data;
//        });
        
        console.log('MainCtrl loaded');
    });
});