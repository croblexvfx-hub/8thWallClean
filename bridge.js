const BRIDGE_VERSION = "Bridge v83.0 (pipeline tracker)";

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

let lastFrame = null;

function formatMat4(m) {
    if (!m || m.length !== 16) return "no matrix";
    return m.map(v => v.toFixed(3)).join(", ");
}

window.addEventListener("xrloaded", () => {

    XR8.addCameraPipelineModule({
        name: "bridge-tracker",

        onUpdate: ({processCpuResult}) => {

            const cam = processCpuResult?.camera;

            if (!cam) return;

            lastFrame = {
                pos: cam?.transform?.position || null,
                rot: cam?.transform?.rotation || null,
                intrinsics: cam?.intrinsics || null,
                timestamp: Date.now()
            };
        }
    });
});

setInterval(() => {

    let out = BRIDGE_VERSION + "\n\n";

    if (!lastFrame) {
        panel.textContent = out + "waiting for XR frame...";
        return;
    }

    out += "CAMERA POSITION:\n";
    out += JSON.stringify(lastFrame.pos, null, 2) + "\n\n";

    out += "CAMERA ROTATION:\n";
    out += JSON.stringify(lastFrame.rot, null, 2) + "\n\n";

    out += "TIMESTAMP:\n" + lastFrame.timestamp;

    panel.textContent = out;

}, 200);
