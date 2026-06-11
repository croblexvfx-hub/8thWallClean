const BRIDGE_VERSION = "Bridge v81.8";
const INSPECT = [
    { nombre: "XR8", objeto: () => window.XR8 },
    { nombre: "XR8.XrController", objeto: () => window.XR8?.XrController },
    { nombre: "XR8.XrController.pipelineModule", objeto: () => window.XR8?.XrController?.pipelineModule },
    { nombre: "XR8.Threejs", objeto: () => window.XR8?.Threejs },
    { nombre: "XR8.Threejs.pipelineModule", objeto: () => window.XR8?.Threejs?.pipelineModule },
    { nombre: "XR8.CameraPixelArray", objeto: () => window.XR8?.CameraPixelArray },
    { nombre: "XR8.CameraPixelArray.pipelineModule", objeto: () => window.XR8?.CameraPixelArray?.pipelineModule },
    { nombre: "XR8.GlTextureRenderer", objeto: () => window.XR8?.GlTextureRenderer },
    { nombre: "XR8.Platform", objeto: () => window.XR8?.Platform },
    { nombre: "XR8.XrConfig", objeto: () => window.XR8?.XrConfig },
    { nombre: "XR8.XrDevice", objeto: () => window.XR8?.XrDevice },
    { nombre: "XR8.Vps", objeto: () => window.XR8?.Vps },
];

let inspectIndex = 0;
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
window.addEventListener("xrloaded", () => {

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

        onProcessCpu() {
            panel.textContent =
                BRIDGE_VERSION +
                "\n\nonProcessCpu";
        },

        onProcessGpu() {
            panel.textContent =
    BRIDGE_VERSION +
    "\n\nGPU OK\n\n" +
    "Time: " + Date.now();
        }

    });

});
panel.style.cursor = "pointer";

panel.onclick = () => {

    panel.textContent =
        BRIDGE_VERSION +
        "\n\nCLICK";

    try {

        XR8.addCameraPipelineModule({

            name: "bridge-click-test",

            onStart() {
                panel.textContent = BRIDGE_VERSION + "\n\nonStart";
            },

            onUpdate() {
                panel.textContent = BRIDGE_VERSION + "\n\nonUpdate";
            },

            onProcessCpu() {
                panel.textContent = BRIDGE_VERSION + "\n\nonProcessCpu";
            },

            onProcessGpu(...args) {

    let texto =
        BRIDGE_VERSION +
        "\n\nonProcessGpu\n\n";

    const f = args[0].frameStartResult;

texto +=
    "orientation: " + f.orientation + "\n" +
    "repeatFrame: " + f.repeatFrame + "\n" +
    "frameTime: " + f.frameTime + "\n" +
    "videoTime: " + f.videoTime + "\n" +
    "textureWidth: " + f.textureWidth + "\n" +
    "textureHeight: " + f.textureHeight;

    panel.textContent = texto;

}

        });

    } catch (e) {

        panel.textContent =
            BRIDGE_VERSION +
            "\n\nERROR:\n" +
            e.message;

    }

};

/*
setInterval(() => {

    let texto = BRIDGE_VERSION + "\n\n";

    const actual = INSPECT[inspectIndex];

    texto += actual.nombre + "\n\n";

    try {

        const obj = actual.objeto();

        if (!obj) {

            texto += "(null)";

        } else {

            texto += "Tipo: " + typeof obj + "\n\n";

if (typeof obj === "function") {
    texto += obj.toString().substring(0, 500);
} else {
    texto += Object.keys(obj).join("\n");
}

        }

    } catch (e) {

        texto += "ERROR";

    }

    panel.textContent = texto;

}, 250);
*/
