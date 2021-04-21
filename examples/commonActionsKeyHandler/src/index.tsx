import {
    createSettings,
    createSettingsFolder,
    createStandardMenuItem,
    declare,
    keyHandlerAction,
    Menu,
    searchAction,
    UILayer,
} from "@launchmenu/core";

const info = {
    name: "Example",
    description: "A minimal example applet",
    version: "0.0.0",
    icon: "applets" as const,
};

const settings = createSettings({
    version: "0.0.0",
    settings: () => createSettingsFolder({...info, children: {}}),
});

const items = [
    createStandardMenuItem({
        name: "Hello world",
        onExecute: () => alert("Hello"),
        actionBindings: [
            keyHandlerAction.createBinding({
                onKey: event => {
                    if (event.key.char && !event.shift) {
                        console.log(event.key.char);
                        return true;
                    }
                    return false;
                },
            }),
        ],
    }),
];

export default declare({
    info,
    settings,
    async search(query, hook) {
        return {
            children: searchAction.get(items),
        };
    },
    open({context, onClose}) {
        context.open(
            new UILayer(() => ({menu: new Menu(context, items), onClose}), {
                path: "Example",
            })
        );
    },
});
