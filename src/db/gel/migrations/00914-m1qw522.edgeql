CREATE MIGRATION m1qw522j7qmdv3k6fte72rqujwdj5bnht6ddnvclwvhvngpogeabhq
    ONTO m1e57doej2nluofzujlytv6bm4iwp54t4ut6niu7lqto5o5tvlmm3q
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK codeDbDataOp;
  };
};
