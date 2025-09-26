const labelInput = document.getElementById('label');
const addBtn = document.getElementById('addField');
const preview = document.getElementById('preview');
const typeSelect = document.getElementById('type');
const placeIn = document.getElementById('place');
const finalizeBtn = document.getElementById('finalize');

let fields = [];

typeSelect.addEventListener('change', ()=>{
    if (['radio', 'checkbox', 'select'].includes(typeSelect.value)){
        document.getElementById('optionsArea').style.display = 'flex';
        document.getElementById('titre').style.display = 'none';
    } else{
        document.getElementById('optionsArea').style.display = 'none';
        document.getElementById('titre').style.display = 'flex';
    }
})

addBtn.addEventListener('click', ()=>{
    const label = labelInput.value.trim();
    const place = placeIn.value.trim();
    const type = typeSelect.value;
    const options = document.getElementById('options').value
        .split('\n')
        .map(o => o.trim())
        .filter(o => o);
    
    if (!label) return alert('Donne un nom au champ !');

    if (['radio', 'checkbox', 'select'].includes(type) && options.length === 0){
        return alert('Il faut ajouter au moins une option !');
    }
    
    fields.push({label, type, options, place});
    
    renderPreview();
    labelInput.value = '';
    document.getElementById('options').value = '';
    document.getElementById('place').value = '';
});

function renderPreview(){
    preview.innerHTML = '';
    fields.forEach(f => {
        const wrapper = document.createElement('div');
        const lbl = document.createElement('label');
        wrapper.className = 'wrapper';
        lbl.textContent = f.label;

        wrapper.appendChild(lbl);

        if (f.type === 'text'){
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = f.place;
            wrapper.appendChild(input);
        } else if(f.type === 'textarea'){
            const textarea = document.createElement('textarea');
            textarea.rows = 6;
            textarea.placeholder = f.place;
            wrapper.appendChild(textarea);
        }
         else if(f.type === 'radio'){
            f.options.forEach(opt =>{
                const div = document.createElement('div');
                div.innerHTML = `<label><input type="radio" disabled> ${opt} </label>`;
                wrapper.appendChild(div);
                wrapper.className = 'wrapperT';
            });
        }
         else if(f.type === 'checkbox'){
            f.options.forEach(opt =>{
                const div = document.createElement('div');
                div.innerHTML = `<label><input type="checkbox" disabled> ${opt} </label>`;
                wrapper.appendChild(div);
                wrapper.className = 'wrapperT';
            });
        }
         else if(f.type === 'select'){
            const sel = document.createElement('select');
            f.options.forEach(opt =>{
                const o = document.createElement('option');
                o.textContent = opt;
                sel.appendChild(o);
            });
            wrapper.appendChild(sel);
        }
         

        preview.appendChild(wrapper);
    });
};

finalizeBtn.addEventListener('click', () =>{
    if (fields.length === 0){
        return alert('Ajoute au moins un champ');
    }
    localStorage.setItem('form_schema', JSON.stringify(fields));

    window.location.href = 'form.html';
});
