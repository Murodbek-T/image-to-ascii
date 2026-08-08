const app = document.getElementById("app");

const title = document.createElement("h1");
title.innerText = "ASCII Converter";

const controlsBar = document.createElement("div");
controlsBar.className = "controls-bar";

const input = document.createElement("input");
input.type = "file";
input.id = "file-input";
input.accept = "image/*";

const fileLabel = document.createElement("label");
fileLabel.htmlFor = "file-input";
fileLabel.className = "file-label";
fileLabel.innerText = "Choose Image";

const button = document.createElement("button");
button.innerText = "Convert";

const downloadBtn = document.createElement("button");
downloadBtn.innerText = "Download PNG";

const canvas = document.createElement("canvas");
const pre = document.createElement("pre");

controlsBar.appendChild(input);
controlsBar.appendChild(fileLabel);
controlsBar.appendChild(button);

app.appendChild(title);
app.appendChild(controlsBar);
app.appendChild(canvas);
app.appendChild(pre);

input.addEventListener("change", () => {
  if (input.files && input.files[0]) {
    fileLabel.innerText = input.files[0].name;
  }
});

function makeASCII(imgElement, targetWidth = 120) {
  const ctx = canvas.getContext("2d");
  const ratio = 1;

  const targetHeight = Math.floor(
    targetWidth * (imgElement.naturalHeight / imgElement.naturalWidth) * ratio,
  );

  canvas.width = targetWidth;
  canvas.height = targetHeight;
  ctx.drawImage(imgElement, 0, 0, targetWidth, targetHeight);

  const density = " .:-=+*#%@";
  const { data } = ctx.getImageData(0, 0, targetWidth, targetHeight);

  let asciiArt = "";
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const offset = (y * targetWidth + x) * 4;

      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];

      const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const index = Math.floor((brightness / 255) * (density.length - 1));

      asciiArt += density[index];
    }
    asciiArt += "\n";
  }

  pre.textContent = asciiArt;
}

button.addEventListener("click", () => {
  if (!input.files || !input.files[0]) {
    alert("Please select an image first!");
    return;
  }

  const image = document.createElement("img");

  image.onload = () => {
    makeASCII(image);
    URL.revokeObjectURL(image.src);
  };

  image.src = URL.createObjectURL(input.files[0]);
  controlsBar.appendChild(downloadBtn);
});

downloadBtn.addEventListener("click", () => {
  if (!pre.textContent) {
    alert("Generate ASCII art first!");
    return;
  }
  downloadAsciiImage(pre.textContent, 14);
});

function downloadAsciiImage(asciiText, fontSize = 16, widthMultiplier = 1.5) {
  const lines = asciiText.split("\n");
  if (lines.length === 0 || !asciiText.trim()) return;

  const maxLineLength = Math.max(...lines.map((line) => line.length));

  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.font = `${fontSize}px "Courier New", Courier, monospace`;

  const measuredCharWidth = tempCtx.measureText("M").width;
  const charWidth = measuredCharWidth * widthMultiplier;
  const fontHeight = fontSize * 0.9;

  const outputCanvas = document.createElement("canvas");
  const ctx = outputCanvas.getContext("2d");

  outputCanvas.width = Math.ceil(maxLineLength * charWidth);
  outputCanvas.height = Math.ceil(lines.length * fontHeight);

  ctx.fillStyle = "#090a0f";
  ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

  ctx.fillStyle = "#f4f4f5";
  ctx.font = `${fontSize}px "Courier New", Courier, monospace`;
  ctx.textBaseline = "top";

  lines.forEach((line, lineIndex) => {
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      ctx.fillText(
        line[charIndex],
        charIndex * charWidth,
        lineIndex * fontHeight,
      );
    }
  });

  const link = document.createElement("a");
  link.download = "ascii-art.png";
  link.href = outputCanvas.toDataURL("image/png");
  link.click();
}
