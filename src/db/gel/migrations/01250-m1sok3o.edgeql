CREATE MIGRATION m1sok3org5amsmeg2ngpcpfoeqog7acpkht3lprn52spfao3qrth4q
    ONTO m16fxtiejyd7sun7msfeulgv7ihl75ncv3zkffwmmxwe3n3fvpfxxa
{
  CREATE TYPE sys_user::SysUserPref EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED LINK user: sys_user::SysUser;
      CREATE CONSTRAINT std::exclusive ON ((.user, .codeType));
      CREATE REQUIRED PROPERTY isActive: std::bool;
  };
  ALTER TYPE sys_user::SysUser {
      CREATE MULTI LINK preferences: sys_user::SysUserPref {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
