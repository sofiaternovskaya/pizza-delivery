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
exports.Order = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../user/user.entity");
var order_item_entity_1 = require("./order_item.entity");
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], Order.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.orders; }),
        __metadata("design:type", user_entity_1.User)
    ], Order.prototype, "user");
    __decorate([
        typeorm_1.Column({
            type: "timestamp",
            "default": function () { return "CURRENT_TIMESTAMP"; }
        }),
        __metadata("design:type", String)
    ], Order.prototype, "order_date");
    __decorate([
        typeorm_1.OneToMany(function () { return order_item_entity_1.OrderItem; }, function (orderItem) { return orderItem.order; }, {
            cascade: true
        }),
        __metadata("design:type", Array)
    ], Order.prototype, "order_items");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "user_name");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "user_phone_number");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "user_address");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Order.prototype, "delivery_usd");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Order.prototype, "delivery_eur");
    Order = __decorate([
        typeorm_1.Entity()
    ], Order);
    return Order;
}());
exports.Order = Order;
