<script setup>
    import { useMainStore } from '../../stores/main.js';
    import fieldMixin from '../FieldMixin';

    const mainStore = useMainStore();

    const emit = defineEmits(['update', 'clickedo']);
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
    let { handleChange, debounce, valueFromEvent } = fieldMixin.setup(props, { emit });
    const updateData = (event) => {
        debounce(handleChange, 50)(event);
    };

    const onOptionClick = (id) => { 
        
        const index = mainStore.options.findIndex((option)=> option.id === id);

        mainStore.setOption(index, false);

        console.log({id, index}, 'onOptionClick');
    };

    const onOptionDisableClick = (id) => { 
        
        const index = mainStore.options.findIndex((option)=> option.id === id);

        mainStore.setOption(index, true);

        console.log({id, index}, 'onOptionClick');
    };


    const onUpdateDisableClick = (event) => {
        const currentId = event.target.getAttribute('data-id');

        valueFromEvent(event, id);

        console.log({ method: "onUpdateDisableClick", id });
    };

defineExpose({
    mainStore,
});

</script> 
<template>
    <div class="selectunselect">
    <select
        id="enabled-options"
        :name="field.id"
        multiple="multiple"
        >
        <!--option v-for="item of field.options"
            :data-id="item.id"
            :value="item.modelValue"
            v-show="item.active"
            @click="onUpdateEnableClick">{{ item.label}}
        </option-->
        <option v-for="item of mainStore.options"
            :key="item.id"
            v-show="item.active"
            @click="onOptionClick(item.id)"
        >
            {{ item.label }}
        </option>
    </select>

    <!--select
        id="disabled-options"
        :name="field.id"
        multiple="multiple"
    >
        <option v-for="item of field.options"
            :data-id="item.id"
            :value="item.modelValue"
            v-show="!item.active"
            @click="onUpdateDisableClick"
        >{{ item.label}}</option>
    </select-->

    <select
        id="enabled-options"
        :name="field.id"
        multiple="multiple"
        >
        <!--option v-for="item of field.options"
            :data-id="item.id"
            :value="item.modelValue"
            v-show="item.active"
            @click="onUpdateEnableClick">{{ item.label}}
        </option-->
        <option v-for="item of mainStore.options"
            :key="item.id"
            v-show="!item.active"
            @click="onOptionDisableClick(item.id)"
        >
            {{ item.label }}
        </option>
    </select>

    </div>

</template>

<style>
div.selectunselect {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
select {
    width: 48%;
    background-color: #121212;
    color: #ffffff;
    border-color: #626262;
}

</style>