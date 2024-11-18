CREATE MIGRATION m1br3sdvdvclpwfr3m647zsmevafyui6r6int5wa54j5s6d3rx34kq
    ONTO m1oaqpqtryw7hpnob5ddt3wcivtryulidtyrol3d34amuhygdidmua
{
      ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldListEmbed: sys_core::SysDataObjFieldEmbedList;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListConfig {
      CREATE LINK actionsFieldGroup: sys_core::SysDataObjActionFieldGroup {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK dataObjEmbed: sys_core::SysDataObj {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          SET REQUIRED USING (<sys_core::SysDataObj>{});
      };
      CREATE REQUIRED LINK dataObjModal: sys_core::SysDataObj {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          SET REQUIRED USING (<sys_core::SysDataObj>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      CREATE REQUIRED LINK dataObjList: sys_core::SysDataObj {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          SET REQUIRED USING (<sys_core::SysDataObj>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelectExpr {
      CREATE PROPERTY exprAutoSelect: std::str;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelectUser {
      CREATE LINK actionsFieldGroup: sys_core::SysDataObjActionFieldGroup {
          ON TARGET DELETE ALLOW;
      };
      CREATE PROPERTY btnLabelComplete: std::str;
  };
};
