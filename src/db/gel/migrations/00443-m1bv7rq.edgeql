CREATE MIGRATION m1bv7rqb36ckm7icxklzrm4hcmsneirwepdcsofaz3kgh7b3iktgva
    ONTO m12rad3n4iskdvi2inzirsefh4z6at5eauextff5otybieh2bdquwa
{
              ALTER TYPE sys_db::SysColumn {
      CREATE REQUIRED PROPERTY isNonData: std::bool {
          SET REQUIRED USING (<std::bool>false);
      };
  };
};
