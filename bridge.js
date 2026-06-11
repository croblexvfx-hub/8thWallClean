const BRIDGE_VERSION = "Bridge v82.1";

let modo = 0;

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

panel.onclick = () => {

    modo++;

    if (modo > 2) modo = 0;

};

function registrarBridge() {

    XR8.addCameraPipelineModule({

        name: "bridge-test",

        onProcessGpu(args) {

            let texto =
                BRIDGE_VERSION +
                "\n\nModo " + modo + "\n\n";

            if (!args) {

                panel.textContent = texto + "Sin args";
                return;

            }

            if (modo === 0) {

                texto += Object.keys(args).join("\n");

            }

            if (modo === 1) {

                if (args.frameStartResult) {

                    texto += Object.keys(args.frameStartResult).join("\n");

                } else {

                    texto += "Sin frameStartResult";

                }

            }

            if (modo === 2) {

                if (args.frameworkStartResult) {

                    texto += Object.keys(args.frameworkStartResult).join("\n");

                } else {

                    texto += "Sin frameworkStartResult";

                }

            }

            panel.textContent = texto;

        }

    });

}

if (window.XR8) {

    registrarBridge();

} else {

    window.addEventListener("xrloaded", registrarBridge);

}
