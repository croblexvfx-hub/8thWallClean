const BRIDGE_VERSION = "Bridge v82.6";

const panel = document.createElement("div");

panel.style.position = "fixed";
panel.style.top = "20px";
panel.style.left = "10px";
panel.style.background = "rgba(0,0,0,0.75)";
panel.style.color = "lime";
panel.style.padding = "10px";
panel.style.fontFamily = "monospace";
panel.style.fontSize = "13px";
panel.style.whiteSpace = "pre-wrap";
panel.style.maxWidth = "95vw";
panel.style.maxHeight = "95vh";
panel.style.overflow = "auto";
panel.style.zIndex = "999999";

panel.textContent = BRIDGE_VERSION + "\nbridge.js cargado";

document.body.appendChild(panel);

function registrarBridge() {

    XR8.addCameraPipelineModule({

        name: "bridge-deep-scan",

        onProcessGpu(...args) {

            const encontrados = [];
            const visitados = new WeakSet();

            function explorar(obj, ruta, nivel) {

                if (encontrados.length >= 30) return;
                if (nivel > 8) return;
                if (!obj) return;

                const tipo = typeof obj;

                if (tipo !== "object" && tipo !== "function") return;

                if (visitados.has(obj)) return;
                visitados.add(obj);

                let claves;

                try {

                    claves = Object.keys(obj);

                } catch {

                    return;

                }

                for (const k of claves) {

                    if (encontrados.length >= 30) return;

                    let v;

                    try {

                        v = obj[k];

                    } catch {

                        continue;

                    }

                    const r = ruta + "." + k;
                    const n = k.toLowerCase();

                    // ---------- NOMBRES INTERESANTES ----------

                    if (
                        n.includes("pose") ||
                        n.includes("position") ||
                        n.includes("rotation") ||
                        n.includes("quaternion") ||
                        n.includes("matrix") ||
                        n.includes("transform") ||
                        n.includes("world") ||
                        n.includes("view") ||
                        n.includes("projection") ||
                        n.includes("origin") ||
                        n.includes("facing") ||
                        n.includes("camera") ||
                        n.includes("target")
                    ) {

                        encontrados.push("KEY\n" + r);

                    }

                    // ---------- XYZ ----------

                    if (
                        v &&
                        typeof v === "object" &&
                        "x" in v &&
                        "y" in v &&
                        "z" in v
                    ) {

                        encontrados.push(
                            "XYZ\n" +
                            r +
                            "\n" +
                            JSON.stringify(v)
                        );

                    }

                    // ---------- XYZW ----------

                    if (
                        v &&
                        typeof v === "object" &&
                        "x" in v &&
                        "y" in v &&
                        "z" in v &&
                        "w" in v
                    ) {

                        encontrados.push(
                            "XYZW\n" +
                            r +
                            "\n" +
                            JSON.stringify(v)
                        );

                    }

                    // ---------- MATRICES ----------

                    if (Array.isArray(v) && (v.length === 16 || v.length === 9)) {

                        encontrados.push(
                            "ARRAY\n" +
                            r +
                            "\nlen=" +
                            v.length
                        );

                    }

                    if (v instanceof Float32Array && (v.length === 16 || v.length === 9)) {

                        encontrados.push(
                            "FLOAT32\n" +
                            r +
                            "\nlen=" +
                            v.length
                        );

                    }

                    explorar(v, r, nivel + 1);

                }

            }

            if (args.length > 0) {

                explorar(args[0], "ARGS", 0);

            }

            panel.textContent =
                BRIDGE_VERSION +
                "\n\n" +
                (encontrados.length
                    ? encontrados.join("\n\n----------------\n\n")
                    : "SIN HALLAZGOS");

        }

    });

}

if (window.XR8) {

    registrarBridge();

} else {

    window.addEventListener("xrloaded", registrarBridge);

}
