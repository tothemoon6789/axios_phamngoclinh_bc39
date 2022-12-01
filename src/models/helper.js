/**
 * Helper is the file support for main.js
 */
 class Helper {
    /**
     * get element by id
     * @param {string} id the id Of the element
     * @returns element
     */
    getEle(id) {
        return document.getElementById(id);
    }
    /**
     * get Father 's element by child element
     * @param {string} id of the element        
     * @returns parent element
     */
    getEleFather(id){
        const element = this.getEle(id);
        return element.parentElement;
    }
    /**
     * get value of the element
     * @param {string} id the id of the element
     * @returns value of the element
     */
    getValEle(id) {
        return this.getEle(id).value;
    }
    disableInput(array){
        array.forEach(id => {
            console.log(id);
            document.getElementById(id).disabled = true;
        });
    }
    endableInput(array){
        array.forEach(id => {
            console.log(id);
            document.getElementById(id).disabled = false;
        });
    }
}