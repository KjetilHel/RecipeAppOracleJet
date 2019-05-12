/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'jquery', 'ojs/ojrouter', 'ojs/ojarraydataprovider', 'ojs/ojlistview', 'ojs/ojinputtext',  'ojs/ojbutton', 'ojs/ojlabel'],
 function(oj, ko, $, ArrayDataProvider) {

    function RecipeViewModel() {
      var self = this;

      var rootViewModel = ko.dataFor(document.getElementById('globalBody'));



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
        var ojList = document.getElementById("ingredientList");
        ojList.setProperty('translations.msgNoData', 'No ingredients yet');

        self.recipeName = ko.observable("");
        self.newItem = ko.observable("");
        self.allItems = ko.observableArray([]);

        self.arrayLength = this.allItems().length;
        self.dataProvider = new oj.ArrayDataProvider(self.allItems, {'keyAttributes': 'id'});
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

      self.frontpageButton = function() {
        oj.Router.rootInstance.go('dashboard');
      }

      self.addItem = function() {
        if(self.newItem() != "") {
          self.arrayLength++;
          self.allItems.push({"id": self.arrayLength, "item": self.newItem()});
          self.newItem("");
        }
      }

      self.saveList = function() {
        if (self.arrayLength > 0 && self.recipeName() != "") {
          var ingredientList = [];
          for (var i = 0; i < self.arrayLength; i++) {
            ingredientList[i] = self.allItems()[i].item;
          }

          var recipe = {title: self.recipeName(), ingredients: ingredientList};
          var recipeArray = rootViewModel.recipeArray();

          recipeArray.push(recipe);
          oj.Router.rootInstance.go('dashboard');
        }
      }

      self.noSaveList = function() {
        oj.Router.rootInstance.go('dashboard');
      }

      self.deleteButton = function(event) {
        console.log(event.currentTarget.id);
        var itemId = event.currentTarget.id.split("delete")[1];
        self.allItems.remove(function(item) {
          console.log(item);
          return item.id == itemId;
        });
        self.arrayLength--;
      }
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new RecipeViewModel();
  }
);
