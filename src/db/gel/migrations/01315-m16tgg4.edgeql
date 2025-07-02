CREATE MIGRATION m16tgg45qbxvrtriuh42iv2db3cerprve473hupwk372li6y7pbrga
    ONTO m1fzittmlhm5yxtrj5vrhzfoib5uolgbq54rbqchwdqzitlqsxlmaa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK fieldEmbedListConfig {
          ON TARGET DELETE ALLOW;
      };
      ALTER LINK fieldEmbedListEdit {
          ON TARGET DELETE ALLOW;
      };
      ALTER LINK fieldEmbedListSelect {
          ON TARGET DELETE ALLOW;
      };
  };
};
