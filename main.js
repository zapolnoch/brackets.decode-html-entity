/*jslint vars: true */
/*global define, brackets, window */
define(function (require, exports, module) {
	'use strict';

	var CommandManager = brackets.getModule('command/CommandManager');
	var EditorManager  = brackets.getModule('editor/EditorManager');
	var Menus          = brackets.getModule('command/Menus');
	var Menu           = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
	var ContextMenu    = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
	var KeyManager     = brackets.getModule('command/KeyBindingManager');
	
	
	function decodeHtmlEntity(str) {
		return str.replace(/&#(\d+);/g, function (match, dec) {
			return String.fromCharCode(dec);
		});
	}

	function handleDecodeHtml() {
		var editor = EditorManager.getFocusedEditor();
		var selectedText = editor.getSelectedText();
		var newText = decodeHtmlEntity(selectedText);
		var selection = editor.getSelection();
		editor.document.replaceRange(newText, selection.start, selection.end);
	}
	
	var COMMAND_ID = 'decodehtmlentity.convert';
	CommandManager.register('Decode HTML Entity', COMMAND_ID, handleDecodeHtml);
	Menu.addMenuItem(COMMAND_ID);

	KeyManager.addBinding(COMMAND_ID, 'Ctrl-Alt-D');
	ContextMenu.addMenuItem(COMMAND_ID);
});
