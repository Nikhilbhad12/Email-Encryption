document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector("input[type='email']");
  const encryptBtn = document.querySelector("input[type='submit']");
  const outputText = document.querySelector(".output-text span");
  const copyBtn = document.querySelector(".output-text button");

  // Function to encrypt the email
  async function encryptEmail(email) {
    const encoder = new TextEncoder();
    const data = encoder.encode(email);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  }

  // When user clicks the encrypt button
  encryptBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();

    if (email === "") {
      alert("Please enter an email address.");
      return;
    }

    const encryptedEmail = await encryptEmail(email);
    outputText.textContent = encryptedEmail; // Display output
  });

  // Copy to clipboard function
  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(outputText.textContent)
      .then(() => {
        alert("Encrypted email copied to clipboard!");
      })
      .catch((err) => {
        console.error("Copy failed", err);
      });
  });
});
