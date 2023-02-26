const colorContainer = document.querySelector("#color-container");

colorContainer.addEventListener("click", function (e) {
    // Extract only the number from the id of color Div
    const colorNumber = e.target.id.replace(/[^0-9]/g, "")
    const hexValueToCopy = document.getElementById(`color-hex-${colorNumber}`).innerText
    copyToClipboard(hexValueToCopy)
})

document.querySelector("#get-color-btn").addEventListener("click", function () {
    const inputColor = document.querySelector("#color-input").value.substring(1);
    const schemeInput = document.querySelector("#scheme-input").value;
    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${schemeInput}&count=5`)
        .then(res => res.json())
        .then(data => {
            const colorsArray = data.colors.map(color => {
                return color.hex.value
            })
            render(colorsArray)
        })
})

function copyToClipboard(value) {
    navigator.clipboard.writeText(value).then(() => {
        alert("Color copied to clipboard");
    }, () => {
        alert("Error copying color to clipboard");
    });
}

function generateColorDivsHtml(colors) {
    return colors.map((color, index) => {
        return `<div id="color-${index}" class="color" style="background-color:${color}"></div>`
    }).join("")
}

function generateColorHexHtml(colors) {
    return colors.map((color, index) => {
        return `<p id="color-hex-${index}" class="color-hex">${color}</p>`
    }).join("")
}

function render(colors) {
    colorContainer.innerHTML = generateColorDivsHtml(colors)
    colorContainer.innerHTML += generateColorHexHtml(colors)
}
