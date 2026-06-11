const BRIDGE_VERSION = "Bridge v83.1 (REAL pipeline hook)";

const panel = document.createElement("div");
panel.style.position = "fixed";
panel.style.top = "10px";
panel.style.left = "10px";
panel.style.background = "rgba(0,0,0,0.85)";
panel.style.color = "lime";
panel.style.padding = "10px";
panel.style.fontFamily = "monospace";
panel.style.fontSize = "12px";
panel.style.whiteSpace = "pre";
panel.style.zIndex = "999999";
panel.style.maxHeight = "85vh";
panel.style.overflow = "auto";
document.body.appendChild(panel);

let last = {
    cam: null,
    reality: null,
    t: 0
};

function install() {

    if (!window.XR8) {
        panel.textContent = BRIDGE_VERSION + "\nXR8 not found";
        return;
    }

    XR8.addCameraPipelineModule({
        name: "bridge-capture",

        onUpdate: (data) => {

            const cpu = data?.processCpuResult;

            if (!cpu) return;

            last.cam = cpu.camera || null;
            last.reality = cpu.reality || null;
            last.t = performance.now();
        }
    });

    panel.textContent = BRIDGE_VERSION + "\ninstalled pipeline module ✔";
}

function render() {

    let out = BRIDGE_VERSION + "\n\n";

    if (!last.cam && !last.reality) {
        panel.textContent = out + "NO FRAME DATA YET";
        return;
    }

    out += "CAMERA:\n";
    out += JSON.stringify(last.cam, null, 2) + "\n\n";

    out += "REALITY:\n";
    out += JSON.stringify(last.reality, null, 2) + "\n\n";

    out += "t=" + last.t;

    panel.textContent = out;
}

install();
setInterval(render, 200);
