import {get_string as getString} from 'core/str';
import {component} from './common';
import {getCorrTypes} from "./options";

/**
 * Add a correction on the current selection.
 * @param {editor} editor
 * @returns {void}
 */
function addCorrection(editor) {
    let correction_types = getCorrTypes(editor);

    let correction_types_array = correction_types.split('\n').map((line) => {
        let [value, text] = line.split('=');
        return {text: text, value: value};
    });

    editor.windowManager.open({
        title: 'Add a correction',
        body: {
            type: 'panel',
            items: [
                {
                    type: 'selectbox',
                    name: 'correction_type',
                    label: 'Correction type',
                    items: correction_types_array
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

            let whole_content = editor.getContent({format: 'html'});
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

/**
 * Remove the correction on the current selection or cursor position
 * @param {editor} editor
 */
function removeCorrection(editor) {
    let selection = editor.selection.getNode();
    if (selection.classList.contains('tiny_corrections')) {
        selection.querySelector('.tiny_corrections_correction').remove();
        selection.attributes.removeNamedItem('class');
    }

}

export const getSetup = async () => {
    const [
        addCorrectionButtonTitle,
        removeCorrectionButtonTitle
    ] = await Promise.all([
        getString('button_addcorrection', component),
        getString('button_removecorrection', component),
    ]);

    return (editor) => {

        // Register the add correction Toolbar Button.
        editor.ui.registry.addButton('add_correction', {
            icon: 'comment-add',
            tooltip: addCorrectionButtonTitle,
            onAction: () => addCorrection(editor)
        });

        editor.ui.registry.addButton('remove_correction', {
            icon: 'comment',
            tooltip: removeCorrectionButtonTitle,
            onAction: () => removeCorrection(editor)
        });
    };
};