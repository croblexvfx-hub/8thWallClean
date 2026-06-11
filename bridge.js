const BRIDGE_VERSION = "Bridge v81.15";

let modo = 0;

const panel = document.createElement("div");

panel.style.position = "fixed";
panel.style.top = "20px";
panel.style.left = "10px";
panel.style.background = "rgba(0,0,0,0.7)";
panel.style.color = "lime";
panel.style.padding = "10px";
panel.style.fontFamily = "monospace";
panel.style.fontSize = "14px";
panel.style.zIndex = "999999";
panel.style.whiteSpace = "pre";

panel.textContent =
    BRIDGE_VERSION +
    "\n" +
    "bridge.js cargado";

document.body.appendChild(panel);

panel.onclick = () => {

    modo++;

    if (modo > 4) modo = 0;

};

function registrarBridge() {


    XR8.addCameraPipelineModule({

        name: "bridge-test",

        onStart() {}

        onAttach() {}

        onDetach() {}

        onUpdate() {}
        
        onProcessCpu(...args) {

    let texto =
        BRIDGE_VERSION +
        "\n\nonProcessCpu\n\n";

    texto += "args = " + args.length;

    if (args.length > 0) {

        texto += "\n\n";

        try {

            texto += Object.keys(args[0]).join("\n");

        } catch {

            texto += "ERROR";

        }

    }

    panel.textContent = texto;

},

        onProcessGpu(...args) {

    const encontrados = [];

    function explorar(obj, ruta, nivel) {

        if (nivel > 6) return;
        if (!obj) return;
        if (typeof obj !== "object") return;

        for (const k in obj) {

            let v;

            try {

                v = obj[k];

            } catch {

                continue;

            }

            const r = ruta + "." + k;

            if (modo === 0) {

                encontrados.push(r);

            }

            if (modo === 1) {

                if (Array.isArray(v) && v.length === 16)
                    encontrados.push(r + " Array16");

                if (v instanceof Float32Array && v.length === 16)
                    encontrados.push(r + " Float32Array16");

                if (
                    v &&
                    typeof v === "object" &&
                    "x" in v &&
                    "y" in v &&
                    "z" in v
                )
                    encontrados.push(r + " xyz");

            }

            if (modo === 2) {

                const nombre = k.toLowerCase();

                if (
                    nombre.includes("pose") ||
                    nombre.includes("matrix") ||
                    nombre.includes("camera") ||
                    nombre.includes("tracking") ||
                    nombre.includes("transform") ||
                    nombre.includes("world") ||
                    nombre.includes("view") ||
                    nombre.includes("projection") ||
                    nombre.includes("target")
                ) {

                    encontrados.push(r);

                }

            }

            explorar(v, r, nivel + 1);

        }

    }

    explorar(args[0], "ARGS", 0);

    explorar(window.XR8, "XR8", 0);

    panel.textContent =
        BRIDGE_VERSION +
        "\nModo " + modo +
        "\n\n" +
        encontrados.slice(0, 80).join("\n");

}

       });

}

if (window.XR8) {

    registrarBridge();

} else {

    window.addEventListener("xrloaded", registrarBridge);

}
