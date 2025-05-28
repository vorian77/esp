CREATE MIGRATION m1d4yy6oonp5mtyre2yz34p6ntlxmxmag74fq7ojgvuig35upn6mca
    ONTO m1qnds5bbcrtnde6zdlbccj62dmlm6o4yvh3tsub3jntwkmudy5bta
{
  ALTER TYPE sys_user::SysUser {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
};
