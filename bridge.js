const BRIDGE_VERSION = "Bridge v80.8";
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

setInterval(() => {

    let texto = BRIDGE_VERSION + "\n\n";

    if (!window.XR8) {
        texto += "XR8: NO";
    } else {
        texto += "XR8: SI\n\n";
        texto += Object.keys(window.XR8).join("\n");
    }

    panel.textContent = texto;

}, 500);
