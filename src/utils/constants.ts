export const productConfigs = [
    {
        id:1,
        placeholder:'Title',
        model:'title',
        type:'text',
        styles:'margin:0.5rem'
    },
    {
        id:2,
        placeholder:'Category',
        model:'category',
        type:'text',
        styles:'margin:0.5rem'
    },
    {
        id:3,
        placeholder:'Price',
        model:'price',
        type:'number',
        styles:'margin:0.5rem'
    },
    {
        id:4,
        placeholder:'Stock',
        model:'stock',
        type:'number',
        styles:'margin:0.5rem'
    },
]


export const EMITS = {
    CLICK: 'click',
    UPDATE_MODEL_VALUE: 'update:modelValue',
    OK:'ok',
    CANCEL:'cancel',
};