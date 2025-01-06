// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        ignores: ['tailwind.config.js'],
        files: ['**/*.ts', '**/*.vue'],
        rules: {
            'vue/html-indent': ['error', 2, {
                baseIndent: 1,
                alignAttributesVertically: true,
                ignores: [],
            }],
            'vue/multi-word-component-names': 'off',
            'func-call-spacing': 'off', // Fix for 'defineEmits'
            "vue/no-v-html": "off",
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-empty-object-type': 'off'
        }
    },
)
