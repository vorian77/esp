CREATE MIGRATION m1wgy2foxxoht6ou6ydempczfmllv34zhhvuxsthjor4xyknmezlfq
    ONTO m1mdypvjffc66blm7t4ivoifkwddb46k2uoffd5n576juqrfqm3poq
{
  ALTER TYPE sys_core::SysCode {
      CREATE CONSTRAINT std::exclusive ON ((.ownerOld, .codeType, .name));
  };
};
