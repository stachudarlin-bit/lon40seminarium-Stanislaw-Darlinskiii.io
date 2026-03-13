<?php
// Funkcje liczące pola i obwody

function prostokat($a,$b){
    return [
        "pole"=>$a*$b,
        "obwod"=>2*($a+$b)
    ];
}

function trojkat($a,$h){
    return ($a*$h)/2;
}

function trapez($a,$b,$h){
    return (($a+$b)*$h)/2;
}

function okrag($r){
    return [
        "pole"=>pi()*$r*$r,
        "obwod"=>2*pi()*$r
    ];
}

// Zmienne wyników
$wynik = "";

if($_SERVER["REQUEST_METHOD"]=="POST"){

    // PROSTOKĄT
    if(isset($_POST["prostokat"])){

        $a = floatval($_POST["pa"]);
        $b = floatval($_POST["pb"]);

        if($a>0 && $b>0){

            $dane = prostokat($a,$b);

            $wynik = "Pole: ".round($dane["pole"],2).
                     "<br>Obwód: ".round($dane["obwod"],2);
        }
    }


    // TRÓJKĄT
    if(isset($_POST["trojkat"])){

        $a = floatval($_POST["ta"]);
        $h = floatval($_POST["th"]);

        if($a>0 && $h>0){

            $wynik = "Pole: ".round(trojkat($a,$h),2);
        }
    }


    // TRAPEZ
    if(isset($_POST["trapez"])){

        $a = floatval($_POST["za"]);
        $b = floatval($_POST["zb"]);
        $h = floatval($_POST["zh"]);

        if($a>0 && $b>0 && $h>0){

            $wynik = "Pole: ".round(trapez($a,$b,$h),2);
        }
    }


    // OKRĄG
    if(isset($_POST["okrag"])){

        $r = floatval($_POST["or"]);

        if($r>0){

            $dane = okrag($r);

            $wynik = "Pole: ".round($dane["pole"],2).
                     "<br>Obwód: ".round($dane["obwod"],2);
        }
    }
}

?>
<!DOCTYPE html>
<html lang="pl">

<head>

<meta charset="UTF-8">
<title>Kalkulator figur</title>

<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>

</head>


<body>

<h1>Kalkulator figur geometrycznych</h1>


<div class="container">

<form method="post" onsubmit="return validate()">


<div class="box">

<h3>Prostokąt</h3>

<input type="number" name="pa" id="pa" placeholder="Bok a" step="any">
<input type="number" name="pb" id="pb" placeholder="Bok b" step="any">

<button name="prostokat">Oblicz</button>

</div>



<div class="box">

<h3>Trójkąt</h3>

<input type="number" name="ta" id="ta" placeholder="Podstawa a" step="any">
<input type="number" name="th" id="th" placeholder="Wysokość h" step="any">

<button name="trojkat">Oblicz</button>

</div>



<div class="box">

<h3>Trapez</h3>

<input type="number" name="za" id="za" placeholder="Podstawa a" step="any">
<input type="number" name="zb" id="zb" placeholder="Podstawa b" step="any">
<input type="number" name="zh" id="zh" placeholder="Wysokość h" step="any">

<button name="trapez">Oblicz</button>

</div>



<div class="box">

<h3>Okrąg</h3>

<input type="number" name="or" id="or" placeholder="Promień r" step="any">

<button name="okrag">Oblicz</button>

</div>


</form>


<div class="wynik">

<?php
if($wynik!=""){
    echo $wynik;
}
?>

</div>


</div>


</body>
</html>
