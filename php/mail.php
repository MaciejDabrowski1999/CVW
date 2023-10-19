<?php

$name = $_POST["name"];
$from = $_POST["mail"];
$phone = $_POST["phone"];
$message = $_POST["msg"];
$subject = "Wiadomość z formularza dabrowskiwebsite.pl";
$to = "maciej.dabrowski299@gmail.com";

$txt = "Imię " . $name . "\r\n" . "Email: " . $from . "\r\n" . "Telefon: " . $phone . "\r\n" . "\r\n" . "Treść: " . $message;

$headers = "From: " . $from . "\r\n";
$headers = "Replay-To: " . $from . "\r\n";

$mail_status = mail($to, $subject, $txt, $headers);

if ($mail_status){
    header("Location: /index.html?mail_status=sent");
} else{
    header("Location: /index.html?mail_status=error");
}
?>