"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assignment_controller_1 = require("../controllers/assignment.controller");
const multer_1 = __importDefault(require("../config/multer"));
const router = express_1.default.Router();
router.post("/create", multer_1.default.single("file"), assignment_controller_1.createAssignment);
router.get("/", assignment_controller_1.getAssignments);
router.get("/:id", assignment_controller_1.getAssignmentById);
exports.default = router;
