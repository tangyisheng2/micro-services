import module from './Module';

const test = () => {
    // console.log(module1.getName());
    return module.getName();
};
console.log('out side call: ', module.getName());
export { test };
