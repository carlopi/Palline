(
function () {
    var punti = document.getElementById("punti");
    var schermo = document.getElementById("schermo");
    var canvas = schermo.getContext("2d");
   var cliccato = 0;	
   
   function cliccami()
   {
   cliccato++;
   }
   document.addEventListener("mouseclick", cliccami);
   
    var i = 0;
    var velocitaX = 30;
    var velocitaY = 10;
    var LARGHEZZA = 500;
    var ALTEZZA = 700;
    var RAGGIO = 25;
    var STEP = 0.01;
    var X = LARGHEZZA/2;
    var Y = 0;
    var color = 0;
    var che_devo_fa = "spara";
    var rando = 23;
    var previous;
    var puntiCorrente = 0;
    var puntiMigliore = 0;
    var rosso_ = 12;
	var verde_ = 124;
	var blu_ = 235;
	class PALLA
	{
	}
	var palle = Array(100000);
	var N = 0;
	var colors = Array(100);
	var numColors = 0;
	while (numColors < 50)
	{
	rosso_ = (rosso_ + 57)%256;
	verde_ = (verde_ + 153)%256;
	blu_ = (blu_ + 211)%256;
		colors[numColors] = "rgb(" +  rosso_ + "," +  verde_ +  "," + blu_ +")";
		numColors++;
	}
var lastAngle = 1;
var velAngle = 0.02;
var colorIDs = Array(100000);
var colorNmber = 2;
for (var i =0; i<10000; i++)
{
	colorIDs[i] = (i*i*i)%colorNmber;
	if (i% 30 == 29) colorNmber++;
}
	canvas.fillStyle = "rgb(255,255,255)";
	canvas.beginPath();
	canvas.arc(X ,ALTEZZA - Y, 18000,0,2*3.1415);
	canvas.fill();

var ballNumber = 0;
    function spara()
    {
	X = LARGHEZZA / 2;
	Y = RAGGIO;
	    color = colorIDs[ballNumber];
	canvas.fillStyle = "rgb(240,0,0)";
	canvas.beginPath();
	canvas.arc(X , ALTEZZA - Y, 180,0,2*3.1415);
	canvas.fill();
	canvas.fillStyle = "rgb(255,255,255)";
	canvas.beginPath();
	canvas.arc(X , ALTEZZA - Y, 150,0,2*3.1415);
	canvas.fill();
	canvas.fillStyle = colors[color];
	canvas.beginPath();
	canvas.arc(X , ALTEZZA - Y, RAGGIO,0,2*3.1415);
	canvas.fill();
	if (cliccato != 0)
	{
	che_devo_fa = "pippo";
	    color = colorIDs[ballNumber];
	ballNumber++;
	return;
	}
	else
	{

        velocitaY = 0;
	while (velocitaY < 0.15 * STEP)
	{
		velocitaY = Math.sin(rando) * STEP;		
		velocitaX = Math.cos(rando) * STEP;
		rando+=velAngle;
	}
	if (false) for (var k=0; k<17000; k+=1000)
	{
	canvas.fillStyle = "rgb(" +  255 + "," + 255 +  "," + 255 +")";
	canvas.beginPath();
	canvas.arc(X + Math.cos(lastAngle)*STEP* k , ALTEZZA - (Y + Math.sin(lastAngle)*STEP * k), 3.5,0,2*3.1415);
	canvas.fill();
	}
	lastAngle = rando;
	for (var k=0; k<17000; k+=1000)
	{
	canvas.fillStyle = "rgb(" +  55 + "," + 55 +  "," + 55 +")";
	canvas.beginPath();
	canvas.arc(X + Math.cos(lastAngle)*STEP* k ,ALTEZZA - (Y + Math.sin(lastAngle)*STEP * k), 3.00,0,2*3.1415);
	canvas.fill();
	}
	}
	}
function muovi() {
	if (Y > ALTEZZA-RAGGIO)
	{
		cliccato = 0;
		che_devo_fa = "spara";
		return -1;
	}
	for (var n = 0; n < N; n++) if (palle[n].valid == 1)
	{
		var dx = palle[n].X - X;
		var dy = palle[n].Y - Y;
		if (dx*dx + dy*dy < RAGGIO*RAGGIO*4.01)
		{
			cliccato = 0;
			che_devo_fa = "spara";
			return n;
		}
	}

	X += velocitaX;
	Y += velocitaY;
	if (X > LARGHEZZA - RAGGIO)
	{
		var quantoOltre = X - (LARGHEZZA - RAGGIO);
		X = LARGHEZZA - RAGGIO - quantoOltre;
		velocitaX *= -1;
	}
	if (X < RAGGIO)
	{
		var quantoOltre = RAGGIO-X;
		X = RAGGIO + quantoOltre;
		velocitaX *= -1;
	}
	return -2;
}

function clearAll()
{
	for (var n = 0; n<N; n++) if (palle[n].valid==1)
	{
		var prev = palle[n].linked;
		if (prev >= 0) if (palle[prev].valid == 2)
			palle[n].valid = 2;
	}
	var quante = 0
	for (var n = 0; n<N; n++) if (palle[n].valid==2)
	{
		quante++;
	canvas.fillStyle = "rgb(" +  255 + "," +  255 +  "," + 255 +")";
	canvas.beginPath();
	canvas.arc(palle[n].X,ALTEZZA - (palle[n].Y), RAGGIO *1.05,0,2*3.1415);
	canvas.fill();
	palle[n].valid = 0;
	}
	puntiCorrente += quante * quante;
	if (puntiMigliore < puntiCorrente) puntiMigliore = puntiCorrente;
}

function perso()
{
	puntiCorrente = 0;
	canvas.fillStyle = "rgb(255,255,255)";
	canvas.beginPath();
	canvas.arc(X ,(ALTEZZA - Y), 18000,0,2*3.1415);
	canvas.fill();
	for (var i = 0; i<N; i++)
		palle[i].valid = 0;
	N = 0;
	ballNumber = 0;
	che_devo_fa = "spara";
}

 function pippo() {
	var stato;
	var prevX = X;
	var prevY = Y;
	stato = -2;
	var tot = 0.0;
	while (tot<20.0 && stato == -2)
	{
		stato = muovi();
		tot += STEP;
	}
	
	canvas.fillStyle = "rgb(" +  255 + "," +  255 +  "," + 255 +")";
	canvas.beginPath();
	canvas.arc(prevX,ALTEZZA - (prevY), RAGGIO*1.05,0,2*3.1415);
	canvas.fill();

	canvas.fillStyle = "rgb(240,0,0)";
	canvas.beginPath();
	canvas.arc(LARGHEZZA/2 ,ALTEZZA - RAGGIO, 180,0,2*3.1415);
	canvas.fill();
	canvas.fillStyle = "rgb(255,255,255)";
	canvas.beginPath();
	canvas.arc(LARGHEZZA/2 ,ALTEZZA - RAGGIO, 150,0,2*3.1415);
	canvas.fill();
	if (stato != -2)
	{
		palle[N] = new PALLA();
		palle[N].X = X;
		palle[N].Y = Y;
		palle[N].colorId = color;
		palle[N].linked = stato;
		palle[N].valid = 1;
		palle[N].number = 1;
		N++;

		var dx = X - LARGHEZZA/2;
		var dy = Y - RAGGIO;
		


		if (stato >= 0) if( palle[stato].colorId == color)
		{
			palle[stato].number++;
			if (palle[stato].number >= 3)
				palle[stato].valid = 2;
		var previous = -1;
		if (stato >=0)
		{
			previous = palle[stato].linked;
		}
		if (previous >= 0 && palle[previous].colorId == color)
		{
			palle[previous].number++;
			if (palle[previous].number >= 3)
				palle[previous].valid = 2;
		}
		}
		clearAll();
	if (palle[N-1].valid == 1)
	{
		if (dx*dx + dy * dy < (RAGGIO + 180)*(RAGGIO + 180))
		{	
			perso();
			return;
		}
	
		canvas.fillStyle = colors[color];
		canvas.beginPath();
		canvas.arc(X,ALTEZZA - Y,RAGGIO,0,2*3.14);
		canvas.fill();
	}
	}
	else {
	
		canvas.fillStyle = colors[color];
		canvas.beginPath();
		canvas.arc(X,ALTEZZA - Y,RAGGIO,0,2*3.14);
		canvas.fill();
	}
}

/*
var conta = 0;
	while (conta < 10)
{
	cliccato = 0;
		spara();
		spara();
		spara();
		spara();
	cliccato = 1;
	if (che_devo_fa == "spara")
	{
		spara();
		conta++;
	}
	else
		pippo();

}
*/






function principale()
{
	if (che_devo_fa == "spara")
		spara();
	else
		pippo();
	punti .innerHTML = "<h3> punti = " + puntiCorrente + " / record = " + puntiMigliore + "</h3>";
	requestAnimationFrame(principale);
}
	requestAnimationFrame(principale);
})();
