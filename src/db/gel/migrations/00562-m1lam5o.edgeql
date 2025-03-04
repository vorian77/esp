CREATE MIGRATION m1lam5ogkxv5vaald2a337lkhq35k5ifjp64jwfpvu5oellvzi3gka
    ONTO m132lhn25bkjqxanq66h3f2fm7jk4iuphkth3myq3r4nnwnu3mayca
{
              CREATE TYPE sys_user::SysUserPref {
      CREATE REQUIRED LINK user: sys_user::SysUser;
      CREATE REQUIRED PROPERTY idFeature: std::uuid;
      CREATE CONSTRAINT std::exclusive ON ((.user, .idFeature));
      CREATE REQUIRED PROPERTY data: std::json;
  };
};
