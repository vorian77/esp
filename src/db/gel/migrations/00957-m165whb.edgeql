CREATE MIGRATION m165whbpnz3tc4ulpcwsp3xq5e445w6ljhxjt7uuoutds3gfua34ca
    ONTO m12cdj3aabsnvxaxsbwewxvjd5bcbuccvrkhy5wr4yhz5bj5sx3v5q
{
  CREATE TYPE sys_core::SysNodeObjData {
      CREATE LINK codeAction: sys_core::SysCode;
      CREATE REQUIRED LINK dataObj: sys_core::SysDataObj;
  };
  ALTER TYPE sys_core::SysNodeObj {
      CREATE MULTI LINK data: sys_core::SysNodeObjData {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
