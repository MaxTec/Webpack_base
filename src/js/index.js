require('../styles/estilos.styl');
import $ from 'jquery';
$("#button").on('click', function() {
    alert('hola Max');
});
console.log("Hola Max");
class Person {

}
new Person();
var button = document.getElementById("button");
console.log(button);
if (button) {
    require.ensure([], function(require) {
        require('./split');
    })
}
if (module.hot) {
    module.hot.accept();
}