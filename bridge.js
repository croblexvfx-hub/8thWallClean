const BRIDGE_VERSION = "Bridge v82.5";

const panel = document.createElement("div");

panel.style.position = "fixed";
panel.style.top = "20px";
panel.style.left = "10px";
panel.style.background = "rgba(0,0,0,0.75)";
panel.style.color = "lime";
panel.style.padding = "10px";
panel.style.fontFamily = "monospace";
panel.style.fontSize = "14px";
panel.style.whiteSpace = "pre-wrap";
panel.style.maxWidth = "95vw";
panel.style.maxHeight = "95vh";
panel.style.overflow = "auto";
panel.style.zIndex = "999999";

panel.textContent = BRIDGE_VERSION + "\nbridge.js cargado";

document.body.appendChild(panel);

function registrarBridge() {

    try {

        const original = XR8.XrController.pipelineModule;

        XR8.XrController.pipelineModule = function (...args) {

            const pm = original.apply(this, args);

            let ultimoTexto = "";

            function resumir(obj, ruta, nivel) {

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

                    const nombre = k.toLowerCase();

                    if (
                        nombre.includes("pose") ||
                        nombre.includes("position") ||
                        nombre.includes("rotation") ||
                        nombre.includes("matrix") ||
                        nombre.includes("transform") ||
                        nombre.includes("camera") ||
                        nombre.includes("projection") ||
                        nombre.includes("view") ||
                        nombre.includes("origin") ||
                        nombre.includes("facing")
                    ) {

                        ultimoTexto += r + "\n";

                        try {

                            if (
                                v instanceof Float32Array ||
                                Array.isArray(v)
                            ) {

                                ultimoTexto +=
                                    JSON.stringify(
                                        Array.from(v).slice(0, 16)
                                    ) + "\n\n";

                            } else {

                                ultimoTexto +=
                                    JSON.stringify(v, null, 2) +
                                    "\n\n";

                            }

                        } catch {}

                    }

                    if (
                        v &&
                        typeof v === "object" &&
                        "x" in v &&
                        "y" in v &&
                        "z" in v
                    ) {

                        ultimoTexto +=
                            r +
                            " = " +
                            JSON.stringify(v) +
                            "\n\n";

                    }

                    resumir(v, r, nivel + 1);

                }

            }

            resumir(pm, "pipeline", 0);

            panel.textContent =
                BRIDGE_VERSION +
                "\n\nPIPELINE\n\n" +
                (ultimoTexto || "(sin coincidencias)");

            return pm;

        };

    } catch (e) {

        panel.textContent =
            BRIDGE_VERSION +
            "\n\nERROR\n\n" +
            e.message;

    }

}

if (window.XR8) {

    registrarBridge();

} else {

    window.addEventListener("xrloaded", registrarBridge);

}
