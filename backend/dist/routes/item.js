"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = __importDefault(require("express"));
const itemController_1 = require("../controllers/itemController");
exports.itemRouter = express_1.default.Router();
exports.itemRouter.post('/', itemController_1.createItem);
exports.itemRouter.get('/', itemController_1.getItems);
exports.itemRouter.get('/:id', itemController_1.getItem);
exports.itemRouter.delete('/:id', itemController_1.deletItem);
exports.itemRouter.patch('/:id', itemController_1.uptadeItem);
//# sourceMappingURL=item.js.map