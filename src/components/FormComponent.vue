<template>  
    <div class="dynamic-form">
        <form @submit.prevent="onSubmit" class="form-group">
            <div v-for="(field) in fieldDefinitions" :key="field.id" class="form-field">
                <label>{{ field.label }}</label>
                <component :is="getComponentName(field)" :field="field"
                    :modelValue="modelValue ? modelValue[field.id] : ''" 
                    @update="updateFormData"
                    @clickedo="driver"
                    :ref="el => setFieldRef(field, el)" />
            </div>
            <div class="button-container">
                <button type="submit" class="button primary">Guardar</button>
            </div>

        </form>
        <label id="result-label">Result:</label><br/>
        <textarea id="result" rows="10" cols="50" disabled></textarea>
    </div>
</template>

<script setup>
import { ref, reactive, computed, defineAsyncComponent, isProxy, toRaw, watch } from 'vue';
import fieldMixin from './FieldMixin';
import { useMainStore } from '../stores/main.js';

const mainStore = useMainStore();

const emit = defineEmits(['update', 'formSubmit']);
const fieldRefs = {};

const driver = (e) => {
    console.log({
        event: e
     }, "driver");
}

const props = defineProps({
    fieldDefinitions: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: Object,
        default: () => ({}),
    }
});
let { handleChange, valueFromEvent } = fieldMixin.setup(props, { emit });

let formData = toRaw(props.modelValue);

watch(() => props.modelValue, (newVal) => {
    formData = toRaw(newVal);
});

const setFieldRef = (field, ref) => {
    fieldRefs[field.id] = ref;
}

const setSelected = (fieldId, value) => {
    let refs = fieldRefs;
    refs[fieldId].setSelected(value);
}

const updateFormData = (idAndValue) => {
    let { id, value } = { ...idAndValue };
    formData = {
        ...formData,
        [id]: value,
    };

    emit('update', {
        value: toRaw(formData),
    });
};

const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    //emit('formSubmit', formData);
    // set in text area
    //document.querySelector('#result').value = JSON.stringify(formData);
    console.log(
        Array.from(mainStore.options)
    );
    const results = Array.from(mainStore.options)
        .filter(({id, label, active}) => (active))
        .map(({id, label, active}) => ({ id, label, active }));
    
    document.querySelector('#result').value = JSON.stringify({name: mainStore.name, Options: results});

};

const getComponentName = (field) => {

    let compName = field.type.charAt(0).toUpperCase() + field.type.slice(1);
    
    // Convert to CamelCase 
    compName = compName.replace(/[_-](\w)/g, (_, match) => match.toUpperCase());

    return defineAsyncComponent(() => import(`./fields/${compName}Field.vue`));
};

defineExpose({
    setSelected,
});

</script>

<style scoped>
.form-group {
    margin-bottom: 1rem;
}

.is-invalid {
    border-color: red;
}

label {
    display: inline-block;
    width: 100px;
    margin-bottom: 10px;

    &#result-label {
        width: 100%;
        text-align: left;
    }
}
input, select, textarea {
    padding: 5px;
    width: 100%;
    margin-bottom: 10px;
}

[disabled] {
    cursor: not-allowed;
}
.button-container {
    text-align: center;
    margin-bottom: 20px;

    button {
        margin: auto;
    }
}
.form-field {
    display: flex;
    align-items: center;
}

.button-container button {
    margin-top: 24px;
    margin-left: 86px;
}
</style>
