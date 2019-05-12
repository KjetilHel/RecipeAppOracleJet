/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojpopup', 'ojs/ojrouter',  'ojs/ojarraydataprovider', 'ojs/ojlistview', 'ojs/ojbutton', 'ojs/ojlabel', 'ojs/ojselectcombobox'],
 function(oj, ko, $) {

    function CustomerViewModel() {
      var self = this;
      self.block = true;

      var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

      makeDates();

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        self.allItems = ko.observableArray([]);
        self.selectedDate = ko.observable("");
        self.arrayLength = this.allItems().length;
        self.dataProvider = new oj.ArrayDataProvider(self.allItems, {'keyAttributes': 'id'});
        self.block = true;

        refreshList();

        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };

      self.editDate = function() {
        if (!self.block) oj.Router.rootInstance.go('about/' + (self.selectedDate()));
        else self.block = false;
      }

      self.homepage = function() {
        oj.Router.rootInstance.go('dashboard');
      }

      function makeDates() {
        var monthDayArray = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var today = new Date();
        var lastWeek = [];
        var lastWeekId = [];
        for (var i = 0; i < 7; i++) {
          var lastWeekDay = today.getDate() - i;
          var lastWeekMonth;
          if (lastWeekDay < 1) {
            lastWeekMonth = today.getMonth() - 1;
            lastWeekDay += monthDayArray[lastWeekMonth];
          } else lastWeekMonth = today.getMonth();

          var lastWeekYear;
          if (lastWeekMonth < 1) {
            lastWeekYear = today.getFullYear() - 1;
            lastWeekMonth = 12;
          }
          else lastWeekYear = today.getFullYear();
          lastWeekMonth += 1;
          if (lastWeekDay < 10) lastWeekDay = "0" + lastWeekDay;
          if (lastWeekMonth < 10) lastWeekMonth = "0" + lastWeekMonth;
          var dateString = lastWeekDay + "/" + lastWeekMonth + " - " + lastWeekYear;
          lastWeek[i] = dateString;
          lastWeekId[i] = lastWeekYear + "/" + lastWeekMonth + "/" + lastWeekDay;
        }

        var dateArray = rootViewModel.dateArray();
        for (var i = 0; i < 7; i++) {

          var lastWeekObject = {id: lastWeekId[i], info: {date: lastWeek[i], text: "", recipe: ""}};
          dateArray.push(lastWeekObject);
        }
      }

      function refreshList() {
        var dateArray = rootViewModel.dateArray();

        for (var i = 0; i < 7; i++) {
          self.arrayLength++;
          self.allItems.push({"id": dateArray[i].id, "item": dateArray[i].info.date});
        }
      }
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomerViewModel();
  }
);
