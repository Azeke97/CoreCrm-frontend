import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        ignores: [
            'tailwind.config.js',
            'node_modules',
            'dist',
            '.output',
            '.nuxt',
        ],
        files: [
            'pages/**/*.vue',
            'layouts/**/*.vue',
            'components/**/*.vue',
            'composables/**/*.ts',
            'store/**/*.ts',
            'types/**/*.ts',
            'utils/**/*.ts',
            'api/**/*.ts',
            'middleware/**/*.ts',
        ],
        rules: {
            semi: ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'func-call-spacing': 'off', // Fix for 'defineEmits'
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            "vue/no-v-html": "off",
            'vue/multi-word-component-names': 'off',
            'vue/array-bracket-newline': ['error', { multiline: true, minItems: 2 }],
            'vue/array-element-newline': ['error', { multiline: true, minItems: 2 }],
            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: 1,
                    multiline: 1,
                },
            ],
            'vue/html-closing-bracket-newline': [
                'error',
                {
                    singleline: 'never',
                    multiline: 'always',
                },
            ],
            'vue/singleline-html-element-content-newline': [
                'error',
                {
                    ignoreWhenNoAttributes: false,
                    ignoreWhenEmpty: true,
                    ignores: ['pre', 'textarea'],
                },
            ],
            'vue/multiline-html-element-content-newline': [
                'error',
                {
                    allowEmptyLines: false,
                },
            ],
            'vue/html-indent': ['error', 2, {
                baseIndent: 1,
                alignAttributesVertically: true,
                ignores: [],
            }],
        }
    },
)
