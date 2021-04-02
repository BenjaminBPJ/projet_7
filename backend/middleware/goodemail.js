module.exports = {
    goodEmail : function (input) {
        const regex = /^[\w-]+(\.[\w-]+)*@groupomania.fr?$/
        return regex.test(input);
    }
};

