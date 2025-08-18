<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanera och validera inmatningarna
    $name = htmlspecialchars(strip_tags(trim($_POST['name'])));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags(trim($_POST['phone'])));
    $subject = htmlspecialchars(strip_tags(trim($_POST['subject'])));
    $find_us = htmlspecialchars(strip_tags(trim($_POST['how-did-you-find-us'])));
    $terms = isset($_POST['terms']);

    // Hantera filuppladdning
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] == UPLOAD_ERR_OK) {
        $upload_dir = 'uploads/'; // Se till att denna mapp har skrivbehörigheter
        $file_name = basename($_FILES['resume']['name']);
        $file_tmp_name = $_FILES['resume']['tmp_name'];
        $file_path = $upload_dir . $file_name;

        // Flytta filen till uppladdningsmappen
        if (move_uploaded_file($file_tmp_name, $file_path)) {
            // Skapa e-postmeddelandet
            $email_subject = "New Job Application from $name";
            $email_body = "Name: $name\n";
            $email_body .= "Email: $email\n";
            $email_body .= "Phone: $phone\n";
            $email_body .= "Subject: $subject\n";
            $email_body .= "How did you find us: $find_us\n\n";
            $email_body .= "Resume: https://yourdomain.com/$file_path";

            // Header för e-post
            $headers = "From: info@atmosdesignstudio.se\r\n";
            $headers .= "Reply-To: $email\r\n";
            $headers .= "X-Mailer: PHP/" . phpversion();
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

            // Skicka e-post
            if (mail("info@atmosdesignstudio.se", $email_subject, $email_body, $headers)) {
                echo "Your application has been sent successfully!";
            } else {
                echo "Failed to send message. Please try again later.";
            }
        } else {
            echo "Failed to upload resume. Please try again.";
        }
    } else {
        echo "Please attach your resume.";
    }
}
?>
