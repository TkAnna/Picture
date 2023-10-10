<?php
//echo var_dump($_FILES);
//echo var_dump($_POST);

$response = array(
    'files' => $_FILES,
    'post_data' => $_POST
);
 
//echo json_encode($response);
echo var_dump($response);