"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uptadeItem = exports.deletItem = exports.createItem = exports.getItem = exports.getItems = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ItemModel_1 = __importDefault(require("../models/ItemModel"));
// get all items
const getItems = async (req, res) => {
    try {
        const items = await ItemModel_1.default.find({}).sort({ createdAt: -1 });
        res.status(200).json(items);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getItems = getItems;
// get a single item
const getItem = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }
    const item = await ItemModel_1.default.findById(id);
    if (!item) {
        return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(item);
};
exports.getItem = getItem;
// create a new item
const createItem = async (req, res) => {
    const { brand, name, color, size, price, category, gender, images } = req.body;
    try {
        const item = await ItemModel_1.default.create({ brand, name, color, size, price, category, gender, images });
        res.status(200).json(item);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createItem = createItem;
// delete an item 
const deletItem = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such workout' });
    }
    const item = await ItemModel_1.default.findOneAndDelete({ _id: id });
    if (!item) {
        return res.status(400).json({ error: 'No such workout' });
    }
    res.status(200).json(item);
};
exports.deletItem = deletItem;
// uptade an item 
const uptadeItem = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such workout' });
    }
    const item = await ItemModel_1.default.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!item) {
        return res.status(400).json({ error: 'No such workout' });
    }
    res.status(200).json(item);
};
exports.uptadeItem = uptadeItem;
//# sourceMappingURL=itemController.js.map