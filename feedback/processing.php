<?php

$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$message = $_POST["message"];

$to = "a.pechenevsky@gmail.com";
$subject = "Отправлена заявка с сайта cookies-studio.ru";
$messages = "Заявка была отправлена пользователем $name с email $email, телефоном $phone и сообщением $message";
$headers = "Feom: $name <$email>" . "\r\n";

if (mail($to, $subject, $messages, $headers))
{
    echo("Ваше сообщение успешно отправлено!");
}
else
{
    echo("Возникла ошибка при отправке сообщения!");
}