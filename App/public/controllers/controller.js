var myApp = angular.module('myApp', ["ngSanitize", "ngCsv", 'angularUtils.directives.dirPagination']);

     
myApp.controller('COController', function($scope, $http) {
    console.log("Hello World from controller");
  
  
  //refresh page
  
  var refresh = function() {
  	
	 $scope.currentPage = 1;
  	$scope.pageSize = 4;
  	
 	$http.get('/colist').success(function(response) { 	
    	//console.log ("i GET the data of projects");
    	
    			$scope.project = response;
			for(i=0; i<$scope.project.length; i++){  
		
			if (i==0)
			{
				$scope.csvstring= 
					 "{'number' :'" + $scope.project[i].number +"'," + 
			       		"'client' : '" + $scope.project[i].client+"', "+
			       		"'transaction':'"+$scope.project[i].transaction+"',"+
			       		"'region':'"+$scope.project[i].region+"',"+
			       		"'bis_analyst':'"+ $scope.project[i].bis_analyst+"', "+
			       		"'est_effort':'"+$scope.project[i].est_effort+"',"+
			      		"'act_effort':'"+$scope.project[i].act_effort+"',"+
			      		 "'start_date' :'"+$scope.project[i].start_date+"',"+
			         	"'end_date':'"+$scope.project[i].end_date+"',"+
			         	"'status':'"+$scope.project[i].status+"',"+
			         	"'remarks' : '"+$scope.project[i].remarks+"',"+
			         	"'developer' :'"+ $scope.project[i].developer+"',"+
			         	"'effort_type':'"+$scope.project[i].effort_type +"',"+
			         	"'co_type' :'"+ $scope.project[i].co_type+"',"+
			         	"'bis_transaction' :'"+ $scope.project[i].bis_transaction+"'}";
			}
			else{	 $scope.csvstring= $scope.csvstring + "," +
				 "{'number' :'" + $scope.project[i].number +"'," + 
		       		"'client' : '" + $scope.project[i].client+"', "+
		       		"'transaction':'"+$scope.project[i].transaction+"',"+
		       		"'region':'"+$scope.project[i].region+"',"+
		       		"'bis_analyst':'"+ $scope.project[i].bis_analyst+"', "+
		       		"'est_effort':'"+$scope.project[i].est_effort+"',"+
		      		"'act_effort':'"+$scope.project[i].act_effort+"',"+
		      		 "'start_date' :'"+$scope.project[i].start_date+"',"+
		         	"'end_date':'"+$scope.project[i].end_date+"',"+
		         	"'status':'"+$scope.project[i].status+"',"+
		         	"'remarks' : '"+$scope.project[i].remarks+"',"+
		         	"'developer' :'"+ $scope.project[i].developer+"',"+
		         	"'effort_type':'"+$scope.project[i].effort_type +"',"+
		         	"'co_type' :'"+ $scope.project[i].co_type+"',"+
		         	"'bis_transaction' :'"+ $scope.project[i].bis_transaction+"'}";
	        	}
		}
	
	$scope.csvstring='[ ' + $scope.csvstring+']';
	//console.log($scope.csvstring);
 	$scope.getArray =  eval ("(" + $scope.csvstring + ")"); 
 	$scope.d3str = [ {'number' : '123', 'act_effort' : 30 }, {'number' : '456', 'act_effort' : 60 }];	
	})
	
	

//$scope.d3str = [ {'number' : '123', 'act_effort' : 30 }, {'number' : '456', 'act_effort' : 60 }];	
   };
   
 refresh();

 
 
   //http get for getting data from MONGODB
   $scope.viewco = function(){
	 $http.get('/colist').success(function(response) { 	
    	//console.log ("i GET the data of projects");
    	$scope.project = response;
    	return list.show = true;
	});
	};
   
  
    //http post for inserting data into MONGODB
	$scope.submitCO = function() {
	//console.log($scope.project);
	$http.post('/colist', $scope.project).success(function(response) {
		console.log(response);
	}); 
	 
	//to refresh the page automatically
	refresh();   
	        
	};
	
	//remove
	$scope.remove = function(id) {
	//console.log(id);
	$http.delete('/colist/' + id).success(function(response) {
		refresh();
	});
	};
    
    //Update 
    //To get the data in Add new Co box
    $scope.edit = function(id) {
	//console.log(id);
	$http.get('/colist/' + id).success(function(response) {
		$scope.newco = response;
	});
	};
   //To send updated value to server
  $scope.update = function() {
	console.log($scope.newco._id);
	console.log($scope.newco.number);
	$http.put('/colist/' + $scope.newco._id, $scope.newco).success(function(response) {
		refresh();
		$scope.deselect ();  
	})
};
    
    //JASON push function to add new object to client cache
	
	$scope.addCo = function () {
		
	        $scope.project.push(    
	        	{ 	number : $scope.newco.number,
				client:$scope.newco.client,
				transaction:$scope.newco.transaction,
				region :$scope.newco.region,
				bis_analyst : $scope.newco.bis_analyst,
				est_effort : $scope.newco.est_effort,
				act_effort : $scope.newco.act_effort,
				start_date : $scope.newco.start_date,
				end_date: $scope.newco.end_date,
				status: $scope.newco.status,
				remarks: $scope.newco.remarks,
				developer: $scope.newco.developer,
				co_type:$scope.newco.co_type,
				effort_type:$scope.newco.effort_type,
				bis_transaction:$scope.newco.bis_transaction

				
	        });             
	        
	         $scope.deselect ();                   
	        
	    };	
	    
	  $scope.deselect = function(){
	  	                        
	        // Clear input fields in add new co boxes
	        $scope.newco.number = "";
	        $scope.newco.client = "";
	        $scope.newco.transaction = "";
	        $scope.newco.region = "";
	        $scope.newco.bis_analyst = "";
	        $scope.newco.est_effort = "";
	        $scope.newco.act_effort = "";
	        $scope.newco.start_date = "";
	        $scope.newco.end_date = "";
	        $scope.newco.status="";
	        $scope.newco.remarks = "";
	        $scope.newco.developer = "";
	        $scope.newco.co_type="";
	        $scope.newco.effort_type="";
	        $scope.newco.bis_transaction="";
	};
	
	$scope.cancel=function(){
		 $scope.deselect ();       
		 refresh();
	};    
	
	
	$scope.getHeader = function () {return ["CO Number", "Client Name", "Transaction","Region","Business Analyst","Estimated Effort","Actual Effort", "Start Date", "End Date","Status", "Remarks","Developer","Effort Type", "CO Type", "Business Transaction" ]};                                  
	
	$scope.pageChangeHandler = function(num) {
      console.log('CO page changed to ' + num);
  };

   });    
   
myApp.directive('datepicker',function(){
  return{
		scope:{
		date: "="
		},
		link : function (scope, element, attrs) {
			scope.$watch('date', function(value){
				$(element).datepicker('setDate',value);
			}),
	        $(function(){
	            $(element).datepicker({
	            	       changeYear : true,
         		changeMonth : true,
         		appendText : '(dd/mm/yyyy)',
	                dateFormat: 'dd/mm/yy',
	                onSelect:function (date) {
	                  	scope.date = date;
	                  	scope.$apply();
	                }
	            });

	        });
    	}
	}
}) ;

myApp.directive('bars', function ($parse) {
      return {
         restrict: 'AE',
         replace: true,
         template: '<div id="chart"></div>',
         link: function (scope, element, attrs) {
         	
         	console.log("ay");
         	
         	   	
        var text =attrs.data; 
        var data =  eval ("(" + text + ")"); ;   
	
          console.log(data);
       var   svg = d3.select("#chart")
           	.append("svg")
           	.attr("width", "500")
           	.attr("height", "500");

           
         var  chart = svg.selectAll("rect")
             .data(data)
             .enter()
             .append("rect")
             .attr("x", "0")
   	     .attr("y",function(d, i) {
    		return (i*100) ;  
		})
   	   .attr("width", function(d) {
    		console.log(d.act_effort);return d.act_effort  ;  
		})
   	    .attr("height", "10")
             .transition().ease("elastic")
             .attr("fill","blue")
             ;
             
           var  text=svg.selectAll('text')
              .data(data).enter()
               .append("text")
               .text(function(d) { console.log(d.number);return d.number; })
              	.attr("x", "0")
		.attr("y", function(d, i) {
			   return (i*100)+22;
			   })
		.attr("fill", "black")
		.attr("font-family", "sans-serif")
		.attr("font-size", "13px");
		
         } 
      };
   });                               
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                       
                                        