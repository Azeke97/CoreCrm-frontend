<script lang="ts" setup>
import { Field } from 'vee-validate'

defineOptions({ inheritAttrs: false })

defineProps({
  id: { type: String, default: '' },
  label: { type: String, default: '' },
  name: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  inputmode: { type: String, default: '' },
  maxlength: { type: [String, Number], default: undefined },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  textarea: { type: Boolean, default: false },
})
</script>

<template>
  <div class="mb-4 w-full">
    <label
      v-if="label"
      :for="id || name"
      class="block mb-1 text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >
        *
      </span>
    </label>

    <div class="relative flex items-center">
      <slot name="prefix" />

      <Field
        v-slot="{ field }"
        :name="name"
      >
        <input
          :id="name"
          :type="type"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
          :value="field.value"
          :name="field.name"
          :maxlength="maxlength"
          :disabled="disabled"
          :readonly="readonly"
          class="w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none sm:text-sm
    border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          @input="field.onChange"
          @blur="field.onBlur"
        >
      </Field>

      <slot name="suffix" />
    </div>

    <p
      v-if="error"
      :id="`${id}-error`"
      class="mt-1 text-sm text-red-600"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="mt-1 text-sm text-gray-500"
    >
      {{ hint }}
    </p>
  </div>
</template>
