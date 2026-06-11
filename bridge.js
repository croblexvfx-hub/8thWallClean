const BRIDGE_VERSION = "Bridge v82.2";

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

    XR8.addCameraPipelineModule({

        name: "bridge-test",

        onProcessGpu(args) {

            const encontrados = [];

            function explorar(obj, ruta, nivel) {

                if (!obj) return;
                if (nivel > 8) return;

                const tipo = typeof obj;

                if (tipo !== "object" && tipo !== "function") return;

                let claves;

                try {

                    claves = Object.keys(obj);

                } catch {

                    return;

                }

                for (const k of claves) {

                    let v;

                    try {

                        v = obj[k];

                    } catch {

                        continue;

                    }

                    const r = ruta + "." + k;

                    const nombre = k.toLowerCase();

                    if (
                        nombre.includes("pose") ||
                        nombre.includes("matrix") ||
                        nombre.includes("camera") ||
                        nombre.includes("view") ||
                        nombre.includes("projection") ||
                        nombre.includes("world") ||
                        nombre.includes("target") ||
                        nombre.includes("transform") ||
                        nombre.includes("tracking")
                    ) {

                        encontrados.push("KEY  " + r);

                    }

                    if (Array.isArray(v) && v.length === 16) {

                        encontrados.push("A16  " + r);

                    }

                    if (v instanceof Float32Array && v.length === 16) {

                        encontrados.push("F32  " + r);

                    }

                    if (
                        v &&
                        typeof v === "object" &&
                        "x" in v &&
                        "y" in v &&
                        "z" in v
                    ) {

                        encontrados.push("XYZ  " + r);

                    }

                    if (
                        v &&
                        typeof v === "object" &&
                        "position" in v
                    ) {

                        encontrados.push("POS  " + r);

                    }

                    if (
                        v &&
                        typeof v === "object" &&
                        "rotation" in v
                    ) {

                        encontrados.push("ROT  " + r);

                    }

                    if (
                        v &&
                        typeof v === "object" &&
                        "scale" in v
                    ) {

                        encontrados.push("SCA  " + r);

                    }

                    explorar(v, r, nivel + 1);

                    if (encontrados.length > 120) return;

                }

            }

            explorar(args, "ARGS", 0);

            explorar(window.XR8, "XR8", 0);

            panel.textContent =
                BRIDGE_VERSION +
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
