export default {
    "get": function(key, defaultValue) {
        var value = window.localStorage.getItem(key);

        var decoded = JSON.parse(value);

        if (decoded) {
            return decoded;
        }

        return defaultValue;
    },

    "set": function(key, value) {
        window.localStorage.setItem(
            key, JSON.stringify(value)
        );
    }
};
