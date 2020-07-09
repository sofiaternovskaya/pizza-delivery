"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var dateTimeEntity_1 = require("../base/dateTimeEntity");
var order_entity_1 = require("../order/order.entity");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Unique(["email"]),
        __metadata("design:type", String)
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "name");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({
            type: "timestamp",
            "default": function () { return "CURRENT_TIMESTAMP"; },
            onUpdate: "CURRENT_TIMESTAMP"
        }),
        __metadata("design:type", String)
    ], User.prototype, "lastLogin");
    __decorate([
        typeorm_1.OneToMany(function () { return order_entity_1.Order; }, function (order) { return order.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "orders");
    User = __decorate([
        typeorm_1.Entity("user_auth", { orderBy: { id: "ASC" } })
    ], User);
    return User;
}(dateTimeEntity_1.DateTimeEntity));
exports.User = User;
