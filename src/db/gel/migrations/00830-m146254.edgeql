CREATE MIGRATION m1462546eybswqpgervuoynnclwwlmkiirwnntwnr6thjvg4letdmq
    ONTO m1lobcgt6yrwme35746tfhudgkas7gqlckgc4vtuqwwgc3sb63fyiq
{
          ALTER TYPE sys_core::SysDataObjTable {
      CREATE LINK tableRoot: sys_db::SysTable;
  };
};
