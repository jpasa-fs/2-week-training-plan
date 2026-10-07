import { DataTypes } from "sequelize";
import { sequelize } from "../conn.js";

export const Organization = sequelize.define(
  "Organization",
  {
    name: DataTypes.STRING,
  },
  {
    tableName: "organizations",
    timestamps: false,
  },
);

export const Team = sequelize.define(
  "Team",
  {
    name: DataTypes.STRING,
    org_id: DataTypes.INTEGER,
  },
  {
    tableName: "teams",
    timestamps: false,
  },
);

export const Member = sequelize.define(
  "Member",
  {
    name: DataTypes.STRING,
    team_id: DataTypes.INTEGER,
  },
  {
    tableName: "members",
    timestamps: false,
  },
);
Organization.hasMany(Team, { foreignKey: "org_id" });
Team.belongsTo(Organization, { foreignKey: "org_id" });
Team.hasMany(Member, { foreignKey: "team_id" });
Member.belongsTo(Team, { foreignKey: "team_id" });
