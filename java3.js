function obliczPr() {
    const a = parseFloat(document.getElementById('pr_a').value);
    const b = parseFloat(document.getElementById('pr_b').value);

    const out = document.getElementById('wynik_pr');

    if (!isFinite(a) || !isFinite(b) || a <= 0 || b <= 0) {
        out.innerText = 'Wprowadź poprawne wartości większe od 0.';
        return;
    }

    const pole = a * b;
    const obwod = 2 * (a + b);

    out.innerHTML = 'Pole: ' + pole.toFixed(2) + '<br>Obwód: ' + obwod.toFixed(2);
}

function obliczTr() {
    const a = parseFloat(document.getElementById('tr_a').value);
    const h = parseFloat(document.getElementById('tr_h').value);
    const b = parseFloat(document.getElementById('tr_b').value);
    const c = parseFloat(document.getElementById('tr_c').value);

    const out = document.getElementById('wynik_tr');

    if (!isFinite(a) || !isFinite(h) || !isFinite(b) || !isFinite(c) || a <= 0 || h <= 0 || b <= 0 || c <= 0) {
        out.innerText = 'Wprowadź poprawne wartości większe od 0.';
        return;
    }

    const pole = 0.5 * a * h;
    const obwod = a + b + c;

    out.innerHTML = 'Pole: ' + pole.toFixed(2) + '<br>Obwód: ' + obwod.toFixed(2);
}

function obliczTp() {
    const a = parseFloat(document.getElementById('tp_a').value);
    const b = parseFloat(document.getElementById('tp_b').value);
    const h = parseFloat(document.getElementById('tp_h').value);
    const c = parseFloat(document.getElementById('tp_c').value);
    const d = parseFloat(document.getElementById('tp_d').value);

    const out = document.getElementById('wynik_tp');

    if (!isFinite(a) || !isFinite(b) || !isFinite(h) || !isFinite(c) || !isFinite(d) || a <= 0 || b <= 0 || h <= 0 || c <= 0 || d <= 0) {
        out.innerText = 'Wprowadź poprawne wartości większe od 0.';
        return;
    }

    const pole = ((a + b) / 2) * h;
    const obwod = a + b + c + d;

    out.innerHTML = 'Pole: ' + pole.toFixed(2) + '<br>Obwód: ' + obwod.toFixed(2);
}

function obliczKo() {
    const r = parseFloat(document.getElementById('ko_r').value);

    const out = document.getElementById('wynik_ko');

    if (!isFinite(r) || r <= 0) {
        out.innerText = 'Wprowadź poprawne wartości większe od 0.';
        return;
    }

    const pole = Math.PI * r * r;
    const obwod = 2 * Math.PI * r;

    out.innerHTML = 'Pole: ' + pole.toFixed(2) + '<br>Obwód: ' + obwod.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    ['pr_a', 'pr_b', 'tr_a', 'tr_h', 'tr_b', 'tr_c', 'tp_a', 'tp_b', 'tp_h', 'tp_c', 'tp_d', 'ko_r'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    if (id.startsWith('pr_')) obliczPr();
                    if (id.startsWith('tr_')) obliczTr();
                    if (id.startsWith('tp_')) obliczTp();
                    if (id.startsWith('ko_')) obliczKo();
                }
            });
        }
    });
});
