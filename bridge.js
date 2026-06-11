const BRIDGE_VERSION = "Bridge v81.14";

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
function registrarBridge() {


    XR8.addCameraPipelineModule({

        name: "bridge-test",

        onStart() {
            panel.textContent =
                BRIDGE_VERSION +
                "\n\nonStart";
        },

        onAttach() {
            panel.textContent =
                BRIDGE_VERSION +
                "\n\nonAttach";
        },

        onDetach() {
            panel.textContent =
                BRIDGE_VERSION +
                "\n\nonDetach";
        },

        onUpdate() {
            panel.textContent =
                BRIDGE_VERSION +
                "\n\nonUpdate";
        },

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

    if (nivel > 5) return;

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

        if (Array.isArray(v) && v.length === 16) {

            encontrados.push(r + " = Array16");

        }

        if (v instanceof Float32Array && v.length === 16) {

            encontrados.push(r + " = Float32Array16");

        }

        if (
            v &&
            typeof v === "object" &&
            "x" in v &&
            "y" in v &&
            "z" in v
        ) {

            encontrados.push(r + " = xyz");

        }

        explorar(v, r, nivel + 1);

        }

        }

        explorar(args[0], "root", 0);

        panel.textContent =
            BRIDGE_VERSION +
            "\n\n" +
            encontrados.join("\n");
            
        }

       });

}

if (window.XR8) {

    registrarBridge();

} else {

    window.addEventListener("xrloaded", registrarBridge);

}
