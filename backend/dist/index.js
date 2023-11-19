"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_PRIVATE_KEY, { apiVersion: '2023-10-16' });
// express app
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// routes
//app.use('/api/item', itemRouter)
app.post('/api/create-checkout-session', async (req, res) => {
    const { amount, currency, items } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.amount * 100, // Amount in cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/',
        });
        res.json({ id: session.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});
// connect to db
mongoose_1.default.connect(process.env.DATABASE_URI)
    .then(() => {
    // listen
    app.listen(process.env.PORT, () => {
        console.log('listening port 4000 with mongoose!');
    });
})
    .catch((e) => console.log('HEY', e));
//# sourceMappingURL=index.js.map