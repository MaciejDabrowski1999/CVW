<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["Telefon"];
  $message = $_POST["message"];

  // Przykład zapisu danych do pliku tekstowego
  $file = fopen("form-info.txt", "a");
  fwrite($file, "Imię i nazwisko: " . $name . "\n");
  fwrite($file, "Email: " . $email . "\n");
  fwrite($file, "Telefon: " . $phone . "\n");
  fwrite($file, "Wiadomość: " . $message . "\n");
  fwrite($file, "-------------------------\n");
  fclose($file);

  // Możesz również dodać dodatkową logikę przetwarzania lub wysyłania wiadomości email tutaj

  exit;
}
?>
