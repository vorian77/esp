CREATE MIGRATION m1us74jhdncw5tpld76kw4chc5km7jifhlgo2zrvzpukdmpoy25ciq
    ONTO m1gcjw7ddg24lmitegiltlzwhycgpwa5dsbrtapespgxtsjq5yoy7q
{
              ALTER TYPE sys_user::Mgmt {
      ALTER LINK createdBy {
          SET readonly := true;
          SET REQUIRED USING (<sys_user::SysUser>{});
      };
  };
  ALTER TYPE sys_user::Mgmt {
      DROP LINK createdByOld;
      ALTER LINK modifiedBy {
          SET REQUIRED USING (<sys_user::SysUser>{});
      };
      DROP LINK modifiedByOld;
      ALTER PROPERTY modifiedAt {
          SET REQUIRED USING (<std::datetime>{});
      };
  };
};
