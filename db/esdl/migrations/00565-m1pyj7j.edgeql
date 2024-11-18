CREATE MIGRATION m1pyj7jwty3g2cjhbvfnxcbj7lvt7y2tvhj26k7qsmth5amblqqcta
    ONTO m1gedgbg7gsjimqxn7z4w3qod37rjprpnh5p327s6tt57qdtj6pwia
{
  CREATE TYPE sys_user::SysUserPref {
      CREATE REQUIRED LINK user: sys_user::SysUser;
      CREATE REQUIRED PROPERTY idFeature: std::uuid;
      CREATE CONSTRAINT std::exclusive ON ((.user, .idFeature));
      CREATE REQUIRED PROPERTY data: std::str;
  };
};
