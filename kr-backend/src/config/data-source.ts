import { DataSource } from "typeorm";
import { User } from "../models/userModel";
import { Language } from "../models/languageModel";
import { Skill } from "../models/skillModel";
import { Project } from "../models/projectModel";
import { Certification } from "../models/certificationModel";
import dotenv from 'dotenv';
import { Role } from "../models/roleModel";
import { News } from "../models/newsModel";
import { Notification } from "../models/notificationModel";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User,Language,Skill,Project,Certification,Role,News,Notification],
  synchronize: true,
  logging: false,
});
