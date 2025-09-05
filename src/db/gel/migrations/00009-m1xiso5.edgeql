CREATE MIGRATION m1xiso5oabsqgxjgn36537d6kamqatp55kevj75ar23jnhtlhw4yha
    ONTO m12a2nhmcwnr47hnlwo62zzke3zxnnukyyn4lcgzlrphzcy2y26v5q
{
  ALTER TYPE sys_core::SysGridStyle {
      CREATE LINK column: sys_db::SysColumn;
      ALTER PROPERTY exprTrigger {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
