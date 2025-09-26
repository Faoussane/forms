const data = JSON.parse(localStorage.getItem("form_schema") || "[]");
const formEl = document.getElementById("renderedForm");
const resultEl = document.getElementById("result");

data.forEach((f, idx) => {
  const wrapper = document.createElement("div");
  const lbl = document.createElement("label");
  lbl.textContent = f.label;
  wrapper.appendChild(lbl);

  if (f.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = f.place;
    input.name = "field_" + idx;
    wrapper.appendChild(input);
    wrapper.className = 'wrapper';
  } else if (f.type === "textarea") {
    const ta = document.createElement("textarea");
    ta.name = "field_" + idx;
    ta.placeholder = f.place;
    ta.rows = 6;
    ta.style.paddingLeft = '16px';
    wrapper.appendChild(ta);
    wrapper.className = 'wrapper';
  } else if (f.type === "radio" || f.type === "checkbox") {
    f.options.forEach((opt, i) => {
      const div = document.createElement("div");
      const input = document.createElement("input");
      input.type = f.type;
      input.name = "field_" + idx;
      input.value = opt;
      const lbl = document.createElement("label");
      lbl.textContent = opt;
      div.appendChild(input);
      div.appendChild(lbl);
      wrapper.appendChild(div);
      wrapper.className = 'wrappers';
    });
  } else if (f.type === "select") {
    const sel = document.createElement("select");
    sel.name = "field_" + idx;
    f.options.forEach(opt => {
      const o = document.createElement("option");
      o.textContent = opt;
      o.value = opt;
      sel.appendChild(o);
    });
    wrapper.className = 'wrapper';
    wrapper.appendChild(sel);
  }

  formEl.appendChild(wrapper);
});

// Soumission
document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const formData = new FormData(formEl);
  const out = {};
  for (let [key, val] of formData.entries()) {
    if (out[key]) {
      // si plusieurs valeurs (checkbox)
      if (!Array.isArray(out[key])) out[key] = [out[key]];
      out[key].push(val);
    } else {
      out[key] = val;
    }
  }
  resultEl.innerHTML = "<pre>" + JSON.stringify(out, null, 2) + "</pre>";
});
