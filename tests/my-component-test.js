jest.dontMock("../src/my-component.js");

describe("MyComponent Test", function() {
	it("class is defined", function() {
		var MyComponent = require("../src/my-component.js");
		var instance = new MyComponent();

        expect(instance.constructor.name).toEqual("MyComponent");
	});
});
