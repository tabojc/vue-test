<script setup>
import { useMainStore } from '../../stores/main.js';
const mainStore = useMainStore();

//import fieldMixin from '../FieldMixin';

//const emit = defineEmits(['update']);

const props = defineProps({
    field: {
        type: Object,
        required: true,
    },
    modelValue: {
        type: [String, Number, Boolean, Object, Array],
        default: '',
    },
});
//let { handleChange, debounce } = fieldMixin.setup(props, { emit });
/*
const updateData = (event) => {
    debounce(handleChange, 50)(event);
};
*/

const onChange = (event) => {
  const value = event.target.value;
  
  console.log(mainStore.setName(value));
};
</script>
<template>
    <input
        :type="field.type || 'text'"
        :name="field.id"
        :disabled="field.disabled ?? null"
        :value="modelValue"
        @input="onChange"
    />
</template>
<style lang="css" scoped>
input {
    background: black;
    border-width: 1px;
    padding: 10px;
    color: #fff;
    border-color: #626262;
}
</style>
