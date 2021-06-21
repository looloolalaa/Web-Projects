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