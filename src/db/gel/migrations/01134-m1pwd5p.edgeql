CREATE MIGRATION m1pwd5pqz5rnfakc76lfswtvizyowpyupwmpcxdd54k5htrqkp3fra
    ONTO m122wcklmnluxehrxvfmhqmhawnupmqrdmi2sjj5nod22aauyd7z4a
{
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK attrsObjAccess {
          SET TYPE sys_core::SysAttrObjAccess USING (.attrsObjAccess[IS sys_core::SysAttrObjAccess]);
      };
  };
  ALTER TYPE sys_core::SysObj {
      DROP PROPERTY isGlobalResourceOld;
  };
  ALTER TYPE sys_core::SysObjEnt {
      CREATE LINK codeEntType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysAttrObj {
      ALTER LINK codeObjType {
          SET OWNED;
          SET REQUIRED USING (<sys_core::SysCode>{});
          SET TYPE sys_core::SysCode;
      };
  };
};
