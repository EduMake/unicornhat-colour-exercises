var md = false;


function update(picker) {
	update_all(picker);
}

$(document).ready(function(){

window.update_all = function(picker) {
	$(".binary").each(function(id, cell){binaryUpdate(cell);});
	$.get('/show');
};

$.ajaxSetup({ cache: false });

$('.unicorn').draggable({ handle: "h1" });

$(document)
	.on('mousedown',function(e){md=true;})
	.on('mouseup',function(e){md=false;});

$('table').on('dragstart',function(e){
	e.preventDefault();
	return false;
});


function current_color(){
	return color;
}

function clear(){
	$('td').data('changed',false);
	$.get('/clear');
	$.get('/show');
}

function binaryUpdate(cell){
	//console.log(cell);
	var binary_in = $(cell);
	var value = parseInt(binary_in.val(),2 );
	//console.log(binary_in.val(), value);
	var imgEls = binary_in.parent().siblings("td");
	//console.log("imgEls", imgEls);
	
	//console.log("document.getElementById(\"offcolour\")", document.getElementById("offcolour"));
	//console.log("document.getElementById(\"offcolour\").jscolor", document.getElementById("offcolour").jscolor);
	
	var OFFcolor = document.getElementById("offcolour").jscolor; 
	var ONcolor = document.getElementById("oncolour").jscolor; 
	
	var row = imgEls.each(function(key, cell){
		var i = 7 - key;
		// TODO : what if bigger than 7;
		var num = Math.pow(2, i); // num = 1,2,4,8,16,32,64,128
		var on = (value & num) > 0; //does the value conatian the binary digit for 1,2,4,8,16,32,64,128
		//console.log("cell", cell, "key", key, i, num, on);
		
		var color = OFFcolor;
		if(on) {
			color = ONcolor;
		}
		
		//Set the onscreen colour
		$(cell).css("background", color.toHEXString());
		
		//Send colour to the PI
		// TODO : only send when changed
		var x = key;
		var y = $(cell).parent().index();
		
		var data = [x,y,Math.floor(color.rgb[0]),Math.floor(color.rgb[1]),Math.floor(color.rgb[2])];
		//console.log("data", data);
		
		$.get('/pixel/' + data.join('/'));
	});
}

$(".binary").on("change", function(event){
	// TODO : set denary input
	binaryUpdate(event.target);
	$.get('/show');
});

$(".denary").on("change", function(event){
	// TODO : calc  binary number, get binary input, set it, run update
	//binaryUpdate(event.target);
});

//Update each row
$(".binary").each(function(id, cell){binaryUpdate(cell);});
$.get('/show');

//var updateI = setInterval(update_pixels, 50);
});	

