<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $name = htmlspecialchars(strip_tags(trim($_POST['name'])));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags(trim($_POST['phone'])));
    $jobTitle = isset($_POST['jobTitle']) ? htmlspecialchars(strip_tags(trim($_POST['jobTitle']))) : '';
    $reason = isset($_POST['reason']) ? htmlspecialchars(strip_tags(trim($_POST['reason']))) : '';
    $subject = "Contact Form Submission"; // Generic subject line

    // Compose the email
    $email_subject = "New Form Submission from $name";
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Job Title: $jobTitle\n";
    $email_body .= "Reason for Contact: $reason\n";
    $email_body .= "\nMessage:\n" . htmlspecialchars(strip_tags(trim($_POST['message'])));

    // Email headers
    $headers = "From: dennislantz@hotmail.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail("dennislantz@hotmail.com", $email_subject, $email_body, $headers)) {
        echo "success"; // Return "success" to match JavaScript logic
    } else {
        echo "Failed to send message. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>

