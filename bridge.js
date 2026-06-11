const BRIDGE_VERSION = "Bridge v82.3";

const panel = document.createElement("div");

panel.style.position = "fixed";
panel.style.top = "20px";
panel.style.left = "10px";
panel.style.background = "rgba(0,0,0,0.75)";
panel.style.color = "lime";
panel.style.padding = "10px";
panel.style.fontFamily = "monospace";
panel.style.fontSize = "14px";
panel.style.whiteSpace = "pre";
panel.style.zIndex = "999999";

panel.textContent = BRIDGE_VERSION + "\nbridge.js cargado";

document.body.appendChild(panel);

function registrarBridge() {

    // --------- TORRE 1: Hook de updateCameraProjectionMatrix ---------

    try {

        const original = XR8.XrController.updateCameraProjectionMatrix;

        XR8.XrController.updateCameraProjectionMatrix = function (...args) {

            let texto =
                BRIDGE_VERSION +
                "\n\nupdateCameraProjectionMatrix\n\n";

            texto += "args = " + args.length + "\n\n";

            args.forEach((a, i) => {

                texto += "[" + i + "] ";

                if (a instanceof Float32Array) {

                    texto +=
                        "Float32Array(" +
                        a.length +
                        ")\n";

                } else if (Array.isArray(a)) {

                    texto +=
                        "Array(" +
                        a.length +
                        ")\n";

                } else if (a && typeof a === "object") {

                    texto +=
                        "Object: " +
                        Object.keys(a).slice(0, 15).join(", ") +
                        "\n";

                } else {

                    texto +=
                        typeof a +
                        " = " +
                        a +
                        "\n";

                }

            });

            panel.textContent = texto;

            return original.apply(this, args);

        };

    } catch (e) {

        panel.textContent =
            BRIDGE_VERSION +
            "\n\nHOOK ERROR\n\n" +
            e.message;

    }

    // --------- TORRE 2: Estado de XrConfig.camera ---------

    setInterval(() => {

        if (!XR8.XrConfig || !XR8.XrConfig.camera) return;

        try {

            const cam = XR8.XrConfig.camera;

            let texto =
                BRIDGE_VERSION +
                "\n\nXR8.XrConfig.camera\n\n";

            texto += Object.keys(cam).join("\n");

            panel.textContent = texto;

        } catch {}

    }, 1000);

}

if (window.XR8) {

    registrarBridge();

} else {

    window.addEventListener("xrloaded", registrarBridge);

}
