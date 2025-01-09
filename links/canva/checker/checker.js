async function checkCanvaPremium() {
    const url = document.getElementById('url').value;
    const resultElement = document.getElementById('result');

    try {
        const response = await fetch(url);

        const responseText = await response.text();

        if (responseText.includes("Looks like you don't have access") || 
            responseText.includes("Not found (404)")) {
            resultElement.textContent = "Invalid: Access Denied or Not Found";
        } else {
            resultElement.textContent = "Valid: Access Granted";
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
}
