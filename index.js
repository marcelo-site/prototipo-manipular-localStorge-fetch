// gravar dados recebidos em json na localStorage via get
export function fetchGetLocal(url, keyStorage) {
    if (localStorage.hasOwnProperty(keyStorage) === false) {
        fetch(url)
            .then(res => { if (res.ok) return res.json() })
            .then(json => localStorage.setItem(keyStorage, json))
            .catch(error => console.log(error))
    }
}

// function para atualizar dados da localstorage via post
export async function fetchPostLocal(url, data,keyStorage, fn, fn_param1, fn_param2) {

    const obj = {
        produtos: data.map(el => el)
    }
    const body = JSON.stringify(obj)
  fetch(url, {
        method: "POST",
        body: body,
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(res => {
            if (res.ok) localStorage.removeItem(keyStorage)
        })
        // gravar valores na localstorage novamente (function acima)
        .then(() => fn(fn_param1, fn_param2))
        .catch(err => console.log(err));
}
