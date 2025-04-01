CREATE MIGRATION m13f7klrz3ojbpk6oomuspdlgo2kobyitgthneyxqyaxoyykxx2kba
    ONTO m14gd43fcufywo7jyq7zmsc7xal7ecmyfi2led4grqkhd2wlaaaihq
{
  CREATE TYPE sys_core::SysNodeObjChild {
      CREATE REQUIRED LINK codeAction: sys_core::SysCodeAction;
      CREATE REQUIRED LINK nodeObj: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  ALTER TYPE sys_core::SysNodeObj {
      CREATE MULTI LINK children: sys_core::SysNodeObjChild {
          ON SOURCE DELETE ALLOW;
      };
      CREATE LINK dataObj: sys_core::SysDataObj;
  };
};
