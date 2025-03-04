CREATE MIGRATION m1k6xllflkd6zjcg7fre56ce2r53ufyoowz627y7n5al3sbcjmm6wa
    ONTO m1fmip2tkxt2n5lyr22if6lvwsaaxuragzmpgjv5h52xyy3elsnhva
{
  ALTER TYPE sys_db::SysColumn {
      CREATE PROPERTY mask: std::str;
  };
};
