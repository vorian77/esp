CREATE MIGRATION m15o2nkzcoesxukshl4oa4kxhfzxnnbkdp6dnmahg3pwpmskk2l7jq
    ONTO m1p53uuwcxuatoaktsqk4srbql6fr5ta6df4j3effbapm5f5l55vha
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK data {
          RESET ON TARGET DELETE;
      };
  };
};
