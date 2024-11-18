CREATE MIGRATION m1bt4dzjqvldtiw6gxqrqyudrf546vcho3kxzkhib6qwo5k76i3nxq
    ONTO m1k67bhccrfnav57eqlfdb4bsnnciadvyx54y7yirygjyeympuxt5a
{
  ALTER TYPE sys_core::SysCode {
      CREATE LINK ownerOld: sys_core::SysSystem;
  };
};
