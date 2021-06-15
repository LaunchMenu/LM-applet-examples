import {declareVideoScript} from "@launchmenu/applet-lm-recorder";

export default declareVideoScript(
    async ({controller, recorder, visualizer, keyVisualizer, LM}) => {
        await controller.resetLM();

        const recordings = `${__dirname}/../../recordings`;
        const recording = await recorder.recordLM(`${recordings}/demo.webm`);

        await controller.wait(1000);
        await controller.type("example");
        await controller.wait(500);
        await controller.press("enter");
        await controller.wait(1000);
        await controller.type([{key: "pageDown", repeat: 5}]);
        await controller.wait(1000);
        await controller.type([
            {key: ["ctrl", "pageDown"], repeat: 3, repeatDelay: 2000},
        ]);
        await controller.wait(1000);
        await controller.type([{key: "pageDown", repeat: 2}]);
        await controller.wait(1000);
        await controller.type([{key: ["ctrl", "pageUp"], repeat: 3, repeatDelay: 2000}]);
        await controller.wait(5000);

        await recording.stop();
    }
);