CREATE MIGRATION m1nhw53cmc2p6zrklieuorbwp46hoqypz2nk5jbckx2uceiuvkdsha
    ONTO m1edridc6uprn2efnhcfaegkg3xpz7q2ag6n5kr3iewro2lp7suzgq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY isSystemRootNode {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
