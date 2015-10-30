var app = angular.module('examApp', []);

  app.controller('ExamController', ['ExamFactory',function(ExamFactory) {
    var self  = this;      
    self.studentsInfo = ExamFactory.getStudentsInfo();

  }]);
  
  app.filter('AverageCalculater', function(){
     return function(input){
         var numberOfCourses = 0;
         var sum = 0;
         
         input.forEach(function(grade){
             if (typeof grade.grade !== 'undefined'){
                numberOfCourses++;
                sum = (sum + grade.grade);
             }
         });
         
         return sum/numberOfCourses;
     }; 
  });
  
  app.directive('studentGrades', function(){
     return {
         templateUrl: 'student-grades.html',
         controller: 'ExamController'
     }; 
  });
  
  app.factory('ExamFactory', function($http){
      var studentsInfo = {};
      studentsInfo.allCourses = [
      {courseId : 1000,courseName: "Basic Programming"},
      {courseId : 1001,courseName: "Advanced Programming"},
      {courseId : 1003,courseName: "DataBase Intro"}];
  
      studentsInfo.students = [];
      studentsInfo.students.push({studentId : 100, name: "Peter Hansen", grades : [{grade: 10},{grade: 12},{}]});
      studentsInfo.students.push({studentId : 101, name: "Jan Olsen", grades : [{grade: 7},{grade: 10},{}]});
      studentsInfo.students.push({studentId : 102, name: "Gitte Poulsen", grades : [{grade: 7},{grade: 7},{}]});
      studentsInfo.students.push({studentId : 103, name: "John McDonald", grades : [{grade: 10},{},{grade: 7}]});
      
      var getStudentsInfo = function(){return studentsInfo;};
      
      
      return {
          getStudentsInfo : getStudentsInfo
      };
      
//      Show how you would fetch the data, if a REST service existed
//      
//      $http({
//            method: 'GET',
//            url: 'api/studentsinfo'
//          }).then(function successCallback(res) {
//            self.studentsInfo = res.data;
//          }, function errorCallback(res) {
//            self.error = res.status + ": "+ res.data.statusText;
//          });

  });