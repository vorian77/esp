CREATE MIGRATION m17e3rugloa5xn2qmu5phb6tpb5xxgwizkircyya4atme42cssrtoa
    ONTO m1br3sdvdvclpwfr3m647zsmevafyui6r6int5wa54j5s6d3rx34kq
{
  ALTER TYPE sys_core::SysDataObjFieldEmbedListConfig {
      ALTER LINK actionsFieldGroup {
          SET REQUIRED USING (<sys_core::SysDataObjActionFieldGroup>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelectExpr {
      ALTER PROPERTY exprAutoSelect {
          RENAME TO exprSelect;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelectExpr {
      ALTER PROPERTY exprSelect {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelectUser {
      ALTER LINK actionsFieldGroup {
          SET REQUIRED USING (<sys_core::SysDataObjActionFieldGroup>{});
      };
  };
};
