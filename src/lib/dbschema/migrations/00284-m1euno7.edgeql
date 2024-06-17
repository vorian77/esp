CREATE MIGRATION m1euno7n5e2tg5unnydahnc6m23yip6cowd5wucmexaqsgg75r2rrq
    ONTO m14lbf5s4c7m2ssz66rlydgqi3rgezz3wmpiajpf6u4caitvy4t2tq
{
  CREATE ALIAS sys_user::SysUserTypeResourceObjects := (
      SELECT
          sys_core::SysOrg
  );
};
