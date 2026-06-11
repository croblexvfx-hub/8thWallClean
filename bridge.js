const BRIDGE_VERSION = "Bridge v82.9";

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

if (document.body) {
    document.body.appendChild(panel);
} else {
    document.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(panel);
    });
}

function safeKeys(obj) {
    try {
        if (!obj) return [];
        return Object.getOwnPropertyNames(obj);
    } catch {
        return [];
    }
}

setInterval(() => {

    let out = BRIDGE_VERSION + "\n";

    try {

        if (!window.XR8) {
            panel.textContent = out + "\nXR8 not found";
            return;
        }

        out += "\nXR8 OK";

        const controller = window.XR8.XrController;

        if (!controller) {
            panel.textContent = out + "\nXrController not ready";
            return;
        }

        const keys = safeKeys(controller);

        out += "\n\nController keys:\n" + keys.slice(0, 40).join(", ");

    } catch (e) {
        out += "\nERROR: " + e.message;
    }

    panel.textContent = out;

}, 500);
