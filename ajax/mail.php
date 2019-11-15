<?php 
  $name    = $_POST['name'];
  $email   = $_POST['email'];
  $message = $_POST['message'];
  
  $subject = '?utf-8?B?'.base64_encode('Сообщение из сайта').'?=';
  $headers = 'From: $email\r\nReply-to: $email\r\Content-type: text/html; charset=utf-8\r\n '

  $success = mail('valeriy.yeroshenko@gmail.com', $subject, $message, $headers);
  echo $success;
?>