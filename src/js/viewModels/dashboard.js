/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojrouter', 'ojs/ojarraydataprovider', 'ojs/ojlistview', 'ojs/ojinputtext',  'ojs/ojbutton', 'ojs/ojlabel'],
 function(oj, ko, $) {

    function DashboardViewModel() {
      var self = this;

      var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

      self.block = true;

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
        var recipeList = document.getElementById("recipeList");
        recipeList.setProperty('translations.msgNoData', 'No recipes to display, make one by pressing the "Make New Recipe"-button');

        self.allItems = ko.observableArray([]);
        self.selectedRecipe = ko.observable("");
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

      self.recipeButton = function() {
        oj.Router.rootInstance.go('recipe');
      }

      self.editRecipe = function() {
        if (!self.block) oj.Router.rootInstance.go('incidents/' + (self.selectedRecipe()-1));
        else self.block = false;
      }

      function refreshList() {

        var recipeArray = rootViewModel.recipeArray();
        for (var i = 0; i < recipeArray.length; i++ ) {
          self.arrayLength++;
          self.allItems.push({"id": self.arrayLength, "item": recipeArray[i].title});
        }
      }

      self.diaryButton = function() {
        oj.Router.rootInstance.go('customers');
      }

    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
