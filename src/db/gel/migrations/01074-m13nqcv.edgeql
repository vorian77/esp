CREATE MIGRATION m13nqcvulvjgka72czhruozvbsuspbak4jxfnwfywoo3tpcrlu3raq
    ONTO m13f7klrz3ojbpk6oomuspdlgo2kobyitgthneyxqyaxoyykxx2kba
{
  CREATE TYPE sys_core::SysNodeObjAction {
      CREATE REQUIRED LINK codeAction: sys_core::SysCodeAction;
      CREATE REQUIRED LINK nodeObj: sys_core::SysNodeObj {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
  ALTER TYPE sys_core::SysNodeObjChild {
      DROP LINK codeAction;
  };
  ALTER TYPE sys_core::SysNodeObjChild {
      CREATE REQUIRED PROPERTY orderDefine: default::nonNegative {
          SET REQUIRED USING (<default::nonNegative>{0});
      };
  };
};
