"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.OrderItem = void 0;
var typeorm_1 = require("typeorm");
var order_entity_1 = require("./order.entity");
var product_entity_1 = require("../product/product.entity");
var OrderItem = /** @class */ (function () {
    function OrderItem() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], OrderItem.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return order_entity_1.Order; }, function (order) { return order.order_items; }),
        __metadata("design:type", order_entity_1.Order)
    ], OrderItem.prototype, "order");
    __decorate([
        typeorm_1.ManyToMany(function () { return product_entity_1.Product; }, {
            cascade: true
        }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], OrderItem.prototype, "product");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "quantity");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "price_usd");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderItem.prototype, "price_eur");
    OrderItem = __decorate([
        typeorm_1.Entity()
    ], OrderItem);
    return OrderItem;
}());
exports.OrderItem = OrderItem;
