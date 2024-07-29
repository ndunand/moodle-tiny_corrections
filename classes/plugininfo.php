<?php

namespace tiny_corrections;

use context;
use editor_tiny\plugin;
use editor_tiny\plugin_with_configuration;

class plugininfo extends plugin implements plugin_with_configuration {
    public static function get_plugin_configuration_for_context(
        context $context,
        array $options,
        array $fpoptions,
        ?\editor_tiny\editor $editor = null
    ): array {
        return [
            // Your values go here.
            // These will be mapped to a namespaced EditorOption in Tiny.
            'corrtypes' => get_config('tiny_corrections', 'corrtypes')
        ];
    }

    public static function is_enabled(
        context $context,
        array $options,
        array $fpoptions,
        ?\editor_tiny\editor $editor = null
    ): bool {
        return has_capability('atto/corrections:canmarkup', $context);
    }

}