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
    </head>
    <body>
        <div id="bande">
            <img src="res/ONF_logo.png"/>
        <h1>Affectation</h1>
        </div>
        <form id="formAffect">
        <div id="choixArbre">
                <table id="tableArbre">
                <tbody> 
                </tbody>
                </table>
            </div>
            <div id="divCalendar">
                <input type="date" id="selectD">
            </div>
            <div id="divBucheron">
                <select name="selectBuch" id="selectBuch" size="15">
                </select>
            </div>

            <div name="divSecteur" id="divSecteur">
                <select name="selectSecteur" id="selectSecteur" size="15">
                </select>
            </div>

            <div name="divEspece" id="divEspece">
                <table sizeof=20>
                    <tr>
                        <td><input type="text" id="choixEspece"></td>
                    </tr>
                    <tr>
                        <td><select id="selectEspece" id="selectEspece" size="10" style="width: 200px"></select></td>
                    </tr>
                </table>
            </div>
        </form>
    </body>

    <script src="js/main.js"></script>
</html>
