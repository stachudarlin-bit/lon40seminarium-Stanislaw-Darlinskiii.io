const stripe1 = document.getElementById("stripe1");
const stripe2 = document.getElementById("stripe2");
const stripe3 = document.getElementById("stripe3");
const stripe4 = document.getElementById("stripe4");
const stripe5 = document.getElementById("stripe5");
const stripe6 = document.getElementById("stripe6");
const stripe7 = document.getElementById("stripe7");
const stripe8 = document.getElementById("stripe8");
const stripe9 = document.getElementById("stripe9");
const palette = document.getElementById("palette");
const paletteTitle = document.getElementById("paletteTitle");
const paletteOptions = document.getElementById("paletteOptions");
const closePalette = document.getElementById("closePalette");
// second palette elements
const palette2 = document.getElementById("palette2");
const paletteTitle2 = document.getElementById("paletteTitle2");
const paletteOptions2 = document.getElementById("paletteOptions2");
const closePalette2 = document.getElementById("closePalette2");
const result = document.getElementById("result");
const result2 = document.getElementById("result2");

const digitColors = [
  { name: "Czarny", value: 0, css: "#111111" },
  { name: "Br�zowy", value: 1, css: "#7a3e1d" },
  { name: "Czerwony", value: 2, css: "#c62828" },
  { name: "Pomara�czowy", value: 3, css: "#ef6c00" },
  { name: "��ty", value: 4, css: "#fdd835" },
  { name: "Zielony", value: 5, css: "#2e7d32" },
  { name: "Niebieski", value: 6, css: "#1565c0" },
  { name: "Fioletowy", value: 7, css: "#6a1b9a" },
  { name: "Szary", value: 8, css: "#757575" },
  { name: "Bia�y", value: 9, css: "#f5f5f5" }
];

const multiplierColors = [
  { name: "Srebrny", value: 0.01, css: "#b0bec5" },
  { name: "Z�oty", value: 0.1, css: "#c9a227" },
  ...digitColors.map((c) => ({ name: c.name, value: 10 ** c.value, css: c.css }))
];

const toleranceColors = [
  { name: "Br�zowy", value: 1, css: "#7a3e1d" },
  { name: "Czerwony", value: 2, css: "#c62828" },
  { name: "Zielony", value: 0.5, css: "#2e7d32" },
  { name: "Niebieski", value: 0.25, css: "#1565c0" },
  { name: "Fioletowy", value: 0.1, css: "#6a1b9a" },
  { name: "Szary", value: 0.05, css: "#757575" },
  { name: "Z�oty", value: 5, css: "#c9a227" },
  { name: "Srebrny", value: 10, css: "#b0bec5" }
];

const bands = {
  1: { stripe: stripe1, options: digitColors, title: "Opaska 1 (cyfra)" },
  2: { stripe: stripe2, options: digitColors, title: "Opaska 2 (cyfra)" },
  3: { stripe: stripe3, options: digitColors, title: "Opaska 3 (cyfra)" },
  4: { stripe: stripe4, options: multiplierColors, title: "Opaska 4 (mnożnik)" },
  5: { stripe: stripe5, options: toleranceColors, title: "Opaska 5 (tolerancja)" },
  // second resistor (4-band): 6..9
  6: { stripe: stripe6, options: digitColors, title: "Drugi - Opaska 1 (cyfra)" },
  7: { stripe: stripe7, options: digitColors, title: "Drugi - Opaska 2 (cyfra)" },
  8: { stripe: stripe8, options: multiplierColors, title: "Drugi - Opaska 3 (mnożnik)" },
  9: { stripe: stripe9, options: toleranceColors, title: "Drugi - Opaska 4 (tolerancja)" }
};

const selected = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null
};

function applyStripeColor(el, color) {
  el.setAttribute("fill", color || "url(#bandEmpty)");
}

function formatOhms(value) {
  if (value >= 1000000) return `${value / 1000000} MOhm`;
  if (value >= 1000) return `${value / 1000} kOhm`;
  return `${value} Ohm`;
}

function updateResult() {
  const b1 = selected[1];
  const b2 = selected[2];
  const b3 = selected[3];
  const b4 = selected[4];
  const b5 = selected[5];

  applyStripeColor(stripe1, b1?.css);
  applyStripeColor(stripe2, b2?.css);
  applyStripeColor(stripe3, b3?.css);
  applyStripeColor(stripe4, b4?.css);
  applyStripeColor(stripe5, b5?.css);
  // paint second resistor bands too
  applyStripeColor(stripe6, selected[6]?.css);
  applyStripeColor(stripe7, selected[7]?.css);
  applyStripeColor(stripe8, selected[8]?.css);
  applyStripeColor(stripe9, selected[9]?.css);

  if (!b1 || !b2 || !b3 || !b4 || !b5) {
    result.textContent = "Rezystancja: wybierz kolory wszystkich pasków.";
  } else {
    const resistance = ((b1.value * 100) + (b2.value * 10) + b3.value) * b4.value;
    result.textContent = `Rezystancja: ${formatOhms(resistance)} (+/- ${b5.value}%)`;
  }

  // second resistor (4-band)
  const c1 = selected[6];
  const c2 = selected[7];
  const c3 = selected[8];
  const c4 = selected[9];

  if (!c1 || !c2 || !c3 || !c4) {
    result2.textContent = "Drugi rezystor: wybierz kolory wszystkich pasków.";
  } else {
    const resistance2 = (c1.value * 10 + c2.value) * c3.value;
    result2.textContent = `Drugi rezystor: ${formatOhms(resistance2)} (+/- ${c4.value}%)`;
  }
}

function openPalette(bandNumber, which = 1) {
  const config = bands[bandNumber];
  const pal = which === 2 ? palette2 : palette;
  const palTitle = which === 2 ? paletteTitle2 : paletteTitle;
  const palOptions = which === 2 ? paletteOptions2 : paletteOptions;

  palTitle.textContent = `Wybierz kolor: ${config.title}`;
  palOptions.innerHTML = "";

  config.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "palette-btn";
    btn.innerHTML = `<span class="swatch" style="background:${opt.css}"></span>${opt.name}`;
    btn.addEventListener("click", () => {
      selected[bandNumber] = opt;
      pal.hidden = true;
      updateResult();
    });
    palOptions.appendChild(btn);
  });

  pal.hidden = false;
}

function handleBandKeydown(event, bandNumber) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openPalette(bandNumber);
  }
}

stripe1.addEventListener("click", () => openPalette(1, 1));
stripe2.addEventListener("click", () => openPalette(2, 1));
stripe3.addEventListener("click", () => openPalette(3, 1));
stripe4.addEventListener("click", () => openPalette(4, 1));
stripe5.addEventListener("click", () => openPalette(5, 1));
stripe6.addEventListener("click", () => openPalette(6, 2));
stripe7.addEventListener("click", () => openPalette(7, 2));
stripe8.addEventListener("click", () => openPalette(8, 2));
stripe9.addEventListener("click", () => openPalette(9, 2));

stripe1.addEventListener("keydown", (e) => handleBandKeydown(e, 1));
stripe2.addEventListener("keydown", (e) => handleBandKeydown(e, 2));
stripe3.addEventListener("keydown", (e) => handleBandKeydown(e, 3));
stripe4.addEventListener("keydown", (e) => handleBandKeydown(e, 4));
stripe5.addEventListener("keydown", (e) => handleBandKeydown(e, 5));
stripe6.addEventListener("keydown", (e) => handleBandKeydown(e, 6));
stripe7.addEventListener("keydown", (e) => handleBandKeydown(e, 7));
stripe8.addEventListener("keydown", (e) => handleBandKeydown(e, 8));
stripe9.addEventListener("keydown", (e) => handleBandKeydown(e, 9));

// close handlers for both palettes
closePalette.addEventListener("click", () => { palette.hidden = true; });
closePalette2.addEventListener("click", () => { palette2.hidden = true; });

closePalette.addEventListener("click", () => {
  palette.hidden = true;
});

updateResult();
