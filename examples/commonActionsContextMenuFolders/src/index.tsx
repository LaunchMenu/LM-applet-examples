import {
    createContextAction,
    createContextFolderHandler,
    createSettings,
    createSettingsFolder,
    createStandardMenuItem,
    declare,
    Menu,
    Priority,
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

const alertAllAction = createContextAction({
    name: "Alert all",
    contextItem: {
        priority: [Priority.MEDIUM, Priority.HIGH],
    },
    core: (data: string[]) => {
        const combined = data.join(", ");
        return {
            // Provide the function to perform on execute
            execute: () => alert(combined),
            // We might as well return the computed data as a result,
            // such that this handler has some use as a stand-alone action
            result: combined,
        };
    },
});

const folder1 = createContextFolderHandler({
    name: "Folder 1",
    priority: [Priority.HIGH, Priority.MEDIUM],
});
const folder2 = createContextFolderHandler({
    name: "Folder 2",
    parent: folder1,
    priority: [Priority.HIGH, Priority.MEDIUM],
});

const actionForContextMenu = createContextAction({
    name: "Action in root",
    contextItem: {priority: [Priority.MEDIUM, Priority.HIGH]},
    core: (data: string[]) => ({
        execute: () => alert(data.join(", ")),
    }),
});
const actionForFolder1 = createContextAction({
    name: "Action in folder1",
    folder: folder1,
    contextItem: {priority: [Priority.MEDIUM, Priority.HIGH]},
    core: (data: string[]) => ({
        execute: () => alert(data.join(", ")),
    }),
});
const actionForFolder2 = createContextAction({
    name: "Action in folder2",
    folder: folder2,
    contextItem: {priority: [Priority.MEDIUM, Priority.HIGH]},
    core: (data: string[]) => ({
        execute: () => alert(data.join(", ")),
    }),
});

const items = [
    createStandardMenuItem({
        name: "Hallo!",
        onExecute: () => alert("Hallo!"),
        actionBindings: [actionForContextMenu.createBinding("Hallo")],
    }),
    createStandardMenuItem({
        name: "How are you?",
        onExecute: () => alert("How are you?"),
        actionBindings: [actionForFolder1.createBinding("how are you")],
    }),
    createStandardMenuItem({
        name: "Goodbye!",
        onExecute: () => alert("Goodbye!"),
        actionBindings: [actionForFolder2.createBinding("goodbye!")],
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
