// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Common values helper for the Moodle tiny_corrections plugin.
 *
 * @module      tiny_corrections
 * @copyright   2024 Université de Lausanne
 * @author      Nicolas Alexandropoulos <nicolas.alexandropoulos@unil.ch>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_string as getString} from 'core/str';
import {component} from './common';
import {getCorrTypes} from "./options";


export const getSetup = async () => {
    const [
        addCorrectionButtonTitle,
        removeCorrectionButtonTitle,
    ] = await Promise.all([
        getString('button_addcorrection', component),
        getString('button_removecorrection', component),
    ]);

    let addIcon = await fetch(window.M.cfg.wwwroot + "/lib/editor/tiny/plugins/corrections/pix/add.svg")
        .then((response) => response.text());
    let removeIcon = await fetch(window.M.cfg.wwwroot + "/lib/editor/tiny/plugins/corrections/pix/remove.svg")
        .then((response) => response.text());

    return (editor) => {
        editor.ui.registry.addIcon('commentAdd', addIcon);
        editor.ui.registry.addIcon('commentRemove', removeIcon);

        editor.contentCSS.push(window.M.cfg.wwwroot + '/lib/editor/tiny/plugins/corrections/styles.css');

        editor.ui.registry.addButton('add_correction', {
            icon: 'commentAdd',
            tooltip: addCorrectionButtonTitle,
            onAction: () => openCorrectionModal(editor)
        });

        editor.ui.registry.addButton('remove_correction', {
            icon: 'commentRemove',
            tooltip: removeCorrectionButtonTitle,
            onAction: () => removeCorrection(editor)
        });
    };
};

/**
 * Updates the editor content with the correction type and comment.
 * @param {string} data
 * @param {editor} editor
 */
function updateEditorTextContent(data, editor) {
    const correction_type = data.correction_type;
    const correction_comment = data.correction_comment;

    let current_selection = editor.selection.getContent({});
    let updated_selection =
        `<span class="tiny_corrections">
                    ${current_selection}
                    <span class="tiny_corrections_correction">
                        <sup title="${current_selection}">${correction_type}</sup>
                        <span class="tiny_corrections_comment">${correction_comment}</span>
                    </span>
                </span>`;
    editor.selection.setContent(updated_selection);
}

/**
 * Opens the correction modal.
 * @param {editor} editor
 * @returns {void}
 */
async function openCorrectionModal(editor) {
    const [
        addCorrectionButtonTitle,
        correctionTypeTitle,
        commentTitle
    ] = await Promise.all([
        getString('button_addcorrection', component),
        getString('corrtype', component),
        getString('corrtext', component),
    ]);

    let correction_types_array = parseCorrectionTypes(editor);

    editor.windowManager.open({
        title: addCorrectionButtonTitle,
        body: {
            type: 'panel',
            items: [
                {
                    type: 'selectbox',
                    name: 'correction_type',
                    label: correctionTypeTitle,
                    items: correction_types_array
                },
                {
                    type: 'textarea',
                    name: 'correction_comment',
                    label: commentTitle
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
            updateEditorTextContent(data, editor);
            api.close();
        }
    });
}

/**
 * Fetches the correction types from the server and parses them into an array of objects.
 * @param {editor} editor
 * @returns {{text: *, value: *}[]}
 */
function parseCorrectionTypes(editor) {
    let correction_types = getCorrTypes(editor);
    correction_types = correction_types.replace(/\n$/, '');

    let correction_types_array = correction_types.split('\n').map((line) => {
        let [value, text] = line.split('=');
        return {text: text, value: value};
    });

    return correction_types_array;
}

/**
 * Removes the correction on the current selection or cursor position
 * @param {editor} editor
 */
function removeCorrection(editor) {
    let selection = editor.selection.getNode();
    if (selection.classList.contains('tiny_corrections')) {
        selection.querySelector('.tiny_corrections_correction').remove();
        selection.attributes.removeNamedItem('class');
    }

}
