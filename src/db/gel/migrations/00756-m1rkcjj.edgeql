CREATE MIGRATION m1rkcjjbrheihpnvaobvl62uuchkpt3e2w2vqvkaosmbef676ynfha
    ONTO m1tmgx255drou5rkpwxaryccsvbvbrfhydjliqxjwsj4nvlnj4mdgq
{
          ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY isDetailRetrievePreset: std::bool;
  };
  CREATE TYPE sys_user::SysTask EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeIcon: sys_core::SysCode;
      CREATE LINK codeTaskStatusObj: sys_core::SysCode;
      CREATE REQUIRED LINK codeTaskType: sys_core::SysCode;
      CREATE REQUIRED LINK obj: sys_core::SysObj;
      CREATE PROPERTY colorFrom: std::str;
      CREATE PROPERTY colorTo: std::str;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY isAlwaysPinToDash: std::bool;
      CREATE REQUIRED PROPERTY orderDefined: std::int16;
  };
  ALTER TYPE sys_user::SysUser {
      CREATE PROPERTY isMobileOnly: std::bool;
  };
};
