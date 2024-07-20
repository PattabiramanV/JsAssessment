<?php

ini_set('display_errors', 1);   
ini_set('display_startup_errors', 1);   
error_reporting(E_ALL);  


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers:  Content-Type');

require "./database.php";

$method = $_SERVER['REQUEST_METHOD'];


if ($method === 'POST') {

  $option=$_GET['option'];

    $rawData =json_decode(file_get_contents('php://input'),true);
    $name = $rawData['name'];
    $quantity = $rawData['quantity'];


    if($option=='addproduct'){
 
        $name = $rawData['name'];
        $quantity = $rawData['quantity'];

        $query = "
            INSERT INTO products (product_name, quantity)
            VALUES ('$name', '$quantity')
            ON DUPLICATE KEY UPDATE
                quantity = quantity + VALUES(quantity);
        ";

       $result= $product->addProduct($query);

  echo json_encode($result);

    }
    elseif($option=='updateproduct'){

        $result= $product->addrecipient($rawData);
        echo json_encode($result);

    }

    elseif($option=='reducequantity'){
  
        $query = "
       INSERT INTO products (product_name, quantity)
   VALUES ( '$name' ,$quantity)
 ON DUPLICATE KEY UPDATE
    quantity = quantity - VALUES(quantity);

    ";
    
   $result= $product->addProduct($query);

echo json_encode($result);
       
    }



}

elseif($method=="GET"){

    if(isset($_GET['option'])){
        $result= $product->getHighestProduct(true);
        echo json_encode($result);

    }

    else{

        $result= $product->getHighestProduct();
    echo json_encode($result);
    }


}




?>



<?php
// Include database connection if needed
// require "./database.php";

// // Get the request method
// $method = $_SERVER['REQUEST_METHOD'];

// if ($method === 'POST') {
//     // Get the raw POST data
//     $rawData = file_get_contents('php://input');

//     // echo $rawData;
//     // Decode the JSON data
//     // $data = json_decode($rawData, true);
// // print_r($data);
//     // Check if data was successfully decoded
//     if (json_last_error() === JSON_ERROR_NONE) {
//         // Process the data (e.g., save to database, etc.)
//         // For this example, we'll just send it back as a JSON response

//         // Sample response data
//         $response = array(
//             "status" => "success",
//             "receivedData" => $data
//         );

//         // Set content type to JSON
//         header('Content-Type: application/json');

//         // Encode and send the response
//         echo json_encode($response);
//     }
//      else {
//         // Handle JSON decoding error
//         header('Content-Type: application/json', true, 400);
//         echo json_encode(array("status" => "error", "message" => "Invalid JSON"));
//     }
// }
//  else {
//     // Handle invalid request method
//     header('Content-Type: application/json', true, 405);
//     echo json_encode(array("status" => "error", "message" => "Method Not Allowed"));
// }
?>

