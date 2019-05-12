/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojmodule-element-utils', 'ojs/ojpopup', 'ojs/ojrouter',  'ojs/ojarraydataprovider', 'ojs/ojlistview', 'ojs/ojinputtext',  'ojs/ojbutton', 'ojs/ojlabel', 'ojs/ojselectcombobox'],
 function(oj, ko, $) {

    function AboutViewModel() {
      var self = this;
      var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

      self.selectedDate;
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
        self.diaryEntry = ko.observable("");
        self.selectedRecipe = ko.observable("");
        self.recipeArray = ko.observableArray([]);
        self.recipeProvider = new oj.ArrayDataProvider(self.recipeArray, {keyAttributes: 'id'})
        var urlString = window.location.href;
        var url = new URL(urlString);
        var values = url.searchParams.get("root").split("/");
        self.dateString = values[3] + "/" + values[2] + " - " + values[1];
        self.dateArrayId;
        self.dateId = values[1] + "/" + values[2] + "/" + values[3];

        var dateArray = rootViewModel.dateArray();
        for (var i = 0; i < dateArray.length; i++) {
          if (dateArray[i].id == self.dateId) {
            self.dateArrayId = i;
            self.selectedDate = dateArray[i];
            break;
          }
        }

        var recipeGlobal = rootViewModel.recipeArray();
        for (var i = 0; i < recipeGlobal.length; i++) {
          self.recipeArray.push({"value": i, "label": recipeGlobal[i].title});
        }

        fillData();
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

      self.diary = function() {
        oj.Router.rootInstance.go('customers');
      }

      self.save = function() {
        for (var i = 0; i < self.arrayLength; i++) {
          ingredientList[i] = self.allItems()[i].item;
        }
        var savedDate = {id: self.dateId, info: {date: self.dateString, text: self.diaryEntry(), recipe: self.selectedRecipe()}};
        var dateArray = rootViewModel.dateArray();

        dateArray[self.dateArrayId] = savedDate;
        console.log(dateArray);
        console.log(self.selectedRecipe());
        //oj.Router.rootInstance.go('customers');
      }

      function fillData() {
        var title = document.getElementById("dateTitle");
        title.innerHTML = self.dateString;

        self.diaryEntry(self.selectedDate.info.text);
        self.selectedRecipe(self.selectedDate.info.recipe);
      }
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
