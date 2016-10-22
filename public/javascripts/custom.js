$(document).ready(function(){
$("#addNew").click(function(){
  var x = document.getElementsByClassName('eventform');
  x[0].style.display ='block';
  x[1].style.display ='block';
  document.getElementById('addNew').style.display = 'none';
});
$("#hideForm").click(function(){
  var y = document.getElementsByClassName('eventform');
  y[0].style.display = 'none';
  y[1].style.display = 'none';
  
  document.getElementById('addNew').style.display = 'inline';
});
 $('[data-toggle="popover"]').popover();
 $('[data-toggle="tooltip"]').tooltip(); 
 
});

function getFileName(fileName) {
	var a = document.getElementById('filePopUp').src = '/images/uploads/'+fileName ;
	document.getElementById('download').href = '/images/uploads/'+fileName ;
}

