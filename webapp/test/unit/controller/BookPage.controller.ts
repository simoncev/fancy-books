/*global QUnit*/
import Controller from "com/spaiens/fancybook/controller/Book.controller";

QUnit.module("Book Controller");

QUnit.test("I should test the Book controller", function (assert: Assert) {
	const oAppController = new Controller("Book");
	oAppController.onInit();
	assert.ok(oAppController);
});