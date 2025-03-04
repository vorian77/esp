CREATE MIGRATION m1fowpwirtijsxe52hmmgtefnhesd5rdokto5ffjrzsnfwrgixk7lq
    ONTO m1zlpo7qooqubkhj3xwndy34ga7euveai63z75tayenrdgw4aczdga
{
              ALTER TYPE sys_core::SysObj {
      CREATE LINK owner: sys_core::SysSystem;
  };
};
