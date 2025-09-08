CREATE MIGRATION m1r6lcitxsf3ofim6jjilhz7bgd6vl7mkh4gp3irgygkrb5mp3gy3a
    ONTO m1nlmhkccmbiea6aasdttyr5qvsilmfsfhlfguybqdyuwhbzqkkmgq
{
  CREATE TYPE sys_api::SysApiTable EXTENDING sys_user::Mgmt {
      CREATE REQUIRED PROPERTY apiTabLocalMod: std::str;
      CREATE REQUIRED PROPERTY apiTabLocalName: std::str;
      CREATE REQUIRED PROPERTY apiTabRemoteName: std::str;
      CREATE CONSTRAINT std::exclusive ON ((.apiTabRemoteName, .apiTabLocalMod, .apiTabLocalName));
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY isActive: std::bool;
  };
  ALTER TYPE sys_api::SysApi {
      CREATE MULTI LINK tables: sys_api::SysApiTable {
          ON SOURCE DELETE ALLOW;
      };
  };
};
