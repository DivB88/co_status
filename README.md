# co_status
SPA application for CRUD operations with MEAN stack (REST APIs)

This Application demonstarte simple MEAN stack. Below are the operations:

The object CO has a multiple fields like number, effort, dates, developers etc. Application perform below operation:

Add a new CO object to MongoDB :
Angular JS ng-model is used for data binding. Push function will add a newly created instance to $scope.project upon clicking "Add CO" Button. 
Upon clicking "Submit" button HTTP Post will update the data to MongoDB. Idea is to have minimal HTTP Post request when the multiple instance of COs are needs to be added.

Display existing list of COs from MongoDB :
HTTP get will get the CO from the MongoDB, AngularJs ng-repeat is used for itration 

Update the Existing CO :
On clicking Update button HTTP Get(along with id) will get the data from MongoDB and allows the update. HTTP PUT will update the data to MongoDB.

Export to CSV:
ng-csv is used to export the data to a CSV file. 

Along with above few other AngularJs filetrs are demonstarted like "filter" and "OrderBy".
