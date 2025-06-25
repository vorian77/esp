CREATE MIGRATION m132wadqesg5m5zasnombnnksrrvv7wovo773ve7rmufvin6hua5jq
    ONTO m17445kgj2s3zfcwu2jbxsfyfjmtpjhsl22gnghl6khwq4cysle4uq
{
  CREATE TYPE sys_user::SysUserParm EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK user: sys_user::SysUser {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY idFeature: std::uuid;
      CREATE CONSTRAINT std::exclusive ON ((.user, .idFeature));
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY parmData: std::json;
  };
  ALTER TYPE sys_user::SysUserPref {
      ALTER LINK user {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
