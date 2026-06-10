const BRIDGE_VERSION = "v80.2";
const panel = document.createElement("div");

panel.style.position = "fixed";
panel.style.top = "10px";
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
    panel.textContent =
        "v80.2\n\n" +
        "XR8: " + (window.XR8 ? "SI" : "NO");
}, 500);
