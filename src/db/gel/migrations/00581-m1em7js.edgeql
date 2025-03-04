CREATE MIGRATION m1em7jsh4hxsdn2ckv723jiwvrykox5nenlbjt2mxkdv76d32kqofa
    ONTO m1fowpwirtijsxe52hmmgtefnhesd5rdokto5ffjrzsnfwrgixk7lq
{
              ALTER TYPE sys_core::SysObj {
      DROP LINK owner;
  };
};
