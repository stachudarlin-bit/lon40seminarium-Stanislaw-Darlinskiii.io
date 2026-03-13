const band1 = document.getElementById("band1");
const band2 = document.getElementById("band2");
const band3 = document.getElementById("band3");
const band4 = document.getElementById("band4");
const result = document.getElementById("result");

const digitColors = [
  { name: "Black", value: 0 },
  { name: "Brown", value: 1 },
  { name: "Red", value: 2 },
  { name: "Orange", value: 3 },
  { name: "Yellow", value: 4 },
  { name: "Green", value: 5 },
  { name: "Blue", value: 6 },
  { name: "Violet", value: 7 },
  { name: "Gray", value: 8 },
  { name: "White", value: 9 }
];

const multiplierColors = [
  { name: "Silver", value: 0.01 },
  { name: "Gold", value: 0.1 },
  ...digitColors.map((c) => ({ name: c.name, value: 10 ** c.value }))
];

const toleranceColors = [
  { name: "Brown", value: 1 },
  { name: "Red", value: 2 },
  { name: "Green", value: 0.5 },
  { name: "Blue", value: 0.25 },
  { name: "Violet", value: 0.1 },
  { name: "Gray", value: 0.05 },
  { name: "Gold", value: 5 },
  { name: "Silver", value: 10 }
];

function fillSelect(select, options, formatValue) {
  select.innerHTML = "";
  options.forEach((option) => {
    const el = document.createElement("option");
    el.value = String(option.value);
    el.textContent = `${option.name} (${formatValue(option.value)})`;
    select.appendChild(el);
  });
}

function formatOhms(value) {
  if (value >= 1_000_000) {
    return `${value / 1_000_000} MOhm`;
  }
  if (value >= 1_000) {
    return `${value / 1_000} kOhm`;
  }
  return `${value} Ohm`;
}

function updateResult() {
  const d1 = Number(band1.value);
  const d2 = Number(band2.value);
  const mult = Number(band3.value);
  const tol = Number(band4.value);

  const resistance = (d1 * 10 + d2) * mult;
  result.textContent = `Resistance: ${formatOhms(resistance)} (+/- ${tol}%)`;
}

fillSelect(band1, digitColors, (v) => v);
fillSelect(band2, digitColors, (v) => v);
fillSelect(band3, multiplierColors, (v) => `x${v}`);
fillSelect(band4, toleranceColors, (v) => `+/- ${v}%`);

band1.value = "1";
band2.value = "0";
band3.value = "100";
band4.value = "5";

[band1, band2, band3, band4].forEach((el) => {
  el.addEventListener("change", updateResult);
});

updateResult();