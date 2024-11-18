CREATE MIGRATION m1xi73rikkj4yvkolhjju3gbitbuzcp54m362jqfcg6ozyvyggzgeq
    ONTO m1msajgyshrqwxe4uq7l4225c3sdfcqxzllmorc2avzietvsnbukga
{
  CREATE TYPE sys_user::SysUserPrefType {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED LINK user: sys_user::SysUser;
      CREATE CONSTRAINT std::exclusive ON ((.user, .codeType));
  };
};
