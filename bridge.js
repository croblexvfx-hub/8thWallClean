const BRIDGE_VERSION = "Bridge v82.8";

const panel = document.createElement("div");

panel.style.position = "fixed";
panel.style.top = "20px";
panel.style.left = "10px";
panel.style.background = "rgba(0,0,0,0.80)";
panel.style.color = "lime";
panel.style.padding = "10px";
panel.style.fontFamily = "monospace";
panel.style.fontSize = "12px";
panel.style.whiteSpace = "pre";
panel.style.zIndex = "999999";
panel.style.maxWidth = "45vw";
panel.style.maxHeight = "80vh";
panel.style.overflow = "auto";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(panel);
});

function safeInspect(obj, maxKeys = 20) {
    let keys = [];

    try {
        keys = Object.getOwnPropertyNames(obj || {});
    } catch (e) {
        return ["[Object.getOwnPropertyNames failed] " + e.message];
    }

    if (!keys.length) {
        try {
            for (const k in obj) {
                keys.push(k);
                if (keys.length >= maxKeys) break;
            }
        } catch (e) {
            return ["[for...in failed] " + e.message];
        }
    }

    return keys.slice(0, maxKeys);
}

function getXR8() {
    return window.XR8;
}

function tick() {

    let out = BRIDGE_VERSION + "\n";

    try {
        const XR8ref = getXR8();

        if (!XR8ref) {
            panel.textContent = out + "\nXR8 not found yet...";
            return;
        }

        out += "\nXR8 OK\n";

        const controller = XR8ref.XrController;

        if (!controller) {
            panel.textContent = out + "\nXrController not ready";
            return;
        }

        out += "\nXrController:\n";

        const keys = safeInspect(controller, 30);

        out += keys.join(", ") + "\n";

        // intentar profundizar un nivel si hay objetos dentro
        for (const k of keys.slice(0, 5)) {
            try {
                const v = controller[k];

                if (v && typeof v === "object") {
                    const sub = safeInspect(v, 10);
                    out += `\n- ${k} -> ${sub.join(", ")}`;
                }
            } catch (e) {
                out += `\n- ${k} -> error`;
            }
        }

    } catch (e) {
        out += "\nFATAL: " + e.message;
    }

    panel.textContent = out;
}

setInterval(tick, 500);
