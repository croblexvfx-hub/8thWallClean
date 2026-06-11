const BRIDGE_VERSION = "Bridge v81.10";

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

    let texto =
        BRIDGE_VERSION +
        "\n\nonProcessGpu\n\n";

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

}

       });

}

if (window.XR8) {

    registrarBridge();

} else {

    window.addEventListener("xrloaded", registrarBridge);

}
