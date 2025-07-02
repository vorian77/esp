CREATE MIGRATION m1z3tmyt2zvjoimkgoi32s5d46frllmjv7qiwlwjfz57cnbhgg4mqq
    ONTO m1gdl4mngipffm2da5fnddbeht5qkseri4dcyyb5punhzpznxnetna
{
  ALTER TYPE sys_core::SysObjAttrEnt {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
