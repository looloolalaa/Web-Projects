window.onload=pageLoad;
function pageLoad(){
	setCTime();
	changeColor();
	document.getElementById("calc1").onclick=calc;
	document.getElementById("guess1").onclick=guess;
	document.getElementById("replay1").onclick=replay;
	document.getElementById("ao").onclick=changeImage;
	document.getElementById("ctCreate").onclick=createColorTable;
	document.getElementById("ctRemove").onclick=removeColorTable;
	document.getElementById("stopTextColor1").onclick=stopTextColor;
	document.getElementById("myMove1").onclick=myMove;
	document.getElementById("guessbutton").onclick=guessLetter;
	document.getElementById("newGame1").onclick=newGame;


}
function calc(){
	var x=document.getElementById("x");
	var y=document.getElementById("y");
	var sum=document.getElementById("sum");
	sum.value=parseInt(x.value)+Number(y.value);
}
var computerNumber=Math.floor(Math.random()*100+1);
var nGuesses=0;

function guess(){
	var user=document.getElementById("user");
	var num=document.getElementById("guesses");
	var hint=document.getElementById("result");
	num.value=++nGuesses;
	if(computerNumber<Number(user.value))
		hint.value="낮습니다";
	else if(computerNumber>Number(user.value))
		hint.value="높습니다";
	else
		hint.value="맞습니다";
}

function replay(){
	computerNumber=Math.floor(Math.random()*100+1);
	nGuesses=0;
	document.getElementById("user").value=0;
	document.getElementById("guesses").value=0;
	document.getElementById("result").value="초기화";
}

function setCTime(){
	var now=new Date();
	var s=now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
	var d=now.getDay();
	if(d==0)
		d="Sunday";
	if(d==1)
		d="Monday";
	if(d==2)
		d="Tuesday";
	if(d==3)
		d="Wednesday";
	if(d==4)
		d="Thursday";
	if(d==5)
		d="Friday";
	if(d==6)
		d="Saturday";

	document.getElementById("ctime").innerHTML=d+" "+s;
	setTimeout(setCTime,1000);
	
}

var POSSIBLE_WORDS=["obdurate","today","lee","ki","hyun","looloolalaa"];
var MAX_GUESSES=6;

var guesses="";
var guessCount=MAX_GUESSES;
var word;
var clue="";

function newGame(){
   var randomIndex=parseInt(Math.random()*POSSIBLE_WORDS.length);
   word=POSSIBLE_WORDS[randomIndex];
   guesses="";
   guessCount=MAX_GUESSES;
   document.getElementById("guessstr").innerHTML="";
   document.getElementById("guessbutton").disabled=false;
   document.getElementById("hguess").value="";
   document.getElementById("hangmanpic").src="hangman6.gif"; 


   clue="";
   for(i=0;i<word.length;i++)
      clue+="_ ";
   document.getElementById("clue").innerHTML=clue;
   

}

function guessLetter(){

   var letter=document.getElementById("hguess").value;
   document.getElementById("hguess").value="";

   	if(document.getElementById("guessstr").innerHTML=="you lose")
		return;
	if(document.getElementById("guessstr").innerHTML=="you win")
		return;

   pre_guesses=guesses;
   if(guesses.indexOf(letter)<0)
      guesses=guesses+letter;

   pre_clue=clue;
   clue="";
   for(i=0;i<word.length;i++)
   {
      if(guesses.indexOf(word.charAt(i))<0)
         clue+="_ ";
      else
         clue+=word.charAt(i)+" ";
   }
   if(pre_clue==clue && pre_guesses!=guesses)
   	guessCount--;

   document.getElementById("clue").innerHTML=clue;
   updatePage();

}

function updatePage(){

   document.getElementById("guessstr").innerHTML=guesses;
  
   if(guessCount==5)
      document.getElementById("hangmanpic").src="hangman5.gif";
   if(guessCount==4)
      document.getElementById("hangmanpic").src="hangman4.gif";
   if(guessCount==3)
      document.getElementById("hangmanpic").src="hangman3.gif";
   if(guessCount==2)
      document.getElementById("hangmanpic").src="hangman2.gif";
   if(guessCount==1)
      document.getElementById("hangmanpic").src="hangman1.gif";
   if(guessCount==0)
      document.getElementById("hangmanpic").src="hangman0.gif";


   if(guessCount==0)
   {
      document.getElementById("guessstr").innerHTML="you lose";
      document.getElementById("clue").innerHTML=word;
      
   }

   else if(clue.indexOf('_')<0)
   {
      document.getElementById("guessstr").innerHTML="you win";
      
   }


}

function changeImage(){
	var bimg=document.getElementById("image");
	var sarray=bimg.src.split('/');
	var str=sarray[sarray.length-1];
	if(str=="puppy.jpg")
		bimg.src="hedgehog.jpg";
	else
		bimg.src="puppy.jpg";


}

var colorNames=["maroon","red","orange","yellow","olive","purple","fuchsia",
"white","lime","green","navy","blue","aqua","teal","black","silver","gray"];

function createColorTable(){
	var parent=document.getElementById("colorTable");

	for(i=0;i<colorNames.length;i++)
	{
		var node=document.createElement("div");

		node.setAttribute("class","ctbox");
		node.innerHTML=colorNames[i];
		node.style.display="inline-block";
		node.style.textAlign="center";
		node.style.width="60px";
		node.style.padding="10px";
		node.style.backgroundColor=colorNames[i];

		parent.appendChild(node);
	}
	
}

function removeColorTable(){
	var parent=document.getElementById("colorTable");
	var child=parent.getElementsByClassName("ctbox");
	while(child[0])
		parent.removeChild(child[0]);
}

var action;
function changeColor(){
	action=setInterval(flashText,1000);
	function flashText(){
	var elem=document.getElementById("target");
	elem.style.color=(elem.style.color=="red")?"blue":"red";
	elem.style.backgroundColor=(elem.style.backgroundColor=="green")?"yellow":"green";
}
}



function stopTextColor(){
	clearInterval(action);
}
var action2,tp=0;

function myMove(){
	
	action2=setInterval(move,5);
	function move(){
	var box=document.getElementById("animate");
	tp++;
	box.style.left=tp+"px";
	box.style.top=tp+"px";
	if(tp>350)
		clearInterval(action2);
}
	
}

$(document).ready(function(){

	var i=0;
	$("div.out")
	.mouseover(function(){
		$("p:first",this).text("mouse over");
		$("p:last",this).text(++i);
	})
	.mouseout(function(){
		$("p:first",this).text("mouse out");
	})

	$("#max_screen").on("click",
		{url:"http://www.google.com",
		winattributes:"resize=1,scrollbars=1,status=1"},
		maxopen);

	function flash(){
		$("#off_test").show().fadeOut("slow");
	};

	$("#bind").click(function(){
		$("#theone")
		.text("Can Click!")
		.on("click",flash)
	});

	$("#unbind").click(function(){
		$("#theone")
		.text("Does nothing...")
		.off("click",flash)
	});

	function update(j){
		var n=parseInt(j.text(),10);
		j.text(n+1);
	}

	$("#trigger_test button:first").click(function(){
		update($("#trigger_test span:first"));
	});

	$("#trigger_test button:last").click(function(){
		$("#trigger_test button:first").trigger("click");
		update($("#trigger_test span:last"));
	});

	$("#imageArea img").click(function(){
		if($("#imageArea img").attr("src")=="hedgehog.jpg")
			$("#imageArea img").attr("src","puppy.jpg");
		else
			$("#imageArea img").attr("src","hedgehog.jpg");
	});

	var imgArray=["sea.jpg","hedgehog.jpg","puppy.jpg"];

	$("#imgAlbum").attr("src",imgArray[0]);
	var index=0;
	$("#imgAlbum").click(function(){
		index=(index+1)%imgArray.length;
		$("#imgAlbum").attr("src",imgArray[index]);
	});

	$(".main-menu").mouseover(function(){
		$(this).css({"font-size":"20px","background-color":"green"});
	});

	$(".main-menu").mouseout(function(){
		$(this).css({background:"none",fontSize:"1em"});
	});

	$("#add_img img").on("click",show_note_form);
	$("#add_note").on("click",push_note);

	function show_note_form(){
		$("#note_form").addClass("popup");
		change_position($(".popup"));
		$(window).resize(function(){
			change_position($(".popup"));
		})

		$("#note_form").fadeIn("slow");//.slideDown("slow");

		//$("#note_form").show();
	}

	function push_note(){
		var title=$("#note_title").val();//input 데이터는 val()로 받는다.
		var date=$("#note_date").val();
		var content=$("#note_content").val();
		var str="<p>"+title+"<br>"+date+"<br>"+content+"</p></br>";
		$("#note").append(str);
		$("#note_form").hide();
		
	}

	function change_position(p){
		var wid=($(window).width()-p.width())/2;
		var hei=($(window).height()-p.height())/2;

		p.css({top:hei,left:wid});

	}

	$("#moving_button").click(function(){
		$("#moving_box").animate({right:0, height:"+=50px", width:"+=50px"})
		$("#animation_test").animate({height:"+=50px"})
	})

	/*$(".accordion").each(function(){
		var dl=$(this);
		var alldd=dl.find("dd");
		var alldt=dl.find("dt");
		alldd.hide();
		alldt.css("cursor","pointer");

		alldt.click(function(){
			alldd.hide();
			$(this).next().show();

			alldt.css("cursor","pointer");
			$(this).css("cursor","default");
		})
	})*/

	$("dt").addClass("closed");
	$("dd").addClass("closed");

	$(".accordion").each(function(){
		var dl=$(this);
		var alldt=dl.find("dt");
		var alldd=dl.find("dd");
		function closeAll(){
			alldd.addClass("closed");
			alldt.addClass("closed");
		}
		function open(dt,dd){
			dt.removeClass("closed");
			dd.removeClass("closed");
		}

		alldt.click(function(){
			closeAll();
			open($(this),$(this).next());
			
		});

	})

	var interval=2000;
	$(".slideshow").each(function(){
		var timer;
		var container=$(this);
		function switchImg(){
			var imgs=container.find("img");
			var first=imgs.eq(0);
			var second=imgs.eq(1);
			first.appendTo(container).fadeOut(2000);
			second.fadeIn(2000);
		}
		function startTimer(){
			timer=setInterval(switchImg,interval);
		}
		function stopTimer(){
			clearInterval(timer);
		}
		startTimer();
		container.hover(stopTimer,startTimer);
	})

	$("#getText").click(function(){
		$("#textbox").text("글자입력 테스트");
		
		var req=$.ajax("data.json");
		req.done(function(data,status){
			//var students=JSON.parse(data);
			for(var i=0;i<data.length;i++)
			{
				var str=data[i].name+"<br>";
				$("#textbox").append(str);
			}
		})
	});

	/*$("#getText").click(function(){
		var tb=$("<table/>");

		var row=$("<tr/>").append($("<td/>").text(name));
	})*/

	var req=$.ajax({
		url:"/rss",
		dataType:"xml"});
	req.done(function(data){
		//console.log(data);
		var items=$(data).find("item");
		if(items.length>0){
			items=items.slice(0,5);
			var uTag=$("<ul/>");
			items.each(function(){
				var item=$(this);
				var lk=item.find("link").text();
				var title=item.find("title").text();
				var aTag=$("<a/>");
				aTag.text(title);
				aTag.attr("href",lk);
				var lTag=$("<li/>");
				lTag.append(aTag);
				uTag.append(lTag);


			});
			$("#news").html(uTag);
		}
	});
	req.fail(function(jaXHR,textStatus){
		alert("failed:"+textStatus);
	});



});

function maxopen(event){
	var maxwindow=window.open(event.data.url,"",event.data.winattributes);
	maxwindow.moveTo(0,0);
	maxwindow.resizeTo(screen.availWidth,screen.availHeight);
}

