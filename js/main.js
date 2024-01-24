const colorInput = document.getElementById("colorInput");
const dropperColorInput = document.getElementById("dropperColorInput");
const paletteColors = document.getElementById("palette-colors");
const modalPaletteColors = document.getElementById("modal-palette-colors");
const filename = document.getElementById("paletteNameInput");
const colorBox = document.getElementById("color");
const modalDownload = document.getElementById("modal-download");
const modalLogin = document.getElementById("modal-login");
const modalRegister = document.getElementById("modal-register");
const modalSavePalette = document.getElementById("modal-savePalette");
let modals = document.querySelectorAll(".modal");
let arrPalette = new Array();

const addColorToPalette = () => {
  const color = colorInput.value;
  arrPalette.push(color);
  refreshPalette();
};

const changePickerColor = () => {
  const color = colorInput.value;
  colorBox.style.background = color;
};

const setRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777216).toString(16);
  const color = "#" + "0".repeat(6 - randomColor.length) + randomColor;
  colorBox.style.background = color;
  colorInput.value = color;
};

const refreshPalette = () => {
  paletteColors.innerHTML = "";
  arrPalette.forEach((c, i) => {
    let paletteColor = document.createElement("li");
    paletteColor.setAttribute("class", "palette-color");
    paletteColor.setAttribute("id", `${i}`);
    paletteColor.style.background = c;
    paletteColor.addEventListener("click", () =>
      deleteColorFromPalette(paletteColor)
    );
    paletteColors.appendChild(paletteColor);
  });
};

const deleteColorFromPalette = (el) => {
  arrPalette.splice(el.id, 1);
  refreshPalette();
  if (arrPalette.length === 0) setDefaultPaletteColor();
  console.log(arrPalette);
};

const setRandomPalette = () => {
  for (let i = 0; i < 6; i++) {
    const randomColor = Math.floor(Math.random() * 16777216).toString(16);
    const color = "#" + "0".repeat(6 - randomColor.length) + randomColor;
    arrPalette.push(color);
  }
  refreshPalette();
};

const deletePalette = () => {
  arrPalette = [];
  refreshPalette();
  setDefaultPaletteColor();
};

const setDefaultPaletteColor = () => {
  const defaultPaletteColor = document.createElement("li");
  defaultPaletteColor.setAttribute("class", "palette-color");
  paletteColors.appendChild(defaultPaletteColor);
};

dropperColorInput.addEventListener("change", () => {
  const color = dropperColorInput.value;
  colorInput.value = color;
  colorBox.style.background = color;
});

const ableDropperColor = () => dropperColorInput.click();

const makePaletteFile = () => {
  let text = `:root{\n`;
  arrPalette.forEach((c, i) => {
    text += `\t--color-${i}: ${c}\n`;
  });
  text += `}`;
  return text;
};

const download = (filename, text) => {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const downloadPalette = () => download(filename.value, makePaletteFile());

const modalDownloadOpen = () => {
  modalDownload.classList.add("modal-open");
  const downloadPrev = document.getElementById("download-prev");
  downloadPrev.textContent = makePaletteFile();
};
const modalLoginOpen = () => modalLogin.classList.add("modal-open");
const modalRegisterOpen = () => modalRegister.classList.add("modal-open");
const modalSavePaletteOpen = () => {
  modalSavePalette.classList.add("modal-open");
  modalPaletteColors.innerHTML = "";
  arrPalette.forEach((c, i) => {
    let paletteColor = document.createElement("li");
    paletteColor.setAttribute("class", "palette-color");
    paletteColor.setAttribute("id", `${i}`);
    paletteColor.style.background = c;
    modalPaletteColors.appendChild(paletteColor);
  });
};
const exitModal = () => modals.forEach((m) => m.classList.remove("modal-open"));

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};
