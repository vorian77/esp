CREATE MIGRATION m1gyltbgvvie5jhot66gay72aarvihe4vbowlwqh6ysxw2idi3sj3q
    ONTO m1d72rvvqlmb3iij5udbqrnmqwk2r6mrzgxmkopnxsvirxx5ja4mtq
{
  ALTER TYPE sys_core::SysDataObjAction {
      DROP CONSTRAINT std::exclusive ON (.name);
      ALTER PROPERTY orderDefine {
          SET OWNED;
      };
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_user::Mgmt LAST;
      ALTER LINK codeColor {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      ALTER PROPERTY orderDefine {
          RESET readonly;
          RESET CARDINALITY;
          SET REQUIRED USING (<default::nonNegative>{});
          SET TYPE default::nonNegative;
      };
  };
};
