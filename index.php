<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" type="text/css" href="css/style.css" />

        <style>
      body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
      }
      h2 {
        font-size: 20px;
        color: #000000;
      }
      #example {
        visibility: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        z-index: 1000;
      }
      #example div {
        width: 350px;
        height: 80px;
        margin: 100px auto;
        background-color: #f2f2f2;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        padding: 15px;
        text-align: center;
        font-weight: bold;
        font-size: 15px;
        border: 3px solid #cccccc;
        position: absolute;
        left: 50%;
        top: 100px;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
      }
    </style>

    </head>
    <body>
        <h1>Accueil</h1>
        <button>Affectation</button>

        <h2>Créer Boîte Modale</h2>
    <a href="#" onclick="example()">ouvrir</a>
    <div id="example">
      <div>
        <p>Le contenu que vous souhaitez voir voir va ici.</p>
        <a href="#" onclick="example()">Cliquez ici pour fermer la boîte</a>
        <script>
        function example() {
          el = document.getElementById("example");
          el.style.visibility = el.style.visibility == "visible" ? "hidden" : "visible";
        }
      </script>
      </div>
    </div>
    </body>
    <script>
        var tableDonne = [];

        document.querySelector('button').onclick = function () {
            window.location.href = "affectation.php";
        }

    </script>
</html>
