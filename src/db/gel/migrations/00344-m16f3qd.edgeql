CREATE MIGRATION m16f3qdr4ogzmiqrr6fzn5agtwmxpnzxu3bkif3xzfwviwa5ze26cq
    ONTO m1s5lqvq25xfr36zpxbpp5hakuepv2gnsao5yibjk4uecikerjbpla
{
                  ALTER TYPE sys_core::SysDataObjActionQuery {
      CREATE LINK createdBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      CREATE LINK modifiedBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      EXTENDING sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_core::SysDataObjActionQuery {
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
