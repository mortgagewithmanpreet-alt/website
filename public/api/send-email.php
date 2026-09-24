<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

$formType = isset($data['formType']) ? $data['formType'] : 'Website Form Submission';
$formData = isset($data['formData']) ? $data['formData'] : [];

$recipients = ['eveswebworks@gmail.com', 'mortgagewithmanpreet@gmail.com'];
$to = implode(', ', $recipients);
$subject = "[New Lead] " . $formType . ": " . (isset($formData['fullName']) ? $formData['fullName'] : 'Website Visitor');

$body = "<h2>New Lead: " . htmlspecialchars($formType) . "</h2>";
$body .= "<table border='1' cellpadding='8' style='border-collapse:collapse;'>";
foreach ($formData as $key => $val) {
    $label = ucwords(preg_replace('/(?<!\ )[A-Z]/', ' $0', $key));
    $body .= "<tr><td><strong>" . htmlspecialchars($label) . "</strong></td><td>" . htmlspecialchars(is_array($val) ? json_encode($val) : $val) . "</td></tr>";
}
$body .= "</table>";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Mortgages With Manpreet <eveswebworks@gmail.com>\r\n";
if (isset($formData['email']) && filter_var($formData['email'], FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: " . $formData['email'] . "\r\n";
}

$mailSent = @mail($to, $subject, $body, $headers);

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Email sent via PHP mailer to ' . $to]);
} else {
    // Return 200 with notice or 500
    echo json_encode(['success' => false, 'message' => 'PHP mail() not supported on this host']);
}
