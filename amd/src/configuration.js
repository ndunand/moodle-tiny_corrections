import {addToolbarButtons} from 'editor_tiny/utils';

const getToolbarConfiguration = (instanceConfig) => {
    let toolbar = addToolbarButtons(instanceConfig.toolbar, 'content', [
        'add_correction',
        'remove_correction'
    ]);

    return toolbar;
};

export const configure = (instanceConfig) => {
    return {
        toolbar: getToolbarConfiguration(instanceConfig),
    };
};