CREATE MIGRATION m1csef5uxco3z2d6xkqs5ny3xofzjpg7ddor7n7jv2yjjiscqx64uq
    ONTO m1lb52bnvtfqfxn7ybblxmoze7qun2addh6sldkxu7gbcyuvhjstoa
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK createdBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      CREATE LINK modifiedBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      EXTENDING sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK createdBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK modifiedBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
