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
exports.UserRelatedEntity = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../user/user.entity");
var UserRelatedEntity = /** @class */ (function () {
    function UserRelatedEntity() {
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], UserRelatedEntity.prototype, "userId");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }),
        typeorm_1.JoinColumn({ name: "userId" }),
        __metadata("design:type", user_entity_1.User)
    ], UserRelatedEntity.prototype, "user");
    return UserRelatedEntity;
}());
exports.UserRelatedEntity = UserRelatedEntity;
