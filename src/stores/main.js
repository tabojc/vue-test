import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
    const name = ref('Nombre-ejemplo');
    const options = reactive([
            {
              id: '1',
              label: 'Option 1',
              active: false,
            },
            {
              id: '2',
              label: 'Option 2',
              active: true,
            },
            {
              id: '3',
              label: 'Option 3',
              active: true,
            },
          ]
        );

    const getName = computed(() => name.value)

    function setName(value) {
      name.value = value;
    }
    
    function setOption(index, status) {
      options[index].active = status;
    }

    const getResults = computed(() => {
        return JSON.stringify({
            name,
            options
        });
    });

    return { options, name, setOption, setName, getResults };
});