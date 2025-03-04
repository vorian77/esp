CREATE MIGRATION m1556dyv4jxtqtq4msbbqzwelxu2vijurf6g5xwt75lqcyvgvahceq
    ONTO m1gyltbgvvie5jhot66gay72aarvihe4vbowlwqh6ysxw2idi3sj3q
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK actionFieldGroup;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK actionGroup: sys_core::SysDataObjActionGroup;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListConfig {
      DROP LINK actionFieldGroupModal;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListConfig {
      CREATE REQUIRED LINK actionGroupModal: sys_core::SysDataObjActionGroup {
          ON TARGET DELETE ALLOW;
          SET REQUIRED USING (<sys_core::SysDataObjActionGroup>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      DROP LINK actionFieldGroupModal;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      CREATE REQUIRED LINK actionGroupModal: sys_core::SysDataObjActionGroup {
          ON TARGET DELETE ALLOW;
          SET REQUIRED USING (<sys_core::SysDataObjActionGroup>{});
      };
  };
  ALTER TYPE sys_rep::SysRep {
      DROP LINK actionFieldGroup;
  };
  ALTER TYPE sys_rep::SysRep {
      CREATE REQUIRED LINK actionGroup: sys_core::SysDataObjActionGroup {
          SET REQUIRED USING (<sys_core::SysDataObjActionGroup>{});
      };
  };
};
