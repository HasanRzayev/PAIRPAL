// Dictionary object
let dictionary = {};

// Load dictionary from localStorage on page load
function loadDictionary() {
    const storedDictionary = localStorage.getItem("dictionary");
    if (storedDictionary) {
        dictionary = JSON.parse(storedDictionary);
    }
}

// Save dictionary to localStorage
function saveDictionary() {
    localStorage.setItem("dictionary", JSON.stringify(dictionary));
}

// Show popup for different actions
function showPopup(action) {
    const popup = document.getElementById("popup");
    const popupBody = document.getElementById("popup-body");
    popup.style.display = "flex";

    let content = "";
    switch (action) {
        case "add":
            content = `
                <h2>Add Key-Value Pair</h2>
                <input type="text" id="key" placeholder="Enter key">
                <input type="text" id="value" placeholder="Enter value">
                <button onclick="addKeyValue()">Submit</button>
            `;
            break;
        case "remove":
            content = `
                <h2>Remove Key</h2>
                <input type="text" id="key" placeholder="Enter key">
                <button onclick="removeKey()">Submit</button>
            `;
            break;
        case "addText":
            content = `
                <h2>Add Text</h2>
                <textarea id="text" placeholder="Enter text"></textarea>
                <button onclick="addText()">Submit</button>
            `;
            break;
        default:
            content = `<p>Invalid action</p>`;
    }
    popupBody.innerHTML = content;
}

// Close the popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Add a key-value pair to the dictionary
function addKeyValue() {
    const key = document.getElementById("key").value;
    const value = document.getElementById("value").value;
    if (key && value) {
        dictionary[key] = value;
        saveDictionary(); // Save dictionary to localStorage
        alert(`Added: ${key} -> ${value}`);
    } else {
        alert("Key and value cannot be empty.");
    }
    closePopup();
}

// Remove a key from the dictionary
function removeKey() {
    const key = document.getElementById("key").value;
    if (dictionary[key]) {
        delete dictionary[key];
        saveDictionary(); // Save updated dictionary to localStorage
        alert(`Removed: ${key}`);
    } else {
        alert("Key does not exist.");
    }
    closePopup();
}

// Clear the dictionary
function clearDictionary() {
    if (confirm("Clear entire dictionary?")) {
        dictionary = {};
        saveDictionary(); // Save the cleared dictionary to localStorage
        alert("Dictionary cleared.");
    }
}

// Show a random test
function showRandomTest() {
    document.getElementById("random-test-section").classList.remove("hidden");
}

// Start a random test
function startRandomTest() {
    const keys = Object.keys(dictionary);
    if (!keys.length) {
        alert("Dictionary is empty.");
        return;
    }
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const answer = prompt(`Value for '${randomKey}'?`);
    if (answer === dictionary[randomKey]) {
        alert("✅ Correct!");
    } else {
        alert(`❌ Incorrect! Correct value: ${dictionary[randomKey]}`);
    }
}

// Add multiple key-value pairs from text input
function addText() {
    const text = document.getElementById("text").value;
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i += 2) {
        const key = lines[i];
        const value = lines[i + 1] || "No value";
        dictionary[key] = value;
    }
    saveDictionary(); // Save updated dictionary to localStorage
    alert("Text added.");
    closePopup();
}

// Show all key-value pairs in the dictionary
function showAll() {
    const showAllSection = document.getElementById("show-all-section");
    showAllSection.innerHTML = Object.keys(dictionary).length
        ? Object.entries(dictionary).map(([key, value]) => `
            <div class="pair">
                <span><strong>Key:</strong> ${key}</span>
                <span><strong>Value:</strong> ${value}</span>
            </div>
        `).join("")
        : "<p>Dictionary is empty.</p>";
}

// Load the dictionary when the page loads
window.onload = loadDictionary;
