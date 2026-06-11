const BRIDGE_VERSION = "Bridge v82.0";

let modo = 0;

const panel = document.createElement("div");

panel.style.position = "fixed";
panel.style.top = "20px";
panel.style.left = "10px";
panel.style.background = "rgba(0,0,0,0.75)";
panel.style.color = "lime";
panel.style.padding = "10px";
panel.style.fontFamily = "monospace";
panel.style.fontSize = "14px";
panel.style.zIndex = "999999";
panel.style.whiteSpace = "pre";
panel.style.maxWidth = "95vw";
panel.style.maxHeight = "95vh";
panel.style.overflow = "hidden";

document.body.appendChild(panel);

panel.onclick = () => {

    modo++;

    if (modo > 4) modo = 0;

};

function registrarBridge() {

    XR8.addCameraPipelineModule({

        name: "bridge-test",

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

                        if (
                            Array.isArray(v) && v.length === 16 ||
                            v instanceof Float32Array && v.length === 16
                        ) {

                            encontrados.push(r);

                        }

                    }

                    if (modo === 1) {

                        if (
                            v &&
                            typeof v === "object" &&
                            "x" in v &&
                            "y" in v &&
                            "z" in v
                        ) {

                            encontrados.push(r);

                        }

                    }

                    if (modo === 2) {

                        const n = k.toLowerCase();

                        if (
                            n.includes("pose") ||
                            n.includes("matrix") ||
                            n.includes("camera") ||
                            n.includes("tracking") ||
                            n.includes("target") ||
                            n.includes("projection") ||
                            n.includes("view") ||
                            n.includes("world") ||
                            n.includes("transform")
                        ) {

                            encontrados.push(r);

                        }

                    }

                    if (modo === 3) {

                        if (typeof v === "number") {

                            encontrados.push(r + " = " + v);

                        }

                    }

                    if (modo === 4) {

                        encontrados.push(r);

                    }

                    explorar(v, r, nivel + 1);

                }

            }

            explorar(args[0], "ARGS", 0);

            explorar(window.XR8, "XR8", 0);

            try {

                explorar(
                    XR8.XrController,
                    "XR8.XrController",
                    0
                );

            } catch {}

            try {

                explorar(
                    XR8.Threejs,
                    "XR8.Threejs",
                    0
                );

            } catch {}

            try {

                explorar(
                    XR8.XrController.pipelineModule(),
                    "XR8.XrController.pipelineModule()",
                    0
                );

            } catch {}

            try {

                explorar(
                    XR8.Threejs.pipelineModule(),
                    "XR8.Threejs.pipelineModule()",
                    0
                );

            } catch {}

            try {

                explorar(
                    XR8.CameraPixelArray.pipelineModule(),
                    "XR8.CameraPixelArray.pipelineModule()",
                    0
                );

            } catch {}

            panel.textContent =
                BRIDGE_VERSION +
                "\n\nModo " + modo +
                "\n\n" +
                encontrados.slice(0, 120).join("\n");

        }

    });

}

if (window.XR8) {

    registrarBridge();

} else {

    window.addEventListener("xrloaded", registrarBridge);

}
