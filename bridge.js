const BRIDGE_VERSION = "Bridge v82.7";

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

document.body.appendChild(panel);

setInterval(() => {

    let out = BRIDGE_VERSION + "\n\n";

    try {

        const xc = XR8.XrController;

        for (const k of Object.keys(xc)) {

            try {

                const v = xc[k];

                if (
                    v &&
                    typeof v === "object"
                ) {

                    const keys = Object.keys(v);

                    if (keys.length > 0) {

                        out +=
                            k +
                            "\n" +
                            keys.slice(0,10).join(", ") +
                            "\n\n";

                    }

                }

            } catch {}

        }

    } catch (e) {

        out += e.message;

    }

    panel.textContent = out;

}, 500);
