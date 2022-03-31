<?php
// декодировка JSON для PHP
$_POST = json_decode(file_get_contents('php://input'), true);
//var_dump() show variables information
echo var_dump($_POST);
?>