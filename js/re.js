/*window.onload = function(){
	var w = $('.main-image-div').css("width");
	$('.main-image').css({"width":"w"});
}
$(window).resize(function(){
	var w = $('.main-image-div').css("width");
	$('.main-image').css({"width":"w"});
})*/
var balance = 2000;
var hit=1,cnt=0;
var bet = 0,disp=0;
var i;
var dealerfirstcard;
var track = new Array();
var dealer = new Array();
var player = new Array();
var dealercard = new Array();
var sump=0,sumd=0;
for(i=0;i<53;i++){
	track[i]=0;
	dealer[i]=player[i]=-1;
}
//for (i=0;i<track.length;i++){
//}
$("#play").click(function(){
	$(".main-image").css({'top':'0px'});
	$("#play").css({'visibility':'hidden'});
	$("#instructions").css({'visibility':'hidden'});
	$(".playgame").css({"visibility":"visible"});
	$(".double_hit").css({"visibility":"hidden"});
});

$("#100").click(function(){
	$(".your-bet").css({"visibility":"visible"});
	if(hit<2){
		bet+=100;
		$(".your-bet").html("Your Bet = $ " + bet);
	}
	else
	{
		alert("You cannot bet now!");
	}
});

function resets()
{
	$(".double_hit").css({"visibility":"hidden"});
	$(".your-bet").css({"visibility":"hidden"});
	$(".redeal").css({"visibility":"visible"});
	$(".bet").css({"visibility":"visible"});
	for(i=0;i<53;i++){
		track[i]=0;
		dealer[i]=player[i]=-1;
	}
	sump=0;
	sumd=0;
	hit=1;
	cnt=0;
	bet = 0;
	disp=0;
	var pic ="img/cards/back.png";
	for(i=1;i<12;i++){
		var name = ".player" + i
		$(name).attr("src",pic);
		$(name).css({"visibility":"hidden"});
		var name = ".dealer" + i
		$(name).attr("src",pic);
		$(name).css({"visibility":"hidden"});
	}
}
function win(bet){
	balance+=bet;
	var dollar = "$" + " " + balance;
	$(".balance").html(dollar);
	for(i=0;i<dealercard.length;i++){
			var dealername = ".dealer"+(i+1);
			$(dealername).css({'visibility':'visible'});
			var pic = "img/cards/" + dealercard[i] + ".png";
				$(dealername).attr("src",pic);
	}
	alert("You Win");
	resets();
};

function lose(bet){
	balance-=bet;
	var dollar = "$" + " " + balance;
	$(".balance").html(dollar);
	for(i=0;i<dealercard.length;i++){
			var dealername = ".dealer"+(i+1);
			$(dealername).css({'visibility':'visible'});
			var pic = "img/cards/" + dealercard[i] + ".png";
				$(dealername).attr("src",pic);
	}
	alert("You Lose");
	resets();
};

$(".bet").click(function(){
	if(bet!=0){
	hit++;
	$(".redeal").css({"visibility":"hidden"});
	$(".bet").css({"visibility":"hidden"});
	$(".double_hit").css({"visibility":"visible"});
	for(i=1;i<12;i++){
		var hide = ".dealer" + i;
		$(hide).css({"visibility":"hidden"});
		var hide = ".player" + i;
		$(hide).css({"visibility":"hidden"});
	}
	for(i=0;i<4;i++){
		var rnd = Math.round(Math.random()*52);
		if(track[rnd]==1 || rnd==0){
			i--;
			continue;
		}
		else{
			if(i==0){
				track[rnd]=1;
				var pic = "img/cards/" + rnd + ".png";
				$(".dealer1").attr("src",pic);
				$(".dealer1").css({"visibility":"visible"});
				dealer[rnd]=1;
				dealercard[cnt++]=rnd;
			}
			else if(i==3){
				track[rnd]=1;
				var pic = "img/cards/" + rnd + ".png";
				$(".dealer2").css({"visibility":"visible"});
				dealer[rnd]=1;
				dealercard[cnt++]=rnd;
			}
			else{
				track[rnd]=1;
				var pic ="img/cards/" + rnd + ".png";
				var name = ".player" + i
				$(name).attr("src",pic);
				$(name).css({"visibility":"visible"});
				player[rnd]=1;
			}
		}
	}
		for(i=1;i<53;i++)
		{
			if(player[i]!=-1)
			{
				if(i%13>10 || i%13==0)
				{	sump+=10; }
				else if(i%13==1)
				{	sump+=11; }
				else
				{	sump+=i%13; }
			}
			if(dealer[i]!=-1)
			{
				if(i%13>10 || i%13==0)
				{	sumd+=10; }
				else if(i%13==1)
				{	sumd+=11; }
				else
				{	sumd+=i%13; }
			}
		}
		if(sump==22)
			sump-=10;
		if(sumd==22)
			sumd-=22;
	}
	else{
		alert("You haven't placed your Bet!!");
	}
	
});

$('.hit').click(function(){
	hit++;
	var j,flag=0;
	var rnd = Math.round(Math.random()*52);
	var pic ="img/cards/" + rnd + ".png";
	var name = ".player" + hit;
	$(name).attr("src",pic);
	$(name).css({"visibility":"visible"});
	while(track[rnd]==1 && rnd!=0){
		rnd = Math.round(Math.random()*52);
	}
	var pic ="img/cards/" + rnd + ".png";
	var name = ".player" + hit;
	$(name).attr("src",pic);
	$(name).css({"visibility":"visible"});
	track[rnd]=1;
	player[rnd]=1;
	sump=0;
	for(i=1;i<53;i++)
	{
		if(player[i]!=-1)
		{
			if(i%13>10 || i%13==0)
				sump+=10;
			else if(i%13==1)
				sump+=1;
			else
				sump+=i%13;
		}	
	}
	if(sump==21)
		$('.double').click();
	if(sump>21)
	{
		lose(bet);
	}
	if(player[1]!=-1 || player[14]!=-1 || player[27]!=-1 || player[40]!=-1)
	{
		if(sump+10<=21)
			sump+=10;
	}
});

$('.double').click(function(){
	if(sumd>sump)
	{
		lose(bet);
	}
	else if(sump==sumd && sump==21)
	{
		alert("Game Draw");
		resets();
	}
	else{
	while(sumd<21 && sumd<=sump)
	{
		var rnd = Math.round(Math.random()*52);
		while(track[rnd]==1 && rnd!=0)
			rnd = Math.round(Math.random()*52);
		track[rnd]=1;
		dealer[rnd]=1;
		dealercard[cnt++]=rnd;
		sumd=0;
		for(i=1;i<53;i++)
		{
			if(dealer[i]!=-1)
			{
				if(i%13>10 || i%13==0)
					sumd+=10;
				else if(i%13==1)
					sumd+=1;
				else
					sumd+=i%13;
			}	
		}
		if(dealer[1]!=-1 || dealer[14]!=-1 || dealer[27]!=-1 || dealer[40]!=-1)
		{
			if(sumd+10<=21)
				sumd+=10;	
		}
	}
	if(sumd>sump && sumd<=21)
	{
		lose(bet);
	}
	else if(sump==sumd && sump==21)
	{
		alert("Game Draw");
		document.location.reload(true);	
	}
	else
	{
		win(bet);
	}
}
});

$('.redeal').click(function(){
	bet=0;
	$(".your-bet").css({"visibility":"hidden"});
});