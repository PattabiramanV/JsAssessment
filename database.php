<?php

$servername = "localhost";
$username = "dckap";
$password = "Dckap2023Ubuntu";
$dbname = "product";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

class Product {

    public $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function addProduct( $query) {

        

        try {
         
            if ($this->db->query($query)) {
                return json_encode(["status" => "success", "message" => "Product quantity updated successfully"]);
            } else {
                return json_encode(["status" => "error", "message" => "Failed to add or update product"]);
            }

        } catch (mysqli_sql_exception $e) {
         
            return json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
        } catch (Exception $e) {
          
            return json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
        }


        

    }



    public function addrecipient($data) {

        $name = $data['name'];
        $quantity = $data['quantity'];
        $recipient = $data['recipient'];
    
    $result = $this->db->query("SELECT * FROM products WHERE product_name = '$name'");

    if ($result && $result->num_rows === 0) {
        return ["status" => "error", "message" => "Product does not exist"];
    }

 
        $query = "
            INSERT INTO recipient (product, recipient, quantity)
            VALUES ('$name', '$recipient', $quantity)
        ";
        try {
    
            if ($this->db->query($query)) {

                return ["status" => "success", "message" => "Product quantity updated successfully"];
            } else {
                return json_encode(["status" => "error", "message" => "Failed to add or update product"]);
            }
        } catch (mysqli_sql_exception $e) {
     
            return json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
        } catch (Exception $e) {
     
            return json_encode(["status" => "error", "message" => "Error: " . $e->getMessage()]);
        }
        
    return $data;



    }


    public function getHighestProduct($option=null) {

        
        $query = "
            SELECT * FROM products
            ORDER BY quantity DESC
            ;
        ";

        if($option){
            $query = "
            SELECT * FROM recipient;
        ";
            
        }
        try {
    
            $result = $this->db->query($query);
    
            if ($result) {
          
            
                $data = $result->fetch_all(MYSQLI_ASSOC);
         
                if (!empty($data)) {
                    return ["status" => "success", "data" => $data];
                } else {
                    return ["status" => "no_results", "message" => "No products found"];
                }
            } else {
                return ["status" => "error", "message" => "Failed to execute query"];
            }
        } catch (mysqli_sql_exception $e) {
     
            return ["status" => "error", "message" => "Database error: " . $e->getMessage()];
        } catch (Exception $e) {
      
            return ["status" => "error", "message" => "Error: " . $e->getMessage()];
        }
    }
    

    

}

$product = new Product($conn);


?>
