import {getPluginOptionName} from 'editor_tiny/options';
import {pluginName} from './common';
// Helper variables for the option names.
const corrtypes = getPluginOptionName(pluginName, 'corrtypes');
/**
 * Options registration function.
 *
 * @param {tinyMCE} editor
 */
export const register = (editor) => {

    // For each option, register it with the editor.
    // Valid type are defined in https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.editoroptions/
    editor.options.register(corrtypes, {
        processor: 'string',
    });
};

/**
 * Fetch the myFirstProperty value for this editor instance.
 *
 * @param {tinyMCE} editor The editor instance to fetch the value for
 * @returns {object} The value of the myFirstProperty option
 */
export const getCorrTypes = (editor) => editor.options.get(corrtypes);