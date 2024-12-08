let dictionary = {};

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

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

function addKeyValue() {
    const key = document.getElementById("key").value;
    const value = document.getElementById("value").value;
    if (key && value) {
        dictionary[key] = value;
        alert(`Added: ${key} -> ${value}`);
    } else {
        alert("Key and value cannot be empty.");
    }
    closePopup();
}

function removeKey() {
    const key = document.getElementById("key").value;
    if (dictionary[key]) {
        delete dictionary[key];
        alert(`Removed: ${key}`);
    } else {
        alert("Key does not exist.");
    }
    closePopup();
}

function clearDictionary() {
    if (confirm("Clear entire dictionary?")) {
        dictionary = {};
        alert("Dictionary cleared.");
    }
}

function showRandomTest() {
    document.getElementById("random-test-section").classList.remove("hidden");
}

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

function addText() {
    const text = document.getElementById("text").value;
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i += 2) {
        const key = lines[i];
        const value = lines[i + 1] || "No value";
        dictionary[key] = value;
    }
    alert("Text added.");
    closePopup();
}

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
