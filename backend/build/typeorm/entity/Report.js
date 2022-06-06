"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
var typeorm_1 = require("typeorm");
var Post_1 = require("./Post");
var Model_1 = require("./Models/Model");
var User_1 = require("./User");
var Report = /** @class */ (function (_super) {
    __extends(Report, _super);
    function Report() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Report.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.reports; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            nullable: true,
        }),
        __metadata("design:type", User_1.User)
    ], Report.prototype, "reporter", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Post_1.Post; }, function (post) { return post.reports; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            nullable: true,
        }),
        __metadata("design:type", Post_1.Post)
    ], Report.prototype, "post", void 0);
    Report = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(["reporter", "post"])
    ], Report);
    return Report;
}(Model_1.Model));
exports.Report = Report;
//# sourceMappingURL=Report.js.map