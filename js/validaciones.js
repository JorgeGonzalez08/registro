export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostraMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesError ={
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres maximo 12, debe contener una letra minuscula, mayuscula, un numero y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo telefonico no puede estar vacio",
        patternMismatch: "El formato requerido es XX-XXXX-XXXX"
    },
    direccion: {
        valueMissing: "El campo direccion no puede estar vacio",
        patternMismatch: "La direccion debe tener 10 a 40"
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe tener 4 a 30"
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "El estado debe tener 4 a 30"
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function mostraMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            console.log(mensajesError[tipoDeInput][error]) 
            mensaje =mensajesError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    mayorDeEdad(fechaCliente);

    let mensaje = "";

    if (!mayorDeEdad(fechaCliente)) {
       // mensaje = "Debes tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    
    return diferenciaFechas <= fechaActual;
}