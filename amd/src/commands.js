import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {
    component,
    startdemoButtonName,
    startdemoMenuItemName,
    icon,
} from './common';

/**
 * Add a correction on the current selection.
 * @param editor
 * @returns {void}
 */
const addCorrection = (editor) => {
    editor.windowManager.open({
        title: 'Add a correction',
        body: {
            type: 'panel',
            items: [
                {
                    type: 'selectbox',
                    name: 'correction_type',
                    label: 'Correction type',
                    items: [
                        { text: 'None', value: 'none' },
                        { text: 'Spelling', value: 'spelling' },
                        { text: 'Grammar', value: 'grammar' },
                        { text: 'Punctuation', value: 'punctuation' },
                        { text: 'Other', value: 'other' }
                    ]
                },
                {
                    type: 'textarea',
                    name: 'correction_comment',
                    label: 'Comment'
                }
            ]
        },
        buttons: [
            {
                type: 'submit',
                text: 'OK'
            }
        ],
        initialData: {
            correction_type: 'none',
            correction_comment: '',
        },
        onSubmit: (api) => {
            const data = api.getData();
            const correction_type = data.correction_type;
            const correction_comment = data.correction_comment;

            let whole_content = editor.getContent({ format: 'html' });
            let current_selection = editor.selection.getContent({});
            let updated_selection =
                `<span class="tiny_corrections">
                    ${current_selection}
                    <span class="tiny_corrections_correction">
                        <sup title="${current_selection}">${correction_type}</sup>
                        <span class="tiny_corrections_comment">${correction_comment}</span>
                    </span>
                </span>`;
            let updated_content = whole_content.replace(current_selection, updated_selection);
            editor.setContent(updated_content);
            api.close();
        }
    });
}


export const getSetup = async() => {
    const [
        startdemoButtonNameTitle,
        startdemoMenuItemNameTitle,
        buttonImage,
    ] = await Promise.all([
        getString('button_startdemo', component),
        getString('menuitem_startdemo', component),
        getButtonImage('icon', component),
    ]);

    return (editor) =>


    {
        // Register the Moodle SVG as an icon suitable for use as a TinyMCE toolbar button.
        editor.ui.registry.addIcon(icon, buttonImage.html);

        // Register the startdemo Toolbar Button.
        editor.ui.registry.addButton(startdemoButtonName, {
            icon,
            tooltip: "Add correction",
            onAction: () => addCorrection(editor)
        });

        window.console.log(editor)

        // Add the startdemo Menu Item.
        // This allows it to be added to a standard menu, or a context menu.
        editor.ui.registry.addMenuItem(startdemoMenuItemName, {
            icon,
            text: "Add correction",
            onAction: () => addCorrection(editor)
        });
    };
};